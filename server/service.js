const db = require("./database");

// ..busca elementos pelo tipo
exports.getItemsByType = function (type) {
    return db.execute("select * from item where type = $1", [type]);
}

// ..buscar todos
exports.getItems = function () {
    return db.execute("select * from item");
}

// ..salvar item
exports.saveItem = function (item) {
    return db.execute("insert into item (type,description) values ($1, $2) returning *", [item.type, item.description]);
}

// ..deleta um item
exports.deleteItem = function (id) {
    return db.execute("delete from item where id=$1", [id]);
}