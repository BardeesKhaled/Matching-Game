/*
 * Create a list that holds all of your cards
 */
let list = document.getElementsByClassName("card");
let cards = [...list];

let star = document.getElementsByClassName("star");

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//loop through each card and create its HTML
const deck = document.querySelector(".deck");
function startGame(){
   var shuffledCards = shuffle(cards);
   for (var i= 0; i < shuffledCards.length; i++){
      [].forEach.call(shuffledCards, function(value){
         deck.appendChild(value);
      });
      cards[i].classList.remove("show", "open" ,"match","error");
   }
   // reset moves
    moves = 0;
     document.getElementById('moves').innerHTML= moves;
    // reset rating
    for (var i= 0; i < star.length; i++){
        star[i].style.color = "#FFD700";
        star[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
   
}
// when load the game 
window.onload = startGame();
  clickC();
var match;
function clickC(){
var clicks = 0;
moves =0;
 match =0;
for (var i = 0; i <= cards.length ; i++) {
	 cards[i].addEventListener("click", function(event){
		this.classList.toggle("open");
   		this.classList.toggle("show");
   		list.innerHTML = clicks;
   		var name = this.className;
		clicks +=1;

		console.log(clicks , name );
		//first clicked
		if (clicks === 1) {
			name1 = this.className;
			html = this;
      event.preventDefault();
		};
		//second clicked
		if(clicks === 2){
			name2 = this.className;
			html2= this;
			clicks = 0;
			//compare matched 
			if (name1 === name2) {
				html2.classList.toggle("match");
				html.classList.toggle("match");
				html.style.pointerEvents = 'none' ;
				html2.style.pointerEvents = 'none' ;
        moveCounter();
         match +=1;
         //winng
         if (match === 8) {
          document.getElementById('mMoves').innerHTML = "Your moves equals "+moves;
          document.getElementById('mTime').innerHTML = "In "+minute+"minutes and "+second+"seconds";
          
          document.getElementById('mStar').innerHTML = "With Rating  "+starx+" star(s)";
          $('#my-modal').modal('show');
          
          console.log(moves ,second, minute ,starx );
          };
			}//unmatched
			else{
			html2.classList.add("error");
			html.classList.add("error");
      moveCounter();
			setTimeout(function(){
        	html.classList.remove("show", "open", "error");
        	html2.classList.remove("show", "open", "error");},600);
		}
		}		
     
	});
};
}

var second = 0, minute = 0; hour = 0;
var interval;
	//Timer function
	function startTimer(){
    interval = setInterval(function(){
    	var timer = document.querySelector(".timer");
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}
//move function
var starx=3;
function moveCounter(){  
    moves +=1; 
   	 document.getElementById('moves').innerHTML= moves; 
   	 // setting rates based on moves
    if (moves > 8 && moves < 12){
      starx = 2;
    	let star = document.getElementsByClassName("star");
        for( i= 0; i < 3; i++){
            if(i > 1){
                star[i].style.visibility = "collapse";
                
            }
        }
    }
    else if (moves > 13){
      starx = 1;
        for( i= 0; i < 3; i++){
        	let star = document.getElementsByClassName("star");
            if(i > 0){
                star[i].style.visibility = "collapse";
                
            }
        }
    }
    //set timer
   if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}
function replay(){
    window.location.reload();
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
