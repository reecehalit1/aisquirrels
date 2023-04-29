const scrollElements = document.querySelectorAll(".js-scroll");
const throttleCount = document.getElementById('throttle-count');
const scrollCount = document.getElementById('scroll-count');

var throttleTimer;

const throttle = (callback, time) => {
  if (throttleTimer) return;

	throttleTimer = true;
	setTimeout(() => {
    callback();
		throttleTimer = false;
	}, time);
}

const elementInView = (el, dividend = 1) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop <=
    (window.innerHeight || document.documentElement.clientHeight) / dividend
  );
};

const elementOutofView = (el) => {
  const elementTop = el.getBoundingClientRect().top;

  return (
    elementTop > (window.innerHeight || document.documentElement.clientHeight)
  );
};

const displayScrollElement = (element) => {
  element.classList.add("scrolled");
};

const hideScrollElement = (element) => {
  element.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  scrollElements.forEach((el) => {
    if (elementInView(el, 1.25)) {
      displayScrollElement(el);
    } else if (elementOutofView(el)) {
      hideScrollElement(el)
    }
  })
}
var timer=0;
var count=0;
var scroll = 0;

window.addEventListener("scroll", () => { 
  scrollCount.innerHTML = scroll++;
  throttle(() => {
    handleScrollAnimation();
    throttleCount.innerHTML = count++;
  }, 250);
});