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
	<div class="card" id="${id}" draggable="true" ondragstart="dragstart(event)">
		<h3 contenteditable="true">${titel}</h3>
		<p contenteditable="true">${description}</p>
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

function testfun(){
	let text = "Willst du wirklich das Board löschen.\nEs ist dann alles weg!";
	if (confirm(text) == true) {
		localStorage.clear();
		console.log("gelöscht!")
		location.reload()
	} else {
		console.log("Nicht gelöscht!")
	  	return;
	}

}

function testcool(){
	localStorage.removeItem("card");
	var todoList = document.querySelectorAll("#todo .card");
	var inWorkList = document.querySelectorAll("#inWork .card");
	var finishedList = document.querySelectorAll("#finished .card");

	var json = {}
	Array.from(todoList).forEach(function(todo) {

		const id= todo.id;
		const titel = todo.firstElementChild;
		const description = titel.nextElementSibling;
		const parrent = todo.parentElement
		const parrentid = parrent.id;
		const date = description.nextElementSibling.value;
		
		json += `{"parrent": "${parrentid}", "id": "${id}", "titel": "${titel.outerText}", "description": "${description.outerText}", "date": "${date}"}`;
	});

	localStorage.setItem("card", JSON.stringify(json));
	alert("Das Board wurde gesprechert.");
}

function testnotcool(){


	if(localStorage.getItem("card") == null || localStorage.getItem("card") == "") {
		alert("Es gibt kein Board zum Laden. Erstelle neue Karten und speicher es dann.")
		return;
	}else{
		document.getElementById("inWork").innerHTML += localStorage.getItem("card")		
	}
}

function cardLaden(){
	if(localStorage.getItem("card") == null) {
		return;
	}else{
		document.getElementById("inWork").innerHTML += localStorage.getItem("card")		
	}
}
document.addEventListener("DOMContentLoaded", cardLaden());


addEventListener("beforeunload", (event) => {
	return;
});