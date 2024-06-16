import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Draggable from "gsap/Draggable";
import SplitType from 'split-type'
import Swiper from 'swiper';
import LocomotiveScroll from 'locomotive-scroll';
import 'swiper/css';
import {Gradient} from './Gradient.js';
import InfiniteMarquee from 'vanilla-infinite-marquee';
import Ukiyo from "ukiyojs";
import barba from "@barba/core";


new InfiniteMarquee({
	element: '.marquee-container',
	speed: 50000,
	// smoothEdges: true,
	direction: 'left',
	gap: '2rem',
	duplicateCount: 2,
	mobileSettings: {
		direction: 'top',
		speed: 20000
	}
});
const title = document.querySelector('#work-title .h1')
      const links = document.querySelectorAll('#brev a')
      const date = document.querySelector('#work-title span')
      const body = document.querySelector('body')
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => {
          title.innerText = link.getAttribute('data-title')
          date.innerText = link.getAttribute('data-year')
          body.classList.add('hovered')
          link.classList.add('hovered')
        })
        link.addEventListener('mouseleave', () => {
          title.innerText = 'Featured Work'
          date.innerText = '[ 4 ]'
          body.classList.remove('hovered')
          link.classList.remove('hovered')
        })
      })


const gradient = new Gradient();
gradient.initGradient('#gradient-canvas');


// function horizontalScroll() {
//     const container = document.querySelector("#project-row");
//     console.log(container.offsetWidth)

//     function getScrollAmount() {
//         let containerWidth = container.scrollWidth;
//         return -(containerWidth - window.innerWidth);
//     }
//     let mm = gsap.matchMedia();
//     mm.add("(min-width: 850px)", () => {
//         const tween = gsap.to(container, {
//             x: getScrollAmount,
//             duration: 3,
//             ease: "none",
//         });

//         ScrollTrigger.create({
//             trigger: "#project-wrapper",
//             start: "clamp(top)",
//             end: () => `+=${getScrollAmount() * -1}`,
//             animation: tween,
//             scrub: true,
//             invalidateOnRefresh: true,
//         })
//     })
// }

    const locomotiveScroll = new LocomotiveScroll({
        lenisOptions: {
            wrapper: window,
            content: document.documentElement,
            lerp: 0.3,
            duration: 1.2,
            gestureOrientation: 'vertical',
            smoothWheel: true,
            smoothTouch: false,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            normalizeWheel: true,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        },
    });

function swiperInit() {
    var swiper = new Swiper(".swiper-container", {
        loopedSlides: 4,
        loop: true,
        slidesPerView: "auto",
        freeMode: true,
        mousewheel: {
            releaseOnEdges: true,
        },
    });
}

function valueSet() {
    gsap.set("#overlay", {
        autoAlpha: 0,
    });
    gsap.set("#overlay-bg", {
        autoAlpha: 0,
    });
    gsap.set("#nav-cluster a", {
        x: 0,
        autoAlpha: 1,
    });

    let mm = gsap.matchMedia();
    mm.add("(max-width: 900px)", () => {
        gsap.set("#nav-cluster a", {
            autoAlpha: 0
        })
    });
};

function transition() {
    var tl = gsap.timeline();
    tl.to("#bar .sweep-left", {
            duration: 1.25,
            scaleX: 1,
            transformOrigin: "left",
            ease: "power4.inOut",
            stagger: 0.07,
            delay: 1,
        }, "<")
        .to("#bar .sweep-right", {
            duration: 1.25,
            scaleX: 1,
            transformOrigin: "right",
            ease: "power4.inOut",
            stagger: 0.07,
            delay: 1,
        }, "<")
        .to("#bar", {
            duration: 1.25,
            ease: "power4.inOut",
            autoAlpha: 0,
        })
}

function overlayAnimation() {
    var tl = gsap.timeline({
        paused: true,
        reversed: true
    });
    // const splitTypes = document.querySelectorAll("[text-split]")
    // splitTypes.forEach((char, i) => {
    //     const text = new SplitType(char, {
    //         types: 'words'
    //     })

    //     tl.from(text.words, {
    //         y: "-100%",
    //         opacity: 0,
    //         duration: 2,
    //         ease: "power4.inOut",
    //         stagger: {
    //             amount: 0.5,
    //         },
    //     }, "<")
    // })
    tl.from("#menu-cluster .text", {
        y: "100%",
        delay: -1,
        opacity: 0,
        duration: 2.2,
        ease: "power4.inOut",
        stagger: 0.12,
    }, "<")
    tl.to("#nav-cluster a", {
            ease: "power4.inOut",
            duration: 1,
            x: "100%",
            stagger: 0.07,
            autoAlpha: 0,
        }, "<")
        .to("#overlay-bg", {
            ease: "power4.inOut",
            duration: 0.75,
            autoAlpha: 1
        }, "<")
        .to("#div", {
            duration: 2.5,
            ease: "power4.inOut",
            stagger: 0.065,
            width: "100%",
            // opacity: 0,
        }, "<");

        Array.from(document.querySelectorAll(".menu-close, .menu-open")).forEach(e => e.addEventListener("click", function() {
            tl.reversed() ? tl.play() : tl.reverse()
    }))
};

function buttonAnimation() {
    overlayAnimation();
    var tl = gsap.timeline({
        paused: true,
        reversed: true
    });
    const toggleBtn = document.getElementById("menu");
    toggleBtn.onclick = function(e) {
        tl.reversed(!tl.reversed())
    }
};

function navScroll() {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {
        gsap.to("#nav-cluster a", {
            ease: "power4.inOut",
            duration: 1,
            x: "-100%",
            stagger: 0.07,
            autoAlpha: 0,
            scrollTrigger: {
                scrub: 4,
                trigger: 'nav',
                start: "top",
                scroller: "body",
            }
        })
    })
};

function heroFade() {
    gsap.to(".fade", {
        opacity: 0,

        ease: "power4.inOut",
        // stagger: 0.1,
        scrollTrigger: {
            scrub: true,
            trigger: "main",
           // markers: true,
            //start: 'top 10%',
            end: 'bottom 55%',
        }
    })
}
function dividerReveal() {
    ScrollTrigger.batch("#divider", {
        trigger: "section",
        //markers: true,
        start: 'top 90%',
        onEnter: (batch) =>
            gsap.to(batch, {
                opacity: 1,
                stagger: 0.15,
                width: "100%",
                duration: 2.1,
                ease: "power4.inOut",
            }),
    })
}

function aboutReveal() {
    gsap.from("#header-layout .h1", {
        opacity: 0,
        y: "-100%",
        duration: 2.2,
        ease: "power4.inOut",
        stagger: 0.1,
        scrollTrigger: {
            trigger: "#desc-v3",
            start: 'top 80%',
        }
    })
}

function workReveal() {
    var tl = gsap.timeline();
    tl

        .from(".swiper-wrapper a", {
            opacity: 0,
            y: "100%",
            duration: 2.2,
            ease: "power4.inOut",
            stagger: 0.1,
        }, "<")
    const splitTypes = document.querySelectorAll("[project-split]")
    splitTypes.forEach((char, i) => {
        const text = new SplitType(char, {
            types: 'words'
        })

        gsap.from(text.words, {
            y: "-100%",
            delay: 1.2,
            opacity: 0,
            duration: 1.7,
            ease: "power4.inOut",
            stagger: 0.1,
        })
    })

}
function initDrag() {
    let mm = gsap.matchMedia();
    mm.add("(min-width: 900px)", () => {

    gsap.from(".polaroid-frame", {
        duration: 2,
        scale: 0,
        ease: 'expo.inOut',
        onComplete: drag,
        stagger: 0.09,
    })
    })
};

function drag() {
    Draggable.create(".project_wrapper", {
        type: 'x,y',
        bounds: window,
        onDragStart: function () {
            gsap.to(".polaroid-frame", {
                duration: 0.2,
                scale: 1.05,
                ease: 'power1.out',
            });
        },
        onDragEnd: function () {
            gsap.to(".polaroid-frame", {
                duration: 0.2,
                scale: 1,
                ease: 'power1.out',
            });
        },
    });
}


 const gridBox = document.querySelectorAll('.polaroid-frame');
 const isMobile = window.matchMedia('(max-width: 900px)').matches;

function hoverBoxes() {
    gridBox.forEach((box) => {
        box.addEventListener('mouseenter', () => {
            gridBox.forEach((otherBox) => {
                if (otherBox !== box) {
                    otherBox.style.opacity = '0';
                    otherBox.style.scale = "1";
                } else {
                    otherBox.style.opacity = '1';
                    otherBox.style.scale = "1.05";
                }
            });
        });

        box.addEventListener('mouseleave', () => {
            gridBox.forEach((otherBox) => {
                otherBox.style.opacity = '1';
                otherBox.style.scale = "1";
            });
        });
    });
}

function menuHover() {
    let elements = document.querySelectorAll(".text");

      elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerHTML = "";

        let textContainer = document.createElement("div");
        textContainer.classList.add("block");

        for (let letter of innerText) {
          let span = document.createElement("span");
          span.innerText = letter.trim() === "" ? "\xa0" : letter;
          span.classList.add("letter");
          textContainer.appendChild(span);
        }

        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
      });

      elements.forEach((element) => {
        element.addEventListener("mouseover", () => {
          element.classList.remove("play");
        });
      });
}

gsap.registerPlugin(ScrollTrigger, Draggable);
gsap.config({
    nullTargetWarn: false
});

navScroll();
heroFade();
dividerReveal();
workReveal();
swiperInit();
valueSet();
buttonAnimation();
aboutReveal();
initDrag();
if (!isMobile) hoverBoxes();
if (!isMobile) menuHover();


