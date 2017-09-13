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

// functions

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
        symbols.push(card.children[0]);
    });
    // returns an array of symbols
    return shuffle(symbols);
}

const shuffledCardList = shuffleCards(cardList);
const deck = document.getElementsByClassName('deck');
for(let i = 0; i < shuffledCardList.length; i++) {
    document.append(shuffledCardList[0]);
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
        return true;
    }
    return false;
}

function setupGame(cardlist) {
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    initialGame(cardlist);
    // shuffle cards


    /* 
    for (var i = 0; i < symbols.length; i++) {
    cardHolder.append('<li class="card"><i class="fa fa-' + symbols[i] + '><li>') // add each symbol to card HTML
    }
    */


    // flip over cards
    setTimeout(function() {
        cardlist.forEach(card => {
            return flipOverCard(card);
        });
    }, 2000);

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
                    }, 1000)
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

    re.addEventListener('click', function() {
        // reset values for finding out matches
        matchingList = [];
        matches = [];
        return setupGame(cardList);
    });

    /** INITATE GAME **/
    setupGame(cardList);
})(cardList);


// Issues:
// when more than two cards are clicked, then the first item is flippedOver
// also must store the matches
// must count score for 

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