// In English, one die and several dice.

let dice = [];
const die1 = document.querySelector('#die1');
const die2 = document.querySelector('#die2');
const die3 = document.querySelector('#die3');
const msg = document.querySelector('#msg');
const btnPlay = document.querySelector('#theButton');

let score = 0;
let runningGame = true;

/**
 * Generates a random number between 1 and 6, simulating the roll of a die.
 * 
 * @returns {number} The randomly generated number representing the roll of the die.
 */
const rollADie = () => {
    return Math.floor(Math.random() * 6 + 1);
};

/**
 * Rolls multiple dice and returns an array of the results.
 * @param {number} nb - The number of dice to roll.
 * @returns {number[]} - An array of the results of rolling the dice.
 */
const rollManyDice = (nb) => {
    let result = [];
    for (let i = 0; i < nb; i++) {
        result.push(rollADie());
    }
    return result;
};

/**
 * Checks if all elements in an array have the same value.
 * @param {Array} arr - The input array.
 * @returns {boolean} - Returns true if all elements have the same value, false otherwise.
 */
const isSameValue = (arr) => {
    let value = arr[0];
    for (element of arr) {
        if (element != value) {
            return false;
        }
    };
    return true;
};

/**
 * Checks if the given array contains the numbers 1, 2, and 4 in any order.
 * 
 * @param {number[]} arr - The array to check.
 * @returns {boolean} - True if the array contains the numbers 1, 2, and 4; false otherwise.
 */
const is421 = (arr) => {
    arr.sort();
    if (arr[0]==1 && arr[1]==2 && arr[2]==4) {
        return true;
    }
    return false;
}

/**
 * Checks if the given array form a suite in any order.
 * 
 * @param {number[]} arr - The array to check.
 * @returns {boolean} - True if the array form a suite; false otherwise.
 */
const isSuite = (arr) => {
    arr.sort();
    if (arr[0] === (arr[1] - 1) && arr[1] === (arr[2] - 1)) {
        return true;
    }
    return false;
};

/**
 * Checks if the given array contains 2 aces.
 * 
 * @param {number[]} arr - The array to check.
 * @returns {boolean} - True if the array contains 2 aces; false otherwise.
 */
const is2aces = (arr) => {
    arr.sort();

    if ( (arr[0] === 1) && (arr[1] === 1) && arr[2] !== 1) {
        return true;
    }
    return false;
}

/**
 * Displays the score on the webpage. Add a 0 in front of the score if it is less than 10
 */
const displayScore = () => {
    let theScore;
    if (score.toString().length < 2) {
        theScore = '0' + score;
    } else {
        theScore = score;
    }
    document.querySelector('#total').innerText = theScore;
};

/**
 * Function to play the game.
 */
const play = () => {
    msg.innerText = "";
    if (runningGame) {

        dice = rollManyDice(3);
        // die1.innerText = dice[0];
        // die2.innerText = dice[1];
        // die3.innerText = dice[2];
        die1.style.backgroundImage = `url(img/d${dice[0]}.svg)`;
        die2.style.backgroundImage = `url(img/d${dice[1]}.svg)`;
        die3.style.backgroundImage = `url(img/d${dice[2]}.svg)`;
    
        // Check for same dice
        if (isSameValue(dice)) {
            msg.innerText = "Same dice !";
            if (dice[2] == 1) {
                score += 7;
            } else {
                score += dice[0];
            }
        }
    
        // Check for 421
        if (is421(dice)) {
            msg.innerText = "421 !";
            score += 10;
        }
        
        // Check for a Suite
        if (isSuite(dice)) {
            msg.innerText = "Suite !";
            score += 2;
        }
    
        // Check for 2 aces
        if (is2aces(dice)) {
            msg.innerText = "2 aces !";
            score += dice[2];
        }
    }

    if (!runningGame) {
        score = 0;
        runningGame = true;
        btnPlay.innerText = 'Roll...';
        // die1.innerText = "";
        // die2.innerText = "";
        // die3.innerText = "";

        die1.style.backgroundImage = `none`;
        die2.style.backgroundImage = `none`;
        die3.style.backgroundImage = `none`;
        msg.innerText = "Let's play !";
    }


    if (score >= 21) {
        runningGame = false;
        msg.innerText += " YOU WON !";
        btnPlay.innerText = 'New game ?';
    }

    displayScore();
};

btnPlay.addEventListener('click', play);