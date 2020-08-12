import { findClassName } from './modules.js';

const mainPageArrow = document.querySelector('.main-scroll-arrow');
const pageUpArrow = document.querySelector('.scroll-up');
const pageDownArrow = document.querySelector('.scroll-down');
const arrowDiv = document.querySelector('.scroll-arrow-area');

const introLocation = document.querySelector('#about').offsetTop;
const projectLocation = document.querySelector('#projects').offsetTop;
const contactLocation = document.querySelector('#contact').offsetTop;

const arrows = [mainPageArrow, pageUpArrow, pageDownArrow];

const scrollArrow = (e) => {
  const cName = e.target.className;
  let curPosition = window.scrollY;

  if(findClassName(cName, 'main-scroll-arrow')) {
    window.scrollTo({top: introLocation, behavior:'smooth'});  

  } else if(findClassName(cName, 'scroll-up')) {

    if(curPosition <= introLocation) {
      window.scrollTo({top: 0, behavior: 'smooth'});
    } else if(curPosition <= projectLocation) {
      window.scrollTo({top: introLocation, behavior: 'smooth'});
    } else if(curPosition <= contactLocation) {
      window.scrollTo({top: projectLocation, behavior: 'smooth'});
    }

  } else if(findClassName(cName, 'scroll-down')) {

    if(curPosition <= introLocation) {
      window.scrollTo({top: projectLocation, behavior: 'smooth'});
    } else if(curPosition <= projectLocation) {
      window.scrollTo({top: contactLocation, behavior: 'smooth'});
    }
  }
}

arrows.forEach((el) => {
  el.addEventListener('click', scrollArrow);
  el.addEventListener('mouseenter', () => {
    el.style.borderColor = '#E53A40';
  });
  el.addEventListener('mouseout', () => {
    el.style.borderColor = '#A9A9A9';
  })
});

let ticking = false;

window.addEventListener("scroll", function() {
  let progress = (window.pageYOffset / document.body.offsetHeight) * 100;
  
  if(progress < 7) {
    arrowDiv.classList.add('fade-out');
    arrowDiv.classList.remove('fade-in');
  } else {
    arrowDiv.classList.add('fade-in');
    arrowDiv.classList.remove('fade-out');
  }
  if (!ticking) {
    window.requestAnimationFrame(function() {
      ticking = false;
    });
    ticking = true;
  }
});