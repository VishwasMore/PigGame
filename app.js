/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores,roundScore,activePlayer,gamePlaying;

//---gamePlaying is used to show state of the game

init();
document.querySelector('.btn-roll').addEventListener('click',function(){

  if(gamePlaying){
    //----1.Random Number
    var dice = Math.floor(Math.random()*6)+1;

    //----2. Display result
    var diceDOM = document.querySelector('.dice'); //in order to avoid ueryselecting everytime
    diceDOM.style.display='block'; //this is because we displayed none above
    diceDOM.src = 'dice-'+ dice + '.png';

    //----3. Update the Round Score if the rolled number was Not 1
    if(dice !== 1){
        //----AddScore
        roundScore += dice; //roundScore = roundScore + dice;
        document.querySelector('#current-'+activePlayer).textContent=roundScore;
    } else{
        //----Next Player
        nextPlayer();

    }
  }

});

//----HOLD Section
document.querySelector('.btn-hold').addEventListener('click',function(){

  if(gamePlaying){
    //----1.Add Current Score to Global score
    scores[activePlayer] += roundScore; //scores[activePlayer] = score[activePlayer] + roundScore;

    //----2.Update UI
    document.querySelector('#score-' + activePlayer).textContent=scores[activePlayer];


    //----3.Check if player won the GAME
    if(scores[activePlayer]>=20){
      document.querySelector('#name-' +activePlayer).textContent='Winner!';
      document.querySelector('.dice').style.display='none';
      document.querySelector('.player-' +activePlayer+ '-panel').classList.add('winner');
      document.querySelector('.player-' +activePlayer+ '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
        //Next player
        nextPlayer();
    }
  }


});

function nextPlayer (){
  // if(activePlayer===0){
  //   activePlayer=1;
  // }else{
  //   activePlayer =0;
  // }
  activePlayer === 0 ? activePlayer = 1 : activePlayer =0; //Turnary Operater instead of IF statement
  roundScore = 0;

  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';

  //----adding active class to the Panels class which includes styles
  //----changing player 1 to Player 2 and vice versa

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  document.querySelector('.dice').style.display ='none';
}


//---NEW GAME Section
document.querySelector('.btn-new').addEventListener('click',init);


//----Initializing Function
function init(){
  scores=[0,0];
  activePlayer=0;
  roundScore=0;
  gamePlaying = true;
  document.querySelector('.dice').style.display='none';
  document.getElementById('score-0').textContent='0';
  document.getElementById('score-1').textContent='0';
  document.getElementById('current-0').textContent='0';
  document.getElementById('current-1').textContent='0';
  document.getElementById('name-0').textContent='Player 1';
  document.getElementById('name-1').textContent='Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  document.querySelector('.player-0-panel').classList.add('active');
}



//------FOR REF -------------
//document.querySelector('#current-'+activePlayer).textContent=dice;
/*em gives italic text , innerHTML will help if we need to change style of the text*/
//document.querySelector("#current-" +activePlayer).innerHTML ="<em>" +dice+ "</em>";
