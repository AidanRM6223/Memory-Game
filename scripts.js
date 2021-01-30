

var cards, cardHolder = document.querySelector(".memory-game");
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;

var type, numOfPairs = 0;
var cardIDs = ["card1", "card2", "card3", "card4", "card5", "card6", "card7", "card8", "card9", "card10", "card11", "card12"];
var cardIMGs = ["card1", "card2", "card3", "card4", "card5", "card6",
                "card7", "card8", "card9", "card10", "card11", "card12"];

function setPairs(num) {
    numOfPairs = num;
}

numOfPairs = 6;
function createBoard() {
    cardHolder.innerHTML = "";
    var chosenIDs = cardIDs.sort(function(){
        return 0.5 - Math.random();
    });
    var chosenIMGs = [];
    chosenIDs = chosenIDs.slice(cardIDs, numOfPairs)
    for (var i = 0; i < chosenIDs.length; i++) {
        chosenIMGs.push("img/cards/" + chosenIDs[i] + ".png");
    }
    for (var i = 0; i < chosenIDs.length; i++) {
        var cardFace = document.createElement("img");
        cardFace.classList.add("front-face");
        cardFace.setAttribute("src", chosenIMGs[i]);
        var cardFaceFront = document.createElement("img");
        cardFaceFront.classList.add("back-face");
        cardFaceFront.setAttribute("src", "img/js-badge.png");
        var newCard = document.createElement("div");
        newCard.classList.add("memory-card");
        newCard.setAttribute("data-framework", chosenIDs[i]);
        newCard.appendChild(cardFace);
        newCard.appendChild(cardFaceFront);
        newCard.addEventListener('click', flipCard);
        var newCardCopy = newCard.cloneNode(true);
        newCardCopy.addEventListener('click', flipCard);
        cardHolder.appendChild(newCard);
        cardHolder.appendChild(newCardCopy);
    }
    cards = document.querySelectorAll(".memory-card");
    shuffle();
    console.log(chosenIDs.slice(cardIDs, numOfPairs));
}
createBoard();
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add("flip");
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        //firstCard.removeEventListener('click', flipCard);
        return;
    }
    
    secondCard = this;
    //secondCard.removeEventListener('click', flipCard);
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
    }, 1000);
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
//