
import {shuffledDeck, deck} from "./deckForPlaying.mjs";

let oneCard = []
let randomPlayerHand = []
let randomDealerHand = []

let handScore = 0
let handScoreWithAces = 0 


// Достаем первую карту в пермешанной колоде
function getOneCard(shuffledDeck) {
  let removedCard = (shuffledDeck.shift())
  oneCard.unshift(removedCard)
    return oneCard
}

//Карты для Игрока можно запусить паратметром 2 - раздаст сразу 2 карты - Стартовая рука
function getPlayerHandForPlaying(times) {
    let randomCard = []
    while (times > 0) {
    randomCard = getOneCard(shuffledDeck)
    randomPlayerHand.unshift(randomCard[0])
    times--
    }
    return randomPlayerHand
}
//Карты для Дилера можно запусить паратметром 1 - раздаст 1 карту - Стартовая рука
function getDealerHandForPlaying(times) {
    let randomCard = []
    while (times > 0) {
    randomCard = getOneCard(shuffledDeck)
    randomDealerHand.unshift(randomCard[0])
    times--
    }
    return randomDealerHand
}

//dealerHand = getDealerHandForPlaying(2)
// playerHand = getPlayerHandForPlaying (2)



//Пробуем избежать переписывание значение туза в колоде


const deckForChecking = {...deck}

//Функция оценки руки 
function handValue (handForEvaluatoin) {
    handForEvaluatoin.forEach(element => {if (element in deckForChecking) {
        
        if (deckForChecking[element] === undefined){
    
            deckForChecking[element] = 11 
           
        }
        handScore += deckForChecking[element]
        return handScore
    }
    return handScore
} )
    let finalScore = handScore
    handScore = 0
    return finalScore
}

//проверка на на тузов при переборе
//сделаем отдельную колоду для этих тузов
const deckForCheckingOverScore = {...deck}

function handValueWithAces (handWithAces) {
    handWithAces.forEach(element => {if (element in deckForCheckingOverScore) {
       
        if (deckForCheckingOverScore[element] === undefined){ 
    
            deckForCheckingOverScore[element] = 1
           
        }
        handScore += deckForCheckingOverScore[element]
        return handScore
    }
    return handScore
} )
    let finalScore = handScore
    handScore = 0
    return finalScore
}
 



export { getDealerHandForPlaying, getPlayerHandForPlaying, handValue, getOneCard, handValueWithAces,shuffledDeck}