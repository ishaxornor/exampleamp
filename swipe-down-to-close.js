
 import { cards, lightboxEl, player } from "./globals.js";
 import { easeOutQuad, lerp } from "./utils/math.js";
 
 let scaleVal = 1;
 let scalingDown = false;
 const toggleThresholdPx = 60;
 let deltaY = 0;
 let isSwipeY = null;
 let touchStartX = 0;
 let touchStartY = 0;
 


  export function initializeTouchListeners() {
   player.addEventListener('amp-story-player-touchstart', (event) => {
     onTouchStart(event);
   });
 
   player.addEventListener('amp-story-player-touchmove', (event) => {
     onTouchMove(event);
   });
 
   player.addEventListener('amp-story-player-touchend', (event) => {
     onTouchEnd(event);
   });
 }
 
 
  function closePlayer() {
   player.pause();
   document.body.classList.toggle('lightbox-open', false);
   lightboxEl.classList.add('closed');
   cards.forEach((card) => {
     card.classList.remove('hidden');
   });
 }
 
 

  function onTouchStart(event) {
   lightboxEl.classList.add('dragging');
   touchStartX = event.detail.touches[0].screenX;
   touchStartY = event.detail.touches[0].screenY;
 }
 
 


 function onTouchMove(event) {
   const {screenX, screenY} = event.detail.touches[0];
 
   if (isSwipeY === null) {
     isSwipeY =
       Math.abs(touchStartY - screenY) > Math.abs(touchStartX - screenX);
   }
 
   if (isSwipeY === false) {
     return;
   }
 
   deltaY = touchStartY - screenY;
 
   if (deltaY > 0) {
     return;
   }
 
   if (!scalingDown) {
     scalingDown = true;
     animateScale(0);
   }
 
   isSwipeY = true;
   lightboxEl.style.transform = `translate3d(0, ${Math.pow(
     -deltaY,
     0.6
   )}px, 0) scale3d(${scaleVal}, ${scaleVal}, 1)`;
 }
 
 
 function onTouchEnd() {
   resetAnimationScale();
 
   lightboxEl.classList.remove('dragging');
   if (isSwipeY === true && Math.abs(deltaY) > toggleThresholdPx) {
     closePlayer();
   } else if (isSwipeY === true) {
     resetStyles();
   }
   isSwipeY = null;
 }
 


 function animateScale(val) {
   if (val < 1 && scalingDown) {
     scaleVal = lerp(easeOutQuad(val), 1, 0.95);
     lightboxEl.style.transform = `translate3d(0px, ${Math.pow(
       -deltaY,
       0.6
     )}px, 0) scale3d(${scaleVal}, ${scaleVal}, 1)`;
     requestAnimationFrame(() => animateScale((val += 0.05)));
   }
 }
 
 


 function resetAnimationScale() {
   scalingDown = false;
   scaleVal = 1;
 }
 
 

 
 export function resetStyles() {
   lightboxEl.style.transform = `translate3d(0, 0, 0) scale3d(1, 1, 1)`;
 }
 