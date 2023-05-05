// Create a Card & Create UI
let id;

if(localStorage.getItem("id") === null ){
	id = 1;
}else {
	id = localStorage.getItem("id");
}

function newcard(){
	var titel = document.getElementById("titel").value;
	var description = document.getElementById("description").value
	var date = document.getElementById("timeDelete").value;
	
	var status = document.getElementById("status").value;
	var statusspalte = document.getElementById(status);

	statusspalte.innerHTML += `
	<div class="card" id="${id}" draggable="true" ondragstart="dragstart(event)" >
		<h3 contenteditable="true" onkeypress="return (this.innerText.length <= 21)">${titel}</h3>
		<p contenteditable="true" onkeypress="return (this.innerText.length <= 250)">${description}</p>
		<input type="datetime-local" id="dateFinished" value=${date}>
		<button class="delete" id="${id}" onclick = "deletecard(this)">X</button>     
	</div>`
	id++;
	localStorage.setItem("id", id);
}

localStorage.setItem("id", id)

function getnewui(){
	var newui = document.getElementById("createui");
	var button = document.getElementById("create");

	button.style.display = "none";
	newui.style.display = "flex";
}

function closeui(){
	var newui = document.getElementById("createui");
	var button = document.getElementById("create");
	newui.style.display = "none";
	button.style.display = "block";
}


// Delete Button on Card
function deletecard(e){
	let parrent = e.parentElement;
	parrent.remove();
}

// Drag and Drop

function dragstart(event){
	event.dataTransfer.setData("Text" , event.target.id);
}

function onDragover(event) {
	event.preventDefault();
}

function onDrop(event){
	event.preventDefault();
	const data = event.dataTransfer.getData("Text");
	const inWork = document.getElementById("inWork")
	const todo = document.getElementById("todo")
	const finished = document.getElementById("finished")

	if(event.target === inWork || event.target === todo || event.target === finished){
		event.target.appendChild(document.getElementById(data));
	}else{
		return
	}
}

// local storage

function deleteStorage(){
	let text = "Do you really want to delete this Board.\nIt's all gone then!";
	if (confirm(text) == true) {
		if(document.getElementById("Boardheader").innerText === "Board 1"){
			localStorage.removeItem("Board1");
			location.reload();
		}else if(document.getElementById("Boardheader").innerText === "Board 2"){
			localStorage.removeItem("Board2");
			location.reload();
		}else if(document.getElementById("Boardheader").innerText === "Board 3"){
			localStorage.removeItem("Board3");
			location.reload();
		}else {
			return;
		}
  	} else {
	  	return;
	}
}

function deleteStorageAll(){
	let text = "Do you really want to delete everything.\nIt's all gone then!";
	if (confirm(text) == true) {
		localStorage.clear();
		location.reload()
  	} else {
	  	return;
	}
}

function saveStorage(){
	localStorage.removeItem("Board1");
	var cards = document.querySelectorAll(".card");
	var json = "{}"
	var array = []
	Array.from(cards).forEach(function(card) {

		const id= card.id;
		const titel = card.firstElementChild;
		const description = titel.nextElementSibling;
		const parrentElemten = card.parentElement.id;
		const date = description.nextElementSibling.value;	
		
		array.push(
			{
				id: id,
				titel: titel.outerText,
				description: description.outerText,
				date: date,
				parrent: parrentElemten
			}
		);
		json = array;
	});
	if(document.getElementById("Boardheader").innerText === "Board 1"){
		localStorage.setItem("Board1", JSON.stringify(json));
	}else if(document.getElementById("Boardheader").innerText === "Board 2"){
		localStorage.setItem("Board2", JSON.stringify(json));
	}else if(document.getElementById("Boardheader").innerText === "Board 3"){
		localStorage.setItem("Board3", JSON.stringify(json));
	}else {
		return;
	}
	// localStorage.setItem("Board1", JSON.stringify(json));
	alert("The Board was saved.");
}

function loadStorage(){
	if(document.getElementById("Boardheader").innerText === "Board 1"){
		loadStorageBoard1();
	}else if(document.getElementById("Boardheader").innerText === "Board 2"){
		loadStorageBoard2();
	}else if(document.getElementById("Boardheader").innerText === "Board 3"){
		loadStorageBoard3();
	}else {
		return;
	}
}

function autoLoad(){
	if(localStorage.getItem("Board1") == null || localStorage.getItem("Board1") == '"{}"') {
		return;
	}else{
		loadStorage();
	}
}
document.addEventListener("DOMContentLoaded", autoLoad());

addEventListener("beforeunload", (event) => {
	return;
});

// Diffrent Boards

function loadStorageBoard1(){
	if(localStorage.getItem("Board1") == null || localStorage.getItem("Board1") == '"{}"') {
		alert("There is no board to load. Create new Card and then save it.");
		return;
	}else{
		let rawCards = localStorage.getItem("Board1");
		let Cards = JSON.parse(rawCards);
		let cardsLength = Cards.length
		
		for (var i = 0; i < cardsLength; i++) {
			document.getElementById(Cards[i].parrent).innerHTML += 			
		`<div class="card" id="${Cards[i].id}" draggable="true" ondragstart="dragstart(event)" >
			<h3 contenteditable="true" onkeypress="return (this.innerText.length <= 21)">${Cards[i].titel}</h3>
			<p contenteditable="true" onkeypress="return (this.innerText.length <= 250)">${Cards[i].description}</p>
			<input type="datetime-local" id="dateFinished" value=${Cards[i].date}>
			<button class="delete" id="${Cards[i].id}" onclick = "deletecard(this)">X</button>
		</div>`
		}	
	}
}

function loadStorageBoard2(){
	if(localStorage.getItem("Board2") == null || localStorage.getItem("Board2") == '"{}"') {
		alert("There is no board to load. Create new Card and then save it.");
		return;
	}else{
		let rawCards = localStorage.getItem("Board2");
		let Cards = JSON.parse(rawCards);
		let cardsLength = Cards.length
		
		for (var i = 0; i < cardsLength; i++) {
			document.getElementById(Cards[i].parrent).innerHTML += 			
		`<div class="card" id="${Cards[i].id}" draggable="true" ondragstart="dragstart(event)" >
			<h3 contenteditable="true" onkeypress="return (this.innerText.length <= 21)">${Cards[i].titel}</h3>
			<p contenteditable="true" onkeypress="return (this.innerText.length <= 250)">${Cards[i].description}</p>
			<input type="datetime-local" id="dateFinished" value=${Cards[i].date}>
			<button class="delete" id="${Cards[i].id}" onclick = "deletecard(this)">X</button>
		</div>`
		}	
	}
}

function loadStorageBoard3(){
	if(localStorage.getItem("Board3") == null || localStorage.getItem("Board3") == '"{}"') {
		alert("There is no board to load. Create new Card and then save it.");
		return;
	}else{
		let rawCards = localStorage.getItem("Board3");
		let Cards = JSON.parse(rawCards);
		let cardsLength = Cards.length
		
		for (var i = 0; i < cardsLength; i++) {
			document.getElementById(Cards[i].parrent).innerHTML += 			
		`<div class="card" id="${Cards[i].id}" draggable="true" ondragstart="dragstart(event)" >
			<h3 contenteditable="true" onkeypress="return (this.innerText.length <= 21)">${Cards[i].titel}</h3>
			<p contenteditable="true" onkeypress="return (this.innerText.length <= 250)">${Cards[i].description}</p>
			<input type="datetime-local" id="dateFinished" value=${Cards[i].date}>
			<button class="delete" id="${Cards[i].id}" onclick = "deletecard(this)">X</button>
		</div>`
		}	
	}
}


function clickBoard1(){
	var cards = document.querySelectorAll(".card");
	document.getElementById("Boardheader").innerText = "Board 1";
	let text = "Do you really want to switch the Board.\nIf you dont save the board everything is gone!";
	
	if (confirm(text) == true) {
		if(localStorage.getItem("Board1")){  
			if(localStorage.getItem("Board1") == null || localStorage.getItem("Board1") == '"{}"') {
				return;
			}else{
				Array.from(cards).forEach(function(card) {
					card.remove();
				});
				loadStorageBoard1();
			}
		}else{
			Array.from(cards).forEach(function(card) {
				card.remove();
			});
		}
	} else {
	  	return;
	}
}

function clickBoard2(){
	var cards = document.querySelectorAll(".card");
	document.getElementById("Boardheader").innerText = "Board 2";
	let text = "Do you really want to switch the Board.\nIf you dont save the board everything is gone!";
	
	if (confirm(text) == true) {
		if(localStorage.getItem("Board2")){  
			if(localStorage.getItem("Board2") == null || localStorage.getItem("Board2") == '"{}"') {
				return;
			}else{
				Array.from(cards).forEach(function(card) {
					card.remove();
				});
				loadStorageBoard2();
			}
		}else{
			Array.from(cards).forEach(function(card) {
				card.remove();
			});
		}
	} else {
	  	return;
	}
}

function clickBoard3(){
	var cards = document.querySelectorAll(".card");
	document.getElementById("Boardheader").innerText = "Board 3";
	let text = "Do you really want to switch the Board.\nIf you dont save the board everything is gone!";
	
	if (confirm(text) == true) {
		if(localStorage.getItem("Board3")){  
			if(localStorage.getItem("Board3") == null || localStorage.getItem("Board3") == '"{}"') {
				return;
			}else{
				Array.from(cards).forEach(function(card) {
					card.remove();
				});
				loadStorageBoard3();
			}
		}else{
			Array.from(cards).forEach(function(card) {
				card.remove();
			});
		}
	} else {
	  	return;
	}
}