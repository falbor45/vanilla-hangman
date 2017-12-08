let randomWord = () => {
  let result;
  let RNG = Math.floor(Math.random() * data.words.length);
  result = data.words[RNG];
  return result;
}

let chosenWord = randomWord()
let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
let guessArea = null;
let chances = data.tries;
let lettersLeft = 0;

document.querySelector(".content-wrapper p").innerHTML += `${chosenWord.category}`

let displayWord = () => {
  if (guessArea === null) {
    guessArea = [];
    for (let i = 0; i < chosenWord.title.length; i++) {
      if (chosenWord.title[i].match(/^[A-z]+$/)) {
        guessArea[i] = "_";
        lettersLeft++;
      } else {
        guessArea[i] = " ";
      }
    }
  }
  let el = document.createElement('p');
  for (let i = 0; i < guessArea.length; i++) {
    el.innerHTML += guessArea[i];
  }
  document.getElementById('guessArea').innerHTML = "";
  document.getElementById('guessArea').appendChild(el);
  document.getElementById('chanceCounter').innerHTML = `Chances left: ${chances}`;
  return null;
}

let guessLetter = (ltr) => {
  console.log(ltr)
  let letter = ltr.toLowerCase()
  let matchFound = false;
  document.getElementById(`letter${ltr}`).disabled = true;
  for (let i = 0; i < guessArea.length; i++) {
    if (chosenWord.title[i].toLowerCase() === letter) {
      guessArea[i] = chosenWord.title[i]
      matchFound = true;
      lettersLeft--;
      console.log(lettersLeft)
      if (lettersLeft === 0) {
        showVictoryScreen();
      }
    }
  }

  if (matchFound === false) {
    chances--;
    if (chances === 0) {
      showDefeatScreen();
    }
  }
  if (chances !== 0) {
    displayWord()
  }

  return null;
}

let fullGuess = () => {
  let val = document.getElementById('answerInput').value;
  if (val === chosenWord.title) {
    showVictoryScreen();
  } else {
    showDefeatScreen();
  }
}

let showHint = () => {
  let el = document.createElement('p')
  el.innerHTML = chosenWord.hint;
  document.getElementsByClassName("hint-wrapper")[0].appendChild(el);
  document.getElementById('showHint').disabled = true;
  return null;
}

let showVictoryScreen = () => {
  document.body.innerHTML = "";
}

let showDefeatScreen = () => {
  document.body.innerHTML = "";
}

{
  letters.map((e) => {
    let eDiv = document.createElement('div');
    let el = document.createElement('button');
    el.innerHTML = `${e}`;
    el.onclick = () => guessLetter(e)
    el.className = "letter-button"
    el.id = `letter${e}`
    document.getElementById("letterWrapper").appendChild(el);
    if (letters.indexOf(e) === 8 || letters.indexOf(e) === 16) {
      document.getElementById("letterWrapper").appendChild(eDiv);
    }
  })
}

document.getElementById('submitAnswer').onclick = () => fullGuess();
document.getElementById('showHint').onclick = () => showHint();

displayWord()
