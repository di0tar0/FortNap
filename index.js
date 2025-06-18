const userImage = 'img/CURSOR.png';
let map, userMarker, userCircle;
let userPos = [43.0939, 5.89405];
let markers = [];
const totalMarkers = 6;
const closeBtn = document.getElementById('close-btn');

const notifiedMarkers = new Set();

window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('map').style.display = 'block';
    document.getElementById('authorization-popup').style.display = 'flex';
    document.getElementById('popup-overlay').style.display = 'block';
    updateProgressBar();
    initMap().then(loadMarkers);
  }, 1000);

  const videoPopup = document.getElementById('video-popup');
  const video = document.getElementById('popup-video');

  if (videoPopup && video) {
    videoPopup.addEventListener('click', (e) => {
      if (!video.contains(e.target)) {
        video.pause();
        video.currentTime = 0;
        videoPopup.style.display = 'none';
      }
    });
  }

  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const carouselPopup = document.getElementById('carousel-popup');
  const carouselImage = document.getElementById('carousel-image');

  if (nextBtn && prevBtn && carouselPopup && carouselImage) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeSlide(1);
    });

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      changeSlide(-1);
    });

  }
});

document.getElementById('authorize-btn').addEventListener('click', () => {
  document.getElementById('authorization-popup').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';
  requestFullScreen();
  navigator.permissions.query({ name: 'geolocation' })
  Notification.permission = "granted";
});

function requestFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}

function initMap() {
  return new Promise(resolve => {
    const crs = new L.Proj.CRS('EPSG:2154',
      '+proj=lcc +lat_0=46.5 +lon_0=3 +lat_1=49 +lat_2=44 +x_0=700000 +y_0=6600000 +ellps=GRS80 +units=m +no_defs',
      {
        resolutions: [0.79787616, 0.39893808, 0.19946904, 0.09973452, 0.04986726],
        origin: [0, 12000000]
      }
    );

    map = L.map('map', {
      crs: crs,
      zoomControl: true,
      markerZoomAnimation: false,
      attributionControl: false,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
      center: userPos,
      minZoom: 2,
      maxZoom: 4,
      maxBoundsViscosity: 1.0
    });

    L.tileLayer('img/tiles/{z}/{x}/{y}.png', {
      tileSize: 256,
      noWrap: true,
    }).addTo(map);

    map.setView(userPos, 2.5);
    map.setMaxBounds([
      [43.09339968728266, 5.892423324595689],
      [43.09495145111664, 5.894385603258316]
    ]);

    const userIcon = L.icon({
      iconUrl: userImage,
      iconSize: [64, 64],
      iconAnchor: [56, 62]
    });

    userMarker = L.marker(userPos, { icon: userIcon }).addTo(map);
    userCircle = L.circle(userPos, {
      radius: 1000000,
      color: 'rgb(249, 178, 46)',
      fillColor: 'rgb(249, 178, 46, 0.5)',
      fillOpacity: 0.2,
      weight: 1
    }).addTo(map);

    resolve();
  });
}

async function loadMarkers() {
  const res = await fetch('marker.json');
  const data = await res.json();
  const seen = JSON.parse(localStorage.getItem('seenMarkers') || '[]');

  data.forEach(marker => {
    const iconUrl = seen.includes(marker.id)
      ? `img/icon2/POI1-${marker.id - 1}.png`
      : `img/icon1/POI1-${marker.id - 1}.png`;

    const icon = L.icon({
      iconUrl: iconUrl,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48]
    });

    const m = L.marker(marker.coords, { icon }).addTo(map);
    m.customId = marker.id;
    m.markerData = marker;
    markers.push(m);
  });

  initMovement();

  generateInfoCards();
}

function initMovement() {

  if (!navigator.geolocation) {
    alert("La géolocalisation n'est pas supportée par votre navigateur.");
    return;
  }

  geoWatchId = navigator.geolocation.watchPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      userPos = [lat, lng];

      userMarker.setLatLng(userPos);
      userCircle.setLatLng(userPos);
      map.setView(userPos, map.getZoom(), { animate: false });

      setInterval(checkProximityToMarkers, 50);

    },
    (error) => {
      if (error.code === 1) alert("Veuillez Autoriser la géolocalisation dans votre navigateur.");
      else if (error.code === 2) alert("Position non disponible.");
      else if (error.code === 3) alert("La recherche de position a expiré. Essayez dans un endroit dégagé.");
      console.error("Erreur de géolocalisation :", error);
    }
    ,
    {
      enableHighAccuracy: true,
      maximumAge: 0,
      timeout: 5000,
    }
  );
}

function updateProgressBar() {
  const seenMarkers = JSON.parse(localStorage.getItem('seenMarkers') || '[]');
  const count = Math.min(seenMarkers.length, totalMarkers);
  document.getElementById('progress-bar').style.backgroundImage = `url('img/bar/bar${count}.svg')`;
}

function notifyAndTrack(markerId) {
  const seenMarkers = JSON.parse(localStorage.getItem('seenMarkers') || '[]');
  if (!seenMarkers.includes(markerId)) {
    seenMarkers.push(markerId);
    localStorage.setItem('seenMarkers', JSON.stringify(seenMarkers));
    updateProgressBar();
    generateInfoCards();
  }
  const marker = markers.find(m => m.customId === markerId);
  if (marker) {
    const newIcon = L.icon({
      iconUrl: `img/icon2/POI1-${markerId - 1}.png`,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
    });
    marker.setIcon(newIcon);
  }
}

function showMarkerPopup(marker) {
  const seen = JSON.parse(localStorage.getItem('seenMarkers') || '[]');
  const hasBeenSeen = seen.includes(marker.id);

  const popup = document.getElementById('marker-popup');
  const title = document.getElementById('marker-title');
  const desc = document.getElementById('marker-description');
  const play = document.getElementById('marker-play');
  const popupInner = document.getElementById('popup-inner');
  window.currentMarkerId = marker.id;

  popupInner.style.backgroundImage = `url("img/${hasBeenSeen ? "Frame" : "Frame2"}.svg")`;
  play.src = `img/${hasBeenSeen ? 'Play2' : 'Play1'}.svg`;

  title.textContent = marker.title;
  desc.textContent = marker.description;

  popup.style.display = 'flex';

  play.onclick = () => {
    notifyAndTrack(marker.id);
    if (marker.id === 2) {
      window.location.href = 'POI/360poi.html';
      return;
    }

    if (marker.id === 4) {
      showCarousel();
      toggleCloseBtn(true);
      return;
    }

    if (marker.id === 5) {
      toggleCloseBtn(true);
      const imagePopup = document.getElementById('image-popup');
      const image = document.getElementById('popup-image');

      image.src = 'img/vauban/vauban.png';
      imagePopup.style.display = 'block';
      document.getElementById('popup-overlay').style.display = 'block';
      return;
    }

    const videoPopup = document.getElementById('video-popup');
    const video = document.getElementById('popup-video');
    const videoSource = document.getElementById('video-source');

    const videoSrc = `videos/video${marker.id}.mp4`;
    videoSource.src = videoSrc;
    video.load();
    video.play().then(() => {
      toggleCloseBtn(true);
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    })

    videoPopup.style.display = 'flex';
  };

  requestAnimationFrame(() => {
    setTimeout(() => {
      document.removeEventListener('click', onClickOutside);
      document.addEventListener('click', onClickOutside);
    }, 0);
  });
}

function onClickOutside(e) {
  const popup = document.getElementById('marker-popup');
  const popupInner = document.getElementById('popup-inner');

  const isMarkerPopupVisible = popup && popup.style.display === 'flex';
  const isClickOutsideMarker = popupInner && !popupInner.contains(e.target);

  const isCarouselVisible = document.getElementById('carousel-popup')?.style.display === 'flex';
  const isImagePopupVisible = document.getElementById('image-popup')?.style.display === 'block';
  const isVideoVisible = document.getElementById('video-popup')?.style.display === 'flex';

  if (!isMarkerPopupVisible || isCarouselVisible || isImagePopupVisible || isVideoVisible) {
    return;
  }

  if (isClickOutsideMarker) {
    closeAllPopups();
    document.removeEventListener('click', onClickOutside);
  }
}


function generateInfoCards() {
  const container = document.getElementById('info-popup-content');
  container.innerHTML = '';

  const seen = JSON.parse(localStorage.getItem('seenMarkers') || '[]');

  markers.forEach(marker => {
    const hasBeenSeen = seen.includes(marker.customId);

    const card = document.createElement('div');
    card.className = 'info-card';

    let playBtnHTML = '';
    if (hasBeenSeen) {
      playBtnHTML = `<button class="play-btn" data-id="${marker.customId}" style="background: none;
    border: none;">
        <img src="img/Play3.svg" alt="Play">
      </button>`;
    }

    card.innerHTML = `
      <div class="text">
        <h3>${marker.markerData.title}</h3>
        <p>${marker.markerData.description}</p>
      </div>
      ${playBtnHTML}
    `;

    container.appendChild(card);
  });

  const playButtons = document.querySelectorAll('.play-btn');
  playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(button.dataset.id);

      if (id === 2) {
        window.location.href = 'POI/360poi.html';
        return;
      }

      if (id === 4) {
        showCarousel();
        toggleCloseBtn(true);
        return;
      }

      if (id === 5) {
        toggleCloseBtn(true);
        const imagePopup = document.getElementById('image-popup');
        const image = document.getElementById('popup-image');

        image.src = 'img/vauban/vauban.png';
        imagePopup.style.display = 'block';
        document.getElementById('popup-overlay').style.display = 'block';
        return;
      }

      const videoSrc = `videos/video${id}.mp4`;
      const videoPopup = document.getElementById('video-popup');
      const video = document.getElementById('popup-video');
      const source = document.getElementById('video-source');

      source.src = videoSrc;
      video.load();
      video.play().then(() => {
        if (video.requestFullscreen) video.requestFullscreen();
        else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
        else if (video.msRequestFullscreen) video.msRequestFullscreen();
      });

      videoPopup.style.display = 'flex';
      toggleCloseBtn(true);
    });
  });

}

function toggleCloseBtn(show) {
  const closeBtn = document.getElementById('close-btn');
  if (show === true) closeBtn.classList.add('show');
  if (show === false) closeBtn.classList.remove("show");
}

function closeAllPopups() {
  document.removeEventListener('click', onClickOutside);
  const markerPopup = document.getElementById('marker-popup');
  if (markerPopup) markerPopup.style.display = 'none';

  const infoPopup = document.getElementById('info-popup');
  if (infoPopup) infoPopup.classList.remove('show');

  const authorizationPopup = document.getElementById('authorization-popup');
  if (authorizationPopup) authorizationPopup.style.display = 'none';

  const overlay = document.getElementById('popup-overlay');
  if (overlay) overlay.style.display = 'none';

  toggleCloseBtn(false);

  const videoPopup = document.getElementById('video-popup');
  const video = document.getElementById('popup-video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
  if (videoPopup) videoPopup.style.display = 'none';

  const carouselPopup = document.getElementById('carousel-popup');
  if (carouselPopup) carouselPopup.style.display = 'none';

  const vaubanPopup = document.getElementById('image-popup');
  if (vaubanPopup) vaubanPopup.style.display = 'none';
}

document.getElementById('close-btn').addEventListener('click', closeAllPopups);


function resetSeenMarkers() {
  localStorage.removeItem('seenMarkers');
  location.reload();
}

const infoBtn = document.getElementById('info-btn');
const infoPopup = document.getElementById('info-popup');

infoBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  infoPopup.classList.toggle('show');
  toggleCloseBtn(true);
  document.getElementById('popup-overlay').style.display = 'block';
});



const carouselImages = [
  'img/carousel/carousel1.jpg',
  'img/carousel/carousel2.jpg',
  'img/carousel/carousel3.jpg',
  'img/carousel/carousel4.jpg',
  'img/carousel/carousel5.jpg',
  'img/carousel/carousel6.jpg',
  'img/carousel/carousel7.jpg',
  'img/carousel/carousel8.jpg'
];

let currentSlide = 0;

function showCarousel() {
  const popup = document.getElementById('carousel-popup');
  const image = document.getElementById('carousel-image');
  popup.style.display = 'flex';
  image.src = carouselImages[currentSlide];
  document.getElementById('popup-overlay').style.display = 'block';
}

function hideCarousel() {
  document.getElementById('carousel-popup').style.display = 'none';
  toggleCloseBtn(false);
  document.getElementById('popup-overlay').style.display = 'none';
}

function changeSlide(delta) {
  currentSlide = (currentSlide + delta + carouselImages.length) % carouselImages.length;
  document.getElementById('carousel-image').src = carouselImages[currentSlide];
}

function showLegalPopup() {
  document.getElementById('legal-popup').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeLegalPopup() {
  document.getElementById('legal-popup').style.display = 'none';
  document.body.style.overflow = '';
}

document.getElementById('deny-btn').addEventListener('click', () => {
  const message = document.getElementById('popup-message');
  const error = document.getElementById('popup-error');

  message.style.display = 'none';

  error.style.display = 'block';
  error.textContent = `Nous sommes désolés, mais pour accéder à cette application,
vous devez activer la géolocalisation et le plein écran. Cela est nécessaire pour une expérience optimale
et le bon fonctionnement de l'appli.`;
});

document.getElementById('zqsd-btn').addEventListener('click', () => {
  const startPosZQSD = [43.09375, 5.89375];
  userPos = startPosZQSD;

  if (userMarker) userMarker.setLatLng(userPos);
  if (userCircle) userCircle.setLatLng(userPos);
  map.setView(userPos, map.getZoom());

  if (geoWatchId !== null) {
    navigator.geolocation.clearWatch(geoWatchId);
    geoWatchId = null;
  }

  document.getElementById('authorization-popup').style.display = 'none';
  document.getElementById('popup-overlay').style.display = 'none';

  toggleCloseBtn(false);

  enableZQSDMovement();
});


function enableZQSDMovement() {
  const moveSpeed = 0.000005;
  const keys = { z: false, q: false, s: false, d: false };

  function move() {
    let [lat, lng] = userPos;

    if (keys.z) lat += moveSpeed;
    if (keys.s) lat -= moveSpeed;
    if (keys.q) lng -= moveSpeed;
    if (keys.d) lng += moveSpeed;

    userPos = [lat, lng];

    userMarker.setLatLng(userPos);
    userCircle.setLatLng(userPos);
    map.setView(userPos, map.getZoom(), { animate: false });

    requestAnimationFrame(move);
  }

  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = true;
  });

  document.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keys.hasOwnProperty(key)) keys[key] = false;
  });

  move();
  setInterval(checkProximityToMarkers, 50);
}

function checkProximityToMarkers() {
  markers.forEach((marker) => {
    const distance = map.distance(userCircle.getLatLng(), marker.getLatLng());
    const markerId = marker.customId;

    if (distance <= userCircle.getRadius() && !notifiedMarkers.has(markerId)) {
      notifiedMarkers.add(markerId);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`${marker.markerData.title}`, {
          body: marker.markerData.description
        });
      }

      if (!marker._hasClickHandler) {
        marker.on('click', () => showMarkerPopup(marker.markerData));
        marker._hasClickHandler = true;
      }
    }
  });
}