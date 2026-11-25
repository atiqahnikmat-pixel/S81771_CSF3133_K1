
// Rock, Paper, Scissors Game

// Store game scores and round history
let wins = 0;
let losses = 0;
let draws = 0;
let results = [];
let gameStarted = false;
let playerName = "";


// 1. startGame()
// Start the game and validate player name

function startGame() {

    playerName = document.getElementById("playerName").value.trim();

    if (playerName === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;

    document.getElementById("welcome").innerHTML =
        "Welcome, " + playerName + "! Choose Rock, Paper or Scissors.";

    document.getElementById("startTime").innerHTML =
        "Game started on: " + new Date().toLocaleString();

    document.getElementById("result").innerHTML =
        "Good luck, " + playerName + "! Make your first move.";

    document.getElementById("result").style.color = "grey";
}


// 2. getComputerChoice()
// Random computer selection

function getComputerChoice() {

    const choices = ["rock", "paper", "scissors"];

    const randomIndex = Math.floor(Math.random() * 3);

    return choices[randomIndex];
}


// 3. playRound()
// Play one round and calculate the result

function playRound(playerChoice) {

    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    const computerChoice = getComputerChoice();

    let roundResult = "";

    // Check the winner

    if (playerChoice === computerChoice) {

        roundResult = "Draw";
        draws++;

    } else if (

        (playerChoice === "rock" && computerChoice === "scissors") ||

        (playerChoice === "scissors" && computerChoice === "paper") ||

        (playerChoice === "paper" && computerChoice === "rock")

    ) {

        roundResult = "Win";
        wins++;

    } else {

        roundResult = "Lose";
        losses++;

    }


    // Display player and computer images

    document.getElementById("playerImg").src =
        playerChoice + ".png";

    document.getElementById("computerImg").src =
        computerChoice + ".png";


    // Display selected choices

    document.getElementById("playerChoiceText").innerHTML =
        playerChoice;

    document.getElementById("computerChoiceText").innerHTML =
        computerChoice;


    // Display game result

    const resultElement = document.getElementById("result");

    if (roundResult === "Win") {

        resultElement.innerHTML =
            "You Win! " + playerName + " beats the computer.";

        resultElement.style.color = "green";

    } else if (roundResult === "Lose") {

        resultElement.innerHTML =
            "You Lose! The computer wins this round.";

        resultElement.style.color = "red";

    } else {

        resultElement.innerHTML =
            "It's a Draw! Both chose " + playerChoice + ".";

        resultElement.style.color = "grey";

    }


    // Store result in array

    results.push(roundResult);


    // Update scoreboard

    document.getElementById("wins").innerHTML = wins;

    document.getElementById("losses").innerHTML = losses;

    document.getElementById("draws").innerHTML = draws;


    // Add result to history table

    const roundNumber = results.length;

    document.getElementById("historyBody").innerHTML +=

        "<tr>" +

        "<td>" + roundNumber + "</td>" +

        "<td>" + playerChoice + "</td>" +

        "<td>" + computerChoice + "</td>" +

        "<td class='result-" +
        roundResult.toLowerCase() +
        "'>" + roundResult + "</td>" +

        "</tr>";


    // Update round counter

    document.getElementById("roundCount").innerHTML =
        roundNumber +
        (roundNumber === 1 ? " round played" : " rounds played");


    document.getElementById("summary").innerHTML = "";

}


// 4. showSummary()
// Count wins using for loop

function showSummary() {

    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let totalWins = 0;


    // Count total wins

    for (let i = 0; i < results.length; i++) {

        if (results[i] === "Win") {

            totalWins++;

        }

    }


    // Calculate win percentage

    const totalRounds = results.length;

    let winPercentage = 0;

    if (totalRounds > 0) {

        winPercentage = Math.round(
            (totalWins / totalRounds) * 100
        );

    }


    // Display summary

    document.getElementById("summary").innerHTML =

        "You played " + totalRounds +

        " rounds and won " +

        winPercentage + "% (" +

        totalWins + " wins).";

}


// 5. resetGame()
// Reset all game information

function resetGame() {

    wins = 0;
    losses = 0;
    draws = 0;

    results = [];

    gameStarted = false;
    playerName = "";


    // Reset player name

    document.getElementById("playerName").value = "";


    // Reset scoreboard

    document.getElementById("wins").innerHTML = "0";

    document.getElementById("losses").innerHTML = "0";

    document.getElementById("draws").innerHTML = "0";


    // Clear history table

    document.getElementById("historyBody").innerHTML = "";


    // Reset images

    document.getElementById("playerImg").src = "rock.png";

    document.getElementById("computerImg").src = "rock.png";


    // Reset choice text

    document.getElementById("playerChoiceText").innerHTML =
        "Waiting for your move";

    document.getElementById("computerChoiceText").innerHTML =
        "Waiting for computer";


    // Reset messages

    document.getElementById("welcome").innerHTML =
        "Enter your name to begin.";

    document.getElementById("startTime").innerHTML = "";

    document.getElementById("result").innerHTML =
        "Start the game to play your first round.";

    document.getElementById("result").style.color = "grey";

    document.getElementById("summary").innerHTML = "";

    document.getElementById("roundCount").innerHTML =
        "0 rounds played";

}
