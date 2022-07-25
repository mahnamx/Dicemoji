const btn = document.getElementById("roll");
const you = document.getElementById("You");
const computer = document.getElementById("Computer");

//regular expression for Promt Name
const reg = new RegExp(/^[a-z ,.'-]+$/i);

//promt
let targetName = prompt("What is your name?");

while (targetName == null || reg.test(targetName) == false) {
  targetName = prompt(
    "Enter you name to play the Dice game and it should be without any numbers!"
  );
}

const youDice1 = document.getElementById("youDice1");
const youDice2 = document.getElementById("youDice2");

const computerDice1 = document.getElementById("computerDice1");
const computerDice2 = document.getElementById("computerDice2");

const youR1Score = document.getElementById("youR1Results");
const youR2Score = document.getElementById("youR2Results");
const youR3Score = document.getElementById("youR3Results");

const computerR1Score = document.getElementById("computerR1Results");
const computerR2Score = document.getElementById("computerR2Results");
const computerR3Score = document.getElementById("computerR3Results");

const pcTotalScore = document.getElementById("pcTotalScore");
const youTotalScore = document.getElementById("youTotalScore");

//targetname (The name that you type in the promt)

document.getElementById("targetName0").innerHTML = targetName;

document.getElementById("targetName").innerHTML = "" + targetName + ":";

document.getElementById("targetName2").innerHTML = "" + targetName + ":";

document.getElementById("targetName3").innerHTML = "" + targetName + ":";

document.getElementById("roll").innerHTML =
  "Roll The Dice  " + targetName + " !";

const rounds = [1, 2, 3];

const diceImages = [
  "./images/dice1.png",
  "./images/dice2.png",
  "./images/dice3.png",
  "./images/dice4.png",
  "./images/dice5.png",
  "./images/dice6.png",
];

//players object (For both player and AI)
class Player {
  score = 0;
  dice1Element;
  dice2Element;
  dice1;
  dice2;
  constructor(dice1Element, dice2Element) {
    this.dice1Element = dice1Element;
    this.dice2Element = dice2Element;
  }
  rollDice() {
    this.dice1 = Math.floor(Math.random() * 6 + 1);
    this.dice2 = Math.floor(Math.random() * 6 + 1);
    this.dice1Element.src = diceImages[this.dice1 - 1];
    this.dice2Element.src = diceImages[this.dice2 - 1];
  }
}

//Scoreboard Object
class Scoreboard {
  score = 0;
  round = 1;
  youTotalScore = 0;
  computerTotalScore = 0;

  newGame() {
    btn.disabled = false;
    this.score = 0;
    this.round = 1;
    this.youTotalScore = 0;
    this.computerTotalScore = 0;
    youR1Score.innerHTML = "";
    youR2Score.innerHTML = "";
    youR3Score.innerHTML = "";
    computerR1Score.innerHTML = "";
    computerR2Score.innerHTML = "";
    computerR3Score.innerHTML = "";
    pcTotalScore.innerHTML = "0";
    youTotalScore.innerHTML = "0";
    $("#youDice1").attr("src", "");
    $("#youDice2").attr("src", "");
    $("#computerDice1").attr("src", "");
    $("#computerDice2").attr("src", "");
    $("#headerpc").attr("src", "images/c0.png");
    $("#headeruser").attr("src", "images/p0.png");
  }

  updateRound() {
    if (this.round < 3) {
      this.round++;
    } else {
      btn.disabled = true;
    }
  }
  updateScoreBoard(Player) {
    if (Player == player1) {
      const roundScore = this.updateRoundScore(player1.dice1, player1.dice2);
      if (this.round == 1) {
        youR1Score.innerHTML = roundScore;
      } else if (this.round == 2) {
        youR2Score.innerHTML = roundScore;
      } else if (this.round == 3) {
        youR3Score.innerHTML = roundScore;
      }
      this.youTotalScore += roundScore;
      youTotalScore.innerHTML = this.youTotalScore;
    } else {
      const roundScore = this.updateRoundScore(AI.dice1, AI.dice2);
      if (this.round == 1) {
        computerR1Score.innerHTML = roundScore;
      } else if (this.round == 2) {
        computerR2Score.innerHTML = roundScore;
      } else if (this.round == 3) {
        computerR3Score.innerHTML = roundScore;
      }
      this.computerTotalScore += roundScore;
      pcTotalScore.innerHTML = this.computerTotalScore;
    }
  }
  updateRoundScore(dice1, dice2) {
    if (dice1 == 1 || dice2 == 1) {
      return 0;
    } else if (dice1 == dice2) {
      return (dice1 + dice2) * 2;
    } else {
      return dice1 + dice2;
    }
  }

  // end game popup
  endGameMessage() {
    if (this.round == 3) {
      if (this.youTotalScore > this.computerTotalScore) {
        document.getElementById("popupText").innerHTML =
          " " +
          targetName +
          " Wins " +
          this.youTotalScore +
          "-" +
          this.computerTotalScore;
        +" !";
        $("#popupIMG").attr("src", "images/win.gif");
      } else if (this.computerTotalScore > this.youTotalScore) {
        document.getElementById("popupText").innerHTML =
          " Computer Wins " +
          this.computerTotalScore +
          "-" +
          this.youTotalScore +
          " !";
        $("#popupIMG").attr("src", "images/lost.gif");
      } else if (this.youTotalScore == this.computerTotalScore) {
        document.getElementById("popupText").innerHTML =
          " It's a Draw " +
          this.computerTotalScore +
          "-" +
          this.youTotalScore +
          " !";
        $("#popupIMG").attr("src", "images/draw.gif");
      }
      $("#popup").fadeIn("slow");
    }
  }
  //player and computer avatar emoji change
  emojichange() {
    if (this.round == 1) {
      if (this.youTotalScore > this.computerTotalScore) {
        $("#headerpc").attr("src", "images/p1.png");
        $("#headeruser").attr("src", "images/p3.png");
      } else if (this.computerTotalScore > this.youTotalScore) {
        $("#headerpc").attr("src", "images/p3.png");
        $("#headeruser").attr("src", "images/p1.png");
      } else if (this.youTotalScore == this.computerTotalScore) {
        $("#headerpc").attr("src", "images/p2.png");
        $("#headeruser").attr("src", "images/p2.png");
      }
    }

    if (this.round == 2) {
      if (this.youTotalScore > this.computerTotalScore) {
        $("#headerpc").attr("src", "images/p5.png");
        $("#headeruser").attr("src", "images/p7.png");
      } else if (this.computerTotalScore > this.youTotalScore) {
        $("#headerpc").attr("src", "images/p8.png");
        $("#headeruser").attr("src", "images/p6.png");
      } else if (this.youTotalScore == this.computerTotalScore) {
        $("#headerpc").attr("src", "images/draw.png");
        $("#headeruser").attr("src", "images/draw.png");
      }
    }

    if (this.round == 3) {
      if (this.youTotalScore > this.computerTotalScore) {
        $("#headerpc").attr("src", "images/p12.png");
        $("#headeruser").attr("src", "images/p11.png");
      } else if (this.computerTotalScore > this.youTotalScore) {
        $("#headerpc").attr("src", "images/p9.png");
        $("#headeruser").attr("src", "images/p10.png");
      } else if (this.youTotalScore == this.computerTotalScore) {
        $("#headerpc").attr("src", "images/poker.png");
        $("#headeruser").attr("src", "images/poker.png");
      }
    }
  }
}

// Dice throw player and AI
const player1 = new Player(youDice1, youDice2);
const AI = new Player(computerDice1, computerDice2);
const scoreBoard = new Scoreboard();

//new game
$("#newg").click(function () {
  scoreBoard.newGame();
});

//Button for dice throwing
btn.onclick = function () {
  player1.rollDice();
  AI.rollDice();
  scoreBoard.updateScoreBoard(player1);
  scoreBoard.updateScoreBoard(AI);
  scoreBoard.endGameMessage();
  scoreBoard.emojichange();
  scoreBoard.updateRound();
};

//popup fade out
document.querySelector("#popup button").onclick = function () {
  $("#popup").fadeOut("slow");
};

//how to play show and hide
document.querySelector("#details1").addEventListener("toggle", function () {
  current_situation = this.querySelector("span").innerText;
  if (current_situation == "[show]")
    this.querySelector("span").innerText = "[Hide]";
  else this.querySelector("span").innerText = "[show]";
});

//rules show and hide
document.querySelector("#details2").addEventListener("toggle", function () {
  current_situation = this.querySelector("span").innerText;
  if (current_situation == "[show]")
    this.querySelector("span").innerText = "[Hide]";
  else this.querySelector("span").innerText = "[show]";
});
