export default class Title {
  constructor() {
    this.title = document.querySelector('.title');
    this.colorize();
  }

  colorize() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    setInterval((e) => {
      let select = Math.floor(Math.random() * colors.length);
      this.title.style.color = colors[select];
    }, 2000)
  }
}      