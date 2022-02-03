const imagesContainer = document.querySelector(".block-center");
const container = document.querySelector(".global-container");
const buttRight = document.querySelector(".right");
const buttLeft = document.querySelector(".left");
const images = document.getElementsByClassName("imageSlider");
let startPoint = 0;
let sfiftCenter = 0;
console.log(images);
images[0].onload = () => {
  repositioning();
};
window.onresize = () => {
  repositioning();
};
const repositioning = () => {
  if (images.length % 2 === 0) {
    sfiftCenter =
      container.offsetWidth / 2 -
      (container.offsetWidth - images[0].offsetWidth) / 2;
    imagesContainer.style.transform = `translateX(${sfiftCenter}px)`;
  }
};
const slideMove = (direction = "right") => {
  buttLeft.style.visibility = "visible";
  let shift = images[0].clientWidth;
  if (direction === "right") {
    startPoint--;
    shift = startPoint * shift;
    if (startPoint <= -Math.floor(images.length / 2)) {
      buttRight.style.visibility = "hidden";
    }
  } else {
    buttRight.style.visibility = "visible";
    startPoint++;
    shift = startPoint * shift;
    if (
      startPoint >=
      Math.floor(images.length / 2) - (images.length % 2 === 0 ? 1 : 0)
    ) {
      buttLeft.style.visibility = "hidden";
    }
  }
  imagesContainer.style.transform = `translateX(${shift + sfiftCenter}px)`;
};
buttRight.onclick = () => slideMove("right");
buttLeft.onclick = () => slideMove("left");
document.addEventListener(
  "keyup",
  (event) => {
    const keyName = event.key;
    if (keyName === "ArrowRight") {
      if (startPoint <= -Math.floor(images.length / 2)) {
        keyName.preventDefault();
      } else {
        slideMove("right");
      }
      event.preventDefault();
    } else if (keyName === "ArrowLeft") {
      if (
        startPoint >=
        Math.floor(images.length / 2) - (images.length % 2 === 0 ? 1 : 0)
      ) {
        keyName.preventDefault();
      } else {
        slideMove("left");
      }
    }
  },
  false
);
