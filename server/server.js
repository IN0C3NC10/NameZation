const { ApolloServer } = require("apollo-server");

// ..typeDefs seria o Schema
const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        items (type: String): [Item]
    }
`;

const items = [
    { id: 1, type: "prefix", description: "PRE" },
    { id: 2, type: "prefix", description: "NAME" },
    { id: 3, type: "sufix", description: "FIX" },
    { id: 4, type: "sufix", description: "ZATION" },
]

// ..espelha as consultas que eu desejo montar
const resolvers = {
    Query: {
        items(_, args) {
            return items.filter(item => item.type == args.type);
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);