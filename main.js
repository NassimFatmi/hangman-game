/*
    to do :
    
    [1] success
    [2] json object + fetch
*/

const letters = 'abcdefghijklmnopqrstuvwxyz';

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector('.letters');

lettersArray.forEach(letter => {
    let span = document.createElement('span'),
        spanText = document.createTextNode(letter);

    span.appendChild(spanText);
    span.className = 'letter-box';

    lettersContainer.appendChild(span);
});

// words + category

const words = {
    programming: ['php', 'javascript', 'go', 'scala', 'fortran', 'r', 'mysql', 'python'],
    movies: ['prestige', 'inception', 'parasite', 'interstellar', 'whiplash', 'memento', 'coco', 'up'],
    people: ['albert einstein', 'hitchcock', 'alexander', 'cleopatra', 'mahatma ghandi'],
    countries: ['syria', 'palestine', 'yemen', 'egypt', 'bahrain', 'qatar'],
};

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length),
    randomPropName = allKeys[randomPropNumber],
    randomPropValue = words[randomPropName],
    randomValueNumber = Math.floor(Math.random() * randomPropValue.length),
    randomWord = words[randomPropName][randomValueNumber];

// set the category
document.querySelector('.category span').innerHTML = randomPropName;

// select letters guess
let letterGuessContainer = document.querySelector('.letters-guess'),
    lettersAndSpace = Array.from(randomWord);

// create spans depend on word length

lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement('span');
    // if letter is space
    if (letter === ' ') {
        emptySpan.className = 'with-space';
    }
    // append to letters guess
    letterGuessContainer.appendChild(emptySpan);
});

// the chosen word
let theChosenWord = Array.from(randomWord.toLowerCase());

// guess spans 
let guessSpans = document.querySelectorAll('.letters-guess span');

// set status
let theStatus = false;

// draw element
let theDraw = document.querySelector('.hangman-draw'),
    theWrongAttempts = 0;


// Handle clicking on letters

document.addEventListener('click', (e) => {
    if (e.target.className === 'letter-box') {
        theStatus = false;
        e.target.classList.add('clicked');

        // get clicked letter

        let theClickedLetter = e.target.innerHTML.toLowerCase();
        theChosenWord.forEach((wordLetter, wordIndex) => {
            if (wordLetter === theClickedLetter) {
                theStatus = true;
                // loop on guess spans
                guessSpans.forEach((span, spanIndex) => {
                    if (spanIndex === wordIndex) {
                        guessSpans[spanIndex].innerHTML = wordLetter;
                    }
                });
            }
        });

        if (!theStatus) {
            theWrongAttempts++;
            theDraw.classList.add(`wrong-${theWrongAttempts}`);
            document.getElementById('fail').play();

            if (theWrongAttempts === 8) {
                endGame();
                lettersContainer.classList.add('finished');
            }

        } else {
            document.getElementById('success').play();
        }
    }
});

function endGame() {
    // create pop up
    let div = document.createElement('div'),
        divText = document.createTextNode(`Game Over, The word is ${randomWord}`);
    div.appendChild(divText);
    div.className = 'popup';
    document.body.appendChild(div);

}