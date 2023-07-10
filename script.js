let main = document.getElementById('main');
let reciperesults = document.getElementById('recipe-results');
let recipes = document.getElementById('recipes');

async function getrecipes(val) {
    fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${val}`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        main.style.display = 'none';
        reciperesults.style.display = 'block';
        
        document.getElementById('recipe-results--title').textContent = 'Recipes for ' + val;

        for (let i = 0; i < data.hits.length; i++) {
            let div = document.createElement('div');
            div.classList.add('reciperesult');

            let img = document.createElement('img');
            img.src = data.hits[i].recipe.image;
            div.append(img);

            let divright = document.createElement('div');

            let recipename = document.createElement('div');
            recipename.textContent = data.hits[i].recipe.label;
            divright.append(recipename);

            let ingredients = document.createElement('div');
            ingredients.textContent = 'Ingredients';
            divright.append(ingredients);

            let ingredientsarray = [];
            let recipeingredients = document.createElement('div');
            for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
                ingredientsarray.push(data.hits[i].recipe.ingredients[j].text)
            }
            recipeingredients.textContent = ingredientsarray.join(", ");
            divright.append(recipeingredients);

            div.append(divright);

            recipes.append(div);
        }
    })
    .catch(err => console.log(err))
}

let recipeinput = document.getElementById('recipeinput');
recipeinput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getrecipes(recipeinput.value)
    }
})