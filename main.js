function toggle(task, title, author, pagesRead, totalPages) {
    const body = document.getElementById("body");
    const DialogBox = document.getElementById('menu');

    if (task === "cancel") {
        DialogBox.classList.remove('active'); // Hide the dialog box
        body.classList.remove("active");
        DialogBox.innerHTML = ``;
        return;
    } else if (task === 'edit' && !title && !author) {
        console.error("No book provided for editing");
        return;
    }    

    DialogBox.classList.add('active'); // Show the dialog box
    body.classList.add("active");

    DialogBox.innerHTML = `
        <form id="book-form" class="active" onsubmit="${task === 'add' ? 'addBookEvent(event)' : 'updateBookEvent(event)'}">
        <div class="form-container">
          <h1 class="form-header">${task === 'add' ? 'New Book' : 'Edit Book'}</h1>
          <div class="input-container">
            <label for="title"></label>
            <input type="text" name="title" id="title" value="${title || ""}" required />
            <span>Title</span>
          </div>
          <div class="input-container">
            <label for="author"></label>
            <input type="text" name="author" id="author" value="${author || ""}" required />
            <span>Author</span>
          </div>
          <div class="input-container">
            <label for="pagesRead"></label>
            <input type="number" name="pagesRead" id="pagesRead" value="${pagesRead || "" }" min="1" required />
            <span>Pages Read</span>
          </div>
          <div class="input-container">
            <label for="totalPages"></label>
            <input type="number" name="totalPages" id="totalPages" value="${totalPages || "" }" min="1" required />
            <span>Total Pages</span>
          </div>
          <div>
            <button type="submit" class="btm">${task === 'add' ? 'Add to Library' : 'Update Book'}</button>
          </div>
          <div>
            <button type="button" class="btm" onclick="toggle('cancel')">Cancel</button>
          </div>
        </div>
      </form>
    `;
}

function addBookEvent(e) {
    e.preventDefault();
    const newBook = {
        title: e.target.title.value,
        author: e.target.author.value,
        pagesRead: e.target.pagesRead.value,
        totalPages: e.target.totalPages.value
    };
    let p1 = newBook.pagesRead;
    let p2 = newBook.totalPages;
    if(parseInt(p1) == parseInt(p2)) {
        console.error("Pages Read is greater than Total Pages.");
        return "";
    }
    Storage.addBook(newBook);
    UI.displayBooks();
    toggle('cancel'); // Close the form
}

function updateBookEvent(e) {
    
    e.preventDefault();
    const updatedBook = {
        title: e.target.title.value,
        author: e.target.author.value,
        pagesRead: e.target.pagesRead.value,
        totalPages: e.target.totalPages.value
    };

    Storage.updateBook(updatedBook);
    UI.displayBooks();
    toggle('cancel'); // Close the form
}

class Storage {
    static LOCAL_STORAGE_KEY = "books-entries";

    static getBooks() {
        return JSON.parse(localStorage.getItem(Storage.LOCAL_STORAGE_KEY)) || [];
    }

    static addBook(book) {
        let p1 = parseInt(book.pagesRead);
        let p2 = parseInt(book.totalPages);
        if( p1 > p2 ) {
            console.error("Pages Read is greater than total pages");
            return;
        }
        const books = Storage.getBooks();
        books.push(book);
        localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
    }

    static updateBook(updatedBook) {
        let p1 = parseInt(updatedBook.pagesRead);
        let p2 = parseInt(updatedBook.totalPages);
        if( p1 > p2 ) {
            console.error("Pages Read is greater than total pages");
            return;
        }
        let books = Storage.getBooks();
        books = books.map((book) =>
            book.title === updatedBook.title ? updatedBook : book
        );
        localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
    }

    static removeBook(bookTitle) {
        let books = Storage.getBooks();
        books = books.filter(book => book.title !== bookTitle);
        localStorage.setItem(Storage.LOCAL_STORAGE_KEY, JSON.stringify(books));
        UI.displayBooks();
    }
}

class UI {
    static displayBooks(books = []) {
        const main = document.querySelector("main");
        main.innerHTML = ``;
        if (books.length === 0) books = Storage.getBooks();

        if (books.length === 0) {
            main.innerHTML = `<div id="empty" class="book-card"><h2>Mark a book now!</h2><p>Click "Add Bookmark" to add a new book</p></div>`;
        } else {
            books.forEach((book) => UI.displayBookMark(book));
        }
    }

    static displayBookMark(book) {
        const main = document.querySelector("main");
        const bookMark = document.createElement("div");
        bookMark.classList.add("book-card");

        book.status = book.pagesRead === book.totalPages ? "Completed" : "Reading";

        bookMark.innerHTML = `
        <div class="description">
            <h2>${book.title}</h2>
            <h3>by ${book.author}</h3>
            <p>Pages: ${book.pagesRead}/${book.totalPages}</p>
        </div>
        <div class="action-btns">
            <button class="edit" onclick="toggle('edit', '${book.title}', '${book.author}', '${book.pagesRead}', '${book.totalPages}')">Edit</button>
            <button class="delete" onclick="Storage.removeBook('${book.title}')">Delete</button>
        </div>
        <div class="status">${book.status}</div>`;

        main.appendChild(bookMark);
    }
}

// Initial load
UI.displayBooks();