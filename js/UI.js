class UI {
    // Show all the drink categories
    showCategories() {
        const categories = cocktailAPI.getDrinkCategories()
            .then(data => {
                const catList = data.categories.drinks;

                // Append the first option without a value
                const firstOption = document.createElement('option');
                firstOption.textContent = '- Select -';
                document.querySelector('#search').appendChild(firstOption);

                // Append into <select>
                catList.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('_');
                    document.querySelector('#search').appendChild(option);
                });
            });
    }


    // Display drink without ingredients
    displayDrinks(drinks) {
        // Show results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert results into wrapper
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            resultsDiv.innerHTML += `
                <div class="col-lg-4 col-md-6">
                    <div class="card my-3">
                        <button data-toggle="tooltip" title="Add to Favorites" type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info">&starf;</button>

                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#drink" class="btn btn-success get-drink" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Drink</a>
                        </div>
                    </div>
                </div>
            `;
        })
    }


    // Display drinks with ingredients
    displayDrinksWithIngredients(drinks) {
        // Show results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        // Insert results into wrapper
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink => {
            // console.log(drink);
            resultsDiv.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button data-toggle="tooltip" title="Add to Favorites" type="button" data-id="${drink.idDrink}" class="favorite-btn btn btn-outline-info"> &starf;</button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}"/>

                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions: </p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li style="background-color: #d9534f; color: #fff" class="list-group-item">Ingredients</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information: </p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                    ${drink.strAlcoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        })
    }

    // Display ingredients and measurements
    displayIngredients(drink) {
        // console.log(drink);

        let ingredients = [];
        for(let i = 1 ; i < 16; i++) {
            const ingredientMeasure = {};
            if( drink[`strIngredient${i}`] !== '' && drink[`strIngredient${i}`] !== null ) {
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }

        // console.log('ingredients',ingredients);

        // Build template
        let ingredientsTemplate = '';
        ingredients.forEach(ing => {
            ingredientsTemplate += `
                <li class="list-group-item">${ing.ingredient} - ${ing.measure}</li>
            `;
        });
        // console.log('ingredients',ingredients);
        return ingredientsTemplate;
    }


    // Display single drink 
    displaySingleDrink(drink) {
        const modalTitle = document.querySelector('.modal-title');
        const modalDescription = document.querySelector('.modal-body .description-text');
        const modalIngredients = document.querySelector('.list-group');

        console.log(drink);

        // Set the values
        modalTitle.innerHTML = drink.strDrink;
        modalDescription.innerHTML = drink.strInstructions;

        // Display ingredients
        modalIngredients.innerHTML =  this.displayIngredients(drink);
    }

    // Display message to user
    displayMessage(message, className){
        const div = document.createElement('div');

        // Add the HTML
        div.innerHTML = `
            <div class="alert alert-dismissible alert-${className} fade show">
                <button type="button" class="close" data-dismiss="alert">&times;</button>
                ${message}
            </div>
        `;

        // Insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);

        // Remove message after 3 seconds
        setTimeout(() => {
            div.remove();
        }, 3000);
    }


    // Displays favorite drinks from localStorage
    displayFavorites(favoriteDrinks) {
        const favoritesTable = document.querySelector('#favorites tbody');

        favoriteDrinks.forEach(drink => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <img src="${drink.image}" alt="${drink.name}" width=100/>
                </td>
                <td>${drink.name}</td>
                <td>
                    <a 
                        href="#" 
                        data-toggle="modal" 
                        data-target="#drink"
                        data-id="${drink.id}"
                        class="btn btn-success get-drink">View</a>
                </td>
                <td>
                    <button data-id="${drink.id}" class="btn btn-danger remove-drink">Remove</button>
                </td>
            `;

            favoritesTable.appendChild(tr);
        })
    }

    // Clear previous results
    clearResults() {
        const resultsDiv = document.querySelector('#results').innerHTML = '';
    }
}