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
        this.status = "Reading";
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

class UI {
    static displayBooks() {
        // const books = Storage.getBooks();
        let books = [{
            title: 'Intelligent Design',
            author: 'William Dembski',
            pagesRead: 312,
            totalPages: 516,
            status: 'Reading'
        },
        {
            title: 'Intelligent',
            author: 'William',
            pagesRead: 516,
            totalPages: 516,
            status: 'Reading'
        }]

        if (books.length !== 0) {
            const h = document.getElementById("empty");
            h.remove();
        }

        books.forEach((book) => UI.displayBookMark(book));
    }

    static displayBookMark(book) {
        const main = document.querySelector("main");

        const bookMark = document.createElement("div");
        bookMark.classList.add("book-card");

        if (book.pagesRead === book.totalPages){
            book.status = "Completed";
        }

        bookMark.innerHTML = `
        <div class="description">
            <h2>${book.title}</h2>
            <h3>by ${book.author}</h3>
            <p>Pages: ${book.pagesRead}/${book.totalPages}</p>
        </div>
        <div class="action-btns">
            <button class="edit">Edit</button>
            <button class="delete">Delete</button>
        </div>
        <div class="status">${book.status}</div>`;

        main.appendChild(bookMark);
    }
}
