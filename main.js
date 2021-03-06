{
  let data = {
    tries: 10,
    words: [
      {
        category: 'Books',
        title: 'Shining',
        hint: 'Redrum, redrum!'
      },
      {
        category: 'Books',
        title: 'Harry Potter and The Chambers Of Secrets',
        hint: 'Big snake in school of wizards'
      },
      {
        category: 'Books',
        title: 'Hobbit or There and Back again',
        hint: "I'm going on an adventure"
      },
      {
        category: 'Games',
        title: 'Super Mario Bros',
        hint: 'Collecting coins, eating shrooms and saving the queen'
      },
      {
        category: 'Games',
        title: 'Worms World Party',
        hint: 'Maggots fight around the globe '
      },
      {
        category: 'Games',
        title: 'Witcher Wild Hunt',
        hint: 'White haired dude with two swords'
      },
      {
        category: 'Movies',
        title: 'Wolf from wall street',
        hint: 'Leonardo Di Caprio, drugs and money'
      },
      {
        category: 'Movies',
        title: 'Avatar',
        hint: 'Blue, tall humans with strange ears utopia'
      },
      {
        category: 'Movies',
        title: 'Captain America: Civil War',
        hint: 'First Avenger and Iron Man fight each other'
      }
    ]
  }

  let createBackEl = () => {
    let aTag = document.createElement('a');
    aTag.href = "index.html"
    let el = document.createElement('p');
    el.innerHTML = "Back to menu"
    aTag.appendChild(el);
    return aTag;
  }

  let randomWord = () => {
    let result;
    let RNG = Math.floor(Math.random() * data.words.length);
    result = data.words[RNG];
    return result;
  }

  let msToTime = (duration) => {
    let s = parseInt((duration / 1000) % 60)
    let m = parseInt((duration / (1000 * 60)) % 60)
    let h = parseInt((duration / (1000 * 360)) % 24)

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    return `${h} h ${m} min ${s} sec`
  }

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
          return null;
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
    let val = document.getElementById('answerInput').value.toLowerCase();
    let targetVal = chosenWord.title.toLowerCase();
    console.log(targetVal);
    if (val === targetVal) {
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

  let submitName = (value, time) => {
    let scoreboard = localStorage.getItem("scoreboard") !== null ?
      JSON.parse(localStorage.getItem("scoreboard")) : [];
    scoreboard.push({[value]: time})

    localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    window.location.href = "./index.html"
  }

  let showVictoryScreen = () => {
    let endTime = new Date().getTime();
    let completionTime = msToTime(endTime - startTime);
    selMain.innerHTML = "";
    let el = document.createElement('p');
    let nameProv = document.createElement('input');
    let confButton = document.createElement('button');
    nameProv.type = "text"
    nameProv.className = "answer-input"
    nameProv.placeholder = "Provide your name"
    nameProv.id = "nameInput"
    confButton.innerHTML = "OK";
    confButton.onclick = () => submitName(document.getElementById('nameInput').value, endTime - startTime);
    selMain.appendChild(el).innerHTML = `You have won!<br>Your time was:<br>${completionTime}`;
    selMain.appendChild(nameProv);
    selMain.appendChild(confButton);
  }

  let showDefeatScreen = () => {
    selMain.innerHTML = "";
    let el = document.createElement('p')
    el.innerHTML = `You lost!<br>The correct word was:<br>${chosenWord.title}`
    selMain.appendChild(el)
    selMain.appendChild(createBackEl())
  }

  let startTime = new Date().getTime();
  let selMain = document.getElementsByClassName('main-screen')[0];
  let chosenWord = randomWord()
  let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  let guessArea = null;
  let chances = data.tries;
  let lettersLeft = 0;

  document.querySelector(".content-wrapper p").innerHTML += `${chosenWord.category}`

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

}