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
                                <div class="col-md">
                                    {{ domain.name }}
                                </div>
                                <div class="col-md text-right">
                                    <a class="btn btn-primary" v-bind:href="domain.checkout" target="_blank">
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
    name: "App",
    data() {
        return {
            items: {
                prefix: [],
                suffix: [],
            }
        };
    },

    methods: {
        getItems(type) {
            axios({
                url: "http://localhost:4000",
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
         addItem(item) {
            axios({
                url: "http://localhost:4000",
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
                this.items[item.type].push(saveItem);
            });
        },
        deleteItem(item) {
            axios({
                url: "http://localhost:4000",
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
                this.getItems(item.type);
            });
        },
    },

    computed: {
        // ..apenas executa qdo ocorre uma mudança em prefixes ou suffixes
        domains() {
            const domains = [];
            for (const prefix of this.items.prefix) {
                for (const suffix of this.items.suffix) {
                    const name = prefix.description + suffix.description;
                    const checkout = "https://registro.br/busca-dominio/?fqdn=" + name;
                    domains.push({
                        name,
                        checkout,
                    });
                }
            }
            return domains;
        },
    },

    created() {
        this.getItems("prefix");
        this.getItems("suffix");
    },
};
</script>

<style>
</style>
