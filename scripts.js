

var cards, cardHolder = document.querySelector(".memory-game");
var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var cardType = null, numOfPairs;
var cardIDs = ["card1", "card2", "card3", "card4", "card5", "card6",
    "card7", "card8", "card9", "card10", "card11", "card12"];
var cardIMGs = ["card1", "card2", "card3", "card4", "card5", "card6",
    "card7", "card8", "card9", "card10", "card11", "card12"];
var startButton = document.getElementById("StartGame");
var resetButton = document.getElementById("ResetGame");
var typeButton;
window.onload = function () {
    var numOfPairsSlider = document.getElementById("numSlider");
    document.getElementById("numValue").innerHTML = numOfPairsSlider.value + " Pairs";
}
function setPairs(num) {
    numOfPairs = Math.round(num *1);
    document.getElementById("numValue").innerHTML = numOfPairs + " Pairs";
    if (cardType != null) {
        startButton.style.visibility = "visible";
    }
}
function resetGame() {
    cardHolder.innerHTML = "";
    document.getElementById("options").style.display = "block";
    startButton.style.display = "none";
    resetButton.style.display = "none";
    typeButton.style.backgroundColor = "#60a3bc";
    cardType = null;
}
function setType(type, _this) {
    _this.style.backgroundColor = "#00b8e6";
    typeButton = _this;
    cardType = type;
    if (numOfPairs > 0) {
        startButton.style.display = "inline-block";
    }
}
numOfPairs = 4;
function createBoard() {
    document.getElementById("options").style.display = "none";
    cardHolder.innerHTML = "";
    resetButton.style.display = "inline-block";
    startButton.style.display = "none";
    

    var chosenIDs = cardIDs.sort(function () {
        return 0.5 - Math.random();
    });
    var chosenIMGs = [];
    chosenIDs = chosenIDs.slice(cardIDs, numOfPairs)
    for (var i = 0; i < chosenIDs.length; i++) {
        if (cardType == "shape")
            chosenIMGs.push("img/cards/shapes/" + chosenIDs[i] + ".png");
        else if (cardType == "animal")
            chosenIMGs.push("img/cards/animals/" + chosenIDs[i] + ".png");
    }
    for (var i = 0; i < chosenIDs.length; i++) {
        var cardFace = document.createElement("img");
        cardFace.classList.add("front-face");
        cardFace.setAttribute("src", chosenIMGs[i]);
        var cardFaceFront = document.createElement("img");
        cardFaceFront.classList.add("back-face");
        cardFaceFront.setAttribute("src", "img/frontFace.png");
        var newCard = document.createElement("div");
        newCard.classList.add("memory-card");
        newCard.setAttribute("data-framework", chosenIDs[i]);
        newCard.appendChild(cardFace);
        newCard.appendChild(cardFaceFront);
        newCard.addEventListener('click', flipCard);
        var newCardCopy = newCard.cloneNode(true);
        newCardCopy.addEventListener('click', flipCard, { passive: false });
        cardHolder.appendChild(newCard);
        cardHolder.appendChild(newCardCopy);
    }
    cards = document.querySelectorAll(".memory-card");
    shuffle();
    console.log(chosenIDs.slice(cardIDs, numOfPairs));
}
function flipCard() {

    if (lockBoard) return;
    if (this === firstCard) return;
    if (!this.classList.contains("flip")) {
        this.classList.add("flip");

        console.log("FLIP");
    }

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        firstCard.removeEventListener('click', flipCard, { passive: false });
        return;
    }

    secondCard = this;
    secondCard.removeEventListener('click', flipCard, { passive: false });
    console.log("Remove click");
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
        firstCard.addEventListener('click', flipCard, { passive: false });
        secondCard.addEventListener('click', flipCard, { passive: false });
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