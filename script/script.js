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
  let author;
  if (document.querySelector("#form__author").value == "") {
    author = "Unknown";
  } else {
    author = document.querySelector("#form__author").value;
  }
  let pages = document.querySelector("#form__pages").value;
  let haveRead = document.querySelector("#form__haveRead").checked;
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

function addBooktoGrid(book, index) {
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

  divBook.classList.add("books__book");
  divBook.dataset.index = index - 1;

  if (book.haveRead) {
    divBook.querySelector(".book__haveRead").checked = true;
  } else {
    divBook.querySelector(".book__haveRead").checked = false;
    divBook.classList.add("books__book--read");
  }

  document.querySelector(".app__books").appendChild(divBook);

  //Added a way to remove books

  let counter = 0;
  divBook
    .querySelector(".book__remove-button")
    .addEventListener("click", () => {
      let index = divBook.dataset.index;
      delete myLibrary[index];
      divBook.remove();
      myLibrary = myLibrary.filter((n) => n);

      //Set a new index on element everytime it changes position

      document.querySelectorAll(".books__book").forEach((book) => {
        book.dataset.index = counter;
        counter++;
      });
    });

  divBook.querySelector(".book__haveRead").addEventListener("click", (e) => {
    let checkbox = e.target;
    let book = checkbox.parentElement.parentElement;
    book.classList.toggle("books__book--read");
    if (checkbox.checked) {
      myLibrary[book.dataset.index].haveRead = 1;
    } else {
      myLibrary[book.dataset.index].haveRead = 0;
    }
  });
}

function AddBook(book) {
  myLibrary.push(book);
  addBooktoGrid(book, myLibrary.length);
}

const b1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const b2 = new Book("Nineteen Eghty-Four", "George Orwell", 328, true);

AddBook(b1);
AddBook(b2);
