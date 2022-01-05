<template>
<div>
    <h5>
        {{ title }}
        <span class="badge back-main">{{ items.length }}</span>
    </h5>
    <div class="card">
        <div class="card-body">
            <ul class="list-group">
                <li class="list-group-item" v-for="item in items" v-bind:key="item.id">
                    <div class="row">
                        <div class="col-md">
                            {{ item.description }}
                        </div>
                        <div class="col-md text-right">
                            <button v-on:click="deleteItem(item)" class="btn back-sec"><span class="fa fa-trash"></span></button>
                        </div>
                    </div>
                </li>
            </ul>
            <br />
            <div class="input-group">
                <input v-model="description" v-on:keyup.enter="addItem(type, description)" class="form-control" type="text" :placeholder="'Digite o '+title+'..'" />
                <div class="input-group-append">
                    <button class="btn back-main" v-on:click="addItem(type, description)">
                        <span class="fa fa-plus"></span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'AppItemsList',
    props: ['title', 'items', 'type'],
    data() {
        return {
            description: ""
        };
    },

    methods: {
        addItem(type, description) {
            // ..recupera o método passado no componente
            this.$emit("addItem", {
                type,
                description
            });
            this.description = "";
        },
        deleteItem(item) {
            this.$emit("deleteItem", item);
        }
    },
}
</script>

<style scoped>

</style>
