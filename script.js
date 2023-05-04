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
	let text = "Do you really want to delete everything.\nIt's all gone then!";
	if (confirm(text) == true) {
		localStorage.clear();
		location.reload()
	} else {
	  	return;
	}

}

function saveStorage(){
	localStorage.removeItem("card");
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

	localStorage.setItem("card", JSON.stringify(json));
	alert("The Board was saved.");
}

function loadStorage(){
	if(localStorage.getItem("card") == null || localStorage.getItem("card") == '"{}"') {
		alert("There is no board to load. Create new Card and then save it.");
		return;
	}else{
		let rawCards = localStorage.getItem("card");
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

function autoLoad(){
	if(localStorage.getItem("card") == null || localStorage.getItem("card") == '"{}"') {
		return;
	}else{
		loadStorage();
	}
}
document.addEventListener("DOMContentLoaded", autoLoad());


addEventListener("beforeunload", (event) => {
	return;
});