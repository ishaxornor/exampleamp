
 import { initializeCards } from "./cards.js";
 import { initializeArrows } from "./scrolling-arrows.js";
 import { cards, lightboxEl, player, setLightbox, setPlayer } from "./globals.js";
 import { initializeTouchListeners } from "./swipe-down-to-close.js";
 
 window.addEventListener('load', function () {
   init();
 });
 
 /**
  * Initializes the carousel once the player is ready.
  */
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
 
 /**
  * Initializes cards, arrows, and listeners for the carousel.
  */
 function initializeCarousel() {
   const lightbox = document.body.querySelector('.lightbox');
   setLightbox(lightbox);
 
   initializeCards();
   initializeArrows();
 
   player.addEventListener('amp-story-player-close', () => {
     closePlayer();
   });
 
   // For swipe down to close.
   initializeTouchListeners();
 }
 
 /**
  * Closes the player from the lightbox experience.
  */
  function closePlayer() {
   player.pause();
   document.body.classList.toggle('lightbox-open', false);
   lightboxEl.classList.add('closed');
   cards.forEach((card) => {
     card.classList.remove('hidden');
   });
 }
 