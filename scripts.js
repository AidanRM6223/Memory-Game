
var cards, cardHolder = document.querySelector(".memory-game");
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

var type, numOfPairs = 3;
var cardIDs = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12"];
var cardIMGs = ["card1", "card2", "card3", "card4", "card5", "card6",
                "card7", "card8", "card9", "card10", "card11", "card12"];

function setPairs(num) {
    numOfPairs = num;
}

function createBoard() {
    var chosenIDs = cardIDs.sort(function(){
        return 0.5 - Math.random();
    });
    var chosenIMGs = [];
    chosenIDs.slice(cardIDs, numOfPairs)
    for (var i = 0; i < chosenIDs.length; i++) {
        chosenIMGs.push("img/cards/" + chosenIDs[i] + ".png");
    }
    for (var i = 0; i < chosenIDs.length; i++) {
        var cardFace = document.createElement("img");
        cardFace.classList.add("front-face");
        cardFace.setAttribute("src", chosenIMGs[i]);
        var newCard = document.createElement("div");
        newCard.classList.add("memory-card");
        newCard.setAttribute("id", chosenIDs[i]);
        newCard.appendChild(cardFace);
        //newCard.innerHTML = "<img class='front-face' src=" + chosenIMGs[i] + ">< img class='back-face' src = 'img/js-badge.svg'>";
        cardHolder.appendChild(newCard);
    }
   
    console.log(chosenIDs.slice(cardIDs, numOfPairs););
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

function shuffle() {
    cards.forEach(card => {
        var randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}
//cards.forEach(card => card.addEventListener('click', flipCard));