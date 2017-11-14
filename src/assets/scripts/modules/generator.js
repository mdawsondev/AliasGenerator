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
    this.output = document.querySelector('.output__username');
    this.settings = ['capsrandom'];
    this.username = [];
    this.wordCount = 3;
    this.init();
  }

  /* #Init -- Begin the initialization process; this code only runs once at startup! */

  init() {
    this.getData();
    this.generate();
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
      this.activeCats.push(item);
    })
  }

  /* End #Init */
  /* #Logic -- Methods that are called for data manipulation. */

  clearGen() {
    this.setName();
    this.setOutput('');
  }

  setName() {
    this.username = [];
  }

  setOutput(arg) {
    this.output.textContent = arg;
  }

  transformOutput(settings) {
    settings.forEach((setting) => {
      switch (setting) {
        case 'capsfirst':
          this.toCapsFirst();
          break;
        case 'capslock':
          this.toCapsLock();
          break;
        case 'capsrandom':
          this.toCapsRandom();
          break;
        case 'leet':
          this.toLeet();
          break;
      }
    })
  }

  toCapsFirst() {
    this.username.forEach((word, i) => {
      this.username[i] = word.charAt(0).toUpperCase() + word.slice(1);
    });
  }

  toCapsLock() {
    this.username.forEach((word, i) => {
      this.username[i] = word.toUpperCase();
    });
  }

  toCapsRandom() {
    this.username.forEach((word, i) => {
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
    });
  }

  /* End #Logic */
  /* #Interface -- .addEventListener functionality to enable user inputs. */

  generate() {
    document.querySelector('#generate').addEventListener('click', () => {
      this.clearGen();
      let i = 0;
      while (i < this.wordCount) {
        let randCat = Math.floor(Math.random() * this.activeCats.length);
        let randWord = Math.floor(Math.random() * this.activeCats[randCat].content.length)
        this.username.push(this.activeCats[randCat].content[randWord]);
        i++;
      }
      this.transformOutput(this.settings);
      this.setOutput(this.username.join(''));
    });
  }

  /* End #Interface */

}