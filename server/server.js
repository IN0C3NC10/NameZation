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

    type Domain {
        name: String
        checkout: String
    }

    type Mutation {
        saveItem(item: ItemInput): Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
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
        // .. mutação para salvar os dados
        saveItem(_, args) {
            const item = args.item;
            item.id = Math.floor(Math.random() * 1000);
            items.push(item);
            return item;
        },
        // .. mutação para deletar um dado
        deleteItem(_, args) {
            const id = args.id;
            const item = items.find(item => item.id === id);
            // ..se não encontrou ninguem
            if (!item) return false;
            // ..se encontrou, remova na lista aqui do servidor
            items.splice(items.indexOf(item), 1);
            return true;
        },
        // .. mutação para verificar um domínio
        generateDomains(){
            const domains = [];
            for (const prefix of items.filter(item => item.type === "prefix")) {
                for (const suffix of items.filter(item => item.type === "suffix")) {
                    const name = (prefix.description + suffix.description).toUpperCase();
                    const checkout = "https://registro.br/busca-dominio/?fqdn=" + name;
                    domains.push({
                        name,
                        checkout,
                    });
                }
            }
            return domains;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4000);
console.log('Server Started');