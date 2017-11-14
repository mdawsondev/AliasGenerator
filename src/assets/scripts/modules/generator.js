export default class Generator {
  constructor() {
    this.activeCats = [];
    this.data = null;
    this.username = '';
    this.output = document.querySelector('.output__username');
    this.init();
  }

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

  generate() {
    document.querySelector('#generate').addEventListener('click', () => {
      let randCat = Math.floor(Math.random() * this.activeCats.length);
      let randWord = Math.floor(Math.random() * this.activeCats[randCat].content.length)
      this.output.textContent = this.activeCats[randCat].content[randWord];
    });
  }
}