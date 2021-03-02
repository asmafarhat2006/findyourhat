const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldArray){
 
    this._fieldArray = fieldArray;
    this._playerHorizontal = 0;
    this._playerVertical   = 0;
    this._isPlayerLost = false;
    this._isPlayerWin = false;
  }
  get fieldArray(){
    return this._fieldArray;
  }
  get playerHorizontal(){
    return this._playerHorizontal;
  }
  get playerVertical(){
    return this._playerVertical;
  }
  playOnField()
  {
    this.fieldArray[this.playerHorizontal][this.    playerVertical] = pathCharacter;
   this.printfield();
    while(!this._isPlayerLost && !this._isPlayerWin){

      const keypress = prompt('Which way: ');
      console.log('Your way =');
      console.log(keypress);
      if(keypress === 'D'){
        this._playerHorizontal++;
        this.checkWinorLost();
      }else if(keypress === 'R'){
        this._playerVertical++;
        this.checkWinorLost();
      }else if(keypress === 'L'){
        this._playerVertical--;
        this.checkWinorLost();
      }
      else if(keypress === 'U'){
        this._playerHorizontal--;
        this.checkWinorLost();
      }else{
        console.log("invalid key entered,try again");
      }
      
      this.printfield();
    } 
  }
  checkWinorLost(){
    
     if(this.playerHorizontal < 0 || this.playerVertical < 0){
         console.log("You have exceeded the field");
          this._isPlayerLost = true;
    }
    if(this.playerHorizontal > this.fieldArray.length || this.playerVertical > this.fieldArray[0].length ){
         console.log("You have exceeded the field");
          this._isPlayerLost = true;
    }
    if(this.fieldArray[this.playerHorizontal][this.playerVertical] === hole){
          console.log("You have fallen down,lost");
          this._isPlayerLost = true;
          this.fieldArray[this.playerHorizontal][this.playerVertical] = pathCharacter;
        }
          if(this.fieldArray[this.playerHorizontal][this.playerVertical] === hat){
          console.log("You have won");
          this._isPlayerWin = true;
          this.fieldArray[this.playerHorizontal][this.playerVertical] = pathCharacter;
        }
         if(this.fieldArray[this.playerHorizontal][this.playerVertical] === fieldCharacter){
          this.fieldArray[this.playerHorizontal][this.playerVertical] = pathCharacter;
        }
  }
  printfield(){
    this.fieldArray.forEach(function(element){
      console.log(element.join(''));
    });
  }
  static generateField(width,height,percentageHoles){
    let fieldArray = [ ];
    for(let i = 0 ; i < height; i++){
      fieldArray[i] = [ ]; 
      for(let j = 0; j < width; j++){
        fieldArray[i][j] = fieldCharacter;
      }
    }
    let total = width * height;
    
    /* generate random num of holes */
    let numHoles = Math.ceil(( percentageHoles / 100 ) * total );
    while(numHoles > 0){
        let randomHeight = Math.floor(Math.random() * height);
        let randomWidth = Math.floor(Math.random() * width);
        fieldArray[randomHeight][randomWidth] = hole;
        numHoles--;
    }
    /* generate random hat position */
      let randomHeight = Math.floor(Math.random() * height);
        let randomWidth = Math.floor(Math.random() * width);
     fieldArray[randomHeight][randomWidth] = hat;    

    return fieldArray;
  }
}

const f = new Field(Field.generateField(3,3,30));
f.playOnField();

