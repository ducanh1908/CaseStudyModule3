const http = require("http");
const url = require("url");
const fs = require("fs");
const qs = require("qs");

const Usercontroller = require("./controller/user-controller");
const ErrorController = require("./controller/error-contrller");
const HomeController = require("./controller/home-controller");
const SearchController = require("./controller/search-controller");
const BookshelfController = require("./controller/bookshelf-controller");
const BookController = require("./controller/book-controller");

let errorController = new ErrorController();
let userController = new Usercontroller();
let homeController = new HomeController();
let search = new SearchController();
let bookshelfController = new BookshelfController();
let bookController = new BookController();

const mimeTypes = {
  html: "text/html",
  js: "text/javascript",
  css: "text/css",
  "min.js": "text/javascript",
  "js.map": "text/javascript",
  "css.map": "text/css",
  "min.css": "text/css",
  jpg: "image/jpg",
  png: "image/png",
  gif: "image/gif",
  woff: "text/html",
  ttf: "text/html",
  woff2: "text/html",
  eot: "text/html",
};

let server = http.createServer((req, res) => {
  let path = url.parse(req.url);
  let pathUrl = path.pathname;
  let method = req.method;

  switch (pathUrl) {
    case "/": {
      homeController.showHomePage(req, res);
      break;
    }

    case "/admin": {
      fs.readFile("views/admin.html", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          userController.showListUser(req, res);
        }
      });

      break;
    }
    case "/user": {
      fs.readFile("views/homeuser.html", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });

      break;
    }

    case "/register": {
      if (method === "GET") {
        userController.showFormCreateUser(req, res);
      } else {
        userController.createUser(req, res);
      }
      break;
    }

    case "/login": {
      if (method === "GET") {
        userController.showFormLogin(req, res);
      } else {
        userController.loginUser(req, res);
      }
      break;
    }

    case "/update": {
      if (method == "GET") {
        userController.showUserEditForm(req, res);
      } else {
        userController.editUser(req, res);
      }
      break;
    }
    case "/user/profile": {
      fs.readFile("views/updateuser.html", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(data);
          return res.end();
        }
      });
      break;
    }
    case "/admin/user": {
      fs.readFile("views/manager.html", "utf-8", (err, data) => {
        if (err) {
          throw new Error(err.message);
        } else {
          userController.showListUserManager(req, res);
        }
      });

      break;
    }
    case "/admin/user/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        userController.showUserEditForm(req, res, idUpdate);
      } else {
        userController.editUser(req, res, idUpdate);
      }
      break;
    }
    case "/admin/user/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        userController.deleteUser(req, res, idUpdate);
      } else {
        userController.showListUserManager(req, res);
      }
      break;
    }

    case "/search": {
      if (method == "GET") {
        search.showSearch(req, res);
      } else {
        search.findByCategory(req, res);
      }
      break;
    }

    case "/admin/bookshelf": {
      bookshelfController.showBookshelfListPage(req, res);
      break;
    }

    case "/admin/bookshelf/create": {
      if (method === "GET") {
        bookshelfController.showBookshelfFormCreate(req, res);
      } else {
        bookshelfController.createBookshelf(req, res);
      }
      break;
    }

    case "/admin/bookshelf/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        bookshelfController.showBookshelfEditForm(req, res, idUpdate);
      } else {
        bookshelfController.editBookshelf(req, res, idUpdate);
      }
      break;
    }

    case "/admin/bookshelf/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        bookshelfController.deleteBookshelf(req, res, idUpdate);
      } else {
        bookshelfController.showBookshelfListPage(req, res);
      }
      break;
    }

    case "/admin/book": {
      bookController.showBookListPage(req, res);
      break;
    }

    case "/admin/book/create": {
      if (method === "GET") {
        bookController.showBookFormCreate(req, res);
      } else {
        bookController.createBook(req, res);
      }
      break;
    }

    case "/admin/book/edit": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      console.log(idUpdate)
      if (method === "GET") {
        bookController.showBookEditForm(req, res, idUpdate);
      } else {
        bookController.editBook(req, res, idUpdate);
      }
      break;
    }

    case "/admin/book/delete": {
      let query = qs.parse(path.query);
      let idUpdate = query.id;
      if (method === "GET") {
        bookController.deleteBook(req, res, idUpdate);
      } else {
        bookController.showBookListPage(req, res);
      }
      break;
    }

    default:
      const filesDefences = req.url.match(/\.js|\.css|\.png|\.jpg/);
      if (filesDefences) {
        const extension = mimeTypes[filesDefences[0].toString().split(".")[1]];
        res.writeHead(200, { "Content-Type": extension });
        fs.createReadStream(__dirname + "/" + req.url).pipe(res);
      } else {
        res.end();
      }

      // errorController.showError404Page(req,res);
      break;
  }
});

server.listen(8005, () => {
  console.log("Server is running http//:localhost:8005a");
});
