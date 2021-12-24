<template>
<div>
    <div id="main">
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <AppItemsList title="Prefixos" v-bind:items="prefixes" v-on:addItem="addPrefix" v-on:deleteItem="deletePrefix"></AppItemsList>
                </div>
                <div class="col-md">
                    <AppItemsList title="Sufixos" v-bind:items="sufixes" v-on:addItem="addSufix" v-on:deleteItem="deleteSufix"></AppItemsList>
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
            sufixes: [],
        };
    },

    methods: {
        addPrefix(prefix) {
            this.prefixes.push(prefix);
        },
        addSufix(sufix) {
            this.sufixes.push(sufix);
        },
        deletePrefix(prefix) {
            this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
        },
        deleteSufix(sufix) {
            this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
        },
    },

    computed: {
        // ..apenas executa qdo ocorre uma mudança em prefixes ou sufixes
        domains() {
            console.log("dd");
            const domains = [];
            for (const prefix of this.prefixes) {
                for (const sufix of this.sufixes) {
                    const name = prefix + sufix;
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
                        sufixes: items (type: "sufix") {
                            id
                            type
                            description
                        }
                    }
                `,
            },
        }).then((res) => {
            const query = res.data;
            console.log(query.data);
            this.prefixes = query.data.prefixes.map(prefix => prefix.description);
            this.sufixes = query.data.sufixes.map(sufix => sufix.description);
        });
    },
};
</script>

<style>
</style>
