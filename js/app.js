// Instantiate all classes
const ui = new UI();


// Create event listeners
function eventListeners() {
    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }
}

eventListeners();

// Get Cocktails
function getCocktails(e) {
    e.preventDefault();

    const searchTerm = document.querySelector('#search').value;

    // Check if searchTerm is not empty
    if(searchTerm.trim() !== '') {
        console.log('query rest api');
    } else {
        // Display message to user
        ui.displayMessage('Please add something into the form', 'danger');
    }
    
}