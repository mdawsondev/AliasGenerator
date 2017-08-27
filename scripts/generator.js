window.onload = function () {
  var types = ["adjectives", "animals", "colors", "food", "nature", "numbers"],
      data = [];

  for (i in types) { 
    function readTextFile(file) {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", file, false);
      rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status == 0) {
            var allText = rawFile.responseText;
            data[i] = allText.split('\n');
            var checkbox = document.createElement("input"),
                label = document.createElement("label");
            checkbox.type = "checkbox"
            checkbox.id = types[i];
            label.htmlFor = types[i];
            label.appendChild(document.createTextNode(types[i].charAt(0).toUpperCase() + types[i].slice(1)));
            document.getElementById("categories").appendChild(checkbox).checked = true;
            document.getElementById("categories").appendChild(label);
          }
        }
      }
      rawFile.send(null);
    }
    readTextFile("https://raw.githubusercontent.com/mdawsondev/AliasGenerator/master/data/" + types[i] + ".txt");
  }

  document.getElementById("go").onclick = function () {
    var count = document.getElementById("count").value,
        custom = document.getElementById("custom").value,
        alias = "",
        category = [];

    if (! document.getElementById("usecustom").checked) {
      for (i in types) {
        if (document.getElementById(types[i]).checked)
          category.push(data[i]);
      }
    } else {
      category = custom.split(',');
    }

    for (i=0; i<count; i++){
      var rdmCat = Math.floor(Math.random() * category.length);
      var rdmItem = Math.floor(Math.random() * category[rdmCat].length);
      if (! document.getElementById("usecustom").checked)
        alias += category[rdmCat][rdmItem];
      else
        alias += category[rdmItem];
      document.getElementById("name").innerHTML = alias;
    }
  }
}