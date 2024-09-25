function toggle() {
    var blur = document.getElementById("body");
    blur.classList.toggle("active");

    var popup = document.getElementById("menu");
    popup.classList.toggle("active");

    // UI.displayBooks();
}

function addBookEvent(e) {
    e.preventDefault();
    const newBook = {
        title: e.target.title.value,
        author: e.target.author.value,
        pagesRead: e.target.pagesRead.value,
        totalPages: e.target.totalPages.value
    }
    // const book = new Book(newBook);
    Storage.addBook(newBook);
    toggle();
    UI.displayBooks();
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
    static LOCAL_STORAGE_KEY = "books-entries";

    static getBooks() {
        let books;
        if (localStorage.getItem(Storage.LOCAL_STORAGE_KEY) === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem(Storage.LOCAL_STORAGE_KEY));
        }

        return books;
    }

    static addBook(book) {
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
    }
    
    static removeBook(bookTitle) {
        let x = 0;
        const books = Storage.getBooks();

        books.forEach((book, index) => {
            if (book.title === bookTitle) {
                books.splice(index, 1);
                console.log(book.title + " removed");
                x = 1;
            }
        });
        
        if (Boolean(x)) {
            localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
            document.querySelector("main").innerHTML = "";
            UI.displayBooks(books);
        }
    }

    static updateBook(bookTitle, pagesRead) {
        const books = Storage.getBooks();

        books.forEach((book) => {
            if (book.title === bookTitle) {
                book.pagesRead = pagesRead;
            }
        });

        localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
    }
}

class UI {
    static displayBooks(books=[]) {
        const main = document.querySelector("main");
        main.innerHTML = ``;

        if (books.length === 0)
            books = Storage.getBooks();

        if (books.length !== 0) {
            const h = document.getElementById("empty");

            if (h !== null)
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

        bookMark.innerHTML += `
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

    static removeBook(e) {
        if (e.classList.contains("delete")) {
            Storage.removeBook(e.parentElement.parentElement.querySelector("h2").textContent);
        }
    }
}

document.querySelector("main").addEventListener("click", (e) => {
    UI.removeBook(e.target);
});

Storage.getBooks();

// Storage.addBook({
//     title: 'Intelligent Design',
//     author: 'William Dembski',
//     pagesRead: 312,
//     totalPages: 516,
//     status: 'Reading'
// })

// Storage.addBook({
//     title: 'Intelligent',
//     author: 'William',
//     pagesRead: 516,
//     totalPages: 516,
//     status: 'Reading'
// })