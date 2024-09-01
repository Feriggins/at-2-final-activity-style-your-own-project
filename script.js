let deal= document.getElementById("deal")
// add document.getelement at the top always , and addeventlister will always be at the bottom 
// capture the bottom ""
let hold= document.getElementById("hold")

let dealers=document.getElementById("dealer-Hand")
let playerScore = 3
let player=document.getElementById("player-hand")
const keepAllYourVariablesAtTheTop = 0

//const Values =[ 'A', '2','3', '4', '5', '6', '7', '8', '9', '10', 'Q', 'J', 'K' ]
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
    'J':11,
    'Q':11,
    'K':11
}
let deck = [] // 52 cards
/*
IIFE
Immediately Invoked Function Expressions
(() => {
    letconst
    functions () {

    }
})()
*/
const shuffle = () => {
    // remove all cards
    deck = []
    // re insert cards iinto the deck
    while(deck.length < 52){
        let card = generateRandomCard()
        if (deck.includes(card)) continue;
        deck.push(card)
    }
}

const generateRandomCard = () => {
    // get the keys only from the faceValues object
    let keys = Object.keys(faceValues)
    return keys[Math.floor(Math.random() * keys.length)] + faces[Math.floor(Math.random() * faces.length)]
}

const SUITS = ['D','C','S','H',]
const background = new Image();
//const onload = startGame;
background.src = "bg.jpg";

// console.log(player,dealers)


let dealerCards = ""
let playcards = ""
// for every random element

function generateRandomCard (){
    const randomElement = Values[Math.floor(Math.random() * Values.length)];
    playcards += randomElement
    //console.log("I work",deal)
    player.innerHTML= playcards
     // add images later 

    const randomdealers = Values[Math.floor(Math.random() * Values.length)];
    dealerCards += randomdealers
    dealers.innerHTML=dealerCards
    return randomElement
}

const card1 = generateRandomCard()

function playershand (){

    console.log("playershandworled",hold)
}

// const myLibrary = {
//     myValue: 7,
//     myFunc: (a, b) =>  a + b
// }

// // This is dot notation - used to aaccess properties or methods of objects
// // a property is any value like { name: 'mike' }
// // a method is a function within an object, or a function returned from a class
// myLibrary.myFunc(2, 5)



// console.log(myLibrary.myValue)

console.log(myValue)

hold.addEventListener("click", playershand)
deal.addEventListener("click", dealCards);


// dealers move will be at the end 
// callimg the fuction is happening at the eventlistner 
// addeventlistener is working with buttoms on html 




//! variiable hooisting is the act of the JS runtime 
//! environment moving or hoisting variables to the top of the scope


function myFunc (){
    let privateValue = 5
    const CONTANT
    let variables
    // var JUST_DONT_USE_THIS = 'unsafe'
    // ...
    // ...
}

console.log(JUST_DONT_USE_THIS)
