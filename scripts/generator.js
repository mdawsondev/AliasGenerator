var types = ["adjectives", "animals", "colors", "food", "nature", "numbers"];
var data = [];

for (i in types) { 
	function readTextFile(file) {
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function () {
	        if (rawFile.readyState === 4) {
	            if (rawFile.status === 200 || rawFile.status == 0) {
	                var allText = rawFile.responseText;
	                data[i] = allText.split('\n'); 
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

		for (i in types) {
    	if (document.getElementById(types[i]).checked)
      	category.push(data[i]);
    }

    for (i=0; i<count; i++){
    	var rdmCat = Math.floor(Math.random() * category.length);
    	var rdmItem = Math.floor(Math.random() * category[rdmCat].length);
    	alias += category[rdmCat][rdmItem];
    	document.getElementById("name").innerHTML = alias;
    }
	}
}

console.log(category);