// Instantiate all classes
const ui = new UI();
const cocktailAPI = new CocktailAPI();
const cocktailDB = new CocktailDB();

// Create event listeners
function eventListeners() {
    // Document Ready
    document.addEventListener('DOMContentLoaded', documentReady);

    // Add event listener when form is submitted
    const searchForm = document.querySelector('#search-form');
    if(searchForm) {
        searchForm.addEventListener('submit', getCocktails);
    }

    //  resultsDiv listener
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
                serverResponse = cocktailAPI.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cocktailAPI.getDrinksByIngredient(searchTerm);
                break;
            case 'category':
                serverResponse = cocktailAPI.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cocktailAPI.getAlcoholicDrinks(searchTerm);
                break;
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
        cocktailAPI.getSingleDrink(e.target.dataset.id)
            .then(data => {
                // console.log(data.cocktail.drinks)
                // Displays single drink into modal
                ui.displaySingleDrink(data.cocktail.drinks[0]);
            });
    }

    if(e.target.classList.contains('favorite-btn')) {
        // console.log(e.target.dataset.id);

        if(e.target.classList.contains('is-favorite')) {
            // remove the class
            e.target.classList.remove('is-favorite');

            // Remove element from localStorage
            cocktailDB.removeFromLocalStorage(e.target.dataset.id);
        } else {
            // add the class
            e.target.classList.add('is-favorite');

            // console.log(e.target.parentElement);
            // Get card info
            const cardBody = e.target.parentElement;
 
            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }

            // console.log(drinkInfo);

            // Store favorite drink in localStorage
            cocktailDB.saveDrinksToLocalStorage(drinkInfo);
        }
    }
}

// Document Ready
function documentReady() {
    // Display onload favorites from localStorage
    ui.isFavorite();

    const searchCategory = document.querySelector('.search-category');
    if(searchCategory) {
        ui.showCategories();
    }

    // Favorites page
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable) {
        const drinks = cocktailDB.getDrinksFromLocalStorage();
        ui.displayFavorites(drinks);

        // Adding event delegation when View or Remove buttons are clicked 
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            // Open modal when View button is clicked
            if(e.target.classList.contains('get-drink')) {
                cocktailAPI.getSingleDrink(e.target.dataset.id)
                    .then(data => {
                        // Displays single drink into modal
                        ui.displaySingleDrink(data.cocktail.drinks[0]);
                    });
            }

            if(e.target.classList.contains('remove-drink')) {
                // Delete element from DOM
                ui.removeDrink(e.target.parentElement.parentElement);

                // Remove from the localStorage
                cocktailDB.removeFromLocalStorage(e.target.dataset.id);
            }
        })
    }
}