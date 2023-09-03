
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



//Функция оценки руки 
function handValue (handForEvaluatoin) {
    handForEvaluatoin.forEach(element => {if (element in deck) {
        
        
        if (deck[element] === undefined){
    
            deck[element] = 11 // Я ТУПОЙ ПЕРЕЗАПИСЫВАЮ заначение ТУЗА В КОЛОДЕ ХЗ КАК РЕШИТЬ
           
        }
        handScore += deck[element]
        return handScore
    }
    return handScore
} )
    let finalScore = handScore
    handScore = 0
    return finalScore
}


//проверка на на тузов при переборе
function handValueWithAces (handWithAces) {
    handWithAces.forEach(element => {if (element in deck) {
       
        if (deck[element] === 11) { //КОСТЫЛЬНЕО РЕШЕНИЕ ДЛЯ РУКИ С ТУЗОМ ИБО ЕГО ЗНАЧЕНИЕ УЖЕ ПЕРЕЗАПИСАНО МНО В ФУНКЦИИ
    
            deck[element] = 1
           
        }
        handScore += deck[element]
        return handScore
    }
    return handScore
} )
    let finalScore = handScore
    handScore = 0
    return finalScore
}




export { getDealerHandForPlaying, getPlayerHandForPlaying, handValue, getOneCard, handValueWithAces,shuffledDeck}