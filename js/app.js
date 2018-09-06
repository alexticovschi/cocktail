// Instantiate all classes
const ui = new UI();
const cocktailDB = new CocktailAPI();

// Create event listeners
function eventListeners() {
    // Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);

    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    // resultsDiv listener
    const resultsDiv = document.querySelector('#results');
    if(resultsDiv) {
        resultsDiv.addEventListener('click', resultsDelegation);
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
            case 'ingredient':
                serverResponse = cocktailDB.getDrinksByIngredient(searchTerm);
                
        }

        // Clear previous results
        ui.clearResults();

        // Query by the name of the drink
        serverResponse.then(cocktails => {
                if(cocktails.cocktails.drinks === null) {
                    ui.displayMessage('No drinks found!', 'danger');
                } else {
                    if(type === 'name') {
                        // Display with ingredients
                        ui.displayDrinksWithIngredients(cocktails.cocktails.drinks);
                    } else {
                        // Display without ingredients (category, alcohol, ingredient)
                        ui.displayDrinks(cocktails.cocktails.drinks);
                    }
                }
            });
    } else {
        // Display message to user
        ui.displayMessage('Please add something into the form', 'danger');
    }
    
}

// Delegation for the results area
function resultsDelegation(e) {
    e.preventDefault();

    if(e.target.classList.contains('get-drink')) {
        // console.log(e.target.getAttribute('data-id'))
        cocktailDB.getSingleDrink(e.target.dataset.id)
            .then(data => {
                // console.log(data.cocktail.drinks)
                // Displays single drink into modal
                ui.displaySingleDrink(data.cocktail.drinks[0]);
            });
    }
}

// Document Ready
function documentReady() {
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.showCategories();
    }
}