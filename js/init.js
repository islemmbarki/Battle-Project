//all audios
const audioEnemy = [];
const audioJobDone = [];

window.onload = function () {
  const gameInterface = document.getElementById("startingMenu");

  const start = new StartGame();
  const canvasContainer = document.getElementById("canvasContainer");
  const gameMenu = document.getElementById("gameMenu");
  const startGameButton = document.getElementById("startGame");

  //audio
  const audio1 = document.getElementById("startingGameAudio");

  let soundOn = document.getElementById("yesSound");
  let soundOff = document.getElementById("noSound");
  //misc


  let exitButton = document.getElementById("exitButtonEndGameMenu");
  let restartLvlButton = document.getElementById("restartButtonEndGameMenu");

  // Starting v.02
  // HOME MENU - LVL SELECTION UI
  // DIV container to select lvls
  const selectedEasy = document.getElementById("selectedEasy");
 
  const selectedTrueEasy = document.getElementById("selectedTrueEasy");


  // PAUSE MENU - buttons
  //continue button
  const continueButtonFromPause = document.getElementById("continuePauseBtn");
  //restart button
  const restartButtonFromPause = document.getElementById("restartPauseBtn");
  //exit button
  const exitButtonFromPause = document.getElementById("toMenuPauseBtn");
  const instructionsPauseBtn = document.getElementById("instructionsPauseBtn");

  //STARTING MENU - buttons
  //instructions button in starting Menu
  const instructionButton = document.getElementById("instructionsBtn");
  const instructionsGameUI = document.getElementById("instructionsGameUI");
  const instructionsGameCloseBtn = document.getElementById(
    "instructionsGameCloseBtn"
  );
  const closeXBtnInstructions = document.getElementById(
    "closeXBtnInstructions"
  );
  //custom game buttons in starting menu
  const customGameBtn = document.getElementById("customGameBtn");
  const customGameUI = document.getElementById("customGameUI");
  const customGameCloseBtn = document.getElementById("customGameCloseBtn");
  const closeXBtnCustom = document.getElementById("closeXBtnCustom");
  //ranked buttons in starting menu
  const rankedGameBtn = document.getElementById("rankedGameBtn");
  const rankedGameUI = document.getElementById("rankedGameUI");
  const rankedGameCloseBtn = document.getElementById("rankedGameCloseBtn");
  const closeXBtnRanked = document.getElementById("closeXBtnRanked");

  //adding new image - easter egg coffin dancers
  const deathCoffinDance = document.getElementById("coffinDancers");
  // deathCoffinDance.classList.add("hidden");

  //game difficulty - default Easy
  let gameDifficulty = "Easy";

  //canvas for mousemove
  const canvas = document.getElementById("canvas");

  // Events
  // event to know which lvl difficulty is selected and do some behaviour or another in canvas
  document.addEventListener("click", function () {
    if (selectedTrueEasy.getAttribute("activationlvl") === "true") {
      gameDifficulty = "Easy";
    
    }
  });

  

   
      

  // Selecting lvl MENU - adding hover img with level instructions
  // Level EASY
  selectedEasy.addEventListener("click", function () {
    if (selectedTrueEasy.style.visibility === "hidden") {

      selectedTrueEasy.style.visibility = "visible";
    
      selectedTrueEasy.setAttribute("activationLvl", "true");
     
    } else if ((selectedTrueEasy.style.visibility = "visible")) {
      selectedTrueEasy.style.visibility = "hidden";
      selectedTrueEasy.setAttribute("activationLvl", "false");
    }
  });
 

  // PAUSE GAME - HIDE UIs
  //if game started, clickin ESC show us the PAUSE GAME UI
  //if game didn't start, we use ESC to hide instructions/customGameUI, preventing some bugs with the third var gameStarted
  document.addEventListener("keydown", (e) => {
    //this will prevent to call PAUSE when game is false (like win/lose scenarios)
    let gameStatus = start.checkGameStatus();
    let pauseStatus = start.checkPauseStatus();
    //this var prevents us to click ESC while in Starting menu
    let gameStarted = start.checkGameStarted();

    //if game didn't start and we click ESC, we just hide two menu UI (instructions & customgame)
    //if we are in instructions/customgame UIs, then we can click ESC to hide it too
    if (gameStarted === "false") {
      instructionsGameUI.classList.add("hidden");
      customGameUI.classList.add("hidden");
      rankedGameUI.classList.add("hidden");

      closePanel();

      closeAccordion();
    }

    //we do this because we want to press ESC to exit instructions menu UI when game is not started (in game menu), but also because
    //we want to use ESC to close instructions menu IU in pause menu while playing, and if the instruction menu UI is hidden while playing
    //and we press ESC, it will just toggle the pause menu (from show to hide)
    //so we can use ESC key to both close instruction menu and exiting the pause menu while playing (and also exiting the instruction UI menu at start)
    if (
      gameStatus === "true" &&
      pauseStatus === "false" &&
      gameStarted === "true"
    ) {
      if (e.code === "Escape") {
        start.pauseGame();
        console.log("hello");
      }
    } else if (
      gameStatus === "false" &&
      pauseStatus === "true" &&
      gameStarted === "true" &&
      !instructionsGameUI.classList.contains("hidden")
    ) {
      instructionsGameUI.classList.add("hidden");
      closePanel();

      closeAccordion();
    } else if (
      gameStatus === "false" &&
      pauseStatus === "true" &&
      gameStarted === "true" &&
      instructionsGameUI.classList.contains("hidden")
    ) {
      if (e.code === "Escape") {
        start.pauseGame();
        console.log("hello");
      }
    }
  });

  // if we click continue (only showed at paused menu) we call start.pauseGame
  // with status false, and change to true to continue (same as clicking ESC again)
  continueButtonFromPause.addEventListener("click", function () {
    start.pauseGame();
  });

  // restart lvl from paused menu
  restartButtonFromPause.addEventListener("click", function () {
    start.restartLvl();
  });

  // refresh webpage as exit the game
  exitButtonFromPause.addEventListener("click", function () {
    location.reload();
  });

  //Other functions
  function getCursorPosition(canvas, event) {
    let range = canvas.getBoundingClientRect();
    const x = event.clientX - range.left;
    const y = event.clientY - range.top;

    return {
      x: x,
      y: y,
      click: event.button,
    };
  }

 




  startGameButton.addEventListener("click", function () {
    start.setDifficultyLvl(gameDifficulty);
    gameInterface.classList.remove("startingMenu");
    canvasContainer.classList.remove("hidden");
    gameInterface.classList.add("hidden");
    gameMenu.classList.remove("hidden");
    audio1.volume = 0.1;
    audio1.play();
    startGame();
  });

  exitButton.addEventListener("click", function () {
    start.exitGame();
  });

  restartLvlButton.addEventListener("click", function () {
    start.restartLvl();
  });

  
 

  soundOn.addEventListener("click", function () {
    soundOn.classList.add("buttonSelectedBorder");
    soundOff.classList.remove("buttonSelectedBorder");
    soundOff.setAttribute("isActive", "false");
    soundOn.setAttribute("isActive", "true");
  });

  soundOff.addEventListener("click", function () {
    soundOff.classList.add("buttonSelectedBorder");
    soundOn.classList.remove("buttonSelectedBorder");
    soundOn.setAttribute("isActive", "false");
    soundOff.setAttribute("isActive", "true");
  });

  function startGame() {
    start.run();
  }
  //instructions game menu
  instructionButton.addEventListener("click", function () {
    instructionsGameUI.classList.remove("hidden");
  });

  instructionsPauseBtn.addEventListener("click", function () {
    instructionsGameUI.classList.remove("hidden");
  });

  instructionsGameCloseBtn.addEventListener("click", function () {
    closePanel();

    closeAccordion();
    instructionsGameUI.classList.add("hidden");
  });
  //custom game menu
  customGameBtn.addEventListener("click", function () {
    customGameUI.classList.remove("hidden");
  });

  customGameCloseBtn.addEventListener("click", function () {
    customGameUI.classList.add("hidden");
  });
  //ranked game menu
  rankedGameBtn.addEventListener("click", function () {
    rankedGameUI.classList.remove("hidden");
  });

  rankedGameCloseBtn.addEventListener("click", function () {
    rankedGameUI.classList.add("hidden");
  });

  //x button in top of UIs
  closeXBtnInstructions.addEventListener("click", function () {
    closePanel();

    closeAccordion();

    instructionsGameUI.classList.add("hidden");
  });

  closeXBtnCustom.addEventListener("click", function () {
    customGameUI.classList.add("hidden");
  });

  closeXBtnRanked.addEventListener("click", function () {
    rankedGameUI.classList.add("hidden");
  });
};

//Audios created dinamically for endGame sound minions and jobdone
//we push to an array, and then shift, we shift if lenght is === 2 because we need to stop the first one
//If the audio is created dinamically, and we click the mute button, if it's the first audio created, it won't work, that's why we shift when length === 2
function soundGoEnemy(newAudio, boolean) {
  if (boolean === true) {
    audioEnemy.push(new Audio(newAudio));
    audioEnemy.forEach((element) => {
      element.volume = 0.1;
      element.play();
    });
  } else {
    audioEnemy.push(new Audio(newAudio));
    audioEnemy.forEach((element) => {
      element.volume = 0;
      element.pause();
    });
  }

  //we add this to prevent the first audio to play
  //if we do a shift before length > 2 (lenght ===1) we can't stop it if we mute the game
  if (audioEnemy.length === 2) {
    audioEnemy[0].volume = 0;
    audioEnemy[0].pause();
    audioEnemy.shift();
  }
}

function soundGoJobDone(newAudio, boolean) {
  if (boolean === true) {
    audioJobDone.push(new Audio(newAudio));
    audioJobDone.forEach((element) => {
      element.volume = 0.1;
      element.play();
    });
  } else {
    audioJobDone.push(new Audio(newAudio));
    audioJobDone.forEach((element) => {
      element.volume = 0;
      element.pause();
    });
  }

  //we add this to prevent the first audio to play
  //if we do a shift before length > 2 (lenght ===1) we can't stop it if we mute the game
  if (audioJobDone.length === 2) {
    audioJobDone[0].volume = 0;
    audioJobDone[0].pause();
    audioJobDone.shift();
  }
}
//Acordion for instructions menu
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    acc[0].classList.remove("active");
    acc[0].nextElementSibling.style.display = "none";
    acc[1].classList.remove("active");
    acc[1].nextElementSibling.style.display = "none";
 
   

    this.classList.add("active");

    let panel = this.nextElementSibling;
    if (panel.style.display === "contents") {
      panel.style.display = "none";
    } else {
      panel.style.display = "contents";
    }
  });
}

//Testing with gallery - we need to refractor this for sure
//  -----------------------------------------------------------------------

// Minions gallery -----------------------------------------------------------------------
let slideMinion = document.querySelectorAll(".slideMin"),
  buttonMinion = document.querySelectorAll(".btnAcordionMin"),
  currentMin = 0;

slideMinion[currentMin].style.zIndex = 2;
buttonMinion[0].classList.add("inactive");
buttonMinion[buttonMinion.length - 1].classList.add("inactive");
buttonMinion = document.querySelectorAll(".btnAcordionMin:not(.inactive");

for (element = 0; element < buttonMinion.length; element++) {
  buttonMinion[element].addEventListener("click", function () {
    for (i = 0; i < slideMinion.length; i++) {
      document.querySelectorAll(".slide-img-min")[i].classList.add("active");
      document.querySelectorAll(".slide-button-min")[i].style.color =
        "#00000038;";
    }

    if (this.classList.contains("button-right-min")) {
      currentMin++;
      if (currentMin > slideMinion.length - 1) {
        currentMin = slideMinion.length - 1;
      }
    }
    if (this.classList.contains("button-left-min")) {
      currentMin--;
      if (currentMin < 0) {
        currentMin = 0;
      }
    }

    setTimeout(function () {
      for (e = 0; e < slideMinion.length; e++) {
        slideMinion[e].style.zIndex = "0";
      }
      slideMinion[currentMin].style.zIndex = "2";
      for (i = 0; i < slideMinion.length; i++) {
        document
          .querySelectorAll(".slide-img-min")
          [i].classList.remove("active");
        document.querySelectorAll(".slide-button-min")[i].style.opacity = "1";
      }
    }, 1000);
  });
}
// Levels gallery -----------------------------------------------------------------------
let slideLevel = document.querySelectorAll(".slideLevel"),
  buttonLevel = document.querySelectorAll(".btnAcordionLvl"),
  currentLvl = 0;

slideLevel[currentLvl].style.zIndex = 2;
buttonLevel[0].classList.add("inactive");
buttonLevel[buttonLevel.length - 1].classList.add("inactive");
buttonLevel = document.querySelectorAll(".btnAcordionLvl:not(.inactive");

for (element = 0; element < buttonLevel.length; element++) {
  buttonLevel[element].addEventListener("click", function () {
    for (i = 0; i < slideLevel.length; i++) {
      document.querySelectorAll(".slide-img-lvl")[i].classList.add("active");
      document.querySelectorAll(".slide-button-lvl")[i].style.color =
        "#00000038;";
    }

    if (this.classList.contains("button-right-lvl")) {
      currentLvl++;
      if (currentLvl > slideLevel.length - 1) {
        currentLvl = slideLevel.length - 1;
      }
    }
    if (this.classList.contains("button-left-lvl")) {
      currentLvl--;
      if (currentLvl < 0) {
        currentLvl = 0;
      }
    }

    setTimeout(function () {
      for (e = 0; e < slideLevel.length; e++) {
        slideLevel[e].style.zIndex = "0";
      }
      slideLevel[currentLvl].style.zIndex = "2";
      for (i = 0; i < slideLevel.length; i++) {
        document
          .querySelectorAll(".slide-img-lvl")
          [i].classList.remove("active");
        document.querySelectorAll(".slide-button-lvl")[i].style.opacity = "1";
      }
    }, 1000);
  });
}
//Remove the classes added previously in the accordion if it closes sudently by clicking the X button, the close button, or ESC key
function closeAccordion() {
  for (i = 0; i < acc.length; i++) {
    acc[i].classList.remove("active");
  }
}

//Closes the panel if we click the X button, the close button, or ESC key
function closePanel() {
  let panel = document.getElementsByClassName("panel");
  for (let i = 0; i < panel.length; i++) {
    if (panel[i].style.display === "contents") {
      panel[i].style.display = "none";
    }
  }
}
