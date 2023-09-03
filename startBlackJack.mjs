
import { getDealerHandForPlaying, getPlayerHandForPlaying, handValue, handValueWithAces} from "./getHands.mjs";
import {deck} from "./deckForPlaying.mjs"
import * as readline from 'node:readline/promises';   //This uses the promise-based APIs // Импорт для ввода через консоль
import { stdin as input, stdout as output } from 'node:process'; // Импорт для ввода через консоль


//Неизменяемые переменные
const giveOneCard = 1
const giveTwoCards = 2
const bjScore = 21

// Сообщения


const balanceAsk = 'How much your balance will be? (Enter integer number) \n'
const yourBalanceNow = 'Your balance now is:'
const betAsk = 'What is your BET? ( Enter a integer number) \n'
const oneMoreCardAsk = "Are you need one more card? (Print 'yes' if you need one more card, 'No' Dealer turn) \n"
const finishRoundAsk = 'Do you want play new round?(print "yes" for new round, "no" to finish) \n'
const finishGameAsk = 'Finish game?(print "yes" to quite the game) \n'
const playerBjMessage = 'Congratulation! You have BLACKJACK! You are WON!'
const dealerBjMessage = 'Sorry Dealer have BLACKJACK! You lose your bet'
const playerLoseMessage = 'Sorry, you are lose your bet!'
const dealerOverScoreMessage = 'You are won. Dealer have OVERSCORE!'
const congratsMessage = 'You are WINNER!'
const loseMessage = 'You are lose!'
const drawMessage = "Oops! It's a DRAW! Try again!"
const bothHands = "Both hands defined"
const playerHandMessage = "Final player hand is:"
const dealerHandMessage = "Final dealer hand is:"
const stars = "***********************************************"
const siYa = "See you next time! Good luck!"


// Изменяемые переменные
let handScoreWithAces = 0
let playerHandScore = 0
let dealerHandScore = 0
let roundstart
let gamestart
let playerBalance = 0
let playerBet = 0
let answerCard
let playerHand =[]
let dealerHand =[]
let start = true



//Сбрасываем переменные к начальному состоянию
function setSettingsToDefault () {
    playerBet = 0
}

 // Обнуление руки Игрока
 function resetPlayeerHand (playerHand) {
 for (let i = playerHand.length; i !==0; i--) {
    playerHand.pop(i) }
    return playerHand
}
//Обнулении руки Дилера
function resetDealerHand(dealerHand) {
    for (let i = dealerHand.length; i !==0; i--) {    
    dealerHand.pop(i)}
    return dealerHand
}



//Проверки рук Дилера и Игрока

//есть ли БЛЭКДЖЕК
function blackjackCheck(hand, value){
    if (hand.length === 2 && value === bjScore)
    return true
}
//Проверка на перебор и Тузов у Игрока

   


//Проверка на перебор и Тузов у Дилера
function acesDealerOverScore(dealerHandScore, dealerHand){
    if (dealerHandScore > bjScore) {
        dealerHand.forEach(element => {if (element in deck) {
       
            if (deck[element] === undefined) {
                deck[element] = 1
            } 
            
            handScoreWithAces += deck[element]
            return handScoreWithAces
        }
        return handScoreWithAces
    } )
        let finalScore = handScoreWithAces
        handScoreWithAces = 0
        return finalScore
    }
    
    
}

//проверка на перебор 
function overScore(value){
    if (value > bjScore)
    return true
}

//Проверка кто выиграл в рануде
function winnerCheck (playerScore, dealerScore){
    if (playerScore > dealerScore) {
        console.log (congratsMessage)
        playerBalance = playerBalance + (2 * playerBet)
        return
    }
    if (playerScore < dealerScore) {
        console.log(loseMessage)
        return
    }
    else {
        console.log(drawMessage)
        playerBalance =playerBalance + playerBet
        return
    }
}



// Проверяем ценность рук   
playerHandScore = handValue(playerHand)

 //тест функции тузов - в случаях когда один туз должен быть 11 а второй 1 - не работает
// как тут АА9 может быть = 21 в функции 11



//Начало игры
while (start !== 'yes') {
    // Проверка баланса для начала - если нет баланса - игрок вводи количество с которым будет играть    
    if (playerBalance === 0 ) {
    const rlBalance = readline.createInterface({ input, output });
    const answerBalance = await rlBalance.question(`${stars} \n${balanceAsk}`);
    rlBalance.close(); 
    playerBalance =  Number(answerBalance)
    console.log(`${stars} \n ${yourBalanceNow} ${playerBalance}`)
    }
    

 // Начало нового раунда раздачи - смотрим на ставку игрока и спрашиваем какова будет ставка
 // наданные момент нет защиты от НЕГАТИВНГО БАЛАНСА ставка может быть больше БАЛАНСА
while (roundstart !== 'no') {
    if (playerBet === 0) {
        const rlBet = readline.createInterface({ input, output });
        const answerBet = await rlBet.question(`${stars} \n ${betAsk}`);
        rlBet.close();
        playerBet = Number(answerBet)
            playerBalance = playerBalance - playerBet
            console.log(`${yourBalanceNow} ${playerBalance}`)
    }
    
    //Раздаем карты Дилеру и Игроку - ИГРОКУ 2 карты, ДИЛЕРУ 1 карту
        playerHand = getPlayerHandForPlaying(giveTwoCards)
        dealerHand = getDealerHandForPlaying(giveOneCard)
        console.log(stars)
        console.log(`Player hand is ${playerHand}`)
        console.log(`Dealer hand is ${dealerHand}`)
    // Проверяем ценность рук   
        playerHandScore = handValue(playerHand)
        dealerHandScore = handValue(dealerHand)
        console.log(stars)
        console.log(`Player hand score is ${playerHandScore}`)
        console.log(`Dealer hand score is ${dealerHandScore}`)

    //Надо проверить на БЛЭКДЖЕК У ИГРОКА - он сразу выиграл
    if  ( blackjackCheck(playerHand, playerHandScore) == true) {
        console.log (playerBjMessage)
        playerBalance = playerBalance + 2,5 * playerBet
        resetPlayeerHand(playerHand)
        resetDealerHand(dealerHand)
        setSettingsToDefault()
        break
    }
    
        //Определяем ценность руки и спрашиваем нужна ли еще одна картам игроку
    if (playerHand.length === 2 && playerHandScore <= 17 ) {
        answerCard = true
        while (answerCard !== 'no') {
            const rlCardAsk = readline.createInterface({ input, output });
            const answerCard = await rlCardAsk.question(`${stars} \n${oneMoreCardAsk}`);
            rlCardAsk.close();
            if (answerCard === 'yes') {
                playerHand = getPlayerHandForPlaying(giveOneCard)
                playerHandScore = handValue(playerHand)
                //Сразу проверям на перебор И ТУЗОВ    
                if (playerHandScore > bjScore) {
                    playerHandScore = handValueWithAces(playerHand)
                }
                console.log(`Player hand after card adding is ${playerHand}`)
                console.log(`Player hand score after card adding is ${playerHandScore}`)
            }         
            if (answerCard === 'no') {
                    break
                }               
            //Сразу проверям на перебор
            if (overScore(playerHandScore) == true) {
                    console.log (playerLoseMessage)
                    break         
            } 
            
        }
    }
    //Надо закончить раунд и не раздавать карты Диллеру если у Игрока перебор + сброс руки и ставки Игрока на начальные значения
    if (overScore(playerHandScore) == true) {
        resetPlayeerHand(playerHand)
        setSettingsToDefault()
        break
    } 
    //Игрок закончил добирать карты

        //Выдает Идлеру 2ю карту и находbn ценность его руки
        dealerHand = getDealerHandForPlaying(giveOneCard)
        dealerHandScore = handValue(dealerHand)
        console.log(stars)
        console.log(`Dealer hand with 2 cards is ${dealerHand}`)
        console.log(`Dealer hand score with 2 cardsis ${dealerHandScore}`)
        //Проверяем на БЛЭКДЖЕК У ДИЛЕРА
        if  ( blackjackCheck(dealerHand, dealerHandScore) == true) {
            console.log (dealerBjMessage)
            resetPlayeerHand(playerHand)
            resetDealerHand(dealerHand)
            setSettingsToDefault()
            break
        }

        //Смотрим на ценность руки Дилера и если она слабая - > добираем карты
        while ( dealerHandScore <= 17 ) {
            dealerHand = getDealerHandForPlaying(giveOneCard)
            dealerHandScore = handValue(dealerHand)
            console.log(stars)
            console.log(`Dealer hand after card adding is ${dealerHand}`)
            console.log(`Dealer hand score after card adding is ${dealerHandScore}`)
            if (dealerHandScore > bjScore) {
            dealerHandScore = acesDealerOverScore(dealerHandScore, dealerHand)
            }
            //Сразу проверям на перебор
            //сразу проверяем на перебор у Дилера
            if (overScore(dealerHandScore) == true) {
                console.log(dealerOverScoreMessage)
                playerBalance = playerBalance + (2 * playerBet)
            }
        }
        //Надо закончить раунд если у Дилера перебор + сброс рук и ставки Игрока на начальные значения
        if (overScore(dealerHandScore) == true) {
            resetPlayeerHand(playerHand)
            resetDealerHand(dealerHand)
            setSettingsToDefault()
            break
        }    
        console.log(stars)
        console.log(`${bothHands}`)
        console.log(`${playerHandMessage} ${playerHand} and score of it: ${playerHandScore}`)
        console.log(`${dealerHandMessage} ${dealerHand} adn score of it: ${dealerHandScore}`)
        console.log(stars)
        //Если не было ни у кого БЛЭКДЖЕКА и ПЕРЕБОРА проверяем кто выиграл

            winnerCheck(playerHandScore, dealerHandScore)

            // Обнуление руки Игрока
            resetPlayeerHand(playerHand)
            //Обнулении руки Дилера
            resetDealerHand(dealerHand) 
            // сбрасываем все переменные
            setSettingsToDefault()
            
            //выводим баланс Игрока ПОСЛЕ раунда

            console.log(`Your balance is ${playerBalance}`)

const rlRound = readline.createInterface({ input, output });
const answertwo = await rlRound.question(finishRoundAsk);
    rlRound.close();
    roundstart = answertwo

} 

const rlGame = readline.createInterface({ input, output });
const answerGame = await rlGame.question(finishGameAsk);
    rlGame.close();
    gamestart =  answerGame
    if (gamestart === 'yes') {
        console.log(siYa)
       break}    

}













