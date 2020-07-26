const prefix = document.querySelector('.prefix');
const suffix = document.querySelector('.suffix');
const home_intro = document.querySelector('.home-intro');

// 처음에는 home-intro의 투명도가 1 이다
let intro_opacity = 1; 

const findClassName = (object, target) => {
  const reg = new RegExp(target, 'g');
  if(reg.test(object)) return true;
  return false;
}

// fadeout fadein이 동시에 일어날 때
// fadeout fadein이 다른 점이 매우 적다. 이걸 줄여보자.
let fadeIn = (targetEl, opacity) => {
  let rafId;
  let animation = () => {
    if(opacity < 1) {
      opacity += 0.05;
      targetEl.style.opacity = opacity;
      intro_opacity = opacity;
      rafId = requestAnimationFrame(animation);
    } 
  }
  requestAnimationFrame(animation);
  cancelAnimationFrame(rafId);
}

// 매개변수로 받는 값들에 따라서 fadein, fadeout 되는게 달라지게 하고 싶다.
let fadeOut = (targetEl, opacity) => {
  // 지금은 timestamp와의 연관성이 아니라 그냥 숫자로 하고 있는데
  // 관련해서 작동하도록 생각해보자.
  let rafId;
  let animation = () => {
    if(opacity > 0) {
      opacity -= 0.05;
      targetEl.style.opacity = opacity;
      intro_opacity = opacity;
      rafId = requestAnimationFrame(animation);
    }
  }
  requestAnimationFrame(animation);
  cancelAnimationFrame(rafId);
}

let mouseoverFunc = (event) => { // 마우스를 가져다 대면 메인화면 글의 내용이 바뀌도록
  // 정규표현식을 사용해서 원하는 className이 있는지 확인하는 걸 작성하자.
  const cName = event.target.className;
  
  if (findClassName(cName, 'cho')) {
    prefix.textContent = '';
    suffix.textContent = '은?';
  } else if (findClassName(cName, 'jun')) {
    prefix.textContent = '지금까지'
    suffix.textContent = '이 한 것들';
  } else if (findClassName(cName, 'hyun')){
    console.log(prefix.textContent);
    prefix.textContent = '';
    suffix.textContent = '과 연락은';
  } else {
    prefix.textContent = '';
    suffix.textContent = '입니다.';
  }
  
  if(findClassName(cName, 'name')) {
    fadeOut(home_intro, intro_opacity);
  } else {
    fadeIn(home_intro, intro_opacity);
  }
}

document.querySelector('#home').addEventListener('mouseover', mouseoverFunc);

let projectBackground = (progress) => {
  let projectsSection = document.getElementById("projects"); 
  if(progress > 56 && progress < 62) {
    projectsSection.style.backgroundColor = '#000000';
  } else {
    projectsSection.style.backgroundColor = '#FFFFFF';
  }
}

let last_known_scroll_position = 0;
let ticking = false;

window.addEventListener("scroll", function() {
  last_known_scroll_position = window.scrollY;
  progress = (window.pageYOffset / document.body.offsetHeight) * 100;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      projectBackground(progress);
      ticking = false;
    });
    ticking = true;
  }
});
