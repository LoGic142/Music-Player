const music=document.querySelector("audio");
const image=document.querySelector("img");
const prevBtn=document.getElementById("prev");
const playBtn=document.getElementById("play");
const nextBtn=document.getElementById("next");
const title=document.getElementById("title");
const artist=document.getElementById("artist");
const progressContainer=document.getElementById("progress-container");
const progress=document.getElementById("progress");
const currentTimeEl=document.getElementById("current-time");
const durationEl=document.getElementById("duration");

let isPlaying=false;
const songs=[
    {
        name:"jacinto-1",
        displayName:"Electric Chill Machine",
        artist:"Jacinto"
    },
    {
        name:"jacinto-2",
        displayName:"Seven Nation Army(Remix)",
        artist:"Jacinto"
    },
    {
        name:"jacinto-3",
        displayName:"Goodnight, Disco Queen",
        artist:"Jacinto"
    },
    {
        name:"metric-1",
        displayName:"Front Row (Remix)",
        artist:"Jacinto"
    },
    {
        name:"forever",
        displayName:"Forever",
        artist:"Chris Brown"
    }
    
];
let songIndex=0;

function loadSong(song)
{
    image.setAttribute("src",`./img/${song.name}.jpg`);
    music.src=`./music/${song.name}.mp3`;
    title.textContent=song.displayName;
    artist.textContent=song.artist;
}

function playSong()
{
    isPlaying=true;
    music.play();
    playBtn.classList.replace("fa-play","fa-pause");
    playBtn.setAttribute("title","Pause");
}

function pauseSong()
{
    isPlaying=false;
    music.pause();
    playBtn.classList.replace("fa-pause","fa-play");
    playBtn.setAttribute("title","Play");
}

function prevSong()
{
    if(songIndex===0)
    {
        songIndex=songs.length-1;
    }
    else
    {
        songIndex--;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong()
{
    if(songIndex===(songs.length-1))
    {
        songIndex=0;
    }
    else
    {
        songIndex++;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgressBar(event)
{
    const {duration,currentTime}=event.srcElement;
    let progressPercent=(currentTime/duration) * 100;
    progress.style.width=`${progressPercent}%`;

    let durationMinutes=Math.floor(duration / 60);
    let durationSeconds=Math.floor(duration % 60);
    if(durationSeconds<10)
    {
        durationSeconds=`0${durationSeconds}`;
    } 
    if(durationSeconds)
    {
        durationEl.textContent=`${durationMinutes}:${durationSeconds}`;
    }

    let currentMinutes=Math.floor(currentTime / 60);
    let currentSeconds=Math.floor(currentTime % 60);
    if(currentSeconds<10)
    {
        currentSeconds=`0${currentSeconds}`;
    } 
    if(currentSeconds)
    {
        currentTimeEl.textContent=`${currentMinutes}:${currentSeconds}`;
    }
}

function setProgressBar(event)
{
    const width=this.clientWidth;
    const clickX=event.offsetX;
    const {duration}=music;
    music.currentTime=(clickX/width)*duration;
}

playBtn.addEventListener("click",() => {
    isPlaying ? pauseSong() : playSong()
});

prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);
music.addEventListener("timeupdate",updateProgressBar);
music.addEventListener("ended",nextSong);
progressContainer.addEventListener("click",setProgressBar);
loadSong(songs[songIndex]);