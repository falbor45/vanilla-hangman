let createBackEl = () => {
  let aTag = document.createElement('a');
  aTag.href = "index.html"
  let el = document.createElement('p');
  el.innerHTML = "Back to menu"
  aTag.appendChild(el);
  return aTag;
}

let msToTime = (duration) => {
  let ms = parseInt((duration % 1000) / 100)
  let s = parseInt((duration / 1000) % 60)
  let m = parseInt((duration / (1000 * 60)) % 60)
  let h = parseInt((duration / (1000 * 360)) % 24)

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  return `${h} h ${m} min ${s} sec`
}

let scoreboard = localStorage.getItem("scoreboard") !== null ?
  JSON.parse(localStorage.getItem("scoreboard")) : [];

scoreboard.sort((a, b) => {
  let aKey = Object.keys(a)[0];
  let bKey = Object.keys(b)[0];

  return a[aKey] - b[bKey];
}).slice(0, 10);

for (let i = 0; i < scoreboard.length; i++) {
  let el = document.createElement('p');
  let name = Object.keys(scoreboard[i])[0];
  let time = msToTime(scoreboard[i][Object.keys(scoreboard[i])[0]]);
  el.innerHTML = `${i + 1}. ${name} - ${time}`;
  el.className = "scoreboard-position"
  document.getElementsByClassName("content-wrapper")[0].appendChild(el);
}

document.getElementsByClassName('content-wrapper')[0].style.marginTop = "0px";
document.getElementsByClassName("content-wrapper")[0].appendChild(createBackEl())
