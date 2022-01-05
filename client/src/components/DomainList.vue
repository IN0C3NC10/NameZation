<template>
<div>
    <div id="main">
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <AppItemsList title="Prefixos" v-bind:items="items.prefix" v-on:addItem="addItem" type="prefix" v-on:deleteItem="deleteItem"></AppItemsList>
                </div>
                <div class="col-md">
                    <AppItemsList title="Sufixos" v-bind:items="items.suffix" v-on:addItem="addItem" type="suffix" v-on:deleteItem="deleteItem"></AppItemsList>
                </div>
            </div>
            <br />
            <h5>
                Domínios <span class="badge back-main">{{ domains.length }}</span>
            </h5>
            <div class="card">
                <div class="card-body">
                    <ul class="list-group">
                        <li class="list-group-item" v-for="domain in domains" v-bind:key="domain.name">
                            <div class="row">
                                <div class="col-md-6">
                                    {{ domain.name }}
                                </div>
                                <div class="col-md-3 text-center">
                                    <span :class="(domain.available) ? 'badge back-main' : 'badge back-sec'">
                                        {{ (domain.available) ? "Disponível" : "Indisponível" }}
                                    </span>
                                </div>
                                <div class="col-md-3 text-right">
                                    <a class="btn back-main" v-bind:href="domain.checkout" target="_blank">
                                        <span class="fa fa-shopping-cart"></span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import axios from "axios/dist/axios";
import AppItemsList from "./AppItemsList.vue";
export default {
    components: {
        AppItemsList
    },
    name: "DomainList",
    data() {
        return {
            url: "http://localhost:4000",
            items: {
                prefix: [],
                suffix: [],
            },
            domains: []
        };
    },

    methods: {
        // ..método responsável por recuperar os dados do GraphQL
        //      (vale lembrar que este é único contando com um "return" justamente pq está associado a "Promise" no "created")
        getItems(type) {
            return axios({
                url: this.url,
                method: "post",
                data: {
                    query: `
                    query ($type: String){
                        items: items (type: $type) {
                            id
                            type
                            description
                        }
                    }
                `,
                    variables: {
                        type
                    }
                },
            }).then((res) => {
                const query = res.data;
                this.items[type] = query.data.items;
            });
        },
        // ..método responsável por adicionar um dado no GraphQL
        addItem(item) {
            axios({
                url: this.url,
                method: "post",
                data: {
                    query: `
                        mutation ($item: ItemInput) {
                            saveItem(item: $item) {
                                id
                                type
                                description
                            }
                        }
                    `,
                    variables: {
                        item
                    }
                }
            }).then((res) => {
                const query = res.data;
                const saveItem = query.data.saveItem;
                // ..adiciona o item no array "items" de acordo com o seu tipo
                this.items[item.type].push(saveItem);
                // ..gera novamente os domínios
                this.generateDomains();
            });
        },
        // ..método responsável por deletar um dado no GraphQL
        deleteItem(item) {
            axios({
                url: this.url,
                method: "post",
                data: {
                    query: `
                        mutation ($id: Int) {
                            deleteItem(id: $id)
                        }
                    `,
                    variables: {
                        id: item.id
                    }
                }
            }).then(() => {
                // ..usando o "splice" poderia ser feito várias coisas mas, neste caso estamos deletando no array local
                this.items[item.type].splice(this.items[item.type].indexOf(item), 1);
                // ..gera novamente os domínios
                this.generateDomains();
            });
        },
        // ..método responsável por verificar um domínio
        generateDomains() {
            axios({
                url: this.url,
                method: "post",
                data: {
                    query: `
                        mutation {
                            domains: generateDomains {
                                name
                                checkout
                                available
                            }
                        }
                    `
                }
            }).then((res) => {
                const query = res.data;
                // ..atribui o retorno de domínios a var local 
                //      (lembrando que é usado "data.domains" pq foi utilizado um alias na "mutation")
                this.domains = query.data.domains;
            });
        }
    },

    created() {
        // ..recebe um array que somente após receber suas promessas, entra no then
        //    (pois o generateDomains sozinho com os demais, inicia antes de receber os dados)
        Promise.all([
            this.getItems("prefix"),
            this.getItems("suffix"),
        ]).then(() => {
            this.generateDomains();
        });
    },
};
</script>

<style>
</style>
