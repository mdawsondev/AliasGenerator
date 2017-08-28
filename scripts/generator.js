/*Ideas: Caps, RanDOmCaPS, L337, x_HXC_x, Verbs?
  Needs modular conversion, see example below:
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }*/

var nrmlAdjs = ["normal", "adjective", ["adjectives", "colors", "numbers"]],
nrmlNouns = ["normal", "noun", ["animals", "food", "nature"]],
nrmlTtl = ["normal", "title", ["titles"]];
fntsyNouns = ["fantasy", "noun", ["orcish"]],
categories = [nrmlAdjs, nrmlNouns, fntsyNouns, nrmlTtl],
data = [];

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
            var checkbox = document.createElement("input"),
            label = document.createElement("label");
            checkbox.type = "checkbox"
            checkbox.id = data[i].name;
            label.htmlFor = data[i].name;
            label.appendChild(document.createTextNode(data[i].name.charAt(0).toUpperCase() + data[i].name.slice(1)));
            document.getElementById("selections").appendChild(checkbox).checked = true;
            document.getElementById("selections").appendChild(label);
          }
        }
      }
      rawFile.send(null);
    }
    readTextFile("https://raw.githubusercontent.com/mdawsondev/AliasGenerator/caps/data/" + data[i].name + ".txt");
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

  	  //Process words before displaying them.
  	  function process (input) {
  	  	//Caps logic.
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

  	  rdmThing = process(rdmThing);
      alias += rdmThing;
    }
    document.getElementById("alias").innerHTML = alias;
  }
}

//Disable options so checkboxes don't conflict.
function custCheck (id) {
  var cOnly = document.getElementById("c-only"),
  cPlus = document.getElementById("c-plus"),
  grammar = document.getElementById("grammar");

  grammar.checked = false;
  grammar.disabled = true;

  switch(id) {
    case "c-only":
    if (cPlus.checked)
      cPlus.checked = false;
    if (!cOnly.checked)
      grammar.disabled = false;
    break;
    case "c-plus":
    if (cOnly.checked)
      cOnly.checked = false;
    if (!cPlus.checked)
      grammar.disabled = false;
    break;
  }
}