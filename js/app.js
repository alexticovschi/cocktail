// Instantiate all classes
const ui = new UI();
const cocktailDB = new CocktailAPI();

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
        // Server response from promise
        let serverResponse;

        // Type of search (ingredients, cocktails, or name)
        const type = document.querySelector('#type').value;

        // Evaluate the type of method and then execute the query
        switch(type) {
            case 'name': 
                serverResponse = cocktailDB.getDrinksByName(searchTerm);
                break;
                
        }

        // Query by the name of the drink
        serverResponse.then(cocktails => {
                if(cocktails.cocktails.drinks === null) {
                    ui.displayMessage('No drinks found!', 'danger');
                } else {
                    ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                }
            });
    } else {
        // Display message to user
        ui.displayMessage('Please add something into the form', 'danger');
    }
    
}