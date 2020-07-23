const prefix = document.querySelector('.prefix');
const suffix = document.querySelector('.suffix');
const point = document.querySelector('.point');
const homeIntro = document.querySelector('.home-intro');
console.log(homeIntro);
const homeIntroComments = homeIntro.textContent;

const makeReg = (str) => {
  return new RegExp(str, 'g');
}

const mouseEvents = {
  mouseover: mouseoverFunc,
  mouseout: mouseoutFunc,
}

let names = Array.from(document.getElementsByClassName("name")); // 정확히는 배열이 아니다. 그래서 배열로 만들어줌

names.forEach((el) => { // 여러 이벤트 추가
  for(let key in mouseEvents) {
    el.addEventListener(key, mouseEvents[key]);
  }
});

let mouseoverFunc = (event) => { // 마우스를 가져다 대면 메인화면 글의 내용이 바뀌도록
  // 정규표현식을 사용해서 원하는 className이 있는지 확인하는 걸 작성하자.
  // console.log(event.target.className.match(/cho/g));
  const cName = event.target.className;

  const regObj = {
    cho: makeReg('cho'),
    jun: makeReg('jun'),
    hyun: makeReg('hyun'),
  };
  
  if (regObj.cho.test(cName)) {
    suffix.textContent = '은?';
    // point.style.color = '#E53A40';
    homeIntro.textContent = '';
  } else if (regObj.jun.test(cName)) {
    prefix.textContent = '지금까지'
    suffix.textContent = '이 한 것들';
    // point.style.color = '#EFDC05';
    homeIntro.textContent = '';
  } else {
    suffix.textContent = '과 연락';
    // point.style.color = '#30A9DE';
    homeIntro.textContent = '';
  } 
}

let mouseoutFunc = () => {
  prefix.textContent = '';
  suffix.textContent = '입니다.';
  // point.style.color = '#FFFFFF';
  homeIntro.textContent = homeIntroComments;
}