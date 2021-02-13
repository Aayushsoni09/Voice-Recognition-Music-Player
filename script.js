
    const image = document.querySelector('#cover');
    const title = document.getElementById('title');
    const artist = document.getElementById('artist');
    const music = document.querySelector('audio');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const prevBtn = document.getElementById('prev');
    const playBtn = document.getElementById('play');
    const nextBtn = document.getElementById('next');
    const background = document.getElementById("background");

    // Music
    const songs = [
      
      {
        
        cover: 'rideit.jpg',
        path: 'rideit.mp3',
      },
      {
        
        cover: 'tummile.jpg',
        path: 'tummile.mp3',
      }
      
    ];

    // Check if Playing
    let isPlaying = false;

    // Update DOM
    function loadSong(song) {
      title.textContent = song.displayName;
      artist.textContent = song.artist;
      music.src = song.path;
      changeCover(song.cover);
    }

    function changeCover(cover) {
      image.classList.remove('active');
      setTimeout(() => {
        image.src = cover;
        image.classList.add('active');
      }, 100) // what is happening here too?
      background.src = cover;
    }

    // Current Song
    let songIndex = 0;

    // Next Song
    function nextSong() {
      songIndex++;
      if (songIndex > songs.length - 1) {
        songIndex = 0;
      }
      loadSong(songs[songIndex]);
      playSong();
    }

    // Previous Song

    function prevSong() {
      songIndex--;
      if (songIndex < 0) {
        songIndex = songs.length - 1;
      }
      loadSong(songs[songIndex]);
      playSong();
    }

    // On Load - Select First Song
    loadSong(songs[songIndex]);

    // Update Progress Bar & Time
    function updateProgressBar(e) {
      if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
        }
        // Delay switching duration Element to avoid NaN
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display for currentTime
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
          currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
      }
    }

    // Set Progress Bar
    function setProgressBar(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const { duration } = music;
      music.currentTime = (clickX / width) * duration;
    }

    // Event Listeners
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    music.addEventListener('ended', nextSong);
    music.addEventListener('timeupdate', updateProgressBar);
    progressContainer.addEventListener('click', setProgressBar);


