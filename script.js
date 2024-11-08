const apiKey = '43a3e7d0888d42cbaf4625e5c53a942d';
const searchBtn = document.getElementById('searchBtn');
const recipeList = document.getElementById('recipeList');

searchBtn.addEventListener('click', () => {
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

async function fetchRecipes(ingredients) {
    recipeList.innerHTML = ''; // Clear previous results
    if (!ingredients) {
        recipeList.innerHTML = '<p>Please enter ingredients!</p>';
        return;
    }
    
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`);
    
    if (response.ok) {
        const recipes = await response.json();
        displayRecipes(recipes);
    } else {
        recipeList.innerHTML = '<p>Error fetching recipes. Please try again.</p>';
    }
}

function displayRecipes(recipes) {
    if (recipes.length === 0) {
        recipeList.innerHTML = '<p>No recipes found.</p>';
        return;
    }
    
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        
        recipeDiv.innerHTML = `
            <h3>${recipe.title}</h3>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p>Used Ingredients: ${recipe.usedIngredientCount}</p>
            <p>Missing Ingredients: ${recipe.missingIngredientCount}</p>
            <a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">View Recipe</a>
        `;
        
        recipeList.appendChild(recipeDiv);
    });
}
