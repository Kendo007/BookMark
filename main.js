function toggle() {
    var blur = document.getElementById("body");
    blur.classList.toggle("active");

    var popup = document.getElementById("menu");
    popup.classList.toggle("active");
}

class Book {
    constructor(title, author, pagesRead, totalPages) {
        this.title = title;
        this.author = author;
        this.pagesRead = pagesRead;
        this.totalPages = totalPages;
    }
}

class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    
    static removeBook(bookTitle) {
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if (book.title === bookTitle) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }

    static updateBook(bookTitle, pagesRead) {
        const books = Storage.getBooks();

        books.forEach((book) => {
            if (book.title === bookTitle) {
                book.pagesRead = pagesRead;
            }
        });

        localStorage.setItem("books", JSON.stringify(books));
    }
}