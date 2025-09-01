const loadCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>display(data.categories));
}

const button=document.getElementById('button')
console.log(button)
const display=(categories)=>{
categories.forEach(category => {
    console.log(category.category)
    const btn=document.createElement('button');
    btn.classList='btn';
    btn.innerText=category.category;
    button.append(btn);

});
}

loadCategories();
