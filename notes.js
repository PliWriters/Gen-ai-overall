const tgform = document.getElementById("tgform");
const modal = document.getElementById("modal");
const notesList = document.getElementById("notes");
let currentNoteIndex = null; // Track the currently selected note for editing

tgform.onclick = function() {
    openModal();
    tgform.style.display = "none";
};

function openModal() {
    modal.classList.add("active");
    modal.innerHTML = `
    <div id="modal-header">
        <span id="close-modal">X</span>
    </div>
    <div id="form">
        <input id="inputT" placeholder="Title" type="text">
        <textarea id="textarea" placeholder="Description"></textarea>
        <center>
            <button id="savei">Save</button>
        </center>
    </div>
    `;
document.getElementById("close-modal").onclick = function() {
        closeModal();
tgform.style.display = "block";
    };

    document.getElementById("savei").onclick = function() {
        saveData();
    };
}

function closeModal() {
    modal.classList.remove("active");
    tgform.style.display = "block";
    currentNoteIndex = null; // Reset the index when closing the modal
}

function saveData() {
    let local = JSON.parse(localStorage.getItem("notes")) || [];
    let data = {
        title: document.getElementById("inputT").value,
        decs: document.getElementById("textarea").value,
    };

    if (currentNoteIndex !== null) {
        // Edit existing note
        local[currentNoteIndex] = data;
    } else {
        // Add new note
        local.push(data);
    }

    localStorage.setItem("notes", JSON.stringify(local));
    closeModal();
    displayNotes();
}

function displayNotes() {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    
    notes.forEach((note, index) => {
        let li = document.createElement("div");
        li.classList.add("li");
li.innerHTML = `<center>
<h3>${note.title}</h3>
<p>${note.decs}</p>
</center>`;
let title = notes.title;

        // Add click event to open the modal with note details
        li.onclick = function() {
            openNoteModal(index);
        };

        notesList.appendChild(li);
    });
}

function openNoteModal(index) {
    currentNoteIndex = index;
    let notes = JSON.parse(localStorage.getItem("notes"));
    let note = notes[index];

    modal.classList.add("active");
    modal.innerHTML = `
    <div id="modal-header">
        <span id="close-modal">X</span>
    </div>
    <div id="form">
        <input id="inputT" value="${note.title}" type="text">
        <textarea id="textarea">${note.decs}</textarea>
        <center>
            <button id="savei">Save</button>
            <button id="deletei" onclick="deleteNote(${index}); closeModal();">Delete</button>
        </center>
    </div>
    `;

    document.getElementById("close-modal").onclick = function() {
        closeModal();
    };

    document.getElementById("savei").onclick = function() {
        saveData();
    };
}

function deleteNote(index) {
    let local = JSON.parse(localStorage.getItem("notes")) || [];
    local.splice(index, 1); // Remove the note
    localStorage.setItem("notes", JSON.stringify(local));
    displayNotes();
}

window.onload = displayNotes; // Load existing notes on window load
