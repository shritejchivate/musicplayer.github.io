const music = document.querySelector("audio");
const img = document.querySelector("img");
const play = document.getElementById("play");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let  progress = document.getElementById("progress");

let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById('progress_div');

const songs = [{
        name:"Cradles",
        title:"CRADLES",
        artist: "Sub Urban",
    },
    {
        name:"mahadev",
        title:"Devon ke Dev Mahadev",
        artist: "Shankar",
    },
];

let isPlaying = false;

// for play function
const playMusic= () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play','fa-pause');
    img.classList.add("anime");
};

// for pause function
const pauseMusic= () => {
    isPlaying = false;
    music.pause();
    play.classList.replace('fa-pause','fa-play');
    img.classList.remove("anime");
};

play.addEventListener('click', () => {
    isPlaying ? pauseMusic() : playMusic();
});

// changing title
const loadSong = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    music.src = "music/" + songs.name + ".mp3";
    img.src = "images/" + songs.name + ".jpg";
};

songIndex = 0 ;

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

const prevSong = () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
};

//progress js
//The timeupdate event is fired when the time 
//indicated by the currentTime attribute has been updated.

music.addEventListener('timeupdate', (event) =>{
const { currentTime , duration} = event.srcElement;

let progress_time = (currentTime / duration) * 100;
progress.style.width = `${progress_time}%`;

// music duration update
let min_duration =  Math.floor(duration / 60);
let sec_duration =  Math.floor(duration % 60);

let tot_duration = `${min_duration}:${sec_duration}`;
if(duration){
    total_duration.textContent = `${tot_duration}`;
}


// music duration update
let min_currentTime =  Math.floor(currentTime / 60);
let sec_currentTime =  Math.floor(currentTime % 60);


if(sec_currentTime < 10){
    sec_currentTime = `0${sec_currentTime}`
}

let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
current_time.textContent = `${tot_currentTime}`;
});

progress_div.addEventListener('click', (event)=>{
    const { duration} = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime =move_progress;
});

//if music end call next song fun
music.addEventListener('ended', nextSong);



next.addEventListener('click', nextSong);
prev.addEventListener('click', prevSong);


