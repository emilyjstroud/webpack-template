// USE WITH FIREBASE AUTH
// import checkLoginStatus from './helpers/auth';
import axios from 'axios';
import 'bootstrap'; // import bootstrap elements and js
import '../styles/main.scss';

const renderToDom = (divId, htmlToPrint) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToPrint;
};

// STRUCTURE
const htmlStructure = () => {
  const domString = `<div id="form container"></div>
  <div id="lyrics-container"></div>`;
  renderToDom('#app', domString);
};

// API CALL
const getLyrics = (artist, song) => new Promise((resolve, reject) => {
  axios.get(`https://api.lyrics.ovh/v1/${artist}/${song}`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// UI PRESENTATION (HTML ON THE DOM)
const lyricsOnDom = (artist, song) => {
  getLyrics(artist, song).then((response) => {
    renderToDom('#lyrics-container', response.lyrics);
    // document.querySelector('#app').innerHTML = response.lyrics;
  });
};

const formOnDom = () => {
  const domString = `<form>
  <div class="mb-3">
    <label for="artist" class="form-label">Artist</label>
    <input type="text" class="form-control" id="artist" required>
  </div>
  <div class="mb-3">
    <label for="song" class="form-label">Song</label>
    <input type="text" class="form-control" id="song" required>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`;
  renderToDom('#form-container', domString);
};

const events = () => {
  const form = document.querySelector('#form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputArtist = document.querySelector('#artist').value;
    const inputSong = document.querySelector('#song').value;
    lyricsOnDom(inputArtist, inputSong);

    form.reset();
  });
};

const startApp = () => {
  htmlStructure();
  formOnDom();
  lyricsOnDom('prince', 'purple rain');
  events();
};

startApp();
