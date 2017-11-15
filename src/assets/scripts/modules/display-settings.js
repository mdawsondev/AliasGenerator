
/* This file is tied into the HTML and CSS, and can function without the generator.js module,
   however, that would be pretty silly, wouldn't it?
*/

export default class Display {
  constructor() {
    this.container = document.querySelector('.container');
    this.features = document.querySelector('.features');
    this.settingsButton = document.querySelector('.btn--options');
    this.titleHeight = window.getComputedStyle(document.querySelector('.title')
      , null).getPropertyValue("height"); // Tied to _container.sass to compensate for title height!
    this.init();
  }

  init() {
    this.settingsButton.addEventListener('click', (e) => {
      this.features.classList.toggle('features--hidden');
    });
    this.container.style.top = `calc(50% - ${this.titleHeight})`;
  }
}