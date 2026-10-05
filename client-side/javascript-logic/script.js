  const carousel = document.querySelector('.carousel');
  let index = 0;

  function showNextProduct() {
    index++;
    if (index >= carousel.children.length) {
      index = 0;
    }
    carousel.style.transform = `translateX(-${index * 100}%)`;
    carousel.style.transition = "transform 0.5s ease-in-out";
  }

  setInterval(showNextProduct, 5000); // change product every 3 seconds
