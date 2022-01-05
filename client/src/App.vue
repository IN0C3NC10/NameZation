<template>
<div>
    <div id="slogan" class="text-center">
        <img class="img-fluid" src="/images/logotipo.png" width="500" />
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
:root {
    --light: #f1f1f1;
    --shadow: #333;
    --dark: #000;
    --one: #41B883;
    --two: #34495E;
    --error: rgba(255, 81, 0, 0.767);
}

.orb {
    font-family: 'Orbitron';
}

#slogan {
    margin-top: 30px;
    margin-bottom: 30px;
}

#main {
    background-color: var(--light);
    padding-top: 30px;
    padding-bottom: 30px;
}

.back-main {
    color: var(--light);
    background-color: var(--one);
}

.back-main:hover {
    cursor: pointer;
    color: var(--light);
}

.back-sec {
    color: var(--light);
    background-color: var(--two);
}

.back-sec:hover {
    cursor: pointer;
    color: var(--light);
}

.text-right {
    text-align: right;
}
</style>
