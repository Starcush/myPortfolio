const mainPageArrow = document.querySelector('.main-scroll-arrow');

const introLocation = document.querySelector('#about').offsetTop;


let initialPosition = window.scrollY;
let visible = true;


//scroll에 반응하지 않고도 없어져야 한다.
if(initialPosition > 2 && initialPosition < 79 && visible) {
  visible = false;
  mainPageArrow.style.display = 'none';
} 

const arrowScrollEvent = (e) => {
  let curPosition = window.scrollY;
  if(curPosition < 5) {
    window.scrollTo({top: introLocation, behavior:'smooth'});  
    mainPageArrow.classList.add('arrow-fade-out');
  }

  if(curPosition > 79) {
    window.scrollTo({top: 0, behavior:'smooth'});  
    mainPageArrow.classList.remove('arrow-fade-out');
    mainPageArrow.classList.add('arrow-fade-in');
  }
}

const arrowFadeEvent = (scrollPosition, bottom) => {
  if(scrollPosition > 2 && !bottom && visible) {
    visible = false;
    mainPageArrow.classList.add('arrow-fade-out');
    mainPageArrow.classList.remove('arrow-fade-in');

  } else if(!visible) {
    if(bottom || scrollPosition < 2) {
      mainPageArrow.style.display = 'flex';
      let rotate = bottom ? 'transform: rotate(-135deg);' : 'transform: rotate(45deg);';
      visible = true;
      mainPageArrow.classList.remove('arrow-fade-out');
      mainPageArrow.classList.add('arrow-fade-in');
      mainPageArrow.style.cssText = rotate;
    }
  }
}

let ticking = false;
let curPosition;
let bottom = false;

window.addEventListener("scroll", function() {
  curPosition = (window.pageYOffset / document.body.offsetHeight) * 100;
  
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    bottom = true;
  } else {
    bottom = false;
  }

  if (!ticking) {
    window.requestAnimationFrame(function() {
      arrowFadeEvent(curPosition, bottom);
      ticking = false;
    });
    ticking = true;
  }
});

// addeventlistener at main page arrow
mainPageArrow.addEventListener('click', arrowScrollEvent);
mainPageArrow.addEventListener('mouseenter', () => {
  mainPageArrow.style.borderColor = '#E53A40';
});
mainPageArrow.addEventListener('mouseout', () => {
  mainPageArrow.style.borderColor = '#A9A9A9';
});