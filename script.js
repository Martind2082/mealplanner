let main = document.getElementById('main');
let reciperesults = document.getElementById('recipe-results');
let recipes = document.getElementById('recipes');

async function getrecipes(val) {
    fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${val}`)
    .then(res => res.json())
    .then(data => {
        if (data.hits.length === 0) {
            document.getElementById('popup').style.display = 'flex';
            setTimeout(() => {
                document.getElementById('popup').style.display = 'none';
            }, 2000);
            return;
        }
        main.style.display = 'none';
        reciperesults.style.display = 'block';
        recipes.innerText = '';
        
        if (data.hits.length === 1) {
            document.getElementById('recipe-results--title').textContent = '1 Recipe for ' + val;
        } else {
            document.getElementById('recipe-results--title').textContent = data.hits.length + ' Recipes for ' + val;
        }

        for (let i = 0; i < data.hits.length; i++) {
            let div = document.createElement('div');
            div.classList.add('reciperesult');

            let img = document.createElement('img');
            img.src = data.hits[i].recipe.image;
            img.style.width = '200px';
            img.style.height = '200px';
            img.style.margin = '1rem 1rem';
            div.append(img);

            let divright = document.createElement('div');
            divright.style.margin = '1rem 1rem';

            let recipename = document.createElement('div');
            recipename.style.fontWeight = 'bold';
            recipename.textContent = data.hits[i].recipe.label;
            divright.append(recipename);

            let mealtype = document.createElement('div');
            mealtype.textContent = 'For ' + data.hits[i].recipe.mealType.join("");
            divright.append(mealtype);

            let cuisinetype = document.createElement('div');
            let arr = data.hits[i].recipe.cuisineType;
            let firstletter = arr[0][0].toUpperCase();
            arr = arr.join('').split('');
            arr.splice(0, 1, firstletter)
            cuisinetype.textContent = "Cuisine type: " + arr.join("");
            divright.append(cuisinetype);

            let ingredients = document.createElement('div');
            ingredients.style.fontWeight = 'bold';
            ingredients.textContent = 'Ingredients';
            divright.append(ingredients);

            let ingredientsarray = [];
            let recipeingredients = document.createElement('div');
            for (let j = 0; j < data.hits[i].recipe.ingredients.length; j++) {
                ingredientsarray.push(data.hits[i].recipe.ingredients[j].text)
            }
            recipeingredients.textContent = ingredientsarray.join(", ");
            divright.append(recipeingredients);

            let calories = document.createElement('div');
            calories.style.fontWeight = 'bold';
            calories.textContent = Math.floor(data.hits[i].recipe.calories) + ' kcal';
            divright.append(calories);

            let fat = document.createElement('div');
            fat.textContent = 'FAT: ' + Math.floor(data.hits[i].recipe.digest[0].total) + ' g';
            divright.append(fat);

            let carbs = document.createElement('div');
            carbs.textContent = 'CARBS: ' + Math.floor(data.hits[i].recipe.digest[1].total) + ' g';
            divright.append(carbs);

            let protein = document.createElement('div');
            protein.textContent = 'PROTEIN: ' + Math.floor(data.hits[i].recipe.digest[2].total) + ' g';
            divright.append(protein);

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

//When the back button on the recipe results page is clicked, take user back to home page
let reciperesultsback = document.getElementById('recipe-results--back');
reciperesultsback.addEventListener('click', () => {
    main.style.display = 'block';
    reciperesults.style.display = 'none';
})
