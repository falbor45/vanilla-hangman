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
}