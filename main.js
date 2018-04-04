// variables
let output = document.querySelector("#output");
let onlineStreamers = document.querySelector("#online-streamers");
let offlineStreamers = document.querySelector("#offline-streamers");
let home = document.querySelector("#all-streamers");
onlineStreamers.addEventListener("click", showOnlineStreamers);
home.addEventListener("click", showAllStreamers);
offlineStreamers.addEventListener("click", showOfflineStreamers);
// streamers
const streamers = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

function getData() {
  // proxy url only in development
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://wind-bow.gomix.me/twitch-api/streams/";
  streamers.forEach((streamer, i) =>
    fetch(`${proxyUrl}${url}${streamer}`)
      .then(response => response.json())
      .then(data => {
        if (data.stream) {
          output.innerHTML += `<li class="list-group-item text-left on"><a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a> <span class="text-success">On</span></li>`;
        } else {
          output.innerHTML += `<li class="list-group-item text-left off"><a href="https://www.twitch.tv/${streamer}" target="_blank">${streamer}</a> <span class="text-danger">Off</span></li>`;
        }
      })
      .catch(err => console.log(err))
  );
}

getData();

function showOnlineStreamers(e) {
  home.classList.remove("active");
  offlineStreamers.classList.remove("active");
  onlineStreamers.classList.add("active");
  document.querySelectorAll(".off").forEach(el => (el.style.display = "none"));
  document.querySelectorAll(".on").forEach(el => (el.style.display = "block"));
}
function showOfflineStreamers(e) {
  home.classList.remove("active");
  offlineStreamers.classList.add("active");
  onlineStreamers.classList.remove("active");
  document.querySelectorAll(".on").forEach(el => (el.style.display = "none"));
  document.querySelectorAll(".off").forEach(el => (el.style.display = "block"));
}
function showAllStreamers(e) {
  home.classList.add("active");
  offlineStreamers.classList.remove("active");
  onlineStreamers.classList.remove("active");
  document
    .querySelectorAll(".list-group-item")
    .forEach(el => (el.style.display = "block"));
}
