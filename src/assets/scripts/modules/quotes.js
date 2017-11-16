export default class Quotes {
  constructor() {
    this.data = [];
    this.getData();
  }

  getData() {
    fetch('./assets/data/quotes.json')
      .then(response => { return response.json() })
      .then(data => {
        for (let key in data.quotes.quote) {
          this.data.push(data.quotes.quote[key])
        }
        this.triggerOutput();
      });
  }

  triggerOutput() {
    setInterval(() => {
      let output = this.data[Math.floor(Math.random() * this.data.length)];
      let quote = document.createElement('p');
      let username = document.querySelector('.output__username').textContent;
      let x = Math.floor((Math.random() * window.innerWidth));
      let y = Math.floor((Math.random() * window.innerHeight));
      output = output.replace('username', username);


      quote.classList.add('quote'); // Build output element.
      quote.style.left = `${y}px`;
      quote.style.top = `${x}px`;
      quote.textContent = `"${output}"`;

      document.querySelector('body').append(quote);

      setTimeout(() => {
        quote.classList.add('quote--show');
        setTimeout(() => {
          quote.classList.remove('quote--show');
          setTimeout(() => {
            quote.remove();
          }, 5000)  // Destroy output element after x seconds.
        }, 3000); // Hide output after x seconds.
      }, 100) // Toggle fade-in transition on load.

    }, 3000) // Create new element every tick.
  }

}




