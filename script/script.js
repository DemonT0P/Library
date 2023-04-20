let myLibrary = [];

function Book(title, author, pages, haveRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.haveRead = haveRead;
}

document.querySelector(".form__wrapper").addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector("#form__title").value;
  let author = document.querySelector("#form__author").value;
  let pages = document.querySelector("#form__pages").value;
  let haveRead = document.querySelector("#form__haveRead");
  let book = new Book(title, author, pages, haveRead);
  AddBook(book);

  document.querySelector(".app").style.filter = "none";
  document.querySelector(".app").style.pointerEvents = "auto";
  document.querySelector(".form").style.display = "none";
});

document.querySelector(".header__add-button").addEventListener("click", () => {
  document.querySelector(".app").style.filter = "blur(10px)";
  document.querySelector(".app").style.pointerEvents = "none";
  document.querySelector(".form").style.display = "flex";
});

document.querySelector(".form__cancel-button").addEventListener("click", () => {
  document.querySelector(".app").style.filter = "none";
  document.querySelector(".app").style.pointerEvents = "auto";
  document.querySelector(".form").style.display = "none";
});

function addBooktoGrid(book) {
  let divBook = document.createElement("div");
  divBook.innerHTML = `
    <p class="book__title">${book.title}</p>
    <p class="book__info">${book.author} - ${book.pages} pages</p>
    <div class="book__buttons">
      <span class="book__haveRead-text">Finished</span>
      <input class="book__haveRead" type="checkbox" />
      <button class="book__remove-button">Remove</button>
    </div>
  `;
  if (book.haveRead) {
    divBook.querySelector(".book__haveRead").checked = true;
  } else {
    divBook.querySelector(".book__haveRead").checked = false;
  }
  divBook.className = "books__book";
  document.querySelector(".app__books").appendChild(divBook);
}

function AddBook(book) {
  myLibrary.push(book);
  addBooktoGrid(book);
}

const b1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const b2 = new Book("Nineteen Eghty-Four", "George Orwell", 328, true);

AddBook(b1);
AddBook(b2);

/*
  document.querySelectorAll(".book__haveRead").forEach((check) => {
    check.addEventListener("click", () => {
      if(document.querySelector)
    });
  });
*/
