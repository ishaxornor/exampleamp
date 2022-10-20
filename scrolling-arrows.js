 import { cardMargin, cards, cardWidth } from "./globals.js";

 let leftArrow;
 let rightArrow;
 let scrollX = 0;
 let maxScroll;
 
 

 export function initializeArrows() {
   const scrollContainer = document.querySelector('.carousel-cards-container');
   const containerPadding =
     parseFloat(getComputedStyle(scrollContainer.firstElementChild).paddingLeft) +
     parseFloat(getComputedStyle(scrollContainer.firstElementChild).paddingRight);
 
   leftArrow = document.querySelector('.entry-point-left-arrow');
   rightArrow = document.querySelector('.entry-point-right-arrow');
 
   maxScroll =
     scrollContainer.offsetWidth -
     containerPadding +
     cardMargin -
     cards.length * cardWidth;
 
   if (maxScroll >= 0) {
     return;
   }
 
   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
   rightArrow.classList.toggle('visible', !isMobile);
 
   const carousel = document.querySelector('.carousel-container');
   carousel.classList.toggle('overflow-right', true);
 
   addArrowListener(leftArrow, true);
   addArrowListener(rightArrow);
 }
 
 


 function addArrowListener(button, isLeft = false) {
   const carousel = document.querySelector('.carousel-container');
   button.addEventListener('click', () => {
     scrollX = isLeft
       ? Math.min(0, scrollX + cardWidth * 2)
       : Math.max(maxScroll, scrollX - cardWidth * 2);
 
     cards.forEach((card) => {
       card.style['transform'] = `translateX(${scrollX}px)`;
     });
 
         carousel.classList.toggle('overflow-left', scrollX < 0);
     carousel.classList.toggle('overflow-right', scrollX > maxScroll);
 
     leftArrow.classList.toggle('visible', scrollX < 0);
     rightArrow.classList.toggle('visible', scrollX > maxScroll);
   });
 }
 