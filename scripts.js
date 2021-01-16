
var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

var type, numOfPairs = 3;
var cardIDs = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12"];
var cardIMGs = ["img/cards/card1.png", "img/cards/card2.png", "img/cards/card3.png", "img/cards/card4.png", "img/cards/card5.png", "img/cards/card6.png",
                "img/cards/card7.png", "img/cards/card8.png", "img/cards/card9.png", "img/cards/card10.png", "img/cards/card11.png", "img/cards/card12.png"];

function setPairs(num) {
    numOfPairs = num;
}

function createBoard() {
    var chosenIDs = cardIDs.sort(function(){
        return 0.5 - Math.random();
    });
    console.log(chosenIDs.slice(cardIDs, numOfPairs));
}
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    var isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 0500);
}
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [false, false];
}

(function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();
cards.forEach(card => card.addEventListener('click', flipCard));