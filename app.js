const rock = document.getElementById('r');
const paper = document.getElementById('p');
const scissors = document.getElementById('s');

const userScore = document.getElementById('user-score');
const computerScore = document.getElementById('computer-score');

const result = document.getElementById('result');

function calculateComputerMove() {
  const computerMove = Math.floor(Math.random() * 3);
  switch (computerMove) {
    case 0:
      return 'R'
    case 1:
      return 'P'
    default:
      return 'S'
  }
}

function getWinner(userMove, computerMove) {
  
  // If the moves match, it's a DRAW
  if (userMove === computerMove) {
    return 'DRAW';
  }
  
  // Checks the USER's Move was incorrect, returning the COMPUTER as winner
  switch (userMove) {
      case 'R':
        if (computerMove === 'P') {
          return 'COMPUTER';
        }
        break;
      case 'P':
        if (computerMove === 'S') {
          return 'COMPUTER';
        }
        break;
      case 'S':
        if (computerMove === 'R') {
          return 'COMPUTER';
        }
        break;
      default:
        break;
    }
    
    // If the USER's Move was correct, then return he as the winner
    return 'USER';
}

function setScore(winner) {
  if (winner === 'USER') {
    const value = userScore.innerHTML;
    const newValue = Number(value) + 1;
    userScore.innerHTML = newValue;
  } else if (winner === 'COMPUTER') {
    const value = computerScore.innerHTML;
    const newValue = Number(value) + 1;
    computerScore.innerHTML = newValue;
  }
}

function setResult(userMove, computerMove, winner) {

  let tempResult = ''; 
  let winAction = ''

  // Generated an initial string to be replaced with the correct data
  // #R# - Rock
  // #P# - Paper
  // #S# - Scissors
  // #ACTION# - cuts / smashes / covers
  if (winner === 'DRAW') {
    tempResult = `#${userMove}# matches #${computerMove}#. Draw!`;
  } else if (winner === 'USER') {
    tempResult = `#${userMove}# #ACTION# #${computerMove}#. You Win!`;
    winAction = userMove;
  } else if (winner === 'COMPUTER') {
    tempResult = `#${computerMove}# #ACTION# #${userMove}#. You Lose!`;
    winAction = computerMove;
  }

  // Makes the replacement of the Moves string
  tempResult = tempResult.replaceAll('#R#', 'rock');
  tempResult = tempResult.replaceAll('#P#', 'paper');
  tempResult = tempResult.replaceAll('#S#', 'scissors');

  // Makes the replacement of the Action string
  switch (winAction) {
    case 'R':
      tempResult = tempResult.replace('#ACTION#','smashes');
      break;
    case 'P':
      tempResult = tempResult.replace('#ACTION#','covers');
      break;
    default:
      tempResult = tempResult.replace('#ACTION#','cuts');
      break;
  }

  // Capitalizes the first character
  tempResult = tempResult.charAt(0).toUpperCase() + tempResult.slice(1);

  result.innerHTML = tempResult;
}

function setWinLoseEffect(target, winner) {

  let className = '';

  switch (winner) {
    case 'USER':
      className = 'blink-win';
      break;
    case 'COMPUTER':
      className = 'blink-lose';
      break;
    default:
      className = 'blink-draw'
      break;
  }

  target.classList.add(className)
  setTimeout(() => {
    target.classList.remove(className);
  }, 1500);
}

function runGame(userMove, target) {
  const computerMove = calculateComputerMove();
  const winner = getWinner(userMove, computerMove);
  
  setScore(winner);
  setResult(userMove, computerMove, winner);
  setWinLoseEffect(target, winner)
}

rock.addEventListener('click', () => {
  rock.classList.add('choice-no-hover');
  runGame('R', rock);
});

rock.addEventListener('mousemove', () => {
  rock.classList.remove('choice-no-hover');
})

paper.addEventListener('click', () => {
  paper.classList.add('choice-no-hover');
  runGame('P', paper);
});

paper.addEventListener('mousemove', () => {
  paper.classList.remove('choice-no-hover');
})

scissors.addEventListener('click', () => {
  scissors.classList.add('choice-no-hover');
  runGame('S', scissors);
});

scissors.addEventListener('mousemove', () => {
  scissors.classList.remove('choice-no-hover');
})