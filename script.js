
document.addEventListener('DOMContentLoaded', function () {
console.log('Domcontenloaded works');

    const input = document.getElementById("getBook");
    const bookBtn = document.getElementById("getBookBtn");
    const bookDisplay = document.getElementById("bookDisplay");

    // Modal things
    const showBtn = document.getElementById("newBook");
    const modal = document.getElementById("modal");
    const title = document.getElementById("title");
    const author = document.getElementById("author");
    const pages = document.getElementById("pages");
    const readCheckbox = document.getElementById('readCheckbox');
    const submitBtn = document.getElementById("submitModal");

    const myLibrary = [];

    // Constructor
    class Book{
        constructor(title, author, pages, read){
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        } 
  
        info() {
            return `${this.title} by ${this.author}, ${this.pages}pages, ${this.read}`;
        }
    }


    function removeBtnSvg(){
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
        
        const div = document.createElement('div');
        div.innerHTML = svgString;

        return div.firstChild;
    }

    function resetModalFields(){
        title.value = '';
        author.value = '';
        pages.value = '';
        readCheckbox.checked = false;
    }

    // New functions
    showBtn.addEventListener('click', () => {
        modal.showModal();
        resetModalFields();
    })

    function addBookToLibrary(){
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const newBook = new Book(title.value, author.value, pages.value, readCheckbox.checked);
            myLibrary.push(newBook);
    
            console.log(newBook.info());
            console.log(myLibrary);
    
            modal.close();
            displayBooks();
        })
    }
   

    function displayBooks(){
        bookDisplay.innerHTML = '';

        myLibrary.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            
            const titleElement = document.createElement('div');
            titleElement.classList.add('book-property');
            titleElement.classList.add('bookTitle');
            titleElement.textContent = `${book.title}`;

            const authorElement = document.createElement('div');
            authorElement.classList.add('book-property');
            authorElement.textContent = `By: ${book.author}`;

            const pagesElement = document.createElement('div');
            pagesElement.classList.add('book-property');
            pagesElement.textContent = `Pages: ${book.pages}`;

            const readElement = document.createElement('div');
            readElement.classList.add('book-property');
            readElement.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

            bookCard.appendChild(titleElement);
            bookCard.appendChild(authorElement);
            bookCard.appendChild(pagesElement);
            bookCard.appendChild(readElement);

            bookCard.classList.add(book.read ? 'readStatus' : 'notReadStatus');

            const removeBtn = document.createElement('button');
            removeBtn.classList.add('removeBtn');
            removeBtn.appendChild(removeBtnSvg());
            removeBtn.setAttribute("data-index", index);
            removeBtn.addEventListener('click', function() {
                const removeIndex = this.getAttribute("data-index");
                myLibrary.splice(removeIndex, 1);
                displayBooks();
            });

            const toggleRead = document.createElement('button');
            toggleRead.classList.add('toggleRead');
            toggleRead.textContent = book.read ? "Mark as Unread" : "Mark as Read";
            toggleRead.setAttribute("data-index", index);
            toggleRead.addEventListener('click', function() {
                const bookIndex = this.getAttribute("data-index");
                const selectedBook = myLibrary[bookIndex];
               
                selectedBook.read = !selectedBook.read;
              

                toggleRead.textContent = selectedBook.read ? "Mark as Unread" : "Mark as Read";
                bookCard.classList.toggle('readStatus', selectedBook.read);
                bookCard.classList.toggle('notReadStatus', !selectedBook.read);

                displayBooks();
            })

            bookDisplay.appendChild(bookCard);
            bookCard.appendChild(removeBtn);
            bookCard.appendChild(toggleRead);
        })
    }

    addBookToLibrary();
})

