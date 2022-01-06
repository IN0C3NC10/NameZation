const { ApolloServer } = require("apollo-server");
const dns = require("dns");
const service = require("./service");
// ..recupera as informações da variável de ambiente
require('dotenv').config();

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
        available: Boolean
    }

    type Mutation {
        saveItem(item: ItemInput): Item
        deleteItem(id: Int): Boolean
        generateDomains: [Domain]
    }
`;

// ..função para verificar a disponibilidade de um domínio
const isDomainAvailable = function (url) {
    return new Promise(function (resolve, reject) {
        // ..tento resolver este dns, se der erro quer dizer que a url provavelmente não existe
        dns.resolve(url, function (error) {
            if (error) {
                // ..semelhante ao "return", é justamente para utilizar uma promessa, um método assincrono
                resolve(true);
            } else {
                resolve(false);
            }
        })
    });
};

// ..espelha as consultas que eu desejo montar
const resolvers = {
    Query: {
        async items(_, args) {
            const items = await service.getItemsByType(args.type);
            return items;
        }
    },
    Mutation: {
        // .. mutação para salvar os dados
        async saveItem(_, args) {
            const item = args.item;
            // ..o "[]" é pq sempre é retornado um array, com isto recuperamos apenas a primeira linha
            const [newItem] = await service.saveItem(item);
            return newItem;
        },
        // .. mutação para deletar um dado
        async deleteItem(_, args) {
            const id = args.id;
            await service.deleteItem(id);
            return true;
        },
        // .. mutação para verificar um domínio
        async generateDomains() {
            const domains = [];
            const items = await service.getItems();
            for (const prefix of items.filter(item => item.type === "prefix")) {
                for (const suffix of items.filter(item => item.type === "suffix")) {
                    const name = (prefix.description + suffix.description).toUpperCase();
                    const checkout = "https://registro.br/busca-dominio/?fqdn=" + name;
                    // ..verifica se existe algum domínio com este nome
                    const available = await isDomainAvailable(name + ".com.br");
                    domains.push({
                        name,
                        checkout,
                        available
                    });
                }
            }
            return domains;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(process.env.APP_PORT);
console.log('Server Started..');