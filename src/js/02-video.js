'use strict';
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);
const localStorageKey = 'videoplayer-current-time';
    
player.on(
    'timeupdate',
    throttle((data) => {
localStorage.setItem(localStorageKey, data.seconds)
    }, 1000)
)
player.on('loaded', () => {
    const savedTime = localStorage.getItem(localStorageKey); //zadeklarowana zmienna w której  przechowuje ten czas, dlatego że potrzebuje go potem sprawdzić czy jest truthy 
    if (savedTime) {
        player
            .setCurrentTime(Number.parseFloat(savedTime)) //pamiętać, źe parseFloat jest potrzebne w przypadku gdy wartość jest pobrana typu string
            .catch(function (error) { //zmodyfikowane z dokumentacji
             switch (error.name) {
            case 'RangeError':
            break;
            default:
            break;
     }
      });
  }
});

//player.on('play', function () {
  //      console.log('played the video!');
 //   });

 //   player.getVideoTitle().then(function(title) {
//        console.log('title:', title);
 //   });

//const timeUpdate = throttle( () => {
  //localStorage.setItem(localStorageKey, currentTime);
//}, 1000);

