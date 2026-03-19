// DADABEK TURSUNOV 🦂 - TO'LIQ RO'YXAT
const songs = [
    { file: "armon.mp3", title: "Armon" },
    { file: "birkunkelib.mp3", title: "Bir kun kelib" },
    { file: "devonalar.mp3", title: "Devonalar" },
    { file: "Eror.mp3", title: "Error" },
    { file: "Jonimbugun.mp3", title: "Jonim bugun" },
    { file: "Kelinboldi.mp3", title: "Kelin bo'ldi" },
    { file: "Onajon.mp3", title: "Onajon" },
    { file: "ozgaribsan.mp3", title: "O'zgaribsan" },
    { file: "Oshiqedim.mp3", title: "Oshiq edim" },
    { file: "qismat.mp3", title: "Qismat" },
    { file: "sengaqurbonayladim.mp3", title: "Senga qurbon ayladim" },
    { file: "Sevarmandedim.mp3", title: "Sevarman dedim" },
    { file: "songisoz.mp3", title: "So'ngi so'z" },
    { file: "Torkochalar.mp3", title: "Tor ko'chalar" },
    { file: "toyhamotdi.mp3", title: "To'y ham o'tdi" },
    { file: "tushunmaysanmi.mp3", title: "Tushunmaysanmi" },
    { file: "Yor.mp3", title: "Yor" }
];

let index = 0;
let isPlaying = false;
let isRepeat = false;
let isShuffle = false;

const audio = document.getElementById('audio');
const listDiv = document.getElementById('list-container');
const playerScreen = document.getElementById('player-screen');
const progressBar = document.getElementById('p-bar');
const progressArea = document.getElementById('p-area');

// Ro'yxatni yuklash funksiyasi
function loadList() {
    listDiv.innerHTML = "";
    songs.forEach((s, i) => {
        listDiv.innerHTML += `
            <div class="track-card" onclick="openPlayer(${i})">
                <div class="track-number">${i+1}</div>
                <div class="track-name">${s.title}</div>
                <i class="fas fa-play-circle" style="color: #475569;"></i>
            </div>
        `;
    });
}

// Pleyerni ochish
function openPlayer(idx) {
    index = idx;
    playerScreen.style.display = "flex";
    updatePlayer();
    playMusic();
}

// Pleyerni yopish
function closePlayer() {
    playerScreen.style.display = "none";
}

// Musiqani yangilash
function updatePlayer() {
    const s = songs[index];
    document.getElementById('main-title').innerText = s.title;
    audio.src = s.file; 
}

// Play/Pause tugmasi
function togglePlay() {
    if(isPlaying) pauseMusic(); else playMusic();
}

function playMusic() {
    isPlaying = true;
    document.getElementById('play-btn').className = "fas fa-pause";
    audio.play().catch(e => console.log("Xatolik: Musiqa fayli topilmadi!"));
}

function pauseMusic() {
    isPlaying = false;
    document.getElementById('play-btn').className = "fas fa-play";
    audio.pause();
}

// Keyingi musiqa
function nextSong() {
    if(isShuffle) {
        index = Math.floor(Math.random() * songs.length);
    } else {
        index = (index + 1) % songs.length;
    }
    updatePlayer();
    playMusic();
}

// Oldingi musiqa
function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    updatePlayer();
    playMusic();
}

// Takrorlash rejimi
function toggleRepeat() {
    isRepeat = !isRepeat;
    document.getElementById('repeat-btn').classList.toggle('active-mode', isRepeat);
}

// Tasodifiy rejim
function toggleShuffle() {
    isShuffle = !isShuffle;
    document.getElementById('shuffle-btn').classList.toggle('active-mode', isShuffle);
}

// VAQTNI SURISH (SIZ SO'RAGAN ASOSIY FUNKSIYA)
function seek(e) {
    const width = progressArea.clientWidth; // Umumiy kenglik
    const clickX = e.offsetX; // Bosilgan joy
    const duration = audio.duration; // Musiqa vaqti
    
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
}

// Progress barni harakatlantirish
audio.ontimeupdate = (e) => {
    const { duration, currentTime } = e.target;
    if (duration) {
        const percent = (currentTime / duration) * 100;
        progressBar.style.width = percent + "%";
        
        document.getElementById('curr-time').innerText = formatTime(currentTime);
        document.getElementById('dur-time').innerText = formatTime(duration);
    }
};

// Vaqt formatlash (0:00)
function formatTime(t) {
    let m = Math.floor(t / 60);
    let s = Math.floor(t % 60);
    return `${m}:${s < 10 ? '0'+s : s}`;
}

// Musiqa tugaganda nima bo'lishi
audio.onended = () => {
    if(isRepeat) playMusic(); else nextSong();
};

// Sayt yuklanganda ro'yxatni chiqarish
loadList();
