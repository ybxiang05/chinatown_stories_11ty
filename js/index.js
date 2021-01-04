if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", afterDOMLoaded);
} else {
  afterDOMLoaded();
}

function afterDOMLoaded() {
  vhCheck();
  // animate stuff
  const cover = document.getElementById("cover");
  const logo = document.getElementById("logo");
  const logoImage = logo.querySelector("img");
  logoImage.addEventListener("animationend", () => {
    flip(() => {
      logo.dataset.state = "complete";
    }, logo);
  });

  cover.addEventListener("transitionend", () => {
    cover.classList.add("cover--logo-moved");
  });

  //accordion stuff
  document.addEventListener("click", (event) => {
    const toggle = event.target;
    const target = document.getElementById(
      toggle.getAttribute("aria-controls")
    );
    if (
      toggle.hasAttribute("aria-expanded") &&
      toggle.getAttribute("aria-expanded") === "false"
    ) {
      toggle.setAttribute("aria-expanded", "true");
      target.hidden = false;
    } else if (toggle.hasAttribute("aria-expanded")) {
      toggle.setAttribute("aria-expanded", "false");
      target.hidden = true;
    }
  });

  if (window.location.hash) {
    const element = document.querySelector(window.location.hash);
    if (element && element.hasAttribute("aria-expanded")) {
      const target = document.getElementById(
        element.getAttribute("aria-controls")
      );
      const target = document.getElementById(
        element.getAttribute("aria-controls")
      );
      element.setAttribute("aria-expanded", "true");
      target.hidden = false;
    }
  }
}

function getRect(el) {
  return el.getBoundingClientRect();
}

// Flip function from Keyframers
function flip(changeState, firstEl, getLastEl = () => firstEl) {
  // First
  const firstRect = getRect(firstEl);

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
