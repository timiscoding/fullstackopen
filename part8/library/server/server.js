const { gql, ApolloServer, UserInputError } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
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
      let filtered = books;
      if (args.author) {
      }
      if (args.genre) {
        filtered = await Book.find({ genres: { $in: [args.genre] } });
      }
      return filtered;
    },
    allAuthors: async () => {
      return Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;
      await author.save();
      return author;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server listening on ${url}`));
