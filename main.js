const timeCounter = {
    totalSeconds: 0,
    
    start() {
        this.timerId = setInterval(() => {
            this.totalSeconds++;
        }, 1000);
    },
    
    pause() {
        clearInterval(this.timerId);
    },
    
    stop() {
        this.pause();
        this.totalSeconds = 0;
    },

    getSeconds() {
        return this.totalSeconds % 60;
    },

    getMinutes() {
        return  parseInt(this.totalSeconds / 60) % 60;
    },

    getHours() {
        return parseInt(this.totalSeconds / 3600);
    }
}

const hoursTag = document.getElementById('hours');
const minsTag = document.getElementById('mins');
const secsTag = document.getElementById('secs');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const pausePlayControl = document.getElementById('play-pause');
const timerNote = document.getElementById('timer-note');

let displayTimeId;

const displayTime = () => {
    const secs = timeCounter.getSeconds();
    const mins = timeCounter.getMinutes();
    const hours = timeCounter.getHours();

    hoursTag.innerHTML = (hours < 10 ? '0' : '') + hours;
    minsTag.innerHTML = (mins < 10 ? '0' : '') + mins;
    secsTag.innerHTML =  (secs < 10 ? '0' : '') + secs;
}

const controlTime = () => {
    if(pausePlayControl.className=='pause') {
        displayTime();
        timeCounter.pause();
        clearInterval(displayTimeId);

        pausePlayControl.className = 'play';
        timerNote.innerHTML = 'Timer paused';
        startBtn.innerHTML = 'Resume';
        stopBtn.classList.remove('disabled');
    
    } else {
        displayTime();
        timeCounter.start();
        displayTimeId = setInterval(displayTime, 1000);

        pausePlayControl.className = 'pause';
        timerNote.innerHTML = 'Timer ticking...';
        startBtn.innerHTML = 'Pause';
        stopBtn.classList.remove('disabled');
    }

}

startBtn.addEventListener('click', controlTime);
document.querySelector('#control').addEventListener('click', controlTime)

stopBtn.addEventListener('click', (e) => {
    displayTime();
    timeCounter.stop();
    clearInterval(displayTimeId);

    pausePlayControl.className = 'play';
    timerNote.innerHTML = 'Timer stopped';
    startBtn.innerHTML = 'Start';
    stopBtn.classList.add('disabled');
});


window.onload = displayTime();
