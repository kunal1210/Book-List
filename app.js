
// Book Constructor

function Book(title,author,isbn){
this.title=title;
this.author=author;
this.isbn=isbn;

}

// UI Constructor


function UI(){}


UI.prototype.addBookToList=function(book){

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

UI.prototype.clearField = function(){


document.getElementById('title').value ="";
document.getElementById('author').value="";
document.getElementById('isbn').value="";

}

UI.prototype.showAlert= function(message,className){




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

// delete book
UI.prototype.deleteBook =function(traget){

if(traget.className==="delete"){

traget.parentElement.parentElement.remove();
}


}


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
}

e.preventDefault();
});



