const { ApolloServer } = require("apollo-server");

// ..typeDefs seria o Schema
const typeDefs = `
    type Item {
        id: Int
        type: String
        description: String
    }

    type Query {
        prefixes: [Item]
        sufixes: [Item]
    }
`;

// ..espelha as consultas que eu desejo montar
const resolvers = {
    Query: {
        prefixes() {
            return items.filter(item => item.type == "prefix");
        },
        sufixes() {
            return items.filter(item => item.type == "sufix");
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);