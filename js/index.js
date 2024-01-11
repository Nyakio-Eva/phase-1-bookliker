document.addEventListener("DOMContentLoaded", function() {
    getBooks()
});
    function getBooks(){
        return fetch('http://localhost:3000/books')
        .then(resp => resp.json())
        .then(books => {
            displayBooks(books);
        })
        .catch((error) => console.log(error.message));
    }
    //create elements for display
    function displayBooks(books){
        const ul = document.getElementById('list')
        for(let i=0; i< books.length; i++){   //books.length to iterate over the array
            const book = books[i]; //to access each book in the array
            const li = document.createElement('li');
            li.textContent = book.title; //to access the title of each book
            ul.appendChild(li); //to append the li in the existing ul

            //add event listener click on the li element
            li.addEventListener('click',function(){ 
               showDetails(book) //function to display each book's detail, pass book as argument to show details of the specific book
            })
        }
        
        function showDetails(book){
            //create elements for the details of each book
          const img = document.createElement('img');
          img.src = book.img_url;
          const author = document.createElement('h4');
          author.textContent = book.author;
          const subtitle = document.createElement('h5');
          subtitle.textContent = book.subtitle;
          const description = document.createElement('p');
          description.textContent = book.description;
          //list of users
          const users = book.users; //declare variable for users in each book
          const ul = document.createElement('ul'); //create an unordered list for users
          for(let i=0; i< users.length; i++){ //users.length to iterate over the array
            const user = users[i]; //access each user in the array
            const li = document.createElement('li'); //create a list for users
            li.textContent = user.username; //name of each user
            ul.appendChild(li); //append each li to the ul element
          }
          //append elements to the existing div node
          const displayPanel = document.querySelector('div#show-panel'); //store the div in a variable
          displayPanel.innerHTML = ''; // to reset the contents of display before appending new elements
          //append the elements to the div
          displayPanel.appendChild(img);
          displayPanel.appendChild(author);
          displayPanel.appendChild(subtitle);
          displayPanel.appendChild(description);
          displayPanel.appendChild(ul);

          //add a like button
          const btn = document.createElement('button');
          btn.textContent = 'Like';
          btn.addEventListener('click', function(){
            userlike(book); //function for likes that takes book as an argument
          })
          displayPanel.appendChild(btn);  //append button to the display div

        }
        function userlike(book){
            //add the current user to the list of users who liked the book
            const newUser ={"id":1, "username":"Eva"}
            book.users.push(newUser)
            
            updateLikes(book);

        }
        //function to update user list based on likes for a book using PATCH
        function updateLikes(book){
            return fetch(`http://localhost:3000/books/${book.id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'

                },
                body: JSON.stringify(book)
            })
            .then(resp => resp.json())
            .then(newUser => {
                console.log('updatedlikes:', newUser)   ;
            })
            .catch(error => {
                alert('error!you know nothing Jon Snow!');
                console.log(error.message);
            });
        }
        //function to remove user from list if they click the like button twice using patch
        

    }
