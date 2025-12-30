const myLibrary = [];

function Book(name,author, pages, read) {
  this.id = crypto.randomUUID();
  this.name=name;
  this.author=author;
  this.pages=pages;
  this.read=read;
}

function addBookToLibrary(name,author, pages, read) {
  var book = new Book(name,author, pages, read);
  myLibrary.push(book);
}

addBookToLibrary("Lord of Rings", "J.R.R. Tolkien", 1900, true)
addBookToLibrary("Prisioner of Askaban", "Rowlings", 1200, false)

let newButton = document.getElementById("new-button");
let container=document.getElementById("container");
let dialogModal= document.getElementById("dialog-new");

function fillCards() {
    container.replaceChildren();
    for (let book of myLibrary) {
        let card = document.createElement("div");
        card.classList.add("card");
        let bookTitle = document.createElement("h2");
        bookTitle.textContent = book.name;
        let bookAuthor = document.createElement("p");
        bookAuthor.textContent = book.author;
        let bookPages = document.createElement("p");
        bookPages.textContent = book.pages;
        let bookReadStatus = document.createElement("p");
        bookReadStatus.textContent = book.read ? "Read" : "Unread...";
        let delButton = document.createElement("button");
        delButton.textContent="Delete";
        delButton.setAttribute("bookId", book.id);
        delButton.addEventListener("click", deleteBook);
        card.appendChild(bookTitle);
        card.appendChild(bookAuthor);
        card.appendChild(bookPages);
        card.appendChild(bookReadStatus);
        card.appendChild(delButton);
        container.appendChild(card);
    }
}


function newBook(){
     dialogModal.showModal();
     console.log("New book pressed.");
}

function deleteBook(e){
    let bookId = e.target.getAttribute("bookId");
    let index = myLibrary.findIndex((item)=>item.id==bookId);
    myLibrary.splice(index,1);
    fillCards();
}
function saveBook(e){
    e.preventDefault();
    dialogModal.close();
    let name = document.getElementById("name-input").value;
    let author = document.getElementById("author-input").value;
    let pages = document.getElementById("pages-input").value;
    let read = document.getElementById("read-input").checked?true:false;
    addBookToLibrary(name,author,pages,read);
    console.log(myLibrary);    
    fillCards();
    
}

newButton.addEventListener("click", newBook);
document.getElementById("save").addEventListener("click",saveBook);



fillCards();
