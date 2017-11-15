setInterval(() => {
  let x = Math.floor((Math.random() * window.innerWidth));
  let y = Math.floor((Math.random() * window.innerHeight));
  let quote = document.createElement('p');
  let username = document.querySelector('.output__username').textContent;
  quote.textContent = `${username} is a total scrub.`;
  quote.classList.add("quote")
  quote.style.color = "white";
  quote.style.left = `${y}px`;
  quote.style.top = `${x}px`;
  document.querySelector('body').prepend(quote);
  setTimeout(() => {
    quote.classList.add('quote--hidden');
    setTimeout(() => {
      quote.remove();
    }, 4000)
  }, 1000);
}, 2000);
