
var cards = document.querySelectorAll('.memory-card');
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

var type, numOfPairs;
var cardIDs = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10"];
var cardIMGs = ["img/", "img/", "img/", "img/", "img/", "img/", "img/", "img/", "img/", "img/"];

function createBoard() {
    var chosenIDs = [];
    for (var i = 0; i < numOfPairs; i++) {
        chosenIDs[i] = Math.random() * (i + 1);
        console.log(chosenIDs[i]);
    }
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