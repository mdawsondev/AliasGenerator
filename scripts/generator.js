var types = ["animals", "colors", "food", "nature", "numbers"];

for (i in types) { 
	function readTextFile(file) {
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function () {
	        if (rawFile.readyState === 4) {
	            if (rawFile.status === 200 || rawFile.status == 0) {
	                var allText = rawFile.responseText;
	                alert(types[i]);
	                types[i] = allText.split('\n'); 
	            }
	        }
	    }
	    rawFile.send(null);
	}
	readTextFile("https://raw.githubusercontent.com/mdawsondev/AliasGenerator/master/data/" + types[i] + ".txt");
}

window.onload = function() {
  document.getElementById("go").onclick = function () {
   	var count = document.getElementById("count").value;
		var alias = "";
		var category = [];

    if (document.getElementById("animals").checked)
            category.push(types[0]);
    if (document.getElementById("colors").checked)
            category.push(types[1]);
    if (document.getElementById("food").checked)
            category.push(types[2]);
    if (document.getElementById("numbers").checked)
            category.push(types[3]);
    if (document.getElementById("nature").checked)
            category.push(types[4]);

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