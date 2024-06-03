class Wave {
  constructor(context, path, mWidth, mHeight, difficulty) {
    this.context = context;
    this.path = path;
    // Minions x wave
    this.waveCount = 10;
    //Minion properties
    this.minionWidth = mWidth;
    this.minionHeight = mHeight;
    //mode
    this.gameDifficulty = difficulty;
    // Waves dependent of the difficulty level
    if (this.gameDifficulty === "Easy") {
      this.wave = [
        this.getWave1(),
        this.getWave2(),
        this.getWave3(),
        this.getWave4(),
      ];
    
    } 
  }

  //Waves for each stage - Easy, Normal, Hard & Hell
  //Wave 1
  getWave1() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(
          this.context,
          this.path,
          this.minionHeight,
          this.minionWidth,
          this.gameDifficulty
        )
      );

      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
     
      }
    }
    return wave;
  }
  // Wave 2
  getWave2() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(
          this.context,
          this.path,
          this.minionHeight,
          this.minionWidth,
          this.gameDifficulty
        )
      );

      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
   
      }
    }
    return wave;
  }
  // Wave 3
  getWave3() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(
          this.context,
          this.path,
          this.minionHeight,
          this.minionWidth,
          this.gameDifficulty
        )
      );

      if (this.gameDifficulty === "Easy") {
        if (i % 10 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
      }
    }
    return wave;
  }
  // Wave 4
  getWave4() {
    let wave = [];
    let countEnemies = this.waveCount;
    for (let i = 1; i <= countEnemies; i++) {
      wave.push(
        new Minons(
          this.context,
          this.path,
          this.minionHeight,
          this.minionWidth,
          this.gameDifficulty
        )
      );

      if (this.gameDifficulty === "Easy") {
        if (i % 2 === 0) {
          wave.push(
            new Dragon(
              this.context,
              this.path,
              this.minionWidth,
              this.minionHeight
            )
          );
        }
    
      }
    }
    return wave;
  }

}
