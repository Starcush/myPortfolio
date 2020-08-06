const mainPageArrow = document.querySelector('.main-scroll-arrow');
const introLocation = document.querySelector('#about').offsetTop;

mainPageArrow.addEventListener('mouseenter', () => {
  mainPageArrow.style.boxShadow = '-3px 3px 0 #E53A40';
  return false;
});

mainPageArrow.addEventListener('click', () => {
  mainPageArrow.style.boxShadow = '-3px 3px 0 #E53A40';
  window.scrollTo({top: introLocation, behavior:'smooth'});  
  return false;
});

mainPageArrow.addEventListener('mouseout', () => {
  mainPageArrow.style.boxShadow = '-3px 3px 0 #A9A9A9';
  return false;
});