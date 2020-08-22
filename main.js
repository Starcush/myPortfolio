import { DOMAnimation } from './animation.js';
import { findClassName } from './modules.js';

const prefixNode = document.querySelector('.prefix');
const basicNode = document.querySelector('.basic');
const cmmnt1Node = document.querySelector('.comments1');
const cmmnt2Node = document.querySelector('.comments2');
const cmmnt3Node = document.querySelector('.comments3');
const homeIntroNode = document.querySelector('.home-intro');
const projectsNode = document.getElementById("projects"); 
const list1Node = document.querySelector('.list1');
const list2Node = document.querySelector('.list2');
const profileNode = document.querySelector('.profile-image');

const introSection = new DOMAnimation(homeIntroNode);
const prefixSection = new DOMAnimation(prefixNode);
const cmmnt1Section = new DOMAnimation(cmmnt1Node);
const cmmnt2Section = new DOMAnimation(cmmnt2Node);
const cmmnt3Section = new DOMAnimation(cmmnt3Node);
const list1Section = new DOMAnimation(list1Node);
const list2Section = new DOMAnimation(list2Node);
const basicSection = new DOMAnimation(basicNode);
const projectsSection = new DOMAnimation(projectsNode);
const profileSection = new DOMAnimation(profileNode);

let showList1 = false;
let showList2 = false;
let isDesktop = true;

let checkDevice = () => {
  if(window.innerWidth <= 1024 && isDesktop) { 
    isDesktop = false;
  } else if(window.innerWidth > 1024 && !isDesktop) {
    isDesktop = true;
  }
}

checkDevice();

let showThumbnail = (txt1, txt2, targetEl, invisibleEl) => {

  const containerDiv = document.createElement('div');
  const containerStyle = 'font-size: 35px; color:rgba(255, 255, 255, 0.9); text-align:center; margin:0;'
  containerDiv.style.cssText = containerStyle;
  containerDiv.classList.add('fade-in');
  
  const divSection = new DOMAnimation(containerDiv);
  divSection.addClass('thumbnail', 'fade-in', 'newDiv');

  const text1 = document.createTextNode(txt1);
  const text2 = document.createTextNode(txt2);
  const br = document.createElement('br');
  containerDiv.appendChild(text1);
  containerDiv.appendChild(br);
  containerDiv.appendChild(text2);

  document.querySelector(targetEl).appendChild(containerDiv);
  document.querySelector(invisibleEl).style.display = 'none';
}

// main section에서 발생하는 animation
let mainMouseover = (event) => { // 마우스를 가져다 대면 메인화면 글의 내용이 바뀌도록
  if(!isDesktop) return;
  // 정규표현식을 사용해서 원하는 className이 있는지 확인하는 걸 작성하자.
  const cName = event.target.className;
  if(findClassName(cName, 'name')) {
    prefixNode.textContent = "";
    introSection.fadeout();
    basicSection.addClass('hide')
    basicSection.removeClass('show');

    if (findClassName(cName, 'cho')) {
      cmmnt1Section.addClass('show', 'fade-in');
      cmmnt2Section.removeClass('show');
      cmmnt3Section.removeClass('show');

    } else if (findClassName(cName, 'jun')) {
      prefixNode.textContent = "지금까지";
      prefixSection.addClass('fade-in');
      prefixSection.removeClass('fade-out');
      cmmnt2Section.addClass('show', 'fade-in');
      
      cmmnt1Section.removeClass('show');
      cmmnt3Section.removeClass('show');

    } else if (findClassName(cName, 'hyun')){
      cmmnt3Section.addClass('show', 'fade-in');
      cmmnt1Section.removeClass('show');
      cmmnt2Section.removeClass('show');
    
    }

  } else {
    introSection.fadein();
    basicSection.addClass('show', 'fade-in');
    cmmnt1Section.removeClass('show');
    cmmnt2Section.removeClass('show');
    cmmnt3Section.removeClass('show');
  }

}

let mouseoutFunc = () => {
  prefixSection.addClass('fade-out');
  prefixSection.removeClass('fade-in');
}

document.getElementById('home').addEventListener('mouseover', mainMouseover);
document.querySelector('.jun').addEventListener('mouseout', mouseoutFunc);


const bodyAnimation = (progress) => {
  if(isDesktop) {
    if (progress > 10 && !showList1) { // 나에 대한 소개 두 번째 class = list1
      list1Section.addClass('slide-fade-in');
      profileSection.addClass('fade-in');
    } else if(progress < 9){
      list1Section.removeClass('slide-fade-in');
      profileSection.removeClass('fade-in');
    }

    if (progress > 20 && !showList2) { // 나에 대한 소개 두 번째 class = list2
      list2Section.addClass('slide-fade-in');
    } else if(progress < 20){
      list2Section.removeClass('slide-fade-in');
    }

    if(progress > 52 && progress < 64) {
      projectsSection.addClass('black-background');
      projectsSection.removeClass('white-background');
    } else {
      projectsSection.addClass('white-background');
      projectsSection.removeClass('black-background');
    }
  } else {
    
    if(progress > 11) {
      profileSection.addClass('fade-in');
    } else if(progress < 9) {
      profileSection.removeClass('fade-in');
    }

    if (progress > 23 && !showList1) { // 나에 대한 소개 두 번째 class = list1
      list1Section.addClass('slide-fade-in');
    } else if(progress < 15){
      list1Section.removeClass('slide-fade-in');
    }

    if (progress > 33 && !showList2) { // 나에 대한 소개 두 번째 class = list2
      list2Section.addClass('slide-fade-in');
    } else if(progress < 23){
      list2Section.removeClass('slide-fade-in');
    }

    if(progress > 53 && progress < 75) {
      projectsSection.addClass('black-background');
      projectsSection.removeClass('white-background');
    } else {
      projectsSection.addClass('white-background');
      projectsSection.removeClass('black-background');
    }
  }
}

let mainMouseout = () => {
  prefixSection.addClass('fade-out');
  prefixSection.removeClass('fade-in');
}

document.getElementById('home').addEventListener('mouseover', mainMouseover);
document.querySelector('.jun').addEventListener('mouseout', mainMouseout);

let ticking = false;
let progress;

window.addEventListener("scroll", function() {
  progress = (window.pageYOffset / document.body.offsetHeight) * 100;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      bodyAnimation(progress);
      ticking = false;
    });
    ticking = true;
  }
});

// project의 thumbnail animation

let projectsMouseenter = (event) => {

  if(!isDesktop) return;
  const cName = event.target.className;
  if(findClassName(cName, 'modurun')) {
    showThumbnail('JS, React', 'React Native', '.modurun', '.modurun-thumbnail');
  } else if(findClassName(cName, 'zeroto66')) {
    showThumbnail('JS, Node.js', 'AWS(EC2, RDS)', '.zeroto66', '.zeroto66-thumbnail');
  }
       
}

let projectsMouseleave = (event) => {
  const cName = event.target.className

  let removeAllEl = (className) => {
    let elements = Array.from(document.getElementsByClassName(className));
    elements.forEach((el) => {
      el.remove();
    })
  }

  if(findClassName(cName, 'modurun')) {
    document.querySelector('.modurun-thumbnail').textContent = "모두런";
    document.querySelector('.modurun-thumbnail').style.display = 'flex';

  } else if(findClassName(cName, 'zeroto66')) {
    document.querySelector('.zeroto66-thumbnail').textContent = "Zeroto66";
    document.querySelector('.zeroto66-thumbnail').style.display = 'flex';
    
  }
  removeAllEl('newDiv');
}

if(!isDesktop) { // desktop이 아닐 경우 프로젝트 부분이 변경되어야 한다.

}

const projects = Array.from(document.getElementsByClassName('thumbnail'));
projects.forEach((el) => {
  el.addEventListener('mouseenter', projectsMouseenter, true);
  el.addEventListener('mouseleave', projectsMouseleave, true);
});

window.onresize = () => {
  checkDevice();
}
