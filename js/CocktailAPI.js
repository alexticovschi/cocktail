class CocktailAPI {

    // Get drink by name
    async getDrinksByName(name) {
        // Make a GET request and wait for it to finish
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);

        // Wait for the response and return as JSON
        const cocktails = await apiResponse.json();

        // Return the object
        return { cocktails };
    }
}