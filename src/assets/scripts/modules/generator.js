/*  -- Appendix --
    - class Generator
    - constructor
    - #Init
    - #Logic
    - #Interface
  
    * Sections can be found via #Section!
    * "Cats" is "Categories".
*/

export default class Generator {
  constructor() {
    this.activeCats = [];
    this.custom = document.querySelector('#custom__input')
    this.data = null;
    this.log = [];
    this.output = document.querySelector('.output__username'); // Tethered to this.username!
    this.history = document.querySelector('.history__log'); // Tethered to this.log!
    this.settings = [];
    this.username = [];
    this.wordCount = 3; // Default, not updated until change is fired.
    this.init();
  }

  /* #Init -- Begin the initialization process; this code only runs once at startup! */

  init() {
    this.getData();
    this.getWordCount();
  }

  getButtons() {
    this.generate();
    this.toggleOptions('setting', this.settings);
    this.toggleOptions('category', this.activeCats);
  }

  buildCats(callback) {
    let fragment = document.createDocumentFragment();
    this.data.forEach((item) => {
      let cat = document.createElement('div'),
        span = document.createElement('span'),
        toggle = document.createElement('i'),
        name = item.name;

      span.classList.add('category--uppercase')
      toggle.classList.add('fa', 'fa-toggle-on');
      cat.classList.add('category', 'category--enabled');
      cat.id = name;
      span.textContent = ` ${name}`;
      cat.append(span);
      cat.prepend(toggle);
      fragment.appendChild(cat);
    });
    document.querySelector('.features__categories').appendChild(fragment);
    callback(); // Now we can add functionality to our buttons!
  }

  getData(callback) {
    fetch('./assets/data/collection.json')
      .then(response => { return response.json() })
      .then(data => {
        this.data = data.category;
        this.buildCats(() => this.getButtons());
        this.enableCats();
      });
  }

  enableCats() {
    this.data.forEach((item) => {
      this.activeCats.push(item.name);
    });
  }

  /* End #Init */
  /* #Logic -- Methods that are called for data manipulation. */

  clearGen() {
    this.setName();
    this.setOutput('');
  }

  createName() {
    let aCLength = this.activeCats.length; // Cached for speed.
    let customs = this.custom.value.replace(/ /g, '').split(',');
    let customsLength = customs.length; // Cached for speed.
    let i = 0;
    while (i < this.wordCount) {
      let dataCat = null,
        selection = null,
        randCat = this.activeCats[Math.floor(Math.random() * aCLength)];

      /*  From here, we're going to:
            1. Check if custom words were selected (somecustom/onlycustom).
            2a. If somecustom is true, we'll pick a random custom word.
            2b. If somecustom is false, we'll pick a random word from our database.
            3. If this is an unused word, add it to our builder;
              otherwise, repeat the loop without increasing 'i'.
      */

      if (randCat === 'somecustom' || this.activeCats.indexOf('onlycustom') > -1) {
        selection = customs[Math.floor(Math.random() * customsLength)];
      } else {
        dataCat = this.data.find(arg => { return arg.name === randCat });
        selection = dataCat.content[Math.floor(Math.random() * dataCat.content.length)];
      }

      if (this.username.indexOf(selection) === -1) { // 3.
        this.username.push(selection);
        i++;
      }
    }
  }

  setName() {
    this.username = [];
  }

  setOutput(arg) {
    this.output.textContent = arg;
  }

  addLog(arg) {
    if (this.log.length >= 10) {
      this.log.shift();
    }
    this.log.push(arg);
  }

  transformOutput(settings) {
    settings.forEach((setting) => {
      switch (setting) {
        case 'capsfirst':
          this.toCaps('first');
          break;
        case 'capslock':
          this.toCaps('lock');
          break;
        case 'capsrandom':
          this.toCaps('random');
          break;
        case 'leet':
          this.toLeet();
          break;
        case 'title':
          this.toTitle();
          break;
      }
    });
    this.username = this.username.join('')
  }

  toCaps(style) {
    this.username.forEach((word, i) => {

      if (style === 'first') { // 'capsfirst' is enabled.
        this.username[i] = word.charAt(0).toUpperCase() + word.slice(1);
      }

      if (style === 'lock') { // 'capslock' is enabled.
        this.username[i] = word.toUpperCase();
      }

      if (style === 'random') { // 'capsrandom' is enabled.
        let temp = '';
        for (let letter in word) {
          let nextLetter = word[letter];
          (Math.floor(Math.random() * 2)) ? temp += nextLetter.toUpperCase() : temp += nextLetter;
        }
        this.username[i] = temp;
      }

    });
  }

  toLeet() {
    this.username.forEach((word, i) => {
      this.username[i] = word.replace(/a/gi, '4').replace(/e/gi, '3')
        .replace(/f/gi, 'ph').replace(/i/gi, '1')
        .replace(/t/gi, '7').replace(/o/gi, '0')
        .replace(/s/gi, '5').replace(/ate/gi, '8');
    });
  }

  toTitle() {
    let title = this.activeCats.find((e) => {
      return e.name === 'titles';
    });
    let rand = Math.floor(Math.random() * title.content.length);
    this.username[0] = title.content[rand];
  }

  /* End #Logic */
  /* #Interface -- .addEventListener functionality to enable user inputs. */

  generate() {
    document.querySelector('#generate').addEventListener('click', () => {
      this.clearGen();
      try {
        this.createName();
        this.transformOutput(this.settings);
        this.setOutput(this.username);
        this.addLog(this.username);
      }
      catch (err) {
        this.setOutput('Pick some words!');
      }
    });
  }

  toggleOptions(query, arr) {
    const elements = document.querySelectorAll(`.${query}`);
    elements.forEach((element) => {
      element.addEventListener('click', (e) => {
        let feature = e.currentTarget,
          featureFA = feature.children[0],
          featureID = feature.id,
          location = arr.indexOf(featureID);

        location === -1 ? arr.push(featureID) : arr.splice(location, 1);

        feature.classList.toggle(`${query}--enabled`); // Toggle the style!
        featureFA.classList.toggle('fa-toggle-on');
        featureFA.classList.toggle('fa-toggle-off');
      });
    });
  }

  getWordCount() {
    document.querySelector('#wordcount').addEventListener('change', (e) => {
      this.wordCount = e.currentTarget.value;
    });
  }

  /* End #Interface */

}