/**

Fixes to make:
1) clicking more than once on a card activates the move counter
2) restarting the cards the cards automatically gets the 'match' class

**/



// Variables
// list holds all cards
const cardList = document.querySelectorAll('.card');
let matchingList = [];
let matches = [];
let movesCounter = 0;
const re = document.getElementsByClassName('restart')[0];
const winnerModal = document.getElementById('winner');
let counter = 0;
let gameOverStatus = false;
let stars = 3;

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
        return flipOverCard(card);
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
    console.log('checkMatch list 0', matchingList[0]);
    // check matches
    let firstCard = matchingList[0].innerHTML.toString();
    let secondCard = card.innerHTML.toString();
    if (firstCard === secondCard) {
        // disable click on both cards:
        matchingList[0].style.pointerEvents = "none";
        card.style.pointerEvents = "none";
        // push two items into the matches array
        matches.push(matchingList[0], card);
        // clear the matchingList;
        matchingList = [];
        return true;
    }
    return false;
}

function checkingMoves() {
    const movesSpan = document.getElementsByClassName('moves')[0];
    const starsList = document.getElementsByClassName('stars')[0];
    if(movesCounter % 2 === 0 && movesCounter > 0) {
        if(starsList.childNodes[0]) {
            if(stars > 0) {
              stars--;  
            }
            starsList.removeChild(starsList.childNodes[0]);
        }
    }
    
   movesCounter++; 
   movesSpan.innerHTML = movesCounter;
}

function checkGameCompletion(matcheslist, cardlist) {
    if (matcheslist.length === cardlist.length) {
        winnerModal.style.display = "block";
        return true;
    }
    return false;
}

let counting = setInterval(function() {
            countingUp()
        }, 1000);

function countingUp() {
    if (gameOverStatus) {
        stopCounting();
    }
    counter++;
    // only counts up in seconds (need formula to count up in minutes);
    document.getElementById('timer').innerHTML = counter + ' seconds';
}

function stopCounting() {
    clearInterval(counting);
}

function setUpTimer() {
    const scorePanel = document.getElementsByClassName('score-panel')[0];
    let timer = document.getElementById('timer');
    // timer exists then just reset the setInterval counter
    if (timer !== null) {
        timer.innerHTML = '0 seconds';
        counter = 0;
        gameOverStatus = false;
        counting = setInterval(function() {
            countingUp()
        }, 1000);
    } else {
        scorePanel.innerHTML += '<p id="timer">0 seconds</p>';
        counting;
    }

}

function resetScorePanel() {
    movesCounter = 0;
     const movesSpan = document.getElementsByClassName('moves')[0];
     movesSpan.innerHTML = movesCounter;
    // star rating reset
    const starsList = document.getElementsByClassName('stars')[0];
    // clears the childNodes
    starsList.innerHTML = '';

    // append 3 stars for childNodes to starsList
    for(let i = 0; i < 3 ; i++) {
        let node = document.createElement('LI');
        let starNode = document.createElement('i')
        starNode.className = 'fa fa-star';
        node.appendChild(starNode);
        starsList.appendChild(node);
    }
}


function setupRestartButton(cardlist) {
 // play again button
    const playagain = document.getElementsByClassName('restart');

    for(let i = 0; i < playagain.length; i++) {
       playagain[i].addEventListener('click', function() {
        // reset values for finding out matches
        matchingList = [];
        matches = [];
        // reset score Panel
        resetScorePanel();
        winnerModal.style.display = "none";
        resetGame(cardlist);
    }); 
    }
    
}


function resetGame(cards) {
    const cardlist = [...cards];
    initialGame(cardlist);
    // reenable click on all cards:
    cardlist.forEach(card => {
        return card.style.pointerEvents = "visible";
    });
}



function setupGame(cards) {

    // copy the cardList so that it doesn't get altered each time setup
    const cardlist = [...cards];
    
    // initally sets up the game
    initialGame(cardlist);


    // shuffle cards
    const shuffledCardList = shuffleCards(cardlist);
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

   
    setUpTimer();
    setupRestartButton(cardlist);

    // click and show card
    cardlist.forEach(card => {
        return card.addEventListener('click', function() {
            // opens the card
            openCard(card);

            matchingList.push(card);

            if (matchingList.length === 2) {
                // add # of moves to moveCounter
                // changes star ratings based on # of moves
                checkingMoves();
                // check if it matches
                if (checkMatch(card)) {
                    matches.forEach(card => {
                        return matchCard(card);
                    })
                    matchingList = [];
                } else {
                    // slow down the flipover
                    setTimeout(function() {
                        flipOverCard(matchingList[0]);
                        flipOverCard(matchingList[1]);
                        matchingList = [];
                    }, 400)
                }
                // checkingMoves(movesCounter);
                if (checkGameCompletion(matches, cardlist)) {
                    gameOverStatus = true;
                    const winnerMessage = document.getElementById('winner-message');
                    winnerMessage.innerHTML = 'Congratulations! You completed the game in ' + (counter + 1) + ' seconds and with ' + stars + ' stars left';
                }
            }
        });
    });
    console.log('cardlist', cardlist);
    console.log('matching list', matchingList, matches);
} // end of setupGame function


// INITATE GAME AT START OF THE APP

(function() {
    /** INITATE GAME **/
    setupGame(cardList);
})(cardList);

