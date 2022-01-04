<template>
<div>
    <div id="main">
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <AppItemsList title="Prefixos" v-bind:items="prefixes" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix"></AppItemsList>
                </div>
                <div class="col-md">
                    <AppItemsList title="Sufixos" v-bind:items="suffixes" v-on:addItem="addSuffix" v-on:deleteItem="deleteSuffix"></AppItemsList>
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
            prefixes: [],
            suffixes: [],
        };
    },

    methods: {
        getPrefixes() {
            axios({
                url: "http://localhost:4000",
                method: "post",
                data: {
                    query: `
                    {
                        prefixes: items (type: "prefix") {
                            id
                            type
                            description
                        }
                    }
                `,
                },
            }).then((res) => {
                const query = res.data;
                this.prefixes = query.data.prefixes;
            });
        },
        getSuffixes() {
            axios({
                url: "http://localhost:4000",
                method: "post",
                data: {
                    query: `
                    {
                        suffixes: items (type: "suffix") {
                            id
                            type
                            description
                        }
                    }
                `,
                },
            }).then((res) => {
                const query = res.data;
                this.suffixes = query.data.suffixes;
            });
        },
        addPrefix(prefix) {
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
                        item: {
                            type: "prefix",
                            description: prefix
                        }
                    }
                }
            }).then((res) => {
                const query = res.data;
                const saveItem = query.data.saveItem;
                this.prefixes.push(saveItem.description);
            });
        },
        addSuffix(suffix) {
            this.suffixes.push(suffix);
        },
        deletePrefix(prefix) {
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
                        id: prefix.id
                    }
                }
            }).then(() => {
                this.getPrefixes();
            });
        },
        deleteSuffix(suffix) {
            this.suffixes.splice(this.suffixes.indexOf(suffix), 1);
        },
    },

    computed: {
        // ..apenas executa qdo ocorre uma mudança em prefixes ou suffixes
        domains() {
            const domains = [];
            for (const prefix of this.prefixes) {
                for (const suffix of this.suffixes) {
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
        this.getPrefixes();
        this.getSuffixes();
    },
};
</script>

<style>
</style>
