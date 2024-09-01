
const dealerHandDiv = document.getElementById('dealer-hand')
const playerHandDiv = document.getElementById('player-hand')
const statusDiv = document.getElementById('status')
const playerScore = document.getElementById('playerScore')
const dealerScore = document.getElementById('dealerScore')


const GAME = {
    active: true,
    player: {
        turn: false,
        hand: [],
        score: 0,
        holding: false
    },
    dealer: {
        turn: false,
        hand: [],
        score: 0,
        holding: false,
        faceDown: false
    },
    wins: 0,
    loss: 0,
}
const faces = ['D','C','H','S']
const faceValues = {
    "A":11,
    "2":2,
    '3':3,
    '4':4,
    '5':5,
    '6':6,
    '7':7,
    '8':8,
    '9':9,
    '10':10,
    'J':10,
    'Q':10,
    'K':10,
}
let deck = [] // 52 cards


const displayCards = () => {
    dealerHandDiv.innerHTML = '';
    dealerHandDiv.innerHTML = GAME.dealer.hand.map((card, i, arr) => `<div class="card ${'_' + card} ${(i === arr.length - 1 && arr.length > 1 && GAME.dealer.faceDown) && "face-down"}">${card}</div>`).join('')
    playerHandDiv.innerHTML = '';
    playerHandDiv.innerHTML = GAME.player.hand.map((card) => `<div class="card ${'_' + card}">${card}</div>`).join('')
    playerScore.innerHTML = GAME.player.score
    dealerScore.innerHTML = GAME.dealer.score
    //dealerHandDiv.style.border = GAME.dealer.turn ? '10px solid red' : '1px solid white'
   // playerHandDiv.style.border = GAME.player.turn ? '10px solid red' : '1px solid white'
    
}

const showStatus = (str) => {
    statusDiv.innerHTML = str
}

const shuffle = () => {
    // remove all cards
    deck = []
    // re insert cards iinto the deck
    while(deck.length < 52){
        let card = generateRandomCard()
        if (deck.includes(card)) {
            //console.log(`Card "${card}" was already in the deck...`)
        }else{
            //console.log(`Adding card "${card}"`)
            deck.push(card)
        }
    }
}

const generateRandomCard = () => {
    // get the keys only from the faceValues object
    let keys = Object.keys(faceValues)
    return keys[Math.floor(Math.random() * keys.length)] + faces[Math.floor(Math.random() * faces.length)]
}

/** Return one card from an existing shuffled deck */
const deal = () => {
    return deck.pop()
}

const resetGame = () => {
    shuffle()
    GAME.player.score = 0
    GAME.player.hand = []
    GAME.dealer.score = 0
    GAME.dealer.hand = []
    GAME.dealer.holding = false
    GAME.player.holding = false
    GAME.dealer.turn = false
    GAME.player.turn = false
    displayCards()
    showStatus('')
    //GAME.active = true

}

const randomPlay = () =>{
    if(!GAME.active) {
        GAME.dealer.turn = false
        GAME.player.turn = false
        return
    }
    // dealer will make different choices depending on score (20 5% hit, 10 90% hit)
    let score = GAME.dealer.score
    let hold = true
    if(score < 10){
        // guaranteed hit
        hold = false
    }else if(score <= 15){
        Math.random() < .70 && (hold = false)
    }else{
        // score 16 or higher, probably hold
        Math.random() < .10 && (hold = false) 
    }
    if(hold){
        console.log('dealer hold')
        GAME.dealer.holding = true
        GAME.dealer.turn = false
        GAME.player.turn = true
        if(GAME.player.holding){
            console.log('DRAW - condition A')
            checkDraw()
        }
    }else{
        dealToDealer()
    }
    






}

// "The process is not responding"

// IF (   THIS === THAT   )

const calculateHandValue = (cards) => {
    let total = 0;
    let numAces = 0;

    for (let card of cards) {
        if(card.startsWith('A')){
            // aces are worth 11 right now
            numAces++;
            total += 11;
        }else if(parseInt(card)){
            // 2-10 use value
            total += parseInt(card)
        }else {
            // JQK use 10
            total += 10
        }
    }
    // if we bust, subtract 10 for each ace
    while (numAces > 0 && total > 21){
        numAces--;
        total -= 10;
    }

    return total
}

const checkScores = () => {
    let dealerScore = calculateHandValue(GAME.dealer.hand)
    let playerScore = calculateHandValue(GAME.player.hand)
    GAME.dealer.score = dealerScore
    GAME.player.score = playerScore
    GAME.dealer.turn = false
    GAME.player.turn = false
    
    if (playerScore === 21) {
        GAME.active = false
        GAME.wins++
        console.log('PLAYER wins')
        showStatus(`<h1 class="green">YOU WIN</h1>`)
        // grab the document element
        // update the score or game state
        //resetGame()
    }
    if(dealerScore === 21){
        GAME.active = false
        GAME.loss++
        console.log('DEALER wins')
        showStatus(`<h1 class="red">YOU LOSE</h1>`)
        //resetGame()
    }
    
    if(playerScore > 21){
        GAME.active = false
        GAME.loss++
        console.log('PLAYER busts')
        showStatus(`<h1 class="red">BUST, YOU LOSE!</h1>`)
        //resetGame()
    }
    if(dealerScore > 21){
        GAME.active = false
        GAME.wins++
        console.log('DEALER busts')
        showStatus(`<h1 class="green">DEALER BUST, YOU WIN!</h1>`)
        //resetGame()
    }
    
   
    
    displayCards()
    

}

const dealToDealer = () => {
    if(!GAME.active) {
        GAME.dealer.turn = false
        GAME.player.turn = false
        return
    }
    GAME.dealer.turn = false
    GAME.player.turn = true
    //GAME.dealer.holding = false
     // get a random card
     let card = deal()
     // find the value of that card from faceValueus map
     let value = faceValues[card.slice(0, -1)]
     // give them the card
     GAME.dealer.hand.push(card)
     // increase their score
     //GAME.dealer.score += value
     console.log(`<< DEALER: HIT: ${card} : ${value} (${calculateHandValue(GAME.dealer.hand)})`)
     checkScores()
}

const dealToPlayer = () => {
    if(!GAME.active) {
        GAME.dealer.turn = false
        GAME.player.turn = false
        return
    }
    GAME.dealer.turn = true
    GAME.player.turn = false
    //GAME.player.holding = false
    // get a random card
    let card = deal()
    // find the value of that card from faceValueus map
    let value = faceValues[card.slice(0, -1)]
    // give them the card
    GAME.player.hand.push(card)
    // increase their score
    //GAME.player.score += value
    console.log(`>> PLAYER: HIT: ${card} : ${value} (${calculateHandValue(GAME.player.hand)})`)
    checkScores()
}


const start = () => {
    resetGame()
    GAME.active = true

    // auto deal 1 card to each person
    setTimeout(dealToDealer, 0)
    setTimeout(dealToPlayer, 200)
    setTimeout(() => {
        GAME.dealer.faceDown = true
        dealToDealer();
    }, 400)
    setTimeout(() => {
        dealToPlayer()
        GAME.player.turn = true
        GAME.dealer.turn = false
        displayCards()
    }, 800)



    //randomPlay()





    // dealer checks value (>15), and hits or holds
    // game checks scores
    // player can hit or hold
    // game checks scrores
}

const checkDraw = () => {
    GAME.active = false
    let dealerScore = calculateHandValue(GAME.dealer.hand)
    let playerScore = calculateHandValue(GAME.player.hand)
    if(playerScore > dealerScore){
        showStatus(`<h1>Player wins! (${playerScore} - ${dealerScore})</h1>`)
    }else if(playerScore === dealerScore){
        showStatus(`<h1>TIE! (${playerScore} - ${dealerScore})</h1>`)
    }
    else{
        showStatus(`<h1>Dealer wins! (${playerScore} - ${dealerScore})</h1>`)
    }
}


const playOurTurn = (hit = true) => {
    if(!GAME.active) {
        console.log('You cant play, the game is over')
        return
    }
    GAME.dealer.faceDown = false
    if(hit){
        dealToPlayer()
    }else{
        console.log('>> PLAYER: HOLD')
        GAME.player.holding = true
        GAME.dealer.turn = true
        GAME.player.turn = false
        if(GAME.dealer.holding){
            console.log('DRAW - condition B')
            checkDraw()
        }
    }
    setTimeout(() => {
        randomPlay()
    }, 300)
}


// ES5 ---> function checkWinState () {}
// const checkWiniState = () => {}
//console.log(generateRandomCard())
//start()


console.log(GAME)




