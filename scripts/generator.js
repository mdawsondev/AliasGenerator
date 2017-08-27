var animals = ["Dog", "Cat", "Horse", "Wolf", "Salmon", "Hamster", "Badger"];
var colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"];
var food = ["Sandwich", "Pickle", "Peach", "Banana", "Chocolate", "Olive", "Cracker"]
var numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
var nature = ["Grass", "Gravel", "Rock", "Swamp", "Lake", "River"];

window.onload = function() {
  document.getElementById("go").onclick = function () {
   	var count = document.getElementById("count").value;
		var alias = "";
		var category = [];

    if (document.getElementById("animals").checked)
            category.push(animals);
    if (document.getElementById("colors").checked)
            category.push(colors);
    if (document.getElementById("food").checked)
            category.push(food);
    if (document.getElementById("numbers").checked)
            category.push(numbers);
    if (document.getElementById("nature").checked)
            category.push(nature);

//pick random category from category
//pick random item from that category

    for (i=0; i<count; i++){
    	var rdmCat = Math.floor(Math.random() * category.length);
    	var rdmItem = Math.floor(Math.random() * category[rdmCat].length);
    	alias += category[rdmCat][rdmItem];
    	document.getElementById("name").innerHTML = alias;
    }
	}
}

console.log(category);