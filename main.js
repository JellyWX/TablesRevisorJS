var correct = 0, //how many correct answers
question,
answer, //what answer the user keyed in
ans_c, //the correct answer to the question
q1, //the first part of the question
q2, //the third part of the question
ans_c_old, //to store the previous answer after a new one has been created
operator,
maxr, //the operator or second part of the question
started, //whether the game has started yet
multiply,subtract,add, //lets the game know what options are activated
retry, //to do with choosing the right option
init = false, //shows if the 'Go' button has been pressed at least once
wx,wy; //sets to window x and y

var randint = function(s,f) {
  var i = Math.random();
  var i2 = i * ((f - s) + 1);
  var i3 = i2 + s;
  var i4 = Math.floor(i3);
  return i4;
}

var gen_operator = function() {
  retry = true;
  while(retry){
    var j = randint(0,2);
    if(j==0) {
      operator = '*';
    }
    else if(j==1) {
      operator = '-';
    }
    else if(j==2) {
      operator = '+';
    }
    if(!add && operator=='+'){retry=true;}
    else if(!subtract && operator=='-'){retry=true;}
    else if(!multiply && operator=='*'){retry=true;}
    
    else{
      retry = false;
    }
  }
  
  return operator;
}

function parseQuestion(op,p1,p2) {
  console.log('Operator:' + op + ' p1:' + p1 + ' p2:' + p2)
  ans_c_old = ans_c;
  
  question = Math.max(p1,p2) + op + Math.min(p1,p2);
  ans_c = eval(question);
}

function submit(){
  document.getElementById('questions').style.fontSize = "50px";
  gen_operator();
  answer = document.getElementById('ans').value;
  if(answer==ans_c){ /*run if the player gets the question right*/
    correct++; /*increase the score by 1*/
    parseQuestion(operator, randint(1,maxr), randint(1,maxr)); /*create a new question*/
    document.getElementById('questions').innerHTML = question; /*draw a new question onto the screen*/
  }
  
  else{ /*run if the player fails the question*/
    end(correct.toString())
  }
  
  document.getElementById('ans').value = '';  
}

function start(){
  if(document.getElementById('multiply').checked){
    multiply=true;
  }else{multiply=false;}
  
  if(document.getElementById('subtract').checked){
    subtract=true;
  }else{subtract=false;}
  
  if(document.getElementById('add').checked){
    add=true;
  }else{add=false;}
  
  if(!multiply&&!subtract&&!add){
    document.getElementById('add').checked = true;
    document.getElementById('subtract').checked = true;
    document.getElementById('multiply').checked = true;  
    subtract = true;
    add = true;
    multiply = true;
  }
  
  maxr = document.getElementById('max').value;
  gen_operator();
  parseQuestion(operator, randint(1,maxr), randint(1,maxr));
  document.getElementById('questions').style.fontSize = "50px";
  document.getElementById('questions').innerHTML = question;
  document.getElementById('begin').innerHTML = 'Restart';
  
  started = true;
  init = true;
}

function end(c) {
  document.getElementById('questions').innerHTML = 'You failed! The correct answer was ' + ans_c + '. Correct answers: ' + c;
  document.getElementById('begin').innerHTML = 'Retry!';
  started = false;
  correct = 0;
  document.getElementById('questions').style.fontSize = "16px";
}

function enter(e) {
  var k = e.keyCode;
  if(k==13){
    if(!started){
      start();
    }
    else{
      submit();
    }
  }
  else if(k==82){
    if(init){
      start();
    }
  }
}

function hovering(info){
  document.getElementById('info').innerHTML=info;
}

document.onkeyup = enter;
