
const deckWithoutValues = []
let shuffledDeck

const deck = {
    '2c': 2,
    '2d': 2,
    '2s': 2,
    '2h': 2,
    '3c': 3,
    '3d': 3,
    '3s': 3,
    '3h': 3,
    '4c': 4,
    '4d': 4,
    '4s': 4,
    '4h': 4,
    '5c': 5,
    '5d': 5,
    '5s': 5,
    '5h': 5,
    '6c': 6,
    '6d': 6,
    '6s': 6,
    '6h': 6,
    '7c': 7,
    '7d': 7,
    '7s': 7,
    '7h': 7,
    '8c': 8,
    '8d': 8,
    '8s': 8,
    '8h': 8,
    '9c': 9,
    '9d': 9,
    '9s': 9,
    '9h': 9,
    'Tc': 10,
    'Td': 10,
    'Ts': 10,
    'Th': 10,
    'Jc': 10,
    'Jd': 10,
    'Js': 10,
    'Jh': 10,
    'Qc': 10,
    'Qd': 10,
    'Qs': 10,
    'Qh': 10,
    'Kc': 10,
    'Kd': 10,
    'Ks': 10,
    'Kh': 10,
    'Ac': undefined,
    'Ad': undefined,
    'As': undefined,
    'Ah': undefined,
}

// Делаем массив из объекта с ключами карт, что бы сделать перемешивание колоды
Object.keys(deck).forEach( key => {
    deckWithoutValues.push(key)
}
)


//перемешиваем получившийся массив алгоритмом тасования Фишера — Йетса
function shuffle(shuffleDeck) {
    var currentIndex = shuffleDeck.length,
      temporaryValue,
      randomIndex
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
  
      temporaryValue = shuffleDeck[currentIndex]
      shuffleDeck[currentIndex] = shuffleDeck[randomIndex]
      shuffleDeck[randomIndex] = temporaryValue
    }
  
    return shuffleDeck
  }
  
  shuffledDeck = (shuffle(deckWithoutValues))


  export { deck, shuffledDeck }