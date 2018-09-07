class CocktailDB {

    // Store drinks in localStorage
    saveDrinksToLocalStorage(drink) {
        const drinks = this.getDrinksFromLocalStorage();

        drinks.push(drink);

        // Add array to local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // Retrieve drinks from localStorage
    getDrinksFromLocalStorage() {
        let drinks;

        // Check if localStorage is empty
        if(localStorage.getItem('drinks') === null) {
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }

        return drinks;
    }

}