export class DOMAnimation {
  // mouseover에 따른 영역별로 fadeout, fadein 애니메이션을 가지고 있는 인스턴스를 만들고 싶다.
  // input : element 종류
  // method: fadein, fadeout
  constructor(element) {
    this.element = element;
    this.opacity = 1;
    this.rafId;
  }

  fadein() {
    let animation = () => {
      if(this.opacity < 1) {
        this.opacity += 0.05;
        this.element.style.opacity = this.opacity;
        this.rafId = requestAnimationFrame(animation);
      }
    }
    requestAnimationFrame(animation);
    cancelAnimationFrame(this.rafId);
  }

  fadeout() {
    let animation = () => {
      if(this.opacity > 0) {
        this.opacity -= 0.05;
        this.element.style.opacity = this.opacity;
        this.rafId = requestAnimationFrame(animation);
      }
    }
    requestAnimationFrame(animation);
    cancelAnimationFrame(this.rafId);
  }

  addClass(...params) {
    params.forEach((el) => {
      this.element.classList.add(el);
    });
  }

  removeClass(...params) {
    params.forEach((el) => {
      this.element.classList.remove(el);
    });
  }

}