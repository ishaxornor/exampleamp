
 import { initializeCards } from "./cards.js";
 import { initializeArrows } from "./scrolling-arrows.js";
 import { cards, lightboxEl, player, setLightbox, setPlayer } from "./globals.js";
 import { initializeTouchListeners } from "./swipe-down-to-close.js";
 
 window.addEventListener('load', function () {
   init();
 });
 


 function init() {
   const playerEl = document.body.querySelector('amp-story-player');
   setPlayer(playerEl);
 
   if (player.isReady) {
     initializeCarousel();
   } else {
     player.addEventListener('ready', () => {
       initializeCarousel();
     });
   }
 }
  


 function initializeCarousel() {
   const lightbox = document.body.querySelector('.lightbox');
   setLightbox(lightbox);
 
   initializeCards();
   initializeArrows();
 
   player.addEventListener('amp-story-player-close', () => {
     closePlayer();
   });
 
   
   
   initializeTouchListeners();
 }
 
 
 
  function closePlayer() {
   player.pause();
   document.body.classList.toggle('lightbox-open', false);
   lightboxEl.classList.add('closed');
   cards.forEach((card) => {
     card.classList.remove('hidden');
   });
 }
 