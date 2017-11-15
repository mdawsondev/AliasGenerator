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
    this.data = null;
    this.log = [];
    this.output = document.querySelector('.output__username'); // Tethered to this.username!
    this.history = document.querySelector('.history__log'); // Tethered to this.log!
    this.settings = [];
    this.username = []; 
    this.wordCount = 3;
    this.init();
  }

  /* #Init -- Begin the initialization process; this code only runs once at startup! */

  init() {
    this.getData();
    this.getButtons();
    this.getWordCount();
  }

  getButtons() {
    this.generate();
    this.toggleOptions('.setting', this.settings);
    this.toggleOptions('.category', this.activeCats);
  }

  getData() {
    fetch('./assets/data/collection.json')
      .then(response => { return response.json() })
      .then(data => {
        this.data = data.category;
        this.enableCats();
      });
  }

  enableCats() {
    this.data.forEach((item) => {
      this.activeCats.push(item.name);
    })
  }

  /* End #Init */
  /* #Logic -- Methods that are called for data manipulation. */

  clearGen() {
    this.setName();
    this.setOutput('');
  }

  createName() {
    let i = 0;    
    while (i < this.wordCount) {
      let randCat = this.activeCats[Math.floor(Math.random() * this.activeCats.length)]; // Pull random available category.
      let dataCat = this.data.find(arg => { // Connect random category to object data.
        return arg.name === randCat;
      });
      let selection = dataCat.content[Math.floor(Math.random() * dataCat.content.length)] // Select random word from object.
      if (this.username.indexOf(selection) === -1) { // No repeated words allowed! Decided to force this feature.
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
    })
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
          let rand = (Math.floor(Math.random() * 2));
          if (rand) {
            temp += word[letter].toUpperCase();
          } else {
            temp += word[letter];
          }
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
      this.createName();
      this.transformOutput(this.settings);
      let output = this.username.join('');
      this.setOutput(output);
      this.addLog(output);
    });
  }

  toggleOptions(query, arr) {
    const elements = document.querySelectorAll(query);
    elements.forEach((element) => {
      element.addEventListener('click', (e) => {
        let feature = e.currentTarget.id;
        let location = arr.indexOf(feature);
        if (location === -1) {
          arr.push(feature);
        } else {
          arr.splice(location, 1);
        }
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