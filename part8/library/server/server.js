const {
  gql,
  ApolloServer,
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");

const JWT_SECRET = "hard to crack secret";

console.log("Connecting to mongodb");
mongoose
  .connect("mongodb://localhost/library", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error connecting to mongodb", err.message));
mongoose.set("useCreateIndex", true);

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type User {
    id: ID!
    username: String!
    favoriteGenre: String!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    allGenres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      if (!(args.author || args.genre)) {
        return Book.find({}).populate("author");
      }
      let filtered;
      if (args.author) {
      }
      if (args.genre) {
        filtered = await Book.find({ genres: { $in: [args.genre] } }).populate(
          "author"
        );
      }
      return filtered;
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: (root, args, context) => context.currentUser,
    allGenres: () => Book.distinct("genres"),
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      let newBook;
      try {
        const author = await Author.findOneAndUpdate(
          { name: args.author },
          { name: args.author },
          { upsert: true, new: true }
        );
        newBook = new Book({ ...args, author: author });
        await newBook.save();
      } catch (err) {
        throw new UserInputError("Invalid args", {
          invalidArgs: Object.values(err.errors).map((e) => ({
            arg: e.path,
            message: e.message,
          })),
        });
      }
      return newBook;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError("Not authenticated");
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      let user;
      try {
        user = new User({ ...args });
        await user.save();
      } catch (err) {
        throw new UserInputError("Invalid args", {
          invalidArgs: Object.values(err.errors).map((e) => ({
            arg: e.path,
            message: e.message,
          })),
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new AuthenticationError("Wrong credentials");
      }

      const payload = {
        id: user.id,
        username: user.username,
      };
      return { value: jwt.sign(payload, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    if (
      req &&
      req.headers.authorization &&
      req.headers.authorization.toLowerCase().startsWith("bearer ")
    ) {
      const token = req.headers.authorization.substring(7);
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch (err) {
        return null;
      }
    }
  },
});

server.listen().then(({ url }) => console.log(`Server listening on ${url}`));
