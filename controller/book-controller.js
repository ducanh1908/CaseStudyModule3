
const fs = require("fs");
const qs = require("qs");
const Book = require("../model/book");

class BookController {
  constructor() {
    this.book = new Book();
  }

  showBookListPage(req, res) {
    fs.readFile("views/book/list.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let books =  await this.book.getBooks();
        console.log(books)
        let tbody = "";
        for (let index = 0; index < books.length; index++) {
          let book = books[index]
          tbody += `<tr>
                                            <td>${book.id}</td>
                                            <td>${book.TenSach}</td>
                                            <td>${book.MoTa}</td>
                                          
                                            <td>
                                                <a href="/admin/book/edit?id=${book.id}" class="action-icon btn btn-primary text-white"> EDIT </a>
                                                <a href="/admin/book/delete?id=${book.id}" class="action-icon btn btn-danger text-white"> DELETE </a>
                                            </td>
                                        </tr>`;
        }
        data = data.replace('{book}', tbody);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  showBookFormCreate(req, res) {
    fs.readFile("views/book/create.html", "utf-8", (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  createBook(req, res) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let book = qs.parse(data);
      console.log(data)
      this.book.createBook(book);
      res.writeHead(301, {
        location: "/admin/book",
      });
      return res.end();
    });
  }

  showBookEditForm(req, res, idUpdate) {
    fs.readFile("views/book/edit.html", "utf-8", async (err, data) => {
      if (err) {
        console.log("File NotFound!");
      } else {
        let book = await this.book.getBook(idUpdate);
        if (book.length > 0) {
          data = data.replace("{id}", book[0].id);
          data = data.replace("{name}", book[0].name);
          data = data.replace("{description}", book[0].description);
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  }

  editBook(req, res, id) {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      let book = qs.parse(data);
      this.book.updateBook(id, book).then(() => {
        res.writeHead(301, {
          location: "/admin/book",
        });
        return res.end();
      });
    });
  }

  deleteBook(req, res, id) {
    this.book.deleteBook(id).then(() => {
      res.writeHead(301, {
        location: "/admin/book",
      });
      return res.end();
    });
  }
}

module.exports = BookController;
