function hideFrstStage() {
	var ButtonsPrimary = document.getElementsByClassName('frstStage');
	for (var i = 0; i < ButtonsPrimary.length; i++) {
		ButtonsPrimary[i].style.display = "none";
	}
}

function t_w_stage() { // Russian --> German
	var t_w = document.getElementsByClassName('t_w_stage');
	for (var i = 0; i < t_w.length; i++) {
		t_w[i].style.display = "flex";
	}
	document.getElementById('undefLang').id = 'germanAnswer';
}	  
function w_t_stage() { // German --> Russian
	var w_t = document.getElementsByClassName('w_t_stage');
	for (var i = 0; i < w_t.length; i++) {
		w_t[i].style.display = "flex";
	}
	document.getElementById('undefLang').id = 'russianAnswer';
}
function wrdTrans() {
	console.log("Button Word - Translate has been pressed");
	hideFrstStage();
	w_t_stage();
	wordGenerator();	
}

function transWrd() {
	console.log("Button Translate - Word has been pressed");
	hideFrstStage();
	t_w_stage();
	wordGenerator();
}

makeCounter = (function makeCounter() {
	var counter = 2;
	return function () {
		return counter++;
	}
})();

function changeViewHelp(param) {
	let hintButton = document.getElementById('hintButton');
	let hintButton2 = document.getElementById('hintButton2');
	let answerButton = document.getElementById('answerButton');
	let answerButton2 = document.getElementById('answerButton2');
	switch(param) {
		case "hint":
			if (hintButton.style.display !== "none") {
				hintButton.style.display = "none";
				hintButton2.style.display = "block";
			} else {
				hintButton.style.display = "block";
				hintButton2.style.display = "none";
			}
			break;
		case "answer":
			if (answerButton.style.display !== "none") {
				answerButton.style.display = "none";
				answerButton2.style.display = "block";
			} else {
				answerButton.style.display = "block";
				answerButton2.style.display = "none";
			}
			break;
		case "defaultView":
			hintButton.style.display = "block";
			hintButton2.style.display = "none";
			answerButton.style.display = "block";
			answerButton2.style.display = "none";
			break;
		case "disabled":
			hintButton.firstElementChild.disabled = true;
			answerButton.firstElementChild.disabled = true;
			break;
		default:
			console.log("");	
	}
}

function wordIterator(param) {
	let userInput = document.getElementById('inputForm');
	let germanWrd = document.getElementById("german");
	let russianWrd = document.getElementById("russian");
	let englishWrd = document.getElementById("english");
	if (param == 2) {
		document.getElementById("counter").innerHTML = makeCounter();
	}
	userInput.onkeydown = function (e) { //**************************** usage of a keyboard 
		if (e.keyCode == 13 && param === 2) {
			wordIterator(2);	
		} else if (e.keyCode == 13) {
			changeViewHelp('defaultView');
			wordIterator(1);
		}
		if (e.ctrlKey && e.shiftKey && e.keyCode == 49) {
			changeViewHelp('hint');
		}
		if (e.ctrlKey && e.shiftKey && e.keyCode == 50) {
			changeViewHelp('answer');
		}
		if ((e.ctrlKey || e.shiftKey || e.altKey || e.keyCode >= 0) && (document.body.style.backgroundColor == 'rgb(255, 179, 179)')) {
			document.body.style.backgroundColor = 'white';
		}
	}
	if (userInput.value == "" && param === 1) {
		return false // if input is nothing then nothing	
	} else if (param === 1 && (userInput.value.toUpperCase() == germanWrd.innerHTML.toUpperCase()  || userInput.value.toUpperCase() == russianWrd.innerHTML.toUpperCase())) {
		document.body.style.backgroundColor = '#b5e7a0'; // if true then green
		document.getElementById("nextButton").style.display = "flex";
		document.getElementById("yoButton").style.display = "none";
		return param = 2;
	} else if (param === 2) {
		document.getElementById("nextButton").style.display = "none";
		document.getElementById("yoButton").style.display = "flex";
		document.body.style.backgroundColor = 'white';
		userInput.value = "";
		changeViewHelp('defaultView');
		wordIterator(1);
	} else if (param === 1) {
		document.body.style.backgroundColor = '#ffb3b3'; // if input is wrong then rose
		wordIterator(1);
	} 
	let rdmNumber = Math.floor((Math.random() * wrdObj.DB.length));	
	germanWrd.innerHTML = wrdObj.DB[rdmNumber].german;
	russianWrd.innerHTML = wrdObj.DB[rdmNumber].russian;
	englishWrd.innerHTML = wrdObj.DB[rdmNumber].english;
	if (document.getElementById('germanAnswer')) {
		document.getElementById('germanAnswer').innerHTML = wrdObj.DB[rdmNumber].german;
	}
	if (document.getElementById('russianAnswer')) {
		document.getElementById('russianAnswer').innerHTML = wrdObj.DB[rdmNumber].russian;
	}
	userInput.focus();
	wrdObj.DB.splice(rdmNumber, 1); 
		if (document.getElementById("counter").innerHTML == 20) {
		userInput.disabled = true;
		changeViewHelp('disabled');
		russianWrd.innerHTML = "Well done! This is the end of your training."
		germanWrd.innerHTML = "Well done! This is the end of your training."
		russianWrd.innerHTML = "Well done! This ist the end of your training."
	}
	userInput.value = "";
	
}
//request from words.json****************************************
function wordGenerator() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
		wrdObj = JSON.parse(this.responseText);
		wordIterator();
	    }
	};
	xmlhttp.open("GET", "./words.json", true);
	xmlhttp.send();
}
