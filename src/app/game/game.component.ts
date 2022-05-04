import { Component, OnInit } from '@angular/core';
import { Gamelogic } from '../gamelogic';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [Gamelogic]
})
export class GameComponent implements OnInit {

  constructor( public game: Gamelogic) { }

  ngOnInit(): void {
  }

  startGame(): void {
    this.game.gameStart();
    const currentPlayer= 'Now Playing: ' + 'Player ' + this.game.currentTurn;
    const information = document.querySelector('.current-status'); 
    information!.innerHTML = currentPlayer;
  }
  async clickSubfield(subfield: any): Promise<void>{
    if(this.game.gameStatus===1){
      const position = subfield.currentTarget.getAttribute('position');
      const information = document.querySelector('.current-status'); 

      //console.log(position);

      this.game.setField(position, this.game.currentTurn);
      const color = this.game.getPlayerColorClass();
      subfield.currentTarget.classList.add(color);


      await this.game.checkGameEndWinner().then((end: boolean)=>{
        if(this.game.gameStatus===0 && end){
          information!.innerHTML = 'Congratulations!! Player ' + this.game.currentTurn + ' Wins!!!'
        }
      });

      await this.game.checkGameEndFull().then((end: boolean)=>{
        if(this.game.gameStatus===0 && end){
          information!.innerHTML = 'Opps! It is a DRAW!! Try Again!!!';
        }
      });

      this.game.changePlayer();

      if (this.game.gameStatus===1){
        const currentPlayer = 'Now Playing: ' + 'Player ' + this.game.currentTurn;
        information!.innerHTML = currentPlayer;
      }
    }



  }
}
