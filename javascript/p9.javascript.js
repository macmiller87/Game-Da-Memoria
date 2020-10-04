const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let FirstCard, secondCard;
let lockBoard = false;

/* Função para virar carta */
function flipCard() {
    if(lockBoard) return;
    if(this === FirstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        FirstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
}

/* Função que checa se as cartas são iguais */
function checkForMath() {
    if(FirstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

/* Função que desabilita as cartas */
function disableCards() {
    FirstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

/* Função que desvira as cartas */
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        FirstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500)
}

/* Funçaõ que reseta o tabuleiro */
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [FirstCard, secondCard] = [null, null];
}

/* Função que enbaralha as cartas */
(function shuflle() {
    cards.forEach((card) => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;
    })
})();

/* Adiciona evento de clique na carta */
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});
