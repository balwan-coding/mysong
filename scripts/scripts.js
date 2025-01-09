async function getSongs() {
  let a = await fetch("http://127.0.0.1:5500/songs/");
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  songs = [];

  for (let index = 0; index < as.length; index++) {
    const elment = as[index];
    if (elment.href.endsWith(".mp3")) {
      songs.push(elment.href.split("/songs/")[1]);
    }
  }
  return songs;
}

async function main() {
  let songs = await getSongs();
  console.log(songs);

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  songUL.innerHTML = "";
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      ` <li>
                <img class="invert" src="svg/music.svg" alt="" />
                <div class="info">
                  <div>${song.replaceAll("%20", " ")}</</div>
                </div>
                <div class="playnow">
                  <span>Play Now</span>
                  <img class="invert" src="svg/play.svg" alt="" />
                </div>
              </li>`;
  }

  var audio = new Audio(songs[0]);
  audio.play();

  audio.addEventListener("loadeddata", () => {
    console.log(audio.duration, audio.currentSrc, audio.currentTime);
  });
}

main();
