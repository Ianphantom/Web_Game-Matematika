var play = false;
var score;
var action;
var timeRemaining;
var correct;
document.getElementById("startreset").onclick = function(){
    if(play == true){
        location.reload();
    }else{
        play = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        hide("gameover");
        document.getElementById("startreset").innerHTML = "Reset Game";
        startCountdown();
        generateQuestion();
    }
}

// document.getElementById("box1").onclick = function(){
//     if(play == true){

//     }
// }
for(j=1;j<=4;j++){
    document.getElementById(`box${j}`).onclick = function(){
        console.log(this.innerHTML);
        if(play == true){
            if(this.innerHTML == correct ){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");
                setTimeout(function(){
                    hide("correct");
                }, 1000)
                generateQuestion();
            }else{
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000)
            }
        }
    }
}

function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;
        if(timeRemaining == 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover"). innerHTML = "<p>Game over!</p><p>Your Score is " + score +  "</p>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            play = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000)
}

function stopCountdown(){
    clearInterval(action);
}

function hide(id){
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQuestion(){
    var x = generateRand(10);
    var y = generateRand(10);
    correct = x * y ;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = generateRand(4);
    document.getElementById(`box${correctPosition}`).innerHTML = correct;
    var answer = [correct];
    for(i=1; i<=4 ; i++){
        if ( i !== correctPosition ){
            var wrong;
            do{
                wrong = generateRand(10) * generateRand(10);
            }while(answer.indexOf(wrong) > -1); 
            answer.push(wrong);
            document.getElementById(`box${i}`).innerHTML = wrong;
        }
    }
}

function generateRand(number){
    return Math.round(Math.random() * (number-1)) + 1;
}

