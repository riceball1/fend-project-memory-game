/*
 * Create a list that holds all of your cards
 */
const cardList = document.querySelectorAll('.card');

function matchCard(card1, card2) {
    // if two cards matches turns card to green
    // return card.className="card match";
}

// setup board
// initialGame(cardList);






function openCard(card) {
    // shows the card symbol - turns blue
    return card.className = "card open show";
}


(function() {

    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */

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

    // methods
    function initialGame(cardlist) {
        // make all cards open/starting position
        cardlist.forEach(function(card) {
            return openCard(card);
        })
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


    function startingGame(cardlist) {
        initialGame(cardlist);
        // shuffle cards
        // flip over cards
        setTimeout(function() {
            cardlist.forEach(card => {
                return flipOverCard(card);
            });
        }, 2000);

        // click and show card
        cardList.forEach(card => {
            return card.addEventListener('click', function() {
                return openCard(card);
            });
        });
    }

    // start game
    startingGame(cardList);

    // restart game
    const re = document.getElementsByClassName('restart')[0];
    re.addEventListener('click', function() {
        return startingGame(cardList);
    });





    // check if the first two cards clicked equal
    /// check if there are two cards on the grid that has the class 'card open show'
    /// if it does 
    // otherwise flip them back over;



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