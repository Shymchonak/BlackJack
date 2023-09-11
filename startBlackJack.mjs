
import { getDealerHandForPlaying, getPlayerHandForPlaying, handValue, handValueWithAces} from "./getHands.mjs";
import {deck} from "./deckForPlaying.mjs"
import * as readline from 'node:readline/promises';   //This uses the promise-based APIs // Импорт для ввода через консоль
import { stdin as input, stdout as output } from 'node:process'; // Импорт для ввода через консоль



//Неизменяемые переменные
const CMD_GIVE_ONE_CARD = 1
const CMD_GIVE_TWO_CARDS = 2
const CMD_BJ_SCORE = 21
const CMD_HAND_PLAYER_SCORE_TO_ADD_CARD = 17
const CMD_HAND_DEALER_SCORE_TO_ADD_CARD = 17

// Сообщения
// ASK MESSAGES

const ASK_BALANCR = 'How much your balance will be? (Enter integer number) \n'
const ASK_YOUR_BET = 'What is your BET? ( Enter a integer number) \n'
const ASK_ONE_MORE_CARD = "Are you need one more card? (Print 'yes' if you need one more card, 'No' Dealer turn) \n"
const ASK_FINISH_ROUND = 'Do you want play new round?(print "yes" for new round, "no" to finish) \n'
const ASK_FINISH_GAME = 'Finish game?(print "yes" to quite the game) \n'

//INFO MESSAGES
const INFO_YOUR_BALANCE = 'Your balance now is:'
const INFO_PLAYER_BJ = 'Congratulation! You have BLACKJACK! You are WON!'
const INFO_DEALER_BJ = 'Sorry Dealer have BLACKJACK! You lose your bet'
const INFO_PLAYER_LOSE_BET = 'Sorry, you are lose your bet!'
const INFO_DEALER_OVER_SCRORE = 'You are won. Dealer have OVERSCORE!'
const INFO_PLAYER_WIN = 'You are WINNER!'
const INFO_PLAYERS_LOSE = 'You are lose!'
const INFO_DRAW = "Oops! It's a DRAW! Try again!"
const INFO_BOTH_HANDS = "Both hands defined"
const INFO_PLAYER_HAND = "Final player hand is:"
const INFO_DEALER_HAND = "Final dealer hand is:"
const INFO_YOU_TRY_ENTER_STRING = 'You try enter STRING! Please enter only numbers!'
const INFO_YOU_TRY_ENTER_EMPTY_DATA = 'Your try enter NO DATA! Please enter only numbers!'
const INFO_SEE_YOU = "See you next time! Good luck!"
const INFO_YOUR_BET_MORE_THAN_BALANCE = "Your bet is more than your balance! Please enter another one!"
const INFO_ENTER_NEGATIVEV_VALUE = "You try enter negative number! Please enter only positive numbers!"
const INFO_YOU_TRY_ENTER_SPACES = "Your try enter NODATA or ONLY SPACES! Enter only numbers please!"
//COMAN MESSAGES
const CMD_STARS = "***********************************************"


// Изменяемые переменные

class MutableVariables {
    constructor () {      
        this.value = 0
        this.undefined = undefined
        this.array = []
        this.booleantrue = true
    }

}

let handScoreWithAces = new MutableVariables().value
let playerHandScore = new MutableVariables().value
let dealerHandScore = new MutableVariables().value
let roundstart = new MutableVariables().undefined
let gamestart = new MutableVariables().undefined
let playerBalance = new MutableVariables().value
let playerBet = new MutableVariables().value
let answerCard = new MutableVariables().undefined
let playerHand =new MutableVariables().array
let dealerHand =new MutableVariables().array
let start = new MutableVariables().booleantrue



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
    if (hand.length === 2 && value === CMD_BJ_SCORE)
    return true
}
//Проверка на перебор и Тузов у Игрока

   


//Проверка на перебор и Тузов у Дилера
function acesDealerOverScore(dealerHandScore, dealerHand){
    if (dealerHandScore > CMD_BJ_SCORE) {
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
    if (value > CMD_BJ_SCORE)
    return true
}

//Проверка кто выиграл в рануде
function winnerCheck (playerScore, dealerScore){
    if (playerScore > dealerScore) {
        console.log (INFO_PLAYER_WIN)
        playerBalance = playerBalance + (2 * playerBet)
        return
    }
    if (playerScore < dealerScore) {
        console.log(INFO_PLAYERS_LOSE)
        return
    }
    else {
        console.log(INFO_DRAW)
        playerBalance = playerBalance + playerBet
        return
    }
}

//Проверки ввода

function checkEnterString(enteredValue)
{ if (isNaN(enteredValue) == true ){
    console.log(INFO_YOU_TRY_ENTER_STRING)
    }
}

function checkEnterSpaces(enteredSpace) {
    if (enteredSpace.trim() === ''){
        console.log(INFO_YOU_TRY_ENTER_SPACES)
        }
}


function checkBetMoreThanBalance(bet,balance){
    if(bet > balance){
        console.log(INFO_YOUR_BET_MORE_THAN_BALANCE)
    }
}
function checkNegativeNumber(number){
    if (number < 0){
        console.log(INFO_ENTER_NEGATIVEV_VALUE)
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
    const answerBalance = await rlBalance.question(`${CMD_STARS} \n${ASK_BALANCR}`);
    rlBalance.close();
    playerBalance =  Number(answerBalance)
    checkEnterSpaces(answerBalance)
    checkEnterString(playerBalance)
    checkNegativeNumber(playerBalance)
    while (isNaN(playerBalance) == true || Boolean(answerBalance) == false || playerBalance <= 0) {
        playerBalance = undefined
        const rlBalance = readline.createInterface({ input, output });
        const answerBalance = await rlBalance.question(`${CMD_STARS} \n${ASK_BALANCR}`);
        rlBalance.close();
        playerBalance = Number(answerBalance)
        checkEnterSpaces(answerBalance)
        checkEnterString(playerBalance)
        checkNegativeNumber(playerBalance)       
        if (isNaN(playerBalance) == false && Boolean(answerBalance) == true && playerBalance !== 0 && playerBalance > 0){
            break
        }
    }   
    console.log(`${CMD_STARS} \n ${INFO_YOUR_BALANCE} ${playerBalance}`)
    }
    

 // Начало нового раунда раздачи - смотрим на ставку игрока и спрашиваем какова будет ставка
while (roundstart !== 'no') {
    if (playerBet === 0) {
        const rlBet = readline.createInterface({ input, output });
        const answerBet = await rlBet.question(`${CMD_STARS} \n ${ASK_YOUR_BET}`);
        rlBet.close();
        playerBet = Number(answerBet)
  //      checkEnterEmptyData(answerBet)
        checkEnterSpaces(answerBet)
        checkEnterString(playerBet)
        checkNegativeNumber(playerBet)
        checkBetMoreThanBalance(playerBet, playerBalance)
        while (isNaN(playerBet) == true || Boolean(answerBet) == false || playerBet <= 0 || playerBet > playerBalance) {
            playerBet = undefined
            const rlBet = readline.createInterface({ input, output });
            const answerBet = await rlBet.question(`${CMD_STARS} \n ${ASK_YOUR_BET}`);
            rlBet.close();
            playerBet = Number(answerBet)
            checkEnterSpaces(answerBet)
            checkEnterString(playerBet)
            checkNegativeNumber(playerBet)
            checkBetMoreThanBalance(playerBet, playerBalance)       
            if (isNaN(playerBet) == false && Boolean(answerBet) == true && playerBet !== 0 && playerBet <= playerBalance && playerBet > 0){
                break
            }
        }   

            playerBalance = playerBalance - playerBet
            console.log(`${INFO_YOUR_BALANCE} ${playerBalance}`)
    }
    
    //Раздаем карты Дилеру и Игроку - ИГРОКУ 2 карты, ДИЛЕРУ 1 карту
        playerHand = getPlayerHandForPlaying(CMD_GIVE_TWO_CARDS)
        dealerHand = getDealerHandForPlaying(CMD_GIVE_ONE_CARD)
        console.log(CMD_STARS)
        console.log(`Player hand is ${playerHand}`)
        console.log(`Dealer hand is ${dealerHand}`)
    // Проверяем ценность рук   
        playerHandScore = handValue(playerHand)
        dealerHandScore = handValue(dealerHand)
        console.log(CMD_STARS)
        console.log(`Player hand score is ${playerHandScore}`)
        console.log(`Dealer hand score is ${dealerHandScore}`)

    //Надо проверить на БЛЭКДЖЕК У ИГРОКА - он сразу выиграл
    if  ( blackjackCheck(playerHand, playerHandScore) == true) {
        console.log (INFO_PLAYER_BJ)
        playerBalance = playerBalance + 2,5 * playerBet
        resetPlayeerHand(playerHand)
        resetDealerHand(dealerHand)
        setSettingsToDefault()
        continue
    }
    
        //Определяем ценность руки и спрашиваем нужна ли еще одна картам игроку
    if (playerHand.length === 2 && playerHandScore <= CMD_HAND_PLAYER_SCORE_TO_ADD_CARD ) {
        answerCard = true
        while (answerCard !== 'no') {
            const rlCardAsk = readline.createInterface({ input, output });
            const answerCard = await rlCardAsk.question(`${CMD_STARS} \n${ASK_ONE_MORE_CARD}`);
            rlCardAsk.close();
            if (answerCard === 'yes') {
                playerHand = getPlayerHandForPlaying(CMD_GIVE_ONE_CARD)
                playerHandScore = handValue(playerHand)
                //Сразу проверям на перебор И ТУЗОВ    
                if (playerHandScore > CMD_BJ_SCORE) {
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
                    console.log (INFO_PLAYER_LOSE_BET)
                    const rlRound = readline.createInterface({ input, output });
                    const answerRound = await rlRound.question(ASK_FINISH_ROUND);
                    rlRound.close();
                    roundstart = answerRound
                    break   
            } 
            
        }
    }
    //Надо закончить раунд и не раздавать карты Диллеру если у Игрока перебор + сброс руки и ставки Игрока на начальные значения
    if (overScore(playerHandScore) == true) {
        resetPlayeerHand(playerHand)
        resetDealerHand(dealerHand)
        setSettingsToDefault()
        continue
    } 
    //Игрок закончил добирать карты

        //Выдает Идлеру 2ю карту и находbn ценность его руки
    dealerHand = getDealerHandForPlaying(CMD_GIVE_ONE_CARD)
    dealerHandScore = handValue(dealerHand)
    console.log(CMD_STARS)
    console.log(`Dealer hand with 2 cards is ${dealerHand}`)
    console.log(`Dealer hand score with 2 cardsis ${dealerHandScore}`)
        //Проверяем на БЛЭКДЖЕК У ДИЛЕРА
        if  ( blackjackCheck(dealerHand, dealerHandScore) == true) {
            console.log (INFO_DEALER_BJ)
            resetPlayeerHand(playerHand)
            resetDealerHand(dealerHand)
            setSettingsToDefault()
            const rlRound = readline.createInterface({ input, output });
            const answerRound = await rlRound.question(ASK_FINISH_ROUND);
            rlRound.close();
            roundstart = answerRound
            continue 
        }

        //Смотрим на ценность руки Дилера и если она слабая - > добираем карты
        while ( dealerHandScore <= CMD_HAND_DEALER_SCORE_TO_ADD_CARD ) {
            dealerHand = getDealerHandForPlaying(CMD_GIVE_ONE_CARD)
            dealerHandScore = handValue(dealerHand)
            console.log(CMD_STARS)
            console.log(`Dealer hand after card adding is ${dealerHand}`)
            console.log(`Dealer hand score after card adding is ${dealerHandScore}`)
            if (dealerHandScore > CMD_BJ_SCORE) {
            dealerHandScore = handValueWithAces(dealerHand)
            }
            //Сразу проверям на перебор
            //сразу проверяем на перебор у Дилера
            if (overScore(dealerHandScore) == true) {
                console.log(INFO_DEALER_OVER_SCRORE)
                playerBalance = playerBalance + (2 * playerBet)
            }
        }
        //Надо закончить раунд если у Дилера перебор + сброс рук и ставки Игрока на начальные значения
        if (overScore(dealerHandScore) == true) {
            resetPlayeerHand(playerHand)
            resetDealerHand(dealerHand)
            setSettingsToDefault()
            const rlRound = readline.createInterface({ input, output });
            const answerRound = await rlRound.question(ASK_FINISH_ROUND);
            rlRound.close();
            roundstart = answerRound 
            continue
        }    
        console.log(CMD_STARS)
        console.log(`${INFO_BOTH_HANDS}`)
        console.log(`${INFO_PLAYER_HAND} ${playerHand} and score of it: ${playerHandScore}`)
        console.log(`${INFO_DEALER_HAND} ${dealerHand} adn score of it: ${dealerHandScore}`)
        console.log(CMD_STARS)
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
const answerRound = await rlRound.question(ASK_FINISH_ROUND);
    rlRound.close();
    roundstart = answerRound

} 

const rlGame = readline.createInterface({ input, output });
const answerGame = await rlGame.question(ASK_FINISH_GAME);
    rlGame.close();
    gamestart =  answerGame
    if (gamestart === 'yes') {
        console.log(INFO_SEE_YOU)
       break}    

}













