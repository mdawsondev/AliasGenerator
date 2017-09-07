/*Ideas: x_HXC_x?
  Needs modular conversion, see example below:
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}*/

var nrmlAdjs = ["normal", "adjective", ["adjectives", "colors", "numbers"]],
nrmlNouns = ["normal", "noun", ["animals", "food", "nature"]],
nrmlTtl = ["normal", "title", ["titles"]],
verbs = ["normal", "verb", ["verbs"]],
categories = [nrmlAdjs, nrmlNouns, nrmlTtl, verbs],
data = []
loader = [];

class Category {
	constructor(name, genre, grammar) {
		this.content = [],
		this.genre = genre,
		this.grammar = grammar,
		this.name = name;
	}
}

//Establish available categories; custom must come first.
data.push(new Category("custom", "custom", "custom"))

for (i in categories) {
	for (j in categories[i][2])
		data.push(new Category(categories[i][2][j], categories[i][0], categories[i][1]));
}

//Import external lists and inject them into categories.
function harvest() {
	for (i in data) {
    if (data[i].name === "custom") //Ignore custom, it's internalized!
    	continue;
    function readTextFile(file) {
    	var rawFile = new XMLHttpRequest();
    	rawFile.open("GET", file, false);
    	rawFile.onreadystatechange = function () {
    		if (rawFile.readyState === 4) {
    			if (rawFile.status === 200 || rawFile.status === 0) {
    				data[i].content = rawFile.responseText.split('\n');

    				var wrapper = document.createElement("div"), 
    				  checkbox = document.createElement("input"),
    				  label = document.createElement("label");
    				checkbox.type = "checkbox"
    				checkbox.id = data[i].name;
    				label.htmlFor = data[i].name;
    				wrapper.className = "cat";
    				wrapper.style.display = "none";
    				label.appendChild(document.createTextNode(data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1)));
    				wrapper.appendChild(checkbox).checked = true;
    				wrapper.appendChild(label);
    				document.getElementById("selections").appendChild(wrapper);
    			}
    		}
    	}
    	rawFile.send(null);
    }
    readTextFile("https://raw.githubusercontent.com/mdawsondev/AliasGenerator/master/data/" + data[i].name + ".txt");
}
}

window.onload = function () {
	harvest();

	document.getElementById("go").onclick = function () {
		var count = document.getElementById("count").value,
		cOnly = document.getElementById("c-only"),
		cPlus = document.getElementById("c-plus"),
		caps = document.getElementById("caps"),
		capsRand = document.getElementById("caps-random"),
		capsLock = document.getElementById("caps-only"),
		grammar = document.getElementById("grammar"),
		leet = document.getElementById("leet"),
		norepeats = document.getElementById("norepeats"),
		alias = "",
		custom = data[0],
		library = [];


    //Add selected words to the library.
    if (cOnly.checked || cPlus.checked) {
    	custom.content = document.getElementById("c-list").value.split(', ');
    	library.push(custom);
    }

    if (!cOnly.checked) {
    	if (!cPlus.checked)
    		custom.content = [];
    	for (i in data){
    		if (document.getElementById(data[i].name).checked)
    			library.push(data[i]);
    	}
    }


    //Pick words at random matching our grammar rules.
    var title = false,
    titleLoc = 0;
    if (library[0].content.length === 0)
    	library.shift();
    for (i=0; i<library.length; i++) {
    	if (library[i].grammar === "title") {
    		titleLoc = i;
    		title = true;
    	}
    }

    var used = [];

    for (i=0; i<count; i++){
    	var rdmCat = Math.floor(Math.random() * library.length),
    	rdmItem = Math.floor(Math.random() * library[rdmCat].content.length),
    	rdmThing = library[rdmCat].content[rdmItem];
      //Repeat logic.
      if (norepeats.checked) {
      	if (used.indexOf(rdmThing) < 0)
      		used.push(rdmThing);
      	else
      		continue;
      }

  	  //Process words before displaying them;
  	  //Leet speek before caps!
  	  function goLeet (input) {
  	  	var leetOutput = input;
  	  	if (input.endsWith("ed"))
  	  		leetOutput = input.slice(0, -2) + "d";
  	  	if (input.endsWith("er"))
  	  		leetOutput = input.slice(0, -2) + "xor";
  	  	if (library[rdmCat].grammar === "verb")
  	  		leetOutput += "age";
  	  	leetOutput = leetOutput.replace(/a/g, "4").replace(/e/g, "3").replace(/f/g, "ph").replace(/i/g, "1").replace(/t/g, "7").replace(/o/g, "0").replace(/s/g, "5").replace(/ate/g, "8");
  	  	return leetOutput;
  	  }

  	  //Caps logic.
  	  function goCaps (input) {
  	  	if (caps.checked)
  	  		input = input.charAt(0).toUpperCase() + input.slice(1);
  	  	if (capsLock.checked)
  	  		input = input.toUpperCase();
  	  	if (capsRand.checked) {
  	  		var randOutput = "";
  	  		for (letter in input) {
  	  			if (Math.floor(Math.random() * 2))
  	  				randOutput += input[letter].toUpperCase();
  	  			else
  	  				randOutput += input[letter];
  	  		}
  	  		input = randOutput;
  	  	}
  	  	return input
  	  }

      //Grammar logic; needs work!
      if (grammar.checked) {
      	if (title && i === 0)
      		rdmThing = library[titleLoc].content[Math.floor(Math.random() * library[titleLoc].content.length)];
      	if (i === count-1 && library[rdmCat].grammar !== "noun") {
      		i -= 1;
      		continue;
      	}
      }

      if (leet.checked)
      	rdmThing = goLeet(rdmThing);
      if (caps.checked || capsLock.checked || capsRand.checked)
      	rdmThing = goCaps(rdmThing);
      alias += rdmThing;
  }
  document.getElementById("alias0").innerHTML = alias;
  document.getElementById("alias1").innerHTML = alias;
  loader.unshift(alias);
  if (loader.length > 4)
  	loader.pop();
  if (loader[1])
	  document.getElementById("alias2").innerHTML = loader[1];
  if (loader[2])
	  document.getElementById("alias3").innerHTML = loader[2];
  if (loader[3])
	  document.getElementById("alias4").innerHTML = loader[3];
}
}

function list () {
	var elems = document.getElementsByClassName("cat")
	for (var i = 0 ; i < elems.length; i+=1){
		if (elems[i].style.display !== "none")
			elems[i].style.display = "none";
		else
			elems[i].style.display = "initial";
	}
}

function swap (id) {
	console.log(id);
	var mute =document.getElementsByClassName("gencontent");
	for (i=0; i<mute.length; i++){
		mute[i].style.display = "none";
	}
	document.getElementById("gen" + id).style.display = "flex";
}

function change(el) {
  if (el.textContent.includes("Grammar") && document.getElementById("grammar").disabled)
    return;
  el = el.childNodes[0];
  if ( el.classList.contains('fa-toggle-off') )
    el.className = 'fa fa-toggle-on';
  else
    el.className = 'fa fa-toggle-off';
}

//Disable options so checkboxes don't conflict.
function custCheck (id) {
	var cOnly = document.getElementById("c-only"),
	cPlus = document.getElementById("c-plus"),
	grammar = document.getElementById("grammar");

	grammar.checked = false;
	grammar.disabled = true;
  grammar.nextElementSibling.childNodes[0].className = 'fa fa-toggle-off'

	switch(id) {
		case "c-only":
		if (cPlus.checked) {
      change(cPlus.nextElementSibling)
			cPlus.checked = false;
    }
		if (!cOnly.checked)
			grammar.disabled = false;
		break;
		case "c-plus":
		if (cOnly.checked){
      change(cOnly.nextElementSibling)
			cOnly.checked = false;
    }
		if (!cPlus.checked)
			grammar.disabled = false;
		break;
	}
}