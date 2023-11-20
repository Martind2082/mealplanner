let main = document.getElementById('main');
let reciperesults = document.getElementById('recipe-results');
let recipes = document.getElementById('recipes');

let nutritionresults = document.getElementById("nutrition-results");

async function getrecipes(val) {
    fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${val}`)
    .then(res => res.json())
    .then(data => {
        if (data.hits.length === 0) {
            document.getElementById('popup').style.display = 'flex';
            document.getElementById('popup').textContent = "No recipes found";
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
        if (recipeinput.value.length === 0) {
            return;
        }
        getrecipes(recipeinput.value);
    }
})
document.getElementById('magnifying-glass').addEventListener('click', () => {
    if (recipeinput.value.length === 0) {
        return;
    }
    getrecipes(recipeinput.value);
})

//When the back button on the recipe results page is clicked, take user back to home page
let goback = document.getElementsByClassName('goback');
goback[0].addEventListener('click', () => {
    main.style.display = 'block';
    reciperesults.style.display = 'none';
})


async function getnutrition(val) {
    fetch(`https://api.edamam.com/api/nutrition-data?app_id=ef5b31be&app_key=a2998f78c1d882d4f9e00f8b124e93af&nutrition-type=cooking&ingr=${val}`)
    .then(res => res.json())
    .then(data => {
        if (Object.keys(data.totalDaily).length === 0) {
            document.getElementById('popup').style.display = 'flex';
            document.getElementById('popup').textContent = "No data found";
            setTimeout(() => {
                document.getElementById('popup').style.display = 'none';
            }, 2000);
            return;
        }

        nutritionresults.style.display = "block";

        document.getElementById("calories-num").textContent = data.calories;

        let nutritioninfo = document.getElementById('nutrition-info');

        let namearray = ["Total Fat", "Saturated Fat", "Trans Fat", "Cholesterol", "Sodium", "Total Carbohydrate", "Dietary Fiber", "Total Sugars", "Includes-Added Sugars", "Protein", "Vitamin D", "Calcium", "Iron", "Potassium"];
        let gramsarray = ["FAT", "FASAT", "FATRN", "CHOLE", "NA", "CHOCDF", "FIBTG", "SUGAR", "", "PROCNT", "VITD", "CA", "FE", "K"];
        let percentarray = ["FAT", "FASAT", "", "CHOLE", "NA", "CHOCDF", "FIBTG", "", "", "PROCNT", "VITD", "CA", "FE", "K"];

        for (let i = 0; i < nutritioninfo.children.length; i++) {
            nutritioninfo.children[i].style.display = "flex";
            nutritioninfo.children[i].style.justifyContent = "space-between";
            nutritioninfo.children[i].children[1].style.fontWeight = "bold";
            if (i === 0 || i === 3 || i === 4 || i === 5 || i === 9) {
                nutritioninfo.children[i].children[0].style.fontWeight = "bold";
            }

            let gramsname = gramsarray[i];
            if (gramsname !== "") {
                if (!data.totalNutrients[gramsname]) {
                    continue;
                }
                let grams = Math.round(data.totalNutrients[gramsname].quantity * 10) / 10 ;
                nutritioninfo.children[i].children[0].textContent = `${namearray[i]} ${grams} ${data.totalNutrients[gramsname].unit}`;
            } else {
                nutritioninfo.children[i].children[0].textContent = namearray[i];
                continue;
            }

            let percentname = percentarray[i];
            if (percentname !== "") {
                if (!data.totalDaily[percentname]) {
                    continue;
                }
                let percent = Math.round(data.totalDaily[percentname].quantity);
                nutritioninfo.children[i].children[1].textContent = `${percent} %`;
            } else {
                nutritioninfo.children[i].children[1].textContent = "";
            }
        }

    })
}
document.getElementById("nutrition-button").addEventListener("click", () => {
    if (document.getElementById("nutrition-textarea").value.length === 0) {
        return;
    }
    let value = document.getElementById("nutrition-textarea").value;
    let array = [];
    value = value.split(' ');
    array.push(value[0]);
    for (let i = 1; i < value.length; i++) {
        array.push(`%20${value[i]}`);
    }
    array = array.join('');
    getnutrition(array);
})
