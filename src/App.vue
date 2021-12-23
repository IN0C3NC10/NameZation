<template>
<div>
    <div id="slogan" class="text-center">
        <h1 class="orb">NameZation</h1>
        <br />
        <h6 class="text-secondary">Seu incrível gerador de nomes via Prefixos e Sufixos!</h6>
    </div>
    <div id="main">
        <DomainList></DomainList>
    </div>
</div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import DomainList from './components/DomainList.vue';
export default {
    name: "App",
    components: {
        DomainList
    },
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
