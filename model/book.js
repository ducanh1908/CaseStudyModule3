const Connection = require("./connection");

class Book {
    constructor() {
        this.connection = Connection.createConnection();
        this.connection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Connect success!");
            }
        });
    }

    getBooks() {
        return new Promise((resolve, reject) => {
            this.connection.query("select * from Sach", (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    createBook(book) {
        let insertQuery = `insert into Sach(TenSach, MoTa)
                           values ('${book.name}', '${book.description}')`;
        this.connection.query(insertQuery, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                console.log("Insert success");
            }
        });
    }

    getBook(id) {
        return new Promise((resolve, reject) => {
            let query = `select *
                         from Sach
                         where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    updateBook(id, book) {
        return new Promise((resolve, reject) => {
            let query = `update Sach
                         set TenSach = '${book.name}',
                             MoTa    = '${book.description}'

                         where id = ${id}`;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        });
    }

    deleteBook(id) {
        return new Promise((resolve, reject) => {
            let query = `delete
                         from Sach
                         where id = ${id}
            `;
            this.connection.query(query, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                    console.log("Delete success");
                }
            });
        });
    }

}

module.exports = Book;
