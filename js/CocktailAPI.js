class CocktailAPI {

    // Get drinks by name
    async getDrinksByName(name) {
        // Make a GET request and wait for it to finish
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        // Wait for the response and return as JSON
        const cocktails = await apiResponse.json();

        // Return the object
        return { cocktails };
    }


    // Get drinks by ingredient
    async getDrinksByIngredient(ingredient) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const cocktails = await apiResponse.json();

        return { cocktails }; 
    }

    // Get single drink 
    async getSingleDrink(id) {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const cocktail = await apiResponse.json();

        return { cocktail }; 
    }

    // Get all categories
    async getDrinkCategories() {
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        const categories = await apiResponse.json();

        return { categories };
    }

    // Get drinks by category
    async getDrinksByCategory(category) {
        // Search by category
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const cocktails = await apiResponse.json();

        return { cocktails }; 
    }

    // Get alcoholic or non-alcoholic drinks
    async getAlcoholicDrinks(term) {
        // Search by alcoholic or non-alcoholic drinks
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${term}`);

        const cocktails = await apiResponse.json();

        return { cocktails }; 
    }
}