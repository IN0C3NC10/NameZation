<h1 align="center" id="title">NameZation</h1>
<!-- Logo -->
<p align="center">
  <img height="300" alt="NameZation - Logo" title="NameZation - Defina o nome de seu projeto e encontre seu domínio!" src="./client/public/images/logo.png" />
</p>


<!-- Título&Descrição -->
<h2 align="left" id="descricao">Descrição</h2>
<p align="justify">
  Este é um website bem simples, feito com fins de estudo e aprendizado em Vue.js, gera nomes por meio de prefixos e sufixos inseridos pelo próprio usuário, também a   possibilidade de checar a disponibilidade no <a href="https://registro.br/">registro.br</a> de cada domínio/nome, vale citar que já consta se o endereço é
  disponível para aquisição ou não.
</p>


<!-- Shields -->
<p>
	<img src="https://img.shields.io/badge/Frontend-Vue-4FC08D?style=for-the-badge&logo=Vue.js" title="Frontend com Vue" alt="Frontend com Vue"></img>
  <img src="https://img.shields.io/badge/Backend-Node-6DB33F?style=for-the-badge&logo=Node.js&logoColor=6DB33F" title="Backend com Node" alt="Backend com Node"></img>
    <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=for-the-badge&logo=Postgresql&logoColor=4169E1" title="Banco de dados PostgreSQL" alt="Banco de dados PostgreSQL"></img>
    <img src="https://img.shields.io/badge/Status-Done-blue?style=for-the-badge" title="Status do Projeto:Concluído" alt="Status do Projeto:Concluído"></img>
    <!-- <img src="https://img.shields.io/badge/Status-Working-F08705?style=for-the-badge" title="Status do Projeto: Trabalhando" alt="Status do Projeto: Trabalhando"></img> -->
</p>


<!-- Screenshots -->
<h2 align="left" id="screenshots">Screenshots</h2>
<p align="center">
  <img height="400" alt="Tela Principal do NameZation" title="Tela Principal" src="./client/public/images/prints/print-home.png" />
</p>


<!-- Pré-Requisitos -->
<h2 align="left" id="pre">Pré-Requisitos</h2>

Antes de iniciarmos, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Vue](https://vuejs.org/)
- [Node](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/download/)

Também facilita muito você possuir um editor para trabalhar com o código, fica a dica o [VSCode](https://code.visualstudio.com/).


<!-- Features -->
<h2 align="left" id="features">Funcionalidades</h2>

- [x] Cadastro de Prefixo e Sufixo;
- [x] Gerador de nomes com base nos Prefixos e Sufixos;
- [x] Verificar a disponibilidade do domínio no site [registro.br](https://registro.br/);


<!-- Executando o app -->
<h2 align="left" id="run">Rodando o website</h2>

```bash
# Clone este repositório
$ git clone https://github.com/IN0C3NC10/NameZation.git

# Abra a pasta no seu VSCode ou editor de preferência

# Instale os pacotes necessários p/ execução com
$ npm install

# Antes de tudo, pegue o script sql em database e crie sua tabela

# Depois, crie um arquivo ".env" no server e preencha com suas informações, com base no ".env-example"

# Sensacional, agora precisaremos de 2 terminais

# Primeiramente o server (backend)
#   Entre na pasta com:
$ cd .\server
#   Em seguida inicie o servidor Node com:
$ node server

# Agora (no 2º terminal) o client (frontend)
#   Entre na pasta com:
$ cd .\client
#   Em seguida execute o projeto Vue com:
$ npm run serve


#BeHappy!
```
<!-- Autor -->
<h2 align="left" id="autor">Autor</h2>
<p>
	<a href="https://github.com/IN0C3NC10">
		<img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/73368174?v=4" width="100px;" alt="autor-image" title="IN0C3NC10"/>
	</a>
	<br />
	Feito com ❤️ por <strong>Bruno Inocencio</strong>!
</p>

<p align="left">
  <!-- Outlook -->
  <a href="mailto:bruno.inocencio@fatec.sp.gov.br" alt="Outlook" target="_blank">
    <img height="35" src="https://img.shields.io/badge/Outlook-00001a?style=for-the-badge&logo=microsoft-outlook&logoColor=0078D4" />
  </a>
  <!-- Linkedin -->
  <a href="https://cutt.ly/nQlVjQV" alt="Linkedin" target="_blank">
    <img height="35" src="https://img.shields.io/badge/-LinkedIn-00001a?style=for-the-badge&logo=linkedin&logoColor=%230077B5" />
  </a>
  <!-- GitHub -->
  <a href="https://github.com/IN0C3NC10" alt="GitHub" target="_blank">
    <img height="35" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>
