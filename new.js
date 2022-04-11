const noteBoxes = document.getElementsByClassName("note-boxes")[0];
const title = document.getElementById("title");
const content = document.getElementById("content");
const date = document.getElementById("date");
const time = document.getElementById("time");

function isvalid() {
    content.style.border = "";
    date.style.border = "";

    if (!content.value || !date.value) {
        if (!content.value) {
            content.style.border = "3px solid red";
        }
        if (!date.value) {
            date.style.border = "3px solid red";
        }
        return false;
    }

    return true;
}

let notesArray = localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];


// add note
function add() {
    if (!isvalid()) {
        console.log("failed validation!");
        return false;
    }

    var note_info = {
        "id": (Math.random() * 100) * Date.now(),
        "title": title.value,
        "content": content.value,
        "date": date.value,
        "time": time.value,
    }
    notesArray.push(note_info);
    localStorage.setItem("notes", JSON.stringify(notesArray));



    // divnote(index)
    divnote(notesArray[notesArray.length - 1]);


}


//create div note
notesArray.forEach(divnote);

function divnote(divN) {
    const divNote = document.createElement("div");
    divNote.innerHTML = `<div class="box fade-in">
                    <svg xmlns="http://www.w3.org/2000/svg"  width="16" height="16" fill="currentColor" class="bi bi-x-circle" onclick="deleteNote(${divN.id},this)" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>

                    <p id="note-title"> ${divN.title} </p>
                    <p id="note-content"> ${divN.content} </p>
                    <p id="note-date"> ${divN.date}</p>
                    <p id="note-time"> ${divN.time} </p>
                    </div>`




    noteBoxes.appendChild(divNote);

    document.getElementById("noteStatistics").innerHTML = `${notesArray.length} note(s) added <br>`;

    //reset field
    title.value = "";
    content.value = "";
    date.value = "";
    time.value = "";
}




//delete all the array everything in the box
function clearLocalStorage() {
    localStorage.clear();
    notesArray = [];
    noteBoxes.innerHTML = "";
    document.getElementById("noteStatistics").innerHTML = `${notesArray.length} note(s) added <br>`;

}


//delete one note
function deleteNote(id, divNote) {
    let dvNote = divNote.parentElement;
    dvNote.parentElement.remove();

    const noteindex = notesArray.findIndex((dvNote) => {
        return id == dvNote.id;
    });
    if (noteindex !== -1) {
        notesArray.splice(noteindex, 1);
        localStorage.setItem("notes", JSON.stringify(notesArray));
        document.createElement("box").innerHTML = "";
        document.getElementById("noteStatistics").innerHTML = `${notesArray.length} note(s) added <br>`;

    }
}


