class StartGame {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.intervalId = null;
    this.contextW = 1200;
    this.contextH = 700;
    //Path - We change value later
    this.path = "";
    this.waves = [];
    this.waveIndex = 0;
    this.waveEnemies = 0;
    //Game sounds and Themes
    //we change audio1 inside #83 function, for each lvl there is a different theme
    this.audio1 = "";
    this.audio2 = document.getElementById("victoryMusic");
    this.audio3 = document.getElementById("defeatMusic");
    this.audio4 =
      "./sounds/GameSounds/jobdone.mp3";
    this.audio5 =
      "./sounds/GameSounds/liveless.mp3";
    this.audio6 = document.getElementById("moreGoldSound");
    this.audio7 = document.getElementById("thanosInevitable");

    //Path
    this.board = "";
    this.enemies = [];
   
    this.framesCounter = 0;

    this.loser = new Image();
    this.loser.src =
      "./images/utils/defeat.png";
    this.winner = new Image();
    this.winner.src =
      "./images/utils/victory.png";
    this.endGameMenuDiv = document.getElementById("endGameMenu");
    this.restartTextCd = document.getElementById("restartingTimerText");
    this.soundOn = document.getElementById("yesSound");
    this.soundOff = document.getElementById("noSound");
 
    this.deathCoffinDance = document.getElementById("coffinDancers");

    //v.02
    this.gameStatus = "true";
    this.pauseStatus = "false";
    this.gameStarted = "false";
    this.canvasBoard = document.getElementById("canvas");
    //div pause
    this.pauseMenu = document.getElementById("overCanvasPauseMenu");
    //difficulty
    this.gameDifficulty = "Easy";
    
    //minion properties
    this.minonWidth = "";
    this.minionHeight = "";
    //animated campfire position
    this.campfireX = "";
    this.campfireY = "";
    //path Floor
    this.pathFloor = "";
    //timer for the ending menu
    this.timeleft = 10;
    //countdown variable for winning or losing game MENU
    this.downloadTimer = "";
    this.placeHolderImg = new Image();
    this.castleImage = new Image();
   

   

    //Text for enemies and waves, now not in canvas but in top UI menu
    this.wavesRemaining = document.getElementById("wavesRemaining");
    this.enemiesRemaining = document.getElementById("enemiesRemaining");
    //This var make the campfire smaller by dividing
    this.divisorCampfire = 1;

   
  }

  //Difficulty level
  setDifficultyLvl(lvlDifficulty) {
    this.gameDifficulty = lvlDifficulty;

    this.selectGameMode();
   
  }
 
  
  selectGameMode() {
    const selectedTrueEasy = document.getElementById("selectedTrueEasy");


    if (selectedTrueEasy.getAttribute("activationlvl") === "true") {
      this.gameDifficulty = "Easy";
      this.userHP = 30;
      this.userGold = 800;
      this.path = [
        [1200, 350],
        [0, 350],
      ]; // Path1
      //path floor
      this.pathFloor =
        "./images/terrain/grass.png";
      this.board = new Waypoint(this.context, this.path, 20, this.pathFloor);
      //size 
     
     
      this.minonWidth = 40;
      this.minionHeight = 40;
      this.campfireX = 455;
      this.campfireY = 490;
      //background img
      // this.canvas.style.backgroundImage =
      //   "url(./images/maps/mapOne.png)";
      //selecting songtrack
      this.audio1 = document.getElementById("backgroundMusic");
      this.divisorCampfire = 1;
  
    } 
  }

  run() {
    if (this.gameStatus === "true") {
      //change var that game started to true
      this.gameStarted = "true";
      this.clearCanvas();
      //we remove pointer events to select again (after reseting the game when it ended))
      this.canvasBoard.classList.remove("noPointerEvents");
     
      //pause status = false
      this.pauseStatus = "false";
      this.intervalId = requestAnimationFrame(() => this.run());
      this.checkSound();
      this.waves = new Wave(
        this.context,
        this.path,
        this.minonWidth,
        this.minionHeight,
        this.gameDifficulty
      );
      this.enemyInfo();
      this.playerHP();
      this.draw();
     
      this.enemyEnding();
      this.playerGold();
      this.clearEnemyEnding();
      this.removeEnemy();
    }
  }

  draw() {
    if (this.gameDifficulty === "Hell") {
      this.context.globalCompositeOperation = "destination-over";
      this.context.drawImage(this.castleImage, 1100, 220, 200, 200);
    }

    if (this.checkGameContinue()) {
      this.board.draw();
      this.move();

      this.enemies.forEach((enemy) => enemy.draw());
  
      this.framesCounter++;
      this.campFireCanvas(this.campfireX, this.campfireY);

      if (this.framesCounter % 50 === 0) {
        this.framesCounter = 0;
        this.addEnemy();
      }
    } else {
      this.framesCounter = 0;
    }
  }

  move() {
    this.enemies.forEach((enemy) => enemy.move());
   
  }

  addEnemy() {
    //We add enemies while it's smaller than the enemy array (20)
    if (this.waveEnemies < this.waves.wave[this.waveIndex].length) {
      this.enemies.push(this.waves.wave[this.waveIndex][this.waveEnemies]);
      this.waveEnemies += 1;
    } else {
      //if there is a new wave...
      if (
        this.waveIndex < this.waves.wave.length - 1 &&
        this.enemies.length === 0
      ) {
        //5 secs, next
        setTimeout(
          (this.enemies = []),
          (this.waveEnemies = 0),
          (this.waveIndex += 1),
          5000
        );
        //else we finish
      } else if (
        this.waveIndex === this.waves.wave.length - 1 &&
        this.enemies.length === 0
      ) {
        //you win
        this.gameWin();
      }
    }
  }

  enemyInfo() {
    let numberWave = this.waveIndex + 1;
    let wavesOf = this.waves.wave.length;
    let numberEnemiesInWave = this.enemies.length;

    this.wavesRemaining.innerText = `Wave ${numberWave} of ${wavesOf}`;
    this.enemiesRemaining.innerText = `Red Enemies: ${numberEnemiesInWave}`;
  }

  goldFromEnemy() {
    this.enemies.forEach((enemy) => {
      if (enemy.isDead()) {
        this.userGold += enemy.returningGold();
      }
    });
  }

  clearEnemyEnding() {
    this.enemies = this.enemies.filter((enemy) => {
      return enemy.x + enemy.w / 2 <= this.context.canvas.width;
    });
  }

 

  //Function to remove the enemy
  removeEnemy() {
    this.goldFromEnemy();
    this.enemies = this.enemies.filter((enemy) => {
      return enemy.getHP() > 0;
    });
  }


 

  // function to show player hp
  playerHP() {
    const HP = document.getElementById("hpPlayer");
    HP.innerText = this.userHP;
    if (this.userHP === 0) {
      // Stop the game
      this.gameLost();
    }
  }

  playerGold() {
    const gold = document.getElementById("goldPlayer");
    gold.innerText = "$" + this.userGold;
  }

  

  //function for when we win the game (cheat = ezwin calls this)
  gameWin() {
    //wining sound reset to 0
    this.audio2.currentTime = 0;

    if (this.downloadTimer != "") {
      clearInterval(this.downloadTimer);
      this.timeleft = 10;
    }

    //game paused
    this.gameStatus = "false";

    //in case we used this cheat, we mute it
    this.audio7.volume = 0;
    this.audio7.currentTime = 0;
    this.audio7.pause();

    //add no pointer events class to prevent bugs or behaviours
    this.canvasBoard.classList.add("noPointerEvents");

    //We stop the game
    window.cancelAnimationFrame(this.intervalId);
    this.restartTextCd.innerText = "Exiting game in 10 seconds";
    this.endGameMenuDiv.classList.remove("hidden");
    this.audio1.pause();

    //we prevent cheating when the game is finished
    

    if (this.soundOn.classList.contains("buttonSelectedBorder")) {
      this.audio2.volume = 0.1;
      this.audio2.play();
    } else if (this.soundOff.classList.contains("buttonSelectedBorder")) {
      this.audio2.volume = 0;
      this.audio2.pause();
    }
    //We clear the map
    this.clearCanvas();
    //we reset everything to default to prevent multiple bugs or behaviours
    this.defaultSetupGame();
    //We show the winer/loser logo
    this.context.drawImage(this.winner, 200, 50, 800, 300);

    //10 seconds, refresh or click
    this.downloadTimer = setInterval(() => {
      if (this.timeleft <= 0) {
        if (!this.endGameMenuDiv.classList.contains("hidden")) {
          setInterval(this.downloadTimer);
          this.exitGame();
        }
      } else {
        this.restartTextCd.innerText =
          "Exiting game in " + this.timeleft + " seconds";
      }
      this.timeleft -= 1;
    }, 1000);
  }

  //function when we lose the game (cheat = 4lose calls this)
  gameLost() {
    //we default 0.1 for volume, or it's loud af
    this.audio3.volume = 0.1;
    //defeat sound reset to 0
    this.audio3.currentTime = 0;
    if (this.downloadTimer != "") {
      clearInterval(this.downloadTimer);
      this.timeleft = 10;
    }

    //game paused
    this.gameStatus = "false";

    //in case we used this cheat, we mute it
    this.audio7.volume = 0;
    this.audio7.currentTime = 0;
    this.audio7.pause();

    //add no pointer events class to prevent bugs or behaviours
    this.canvasBoard.classList.add("noPointerEvents");

    //we prevent cheating when the game is finished


    window.cancelAnimationFrame(this.intervalId);
    this.restartTextCd.innerText = "Exiting game in 10 seconds";
    this.endGameMenuDiv.classList.remove("hidden");

    //We clear the map
    this.clearCanvas();
    //we reset everything to default to prevent multiple bugs or behaviours
    this.defaultSetupGame();
    //We show the winer/loser logo
    this.context.drawImage(this.loser, 298, 70, 600, 250);
    this.audio1.pause();
    //adding new image - easter egg coffin dancers
    this.deathCoffinDance.classList.remove("hidden");

    if (this.soundOn.classList.contains("buttonSelectedBorder")) {
      this.audio3.volume = 0.1;
      this.audio3.play();
    } else if (this.soundOff.classList.contains("buttonSelectedBorder")) {
      this.audio3.volume = 0;
      this.audio3.pause();
    }

    //10 seconds, refresh or click
    this.downloadTimer = setInterval(() => {
      if (this.timeleft <= 0) {
        if (!this.endGameMenuDiv.classList.contains("hidden")) {
          setInterval(this.downloadTimer);
          this.exitGame();
        }
      } else {
        this.restartTextCd.innerText =
          "Exiting game in " + this.timeleft + " seconds";
      }
      this.timeleft -= 1;
    }, 1000);
  }

  //function to reload the game to its own main page - called in win/lose menu
  exitGame() {
    location.reload();
  }

  //Utils functions
  checkGameContinue() {
    return this.userHP <= 0 ? false : true;
  }
  

  

  //Function to check soundOFF soundON UI and change the border
  checkSound() {
    if (this.soundOn.classList.contains("buttonSelectedBorder")) {
      this.audio1.volume = 0.1;
      this.audio1.play();
      this.audio1.loop = true;
    } else if (this.soundOff.classList.contains("buttonSelectedBorder")) {
      this.stopAudio();
    }
  }

  //Function to pause the game clicking ESC key
  pauseGame() {
    if (this.gameStatus === "true") {
      //game paused
      this.gameStatus = "false";
      //we stop all the audios to prevent bugs
      this.stopAudio();

      //we return true while we are in this screen
      this.pauseStatus = "true";

      

      //add or remove a border in the soundon soundoff icon
      if (
        this.soundOn.getAttribute("isActive") === "true" &&
        this.soundOff.getAttribute("isActive") === "false"
      ) {
        this.soundOff.classList.add("buttonSelectedBorder");
        this.soundOn.classList.remove("buttonSelectedBorder");
      }

      //add pointer events class to prevent building in pause time
      this.canvasBoard.classList.add("noPointerEvents");
      //DIV pause show up
      this.pauseMenu.style.visibility = "visible";
    } else if (this.gameStatus === "false") {
      //continue game
      this.gameStatus = "true";
      this.run();
      this.audio1.volume = 0.1;
      this.audio1.play();
      this.pauseMenu.style.visibility = "hidden";
      

      //add or remove a border in the soundon soundoff icon
      if (
        this.soundOn.getAttribute("isActive") === "false" &&
        this.soundOff.getAttribute("isActive") === "true"
      ) {
        this.soundOff.classList.add("buttonSelectedBorder");
        this.soundOn.classList.remove("buttonSelectedBorder");
      } else {
        this.soundOff.classList.remove("buttonSelectedBorder");
        this.soundOn.classList.add("buttonSelectedBorder");
      }

      //remove pointer events class to build again after pause
      this.canvasBoard.classList.remove("noPointerEvents");
      // we hide the pause menu
      this.pauseMenu.style.visibility = "hidden";
    }
  }
  // Function to restart level (menu pause or win/lose menu after game)
  restartLvl() {
    this.gameStatus = "true";
    this.endGameMenuDiv.classList.add("hidden");
    this.deathCoffinDance.classList.add("hidden");
    clearInterval(this.intervalId);
    //we hide the pause menu to instant restart of the lvl
    this.pauseMenu.style.visibility = "hidden";
    //we play audio again
    this.audio1.volume = 0.1;
    this.audio2.pause();
    this.audio3.pause();
    //we reset the audio time to start it from 0
    this.audio1.currentTime = 0;
    this.audio1.play();
    //add or remove a border in the soundon soundoff icon
    this.soundOn.classList.add("buttonSelectedBorder");
    this.soundOff.classList.remove("buttonSelectedBorder");
    this.intervalId = null;
    this.clearCanvas();
    this.defaultSetupGame();
    this.run();
  }
  //Function to print campfire
  campFireCanvas(x, y) {
    var ctx = canvas.getContext("2d");
    var x = x;
    var y = y;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgb(51, 26, 0)";
    ctx.strokeStyle = "rgba(250,100,0, 0.75)";

    ctx.save();

    ctx.beginPath();
    ctx.moveTo(x + 5 / this.divisorCampfire, y);
    ctx.lineTo(x + 5 / this.divisorCampfire, y);
    ctx.lineTo(x + 50 / this.divisorCampfire, y + 17.5 / this.divisorCampfire);
    ctx.lineTo(x + 45 / this.divisorCampfire, y + 25 / this.divisorCampfire);
    ctx.lineTo(x, y + 7.5 / this.divisorCampfire);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(x + 45 / this.divisorCampfire, y);
    ctx.lineTo(x + 45 / this.divisorCampfire, y);
    ctx.lineTo(x + 50 / this.divisorCampfire, y + 7.5 / this.divisorCampfire);
    ctx.lineTo(x + 5 / this.divisorCampfire, y + 25 / this.divisorCampfire);
    ctx.lineTo(x, y + 17.5 / this.divisorCampfire);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgb(255, 153, 0, 0.60)";
    var startY =
      y - (Math.floor(Math.random() * 10) + 10 / this.divisorCampfire);

    ctx.beginPath();
    ctx.moveTo(x, startY);
    ctx.bezierCurveTo(
      x + 12.5 / this.divisorCampfire,
      y,
      x + 25 / this.divisorCampfire,
      y,
      x + 25 / this.divisorCampfire,
      y - Math.floor((Math.random() * 25) / this.divisorCampfire)
    );
    ctx.bezierCurveTo(
      x + 25 / this.divisorCampfire,
      y,
      x + 37.5 / this.divisorCampfire,
      y,
      x + 50 / this.divisorCampfire,
      y - (Math.floor(Math.random() * 10) + 10 / this.divisorCampfire)
    );
    ctx.quadraticCurveTo(
      x + 25 / this.divisorCampfire,
      y + 37.5 / this.divisorCampfire,
      x,
      startY
    );
    ctx.fill();

    var flamelety =
      y - (Math.floor(Math.random() * 12.5) + 25 / this.divisorCampfire);
    ctx.beginPath();
    ctx.moveTo(x + 12.5 / this.divisorCampfire, flamelety);
    ctx.bezierCurveTo(
      x - 25 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 50 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 12.5 / this.divisorCampfire,
      flamelety
    );
    ctx.fill();

    flamelety =
      y - (Math.floor(Math.random() * 12.5) + 25 / this.divisorCampfire);
    ctx.beginPath();
    ctx.moveTo(x + 37.5 / this.divisorCampfire, flamelety);
    ctx.bezierCurveTo(
      x,
      y + 12.5 / this.divisorCampfire,
      x + 75 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 37.5 / this.divisorCampfire,
      flamelety
    );
    ctx.fill();

    flamelety =
      y - (Math.floor(Math.random() * 12.5) + 37.5 / this.divisorCampfire);
    ctx.beginPath();
    ctx.moveTo(x + 25 / this.divisorCampfire, flamelety);
    ctx.bezierCurveTo(
      x - 25 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 75 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 25 / this.divisorCampfire,
      flamelety
    );
    ctx.fill();

    flamelety =
      y - (Math.floor(Math.random() * 12.5) + 25 / this.divisorCampfire);
    ctx.beginPath();
    ctx.moveTo(x + 25 / this.divisorCampfire, flamelety);
    ctx.bezierCurveTo(
      x - 25 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 75 / this.divisorCampfire,
      y + 12.5 / this.divisorCampfire,
      x + 25 / this.divisorCampfire,
      flamelety
    );
    ctx.fill();
  }
  //Function that clear the canvas
  clearCanvas() {
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height
    );
  }

  //when the game is reset (endgame menu or pause menu), if game was muted, it stay muted and  lose their classes
  //we also reset game properties such as HP, gold, etc
  defaultSetupGame() {
   
    //game properties reset
    this.waves = [];
   
    this.waveIndex = 0;
    this.waveEnemies = 0;
    this.enemies = [];
   
    this.userHP = 35;
    this.userGold = 500;
  }





  checkGameStatus() {
    return this.gameStatus;
  }

  checkPauseStatus() {
    return this.pauseStatus;
  }

  checkGameStarted() {
    return this.gameStarted;
  }

  stopAudio() {
    //Stop audios enemy reaching ending
    audioEnemy.forEach((element) => {
      element.pause();
      element.volume = 0;
      element.currentTime = 0;
    });

   

    //Stop all the audios not created dinamically (HTML ones)
    //with a condition, that if it's the main level song, we don't play it from start
    document.querySelectorAll("audio").forEach((el) => {
      if (
        el.id === "backgroundMusic" ||
        el.id === "twistedTreelineSong" ||
        el.id === "pothSong"
      ) {
        el.volume = 0;
        el.pause();
      } else {
        el.currentTime = 0;
        el.volume = 0;
        el.pause();
      }
    });
  }
}

// function showGuantlet() {
//   drawGuantlet();
//   updateGuantlet();

//   if (frameCount > 48) {
//     cancelAnimationFrame(showGuantlet);
//     frameCount = 0;
//   } else {
//     requestAnimationFrame(showGuantlet);
//   }
// }

// //trying Thanos guantlet animation
// var thanos = new Image();
// thanos.frames = 48;
// var frameCount = 0;

// function updateGuantlet() {
//   frameCount++;
// }

// function drawGuantlet() {
//   thanos.src =
//     "./images/effects/thanos_snap.png";

//   var canvas = document.getElementById("canvas");
//   var context = canvas.getContext("2d");

//   context.globalCompositeOperation = "source-over";
//   context.drawImage(
//     thanos,
//     (frameCount * 3840) / 48,
//     10,
//     80,
//     500,
//     //x
//     520,
//     //y
//     280,
//     //width
//     100,
//     //height
//     500
//   );


