

class Book{

constructor(title,author,isbn){
this.title=title;
this.author=author;
this.isbn=isbn;


}
}

class UI{


addBookToList(book){

const list = document.getElementById('book-list');
// create tr element 
const row =document.createElement('tr');

// insert cols
row.innerHTML=`
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>
`;

list.appendChild(row);

}
showAlert(message,className){

// create div
const div = document.createElement('div');
// add class

div.className=`alert ${className}`;

//add text

div.appendChild(document.createTextNode(message));

// get parent
const container =document.querySelector('.container');

//get form

const form =document.querySelector('#book-form');

//insert alert
container.insertBefore(div,form);

// remove after 3 second

setTimeout(function(){
document.querySelector('.alert').remove();
},3000);



}
deleteBook(target){

if(target.className==="delete"){

target.parentElement.parentElement.remove();
}


}

clearField(){

document.getElementById('title').value ="";
document.getElementById('author').value="";
document.getElementById('isbn').value="";
}


}

// Local store class

class Store{

static getBooks(){

let books;
if(localStorage.getItem('books') === null){
books=[];
}
else{

books=JSON.parse(localStorage.getItem('books'));
}

return books; 

}
static displayBooks(){

const books=Store.getBooks();
books.forEach(function(book){
    const ui = new UI;
    ui.addBookToList(book);


});

}

static addBook(book){
const books=Store.getBooks();
books.push(book);
localStorage.setItem('books',JSON.stringify(books));
}

static removeBook(isbn){
const books=Store.getBooks();

books.forEach(function(book ,index){

    if(book.isbn === isbn){
  books.splice(index,1);

    }

});

localStorage.setItem('books',JSON.stringify(books));

}  
}



// DOM load event 

document.addEventListener('DOMContentLoaded',Store.displayBooks);


// Event Listners 

document.getElementById('book-form').addEventListener('submit',function(e){

// get form values

const title= document.getElementById('title').value,
author=document.getElementById('author').value,
isbn=document.getElementById('isbn').value;

// instantiate book


const  book = new Book(title,author,isbn);

// instantiate UI
const ui = new UI();


// validate

if(title==="" || author=== "" || isbn===""){
ui.showAlert('please fill in all fields','error');


}
else{


ui.addBookToList(book);

// add to loacal storage

Store.addBook(book);


//book added
ui.showAlert('book added','success');
// clear field 
ui.clearField();
}

e.preventDefault();

});



// Event Listner  For delete

document.getElementById('book-list').addEventListener('click',function(e){

const ui = new UI();


if(e.target.className==="delete"){
ui.showAlert('book is removed!','success');
ui.deleteBook(e.target);
Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

}

e.preventDefault();
});



