// This is ES6 version of our Magic Library webpage

// show Books on loading the web page 
showItems();

// Class that is used to create Book objects
class book{
    constructor(name, author, type){
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

// Class that is used to display books
class display{
    // Add Functions to display class
    // 1. Adding function "add" to the display that adds new books
    add(sampleBook){
        // Extracting books from localStorage in string
        let bookName = localStorage.getItem('storageName');
        let bookAuthor = localStorage.getItem('storageAuthor');
        let bookType = localStorage.getItem('storageType');
    
        // Parsing the string to array
        if (bookName == null) {
            bookNameArr = [];
        }
        else {
            bookNameArr = JSON.parse(bookName);
        }
    
        if (bookAuthor == null) {
            bookAuthorArr = [];
        }
        else {
            bookAuthorArr = JSON.parse(bookAuthor);
        }
    
        if (bookType == null) {
            bookTypeArr = [];
        }
        else {
            bookTypeArr = JSON.parse(bookType);
        }
    
        // Push the new book to array
        bookNameArr.push(sampleBook.name);
        bookAuthorArr.push(sampleBook.author);
        bookTypeArr.push(sampleBook.type);
    
        // Set Books to localStorage by stringifying the array
        localStorage.setItem('storageName', JSON.stringify(bookNameArr));
        localStorage.setItem('storageAuthor', JSON.stringify(bookAuthorArr));
        localStorage.setItem('storageType', JSON.stringify(bookTypeArr));
    
        // Show all Books
        showItems();
    }

    // 2. Adding Function "clear" to the display that clear the form inputs
    clear(){
        let libraryForm = document.getElementById("libraryForm");
        libraryForm.reset();
    }

    // 3. Adding Function "validate" to the display that validate the new book that is going to be added
    validate(sampleBook){
        if(sampleBook.name.length < 3 || sampleBook.author.length < 3){
            return false;
        }
        else{
            return true;
        }
    }

    // 4. Adding Function "show" to the display that show the alert of Error/Success
    show(result){
        let resultHTML;
        if(result === 'success'){
            resultHTML = `
                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi check-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Success:">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                            </svg>
                            <strong>Congratulations!</strong> You have successfully added the book.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        }
        else if(result === 'error'){
            resultHTML = `
                        <div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <strong>Error!</strong> You can't add this book.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;
        }
        let messageAlert = document.getElementById('message');
        messageAlert.innerHTML = resultHTML;
    
        // Adding setTimeOut that will destroy the alert after 2 sec
        setTimeout(function() {
            messageAlert.innerHTML = '';
        }, 2000);
    
    }
}

// Function that shows all the books in localStorage
function showItems(){
    // Extracting Books from localStorage
    let bookName = localStorage.getItem('storageName');
    let bookAuthor = localStorage.getItem('storageAuthor');
    let bookType = localStorage.getItem('storageType');

    // Parsing the string of books to array
    if (bookName == null) {
        bookNameArr = [];
    }
    else {
        bookNameArr = JSON.parse(bookName);
    }

    if (bookAuthor == null) {
        bookAuthorArr = [];
    }
    else {
        bookAuthorArr = JSON.parse(bookAuthor);
    }

    if (bookType == null) {
        bookTypeArr = [];
    }
    else {
        bookTypeArr = JSON.parse(bookType);
    }

    // Showing books on webpage
    let uiString = '';
    for(let i=0 ; i<bookNameArr.length ; i++){
        let tableBody = document.getElementById("tableBody");
        uiString += `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${bookNameArr[i]}</td>
                        <td>${bookAuthorArr[i]}</td>
                        <td>${bookTypeArr[i]}</td>
                        <td><button onclick="deleteBook(this.id)" class="btn btn-danger" id="${i}">Delete</button></td>
                    </tr>
        `;
    }
    tableBody.innerHTML = uiString;
}

// Function that deletes particular book when its Delete button is pressed
function deleteBook(index){
    //Extracting Books from localStorage
    let bookName = localStorage.getItem('storageName');
    let bookAuthor = localStorage.getItem('storageAuthor');
    let bookType = localStorage.getItem('storageType');

    // Parsing the string of books into array
    if (bookName == null) {
        bookNameArr = [];
    }
    else {
        bookNameArr = JSON.parse(bookName);
    }

    if (bookAuthor == null) {
        bookAuthorArr = [];
    }
    else {
        bookAuthorArr = JSON.parse(bookAuthor);
    }

    if (bookType == null) {
        bookTypeArr = [];
    }
    else {
        bookTypeArr = JSON.parse(bookType);
    }

    // deleting particular book from array
    bookNameArr.splice(index, 1);
    bookAuthorArr.splice(index, 1);
    bookTypeArr.splice(index, 1);

    // Adding rest of the books in localStorage
    localStorage.setItem('storageName', JSON.stringify(bookNameArr));
    localStorage.setItem('storageAuthor', JSON.stringify(bookAuthorArr));
    localStorage.setItem('storageType', JSON.stringify(bookTypeArr));

    // Show books
    showItems();
}

// Add submit eventListener to the libraryForm
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e){
    // Preventing the default behaviour of reloading the page when clicked on submit button
    e.preventDefault();

    // Getting book properties from form after submission
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    // getting type property of book
    let fiction = document.getElementById("fictionRadio");
    let computer = document.getElementById("computerRadio");
    let history = document.getElementById("historyRadio");
    let type;
    if(fiction.checked){
        type = fiction.value;
    }
    else if(computer.checked){
        type = computer.value;
    }
    else if(history.checked){
        type = history.value;
    }

    // Defining new book object from the data taken using book Constructor
    let sampleBook = new book(name, author, type);
    
    // Defining new display object to display the books
    let displayForm = new display();

    // Calling display.validate() to validating the book taken
    if(displayForm.validate(sampleBook)){
        displayForm.add(sampleBook);
        displayForm.clear();
        displayForm.show('success');
    }
    else{
        displayForm.show('error');
    }
}