const quizdb = [
	{
		question: "Q1. What is your name? *",
		a: "Anmol",
		b: "Saud",
		c: "Sumit",
		d: "Rohit",
		ans: "a"
	},
	{
		question: "Q2. What is your age? *",
		a: "20",
		b: "30",
		c: "25",
		d: "63",
		ans: "a"
	},
	{
		question: "Q3. What is your Favourite colour? *",
		a: "Red",
		b: "Black",
		c: "Blue",
		d: "Yellow",
		ans: "a"
	},
	{
		question: "Q4. Full FORM of DSA? *",
		a: "Data Super Algorithm",
		b: "Deep Structure Architecture",
		c: "Down Structure Approach",
		d: "Data Structure & Algorithm",
		ans: "d"
	}
];

var questionDisplay = document.querySelector(".question");
var allOptions = document.querySelectorAll("li[name = 'option']");
var next = document.querySelector("#submit");

var questionIndex = 0, score= 0, attempted = 0, nonattemped = 0, correct = 0, incorrect = 0;

//Clock SetUp
var hr = 00, min = 10, sec = 59;
var clock = document.querySelector("#time");
var runclock = setInterval(function(){
	if(sec > 0){
		sec--;
	}else if(sec == 0){
		min--;
		if(min < 0){
			hr--;
			min = 60;
		}
		sec = 59;
	}
	clock.innerHTML = hr + " : " + min + " : " + sec;  
},1000);

function loadQuestions(){
	questionDisplay.innerHTML = quizdb[questionIndex].question;
	
	allOptions[0].innerHTML = quizdb[questionIndex].a;
	allOptions[1].innerHTML = quizdb[questionIndex].b;
	allOptions[2].innerHTML = quizdb[questionIndex].c;
	allOptions[3].innerHTML = quizdb[questionIndex].d;
	
	if(questionIndex == quizdb.length-1){
		next.innerHTML = "Submit";
	}
	
	for(let i=0; i<allOptions.length; i++){
		if(allOptions[i].classList.contains("active")){
			allOptions[i].classList.remove("active");
		}
	}
}

loadQuestions();

function optionClick(e){
	let clickedId = e.id;
	for(let i=0; i<allOptions.length; i++){
		if(allOptions[i].classList.contains("active")){
			allOptions[i].classList.remove("active");
		}
	}
	let clickedOption = document.querySelector('#'+clickedId);
	clickedOption.classList.add("active");
}



next.addEventListener("click", function(){
	//Checking answer
	let i=0;
	for(i=0; i<allOptions.length; i++){
		if(allOptions[i].classList.contains("active")){
			attempted++;
			if(allOptions[i].id == quizdb[questionIndex].ans){
				score++;
				break;
			}else{
				incorrect++;
			}
		}
	}
	if(i != allOptions.length){
		correct++;
	}
	//Updating question
	questionIndex++;
	if(quizdb.length > questionIndex){
		loadQuestions();
	}else{
		let quizbox = document.querySelector(".quizbox");
		quizbox.style.display = "none";
		
		let scorebox = document.querySelector(".scorebox");
		scorebox.style.display = "block";
		
		let time = document.querySelector("#timing");
		time.innerHTML = "Submitted on : " + hr + ":" + min + ":" + sec;
		
		//Stop Clock
		clearInterval(runclock);
		
		let attempt = document.querySelector("#attempted");
		attempt.innerHTML = "Attempted : " + attempted;
		
		let left = document.querySelector("#nonattempted");
		nonattemped = quizdb.length - attempted;
		left.innerHTML = "Left : " + nonattemped;
		
		let corr = document.querySelector("#correct");
		corr.innerText = "Correct : " + correct;
		
		let incorr = document.querySelector("#incorrect");
		incorr.innerHTML = "Incorrect : " + incorrect; 
		
		let scorecount = document.getElementById("#score-a");
		scorecount.innerHTML = "Your Score is : "  + score + ".";
	}
});
