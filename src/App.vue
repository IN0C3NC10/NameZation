<template>
<div>
    <div id="slogan" class="text-center">
        <h1 class="orb">NameZation</h1>
        <br />
        <h6 class="text-secondary">Seu incrível gerador de nomes via Prefixos e Sufixos!</h6>
    </div>
    <div id="main">
        <div class="container">
            <div class="row">
                <div class="col-md">
                    <h5>
                        Prefixos
                        <span class="badge back-main">{{ prefixes.length }}</span>
                    </h5>
                    <div class="card">
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="prefix in prefixes" v-bind:key="prefix">
                                    <div class="row">
                                        <div class="col-md">
                                            {{ prefix }}
                                        </div>
                                        <div class="col-md text-right">
                                            <button v-on:click="deletePrefix(prefix)" class="btn btn-danger"><span class="fa fa-trash"></span></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <br />
                            <div class="input-group">
                                <input v-model="prefix" v-on:keyup.enter="addPrefix(prefix)" class="form-control" type="text" placeholder="Digite o prefixo" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" v-on:click="addPrefix(prefix)">
                                        <span class="fa fa-plus"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md">
                    <h5>
                        Sufixos <span class="badge back-main">{{ sufixes.length }}</span>
                    </h5>
                    <div class="card">
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item" v-for="sufix in sufixes" v-bind:key="sufix">
                                    <div class="row">
                                        <div class="col-md">
                                            {{ sufix }}
                                        </div>
                                        <div class="col-md text-right">
                                            <button v-on:click="deleteSufix(sufix)" class="btn btn-danger"><span class="fa fa-trash"></span></button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                            <br />
                            <div class="input-group">
                                <input v-model="sufix" v-on:keyup.enter="addSufix(sufix)" class="form-control" type="text" placeholder="Digite o sufixo" />
                                <div class="input-group-append">
                                    <button class="btn btn-primary" v-on:click="addSufix(sufix)">
                                        <span class="fa fa-plus"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
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
export default {
    name: "App",
    data() {
        return {
            prefix: "",
            sufix: "",
            prefixes: ["Air", "Jet", "Flight"],
            sufixes: ["Hub", "Station", "Mart"],
        };
    },

    methods: {
        addPrefix(prefix) {
            this.prefixes.push(prefix);
            this.prefix = "";
        },
        addSufix(sufix) {
            this.sufixes.push(sufix);
            this.sufix = "";
        },
        deletePrefix(prefix) {
            this.prefixes.splice(this.prefixes.indexOf(prefix), 1);
        },
        deleteSufix(sufix) {
            this.sufixes.splice(this.sufixes.indexOf(sufix), 1);
        }
    },

    computed: {
        // ..apenas executa qdo ocorre uma mudança em prefixes ou sufixes
        domains() {
            console.log('dd');
            const domains = [];
            for (const prefix of this.prefixes) {
                for (const sufix of this.sufixes) {
                    const name = prefix + sufix;
                    const checkout = "https://registro.br/busca-dominio/?fqdn="+name;
                    domains.push({
                      name,
                      checkout
                    });
                }
            }
            return domains;
        },
    }
};
</script>

<style>
.orb {
    font-family: 'Orbitron';
}

#slogan {
    margin-top: 30px;
    margin-bottom: 30px;
}

#main {
    background-color: #f1f1f1;
    padding-top: 30px;
    padding-bottom: 30px;
}

.back-main {
    background-color: rgb(8, 90, 167);
}

.text-right {
    text-align: right;
}
</style>
