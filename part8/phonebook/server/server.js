const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Person = require("./models/Person");
const User = require("./models/User");

const JWT_SECRET = "REALLY_GOOD_SECRET";

mongoose.set("useFindAndModify", false);

const MONGODB_URI = "mongodb://localhost/grpahql?retryWrites=true";

console.log("Connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB", error.message);
  });

let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
    id: "3d594650-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
    id: "3d599470-3436-11e9-bc57-8b80ba54c431",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
    id: "3d599471-3436-11e9-bc57-8b80ba54c431",
  },
];

const typeDefs = gql`
  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    friendOf: [User!]!
    id: ID!
  }

  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }

  type Subscription {
    personAdded: Person!
  }
`;

const pubsub = new PubSub(0);
const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({}).populate("friendOf");
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } }).populate(
        "friendOf"
      );
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => context.currentUser,
  },
  Person: {
    address: (root) => ({ city: root.city, street: root.street }),
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish("PERSON_ADDED", { personAdded: person });
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const { username, password } = args;
      const user = await User.findOne({ username });
      if (!user || password !== "secret") {
        throw new UserInputError("Wrong credentials");
      }
      const payload = {
        username: user.username,
        id: user.id,
      };
      return { value: jwt.sign(payload, JWT_SECRET) };
    },
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = (person) => {
        return !currentUser.friends.map((f) => f.id).includes(person.id);
      };

      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();
      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(["PERSON_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const token = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(token.id).populate("friends");
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
