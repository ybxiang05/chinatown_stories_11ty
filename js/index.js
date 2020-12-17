(function() {
  console.log("js!!")
})();

// Flip function from Keyframers
function flip(changeState, firstEl, getLastEl = () => firstEl) {
  // First
  const firstRect = getRect(firstEl);
  console.log(firstRect);

  requestAnimationFrame(() => {
    // (something that changes layout)
    changeState();

    // Last
    let lastEl = getLastEl();
    const lastRect = getRect(lastEl);

    // Invert
    const dx = lastRect.x - firstRect.x;
    const dy = lastRect.y - firstRect.y;
    const dw = lastRect.width / firstRect.width;
    const dh = lastRect.height / firstRect.height;

    // (so CSS knows it's being flipped)
    // data-flipping="true"
    lastEl.dataset.flipping = true;

    lastEl.style.setProperty("--dx", dx);
    lastEl.style.setProperty("--dy", dy);
    lastEl.style.setProperty("--dw", dw);
    lastEl.style.setProperty("--dh", dh);

    requestAnimationFrame(() => {
      delete lastEl.dataset.flipping;
    });
  });
}
