async function getinfo(val) {
    fetch(`https://api.edamam.com/search?app_id=900da95e&app_key=40698503668e0bb3897581f4766d77f9&q=${val}`)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

let recipeinput = document.getElementById('recipeinput');
recipeinput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getinfo(recipeinput.value)
    }
})