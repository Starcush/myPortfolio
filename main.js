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

const makingElements = (...props) => {
  return props.map((el) => {
    return document.createElement(el);
  });
}

const appendManyChilds = (parent, ...childs) => {
  childs.forEach((el) => {
    parent.appendChild(el);
  });
}

// main section에서 발생하는 animation
let mainMouseover = (event) => { // 마우스를 가져다 대면 메인화면 글의 내용이 바뀌도록
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

let mainMouseout = () => {
  prefixSection.addClass('fade-out');
  prefixSection.removeClass('fade-in');
}

document.getElementById('home').addEventListener('mouseover', mainMouseover);
document.querySelector('.jun').addEventListener('mouseout', mainMouseout);

// about-me, project에서 발생하는 animation
const bodyAnimation = (progress) => {
  if (progress > 10 && !showList1) { // 나에 대한 소개 두 번째 class = list1
    list1Section.addClass('fade-in');
  } else if(progress < 9){
    list1Section.removeClass('fade-in');
  }

  if (progress > 20 && !showList2) { // 나에 대한 소개 두 번째 class = list2
    list2Section.addClass('fade-in');
  } else if(progress < 20){
    list2Section.removeClass('fade-in');
  }

// let projectBackground = (progress) => {
//   let projectsSection = document.getElementById("projects"); 
//   if(progress > 56 && progress < 62) {
//     projectsSection.style.backgroundColor = '#000000';
//   } else {
//     projectsSection.style.backgroundColor = '#FFFFFF';
//   }
}

let ticking = false;

window.addEventListener("scroll", function() {
  let progress = (window.pageYOffset / document.body.offsetHeight) * 100;

  if (!ticking) {
    window.requestAnimationFrame(function() {
      projectBackground(progress);
      ticking = false;
    });
    ticking = true;
  }
});

// project의 thumbnail animation

let projectsMouseover = (event) => {
  const cName = event.target.className
  
  if(findClassName(cName, 'modurun')) {
    const [containerDiv, iconsDiv, githubLink, notionLink, githubIcon, notionIcon] = makingElements('div', 'div', 'a', 'a', 'img', 'img');
    
    const containerStyle = 'display: grid; grid-template-rows: 1fr 1fr; font-size: 30px; color: white';
    const iconsDivStyle = 'display: flex; justify-content: center; align-items: center; ';
    const iconsStyle = 'width: 35x; height: 35px';

    containerDiv.classList.add('fade-in');

    containerDiv.style.cssText = containerStyle;
    iconsDiv.style.cssText = iconsDivStyle;
    githubIcon.style.cssText = iconsStyle;
    notionIcon.style.cssText = iconsStyle;
    
    githubLink.setAttribute('href', 'https://github.com/Starcush/client_modurun');
    githubIcon.setAttribute('src', './assets/GitHub-Mark-120px-plus.png');
    githubLink.appendChild(githubIcon);
    
    notionLink.setAttribute('href', 'https://www.notion.so/wagucus198/Modurun-bd38e14979464ca68be353b60cf26a44');
    notionIcon.setAttribute('src', './assets/Notion_app_logo.png');
    notionLink.appendChild(notionIcon);

    appendManyChilds(iconsDiv, githubLink, notionLink);

    const text = document.createTextNode("JS, React, React Native");

    containerDiv.appendChild(text);
    containerDiv.appendChild(iconsDiv);
    /*
      <div> style=> display: grid; grid-template-rows: 1fr 1fr; font-size: 30px; color: white;
        <div /> : 사용 언어 style=> display: flex; justify-content: center; align-items: center;
        <div /> 
      </div>
    */
    const divSection = new DOMAnimation(containerDiv);

    divSection.addClass('thumbnail', 'fade-in', 'newDiv');
    document.querySelector('.modurun').appendChild(containerDiv);
    document.querySelector('.modurun-thumbnail').style.display = 'none';
  }   
}

let projectsMouseout = (event) => {
  if(document.querySelector('.thumbnail') !== event.target) {
    return;
  }
  const cName = event.target.className

  if(findClassName(cName, 'modurun')) {
    document.querySelector('.modurun-thumbnail').textContent = "모두런";
    document.querySelector('.modurun-thumbnail').style.display = 'flex';
    // document.querySelector('.modurun-thumbnail').classList.add('fade-in');
    document.querySelector('.newDiv').remove();
    
    
    // document.querySelector('.modurun').textContent = '모두런';
  }
}

document.querySelector('.thumbnail').addEventListener('mouseenter', projectsMouseover, true);
// document.querySelector('.thumbnail').removeEventListener('mouseout', projectsMouseout);
// document.querySelector('.thumbnail').removeEventListener('mouseover', projectsMouseover);
document.querySelector('.thumbnail').addEventListener('mouseleave', projectsMouseout, true);
