/*
 * Create a list that holds all of your cards
 */
const cardList = document.querySelectorAll('.card');
// Variables
let matchingList = [];
let matches = [];
const movesSpan = document.getElementsByClassName('moves');
let movesCounter = 3;
const re = document.getElementsByClassName('restart')[0];
const winnerModal = document.getElementById('winner');
const loserModal = document.getElementById('loser');
let counter = 0;
let gameOverStatus = false;

/** METHODS **/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleCards(cardlist) {
    let symbols = [];
    cardlist.forEach(card => {
        symbols.push(card.children[0].className);
    });
    // returns an array of symbols
    return shuffle(symbols);
}


function matchCard(card) {
    // if two cards matches turns card to green
    return card.className = "card match";
}

// methods
function initialGame(cardlist) {
    // make all cards open/starting position
    cardlist.forEach(function(card) {
        return openCard(card);
    })
}

function openCard(card) {
    // shows the card symbol - turns blue
    return card.className = "card open show";
}

// then add eventHandler for each card when it's clicked
function addEvent(cardlist, event) {
    return cardlist.forEach(card => {
        return card.addEventListener('click', event);
    });
}

function flipOverCard(card) {
    // turns over the card
    return card.className = "card";
}

function checkMatch(card) {
    // check matches
    let firstCard = matchingList[0].innerHTML.toString();
    let secondCard = card.innerHTML.toString();
    // console.log(firstCard, secondCard);
    if (firstCard === secondCard) {
        // push two items into the matches array
        matches.push(matchingList[0], card);
        // clear the matchingList;
        matchingList = [];
        return true;
    }
    return false;
}

function checkingMoves(counter) {
    counter--;
    movesSpan.innerHTML = counter;
    console.log(movesCounter);
    console.log('counter', counter);
}

function checkGameCompletion(matcheslist, cardlist) {
    if (matcheslist.length === cardlist.length) {
        winnerModal.style.display = "block";
        return true;
    }
    return false;
}

const counting = setInterval(function() {
            countingUp()
        }, 1000);

function countingUp() {
    if (gameOverStatus) {
        stopCounting();
    }
    counter++;
    document.getElementById('timer').innerHTML = counter + ' seconds';
}

function stopCounting() {
    clearInterval(counting);
}

function setUpTimer() {
    const scorePanel = document.getElementsByClassName('score-panel')[0];
    if (document.getElementById('timer')) {
        console.log('it works here');
        let timer = document.getElementById('timer');
        gameOverStatus = false;
        timer.innerHTML = '0 seconds';
        // doesn't run the setInterval again after restarting?
        // maybe something to do with the clearInterval feature?
    } else {
        scorePanel.innerHTML += '<p id="timer">0 seconds</p>';
        counting;
    }

    // sets the gameOverStatus (1 - 5 seconds on counter);
    setInterval(function() {
        gameOverStatus = true;
    }, 4000);

}




function setupGame(cardlist) {
    // initally sets up the game
    initialGame(cardlist);

    // shuffle cards
    const shuffledCardList = shuffleCards(cardList);
    const deckLi = document.getElementsByClassName('deck')[0].children;
    for (let i = 0; i < deckLi.length; i++) {
        deckLi[i].innerHTML = '<i class="' + shuffledCardList[i] + '"></i>';
    }

    // flip over cards
    setTimeout(function() {
        cardlist.forEach(card => {
            return flipOverCard(card);
        });
    }, 2000);

    // start timer
    setUpTimer();

    // reset button
    re.addEventListener('click', function() {
        // reset values for finding out matches
        matchingList = [];
        matches = [];
        return setupGame(cardList);
    });

    // play again button
    const playagain = document.getElementsByClassName('restart');
    for (let i = 0; i < playagain.length; i++) {

        playagain[i].addEventListener('click', function() {
            // reset values for finding out matches
            matchingList = [];
            matches = [];
            // FIX: can I identify if the loser or winner modal is activated to avoid extra css?
            winnerModal.style.display = "none";
            loserModal.style.display = "none";
            return setupGame(cardList);
        });
    };

    // click and show card
    cardList.forEach(card => {
        return card.addEventListener('click', function() {
            // opens the card
            openCard(card);
            matchingList.push(card);
            if (matchingList.length === 2) {
                // check if it matches
                if (checkMatch(card)) {
                    console.log('These cards match');
                    matches.forEach(card => {
                        return matchCard(card);
                    })
                    matchingList = [];
                } else {
                    console.log('No match, resetting matchingList');
                    // slow down the flipover;
                    setTimeout(function() {
                        flipOverCard(matchingList[0]);
                        flipOverCard(matchingList[1]);
                        matchingList = [];
                    }, 400)
                }
                // checkingMoves(movesCounter);
                if (checkGameCompletion(matches, cardList)) {
                    console.log('Game Over!');
                    // display a game over button, then give option to restart game?
                    setupGame(cardList); // auto restart
                } else {
                    console.log('Keep Playing');
                }
            }
        });
    });
} // end of setupGame function



// INITATE GAME AT START OF THE APP

(function() {

    /** INITATE GAME **/
    setupGame(cardList);
})(cardList);



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */