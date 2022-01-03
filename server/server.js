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

    input ItemInput {
        type: String
        description: String
    }

    type Mutation {
        saveItem(item: ItemInput): Item
    }
`;

const items = [
    { id: 1, type: "prefix", description: "PRE" },
    { id: 2, type: "prefix", description: "NAME" },
    { id: 3, type: "suffix", description: "FIX" },
    { id: 4, type: "suffix", description: "ZATION" },
]

// ..espelha as consultas que eu desejo montar
const resolvers = {
    Query: {
        items(_, args) {
            return items.filter(item => item.type == args.type);
        }
    },
    Mutation: {
        saveItem(_, args) {
            const item = args.item;
            item.id = Math.floor(Math.random() * 1000);
            items.push(item);
            return item;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);
console.log('Server Started');