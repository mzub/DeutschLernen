function hideFrstStage() {
	var ButtonsPrimary = document.getElementsByClassName('frstStage');
	for (var i = 0; i < ButtonsPrimary.length; i++) {
		ButtonsPrimary[i].style.display = "none";
	}
}

function t_w_stage() { // Russian --> German _____Show the transWrd stage
	var t_w = document.getElementsByClassName('t_w_stage');
	for (var i = 0; i < t_w.length; i++) {
		t_w[i].style.display = "flex";
	}
	document.getElementById('undefLang').id = 'germanAnswer';
}	  
function w_t_stage() { // German --> Russian _________ Show the Word trans stage
	var w_t = document.getElementsByClassName('w_t_stage');
	for (var i = 0; i < w_t.length; i++) {
		w_t[i].style.display = "flex";
	}
	document.getElementById('undefLang').id = 'russianAnswer';
}
function wrdTrans() { //button function to start a chain of events
	console.log("Button Word - Translate has been pressed");
	hideFrstStage();
	w_t_stage();
	wordGenerator();	
}

function transWrd() { //button function ot start a chain of events
	console.log("Button Translate - Word has been pressed");
	hideFrstStage();
	t_w_stage();
	wordGenerator();
}

makeCounter = (function makeCounter() { // crate a counter
	var counter = 2;
	return function () {
		return counter++;
	}
})();

window.onkeydown = function (e) { // Hotkey for starscrenn. Choose the button of needed training
	let x = document.getElementsByClassName('row frstStage');
	if (x[0].style.display == "") {
		if (e.keyCode == 49) {
			wrdTrans();
		}
		if (e.keyCode == 50) {
			transWrd();	
		}
	}
}

function changeViewHelp(param) { // change view of help buttons
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

function wordIterator(param) { // Generator of words
	let userInput = document.getElementById('inputForm');
	let germanWrd = document.getElementById("german");
	let russianWrd = document.getElementById("russian");
	let englishWrd = document.getElementById("english");
	if (param == 2) {
		document.getElementById("counter").innerHTML = makeCounter(); // change the word counter number
	}
	userInput.onkeydown = function (e) { //**************************** usage of a keyboard 
		if ((e.ctrlKey || e.shiftKey || e.altKey || e.keyCode >= 0) && (document.body.style.backgroundColor == 'rgb(255, 179, 179)')) {
			document.body.style.backgroundColor = 'white';
		}
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
		//	wordIterator(1);
		return;
	} 
	if (document.getElementById("counter").innerHTML < 2) {
		let rdmNumber = Math.floor((Math.random() * ancientWrdArr.length));	
		germanWrd.innerHTML = ancientWrdArr[rdmNumber].german;
		russianWrd.innerHTML = ancientWrdArr[rdmNumber].russian;
		englishWrd.innerHTML = ancientWrdArr[rdmNumber].english;
		if (document.getElementById('germanAnswer')) {
			document.getElementById('germanAnswer').innerHTML = ancientWrdArr[rdmNumber].german;
		}
		if (document.getElementById('russianAnswer')) {
			document.getElementById('russianAnswer').innerHTML = ancientWrdArr[rdmNumber].russian;
		}
		ancientWrdArr.splice(rdmNumber, 1); 
	} else if (document.getElementById("counter").innerHTML < 4) {
		let rdmNumber = Math.floor((Math.random() * oldestWrdArr.length));	
		germanWrd.innerHTML = oldestWrdArr[rdmNumber].german;
		russianWrd.innerHTML = oldestWrdArr[rdmNumber].russian;
		englishWrd.innerHTML = oldestWrdArr[rdmNumber].english;
		if (document.getElementById('germanAnswer')) {
			document.getElementById('germanAnswer').innerHTML = oldestWrdArr[rdmNumber].german;
		}
		if (document.getElementById('russianAnswer')) {
			document.getElementById('russianAnswer').innerHTML = oldestWrdArr[rdmNumber].russian;
		}
		oldestWrdArr.splice(rdmNumber, 1); 
	} else if (document.getElementById("counter").innerHTML < 7) {
		let rdmNumber = Math.floor((Math.random() * oldWrdArr.length));	
		germanWrd.innerHTML = oldWrdArr[rdmNumber].german;
		russianWrd.innerHTML = oldWrdArr[rdmNumber].russian;
		englishWrd.innerHTML = oldWrdArr[rdmNumber].english;
		if (document.getElementById('germanAnswer')) {
			document.getElementById('germanAnswer').innerHTML = oldWrdArr[rdmNumber].german;
		}
		if (document.getElementById('russianAnswer')) {
			document.getElementById('russianAnswer').innerHTML = oldWrdArr[rdmNumber].russian;
		}
		oldWrdArr.splice(rdmNumber, 1); 
	} else if (document.getElementById("counter").innerHTML < 12) {
		let rdmNumber = Math.floor((Math.random() * newWrdArr.length));	
		germanWrd.innerHTML = newWrdArr[rdmNumber].german;
		russianWrd.innerHTML = newWrdArr[rdmNumber].russian;
		englishWrd.innerHTML = newWrdArr[rdmNumber].english;
		if (document.getElementById('germanAnswer')) {
			document.getElementById('germanAnswer').innerHTML = newWrdArr[rdmNumber].german;
		}
		if (document.getElementById('russianAnswer')) {
			document.getElementById('russianAnswer').innerHTML = newWrdArr[rdmNumber].russian;
		}
		newWrdArr.splice(rdmNumber, 1); 
	} else {
		let rdmNumber = Math.floor((Math.random() * newestWrdArr.length));	
		germanWrd.innerHTML = newestWrdArr[rdmNumber].german;
		russianWrd.innerHTML = newestWrdArr[rdmNumber].russian;
		englishWrd.innerHTML = newestWrdArr[rdmNumber].english;
		if (document.getElementById('germanAnswer')) {
			document.getElementById('germanAnswer').innerHTML = newestWrdArr[rdmNumber].german;
		}
		if (document.getElementById('russianAnswer')) {
			document.getElementById('russianAnswer').innerHTML = newestWrdArr[rdmNumber].russian;
		}
		newestWrdArr.splice(rdmNumber, 1); 
	}

	userInput.focus();
	if (document.getElementById("counter").innerHTML == 21) {
		document.getElementById("counter").innerHTML = 20;
		userInput.disabled = true;
		changeViewHelp('disabled');
		document.getElementById("yoButton").disabled = true;
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
		ancientWrdArr = wrdObj.DB.slice(0, Math.floor(wrdObj.DB.length * 0.1)); // creates an object of ancient words (10% of wrdObj)
		oldestWrdArr = wrdObj.DB.slice(ancientWrdArr.length, Math.floor(wrdObj.DB.length * 0.3)); // creates an object of oldest words (20% of wrdObj)
		oldWrdArr = wrdObj.DB.slice((ancientWrdArr.length + oldestWrdArr.length), Math.floor(wrdObj.DB.length * 0.55)); // creates an object of old words (25% of wrdObj)
		newWrdArr = wrdObj.DB.slice((ancientWrdArr.length + oldestWrdArr.length + oldWrdArr.length), Math.floor(wrdObj.DB.length * 0.75)); // creates an object of new words (20% of wrdObj)
		newestWrdArr = wrdObj.DB.slice((ancientWrdArr.length + oldestWrdArr.length + oldWrdArr.length + newWrdArr.length)); // creates an object of newest words (25% of wrdObj)
		wordIterator();
	    }
	};
	xmlhttp.open("GET", "./words.json", true);
	xmlhttp.send();
}
