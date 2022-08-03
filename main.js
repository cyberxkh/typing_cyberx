window.addEventListener('load', init);

// Globals

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 1
};

// To change level
const currentLevel = levels.medium;

let time = currentLevel;
let score = 0;
let isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const highscoreDisplay = document.querySelector('#highscore');

const words = [
  'ls',
  'alias',
  'unalias',
  'pwd',
  'cd',
  'rm',
  'mv',
  'mkdir',
  'man',
  'touch',
  'chmod',
  'exit',
  'sudo',
  'unzip',
  'apt-get update',
  'apt-get upgrade',
  'echo',
  'cat',
  'ps',
  'kill',
  'ping',
  'vim',
  'history',
  'passwd',
  'less',
  'tail',
  'head',
  'grep',
  'whoami',
  'uname',
  'find',
  'date',
  'cal',
  'wget',
  'free',
  'sort',
  'more',
  'uptime',
  'zip2john',
  'john',
  'nmap',
  'nc',
  'ifconfig',
  'iwconfig',
  'aircrack-ng',
  'airmon-ng',
  'airodump-ng',
  'airodump-ng --bssid',
  'aireplay-ng',
  'aireplay-ng --deauth',
  'airmon-ng start wlan0',
  'wireshark',
  'stop',
  'install',
  'update',
  'autoremove',
  'sqlmap',
  'poweroff',
  'reboot',
  'strings',
  'file',
  'exiftool',
  'netstat',
  'time',
  'type',
  'printf',
  'aptitude',
  'basename',
  'bash',
  'chown',
  'chroot',
  'groups',
  'groupmod',
  'groupdel',
  'groupadd',
  'hostname',
  'ifdown',
  'ifup',
  'nslookup',
  'return',
  'rmdir',
  'traceroute',
  'useradd',
  'usermod',
  'autopsy',
  'nc -nvlp 4096',
  'nc -vv',
  'nc -L -p 80',
  'nc -e cmd.exe',
  'nc -zvu',
  'nmap -Pn',
  'nmap -sP',
  'nmap -PS',
  'nmap -PA',
  'nmap -PU',
  'nmap -PY',
  'nmap -PE',
  'nmap -PP',
  'nmap -PO',
  'nmap traceroute',
  'nmap -r',
  'nmap -n',
  'nmap -system-dns',
  'nmap -sL',
  'nmap -sT',
  'nmap -sU',
  'nmap -sU-data-length',
  'nmap -sY',
  'nmap -sF',
  'nmap -scanflags',
  'nmap -sI zombie',
  'nmap -sZ',
  'nmap --script',
  'hping3 -spoof',
  'hping3 -S',
  'nmap -Pn -p- -sI',
  'nmap --mtu 16',
  'nmap -Pn -sI zombie',
  'nmap --source-port 53',
  'nmap --data-length 25',
  'nmap -sT -PN -spoof-mac',
  'nmap --badsum',
  'exploit',
  'malware',
  'nmap -p80,443 --script http-methods',
  'nmap -p80 --script http-methods',
  'nmap --script http-open-proxy -p8080',
  'nmap -A',
  'nmap -O'
];

// Initialize Game
function init() {
  // Show number of seconds in UI
  seconds.innerHTML = currentLevel;
  // Load word from array
  showWord(words);
  // Start matching on word input
  wordInput.addEventListener('input', startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
}

// Start match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = '';
    score++;
  }
  
  // Highscore based on score value for Session Storage
  if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
    sessionStorage['highscore'] = score;
  } else {
    sessionStorage['highscore'] = sessionStorage['highscore'];
  }

  // Prevent display of High Score: -1
  if (sessionStorage['highscore'] >= 0) {
  highscoreDisplay.innerHTML = sessionStorage['highscore'];
  }

  // If score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = 'Correct!!!';
    return true;
  } else {
    message.innerHTML = '';
    return false;
  }
}

// Pick & show random word
function showWord(words) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countdown() {
  // Make sure time is not run out
  if (time > 0) {
    // Decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = 'Game Over!!!';
    score = -1;
  }
}
