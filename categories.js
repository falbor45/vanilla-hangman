let createBackEl = () => {
  let aTag = document.createElement('a');
  aTag.href = "index.html"
  let el = document.createElement('p');
  el.innerHTML = "Back to menu"
  aTag.appendChild(el);
  return aTag;
}
let categories = [];
let counter = 1;

for (let i = 0; i < data.words.length; i++) {
  if (!categories.includes(data.words[i].category)) {
    categories.push(data.words[i].category);
    let el = document.createElement('p');
    el.style.margin = "12px 0";
    document.getElementsByClassName('content-wrapper')[0].appendChild(el).innerHTML = `${counter}. ${data.words[i].category}`;
    counter++;
  }
}

document.getElementsByClassName('content-wrapper')[0].style.marginTop = "0px";
document.getElementsByClassName('content-wrapper')[0].appendChild(createBackEl());