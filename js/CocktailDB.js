class CocktailDB {

    // Store drinks in localStorage
    saveDrinksToLocalStorage(drink) {
        const drinks = this.getDrinksFromLocalStorage();

        drinks.push(drink);

        // Add array to local storage
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // Remove element from localStorage
    removeFromLocalStorage(id) {
        const drinks = this.getDrinksFromLocalStorage();

        // Lopp through drinks array
        // If the drink id from the DOM is equal to drink.id from localStorage, remove that element
        drinks.forEach((drink, index) => {
            if(id === drink.id) {
                drinks.splice(index, 1);
            }
        });

        // Add new/modified array to localStorage
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