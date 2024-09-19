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