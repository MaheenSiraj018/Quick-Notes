var dataofnotes = new Array();
var idcounter = 2;
var maxid = 0;

if (localStorage.getItem("notes") !== null) {
    dataofnotes = JSON.parse(localStorage.getItem("notes"));
} else {
    dataofnotes = [];
}

//event listener to display the existing notes
window.addEventListener("load", () => {
    if (localStorage.getItem("notes") !== null)
        display();
})

//function to create new notes
function createnote(noteId, titleId) {
    //accessing the main div for results
    const results = document.getElementById('main');
    var notecolor=getpastelcolor();
    if (!noteId && !titleId) {
        //creating the div for next note
        const nextnotes = document.createElement('div');
        nextnotes.classList.add('n1');
        nextnotes.id = idcounter;

        nextnotes.style.backgroundColor=notecolor;
        idcounter++;
        console.log(nextnotes.id);

        //creating the header of note
        const header = document.createElement('div');
        header.classList.add('header');

        //creating button to add notes
        const addbutton = document.createElement('button');
        addbutton.classList.add('buttons');
        addbutton.textContent = "+";
        addbutton.addEventListener("click", event => {
            event.stopPropagation(); // Prevent the event from bubbling up
            createnote();
        });

        //creating button to edit data of notes
        const editbutton = document.createElement('button');
        editbutton.classList.add('savebtn');
        editbutton.textContent = "Edit";
        editbutton.addEventListener("click", () => {
            editnote(titleid, dataid);
        });

        //creating button to save data of notes
        const savebutton = document.createElement('button');
        savebutton.classList.add('savebtn');
        savebutton.textContent = "Save";
        savebutton.addEventListener("click", () => {
            savenote(titleid, dataid);
        });

        //creating button to remove notes
        const removebutton = document.createElement('button');
        removebutton.classList.add('buttons');
        removebutton.textContent = "-";
        removebutton.addEventListener("click", () => {
            removenote(titleid, nextnotes.id);
        });

        header.append(addbutton);
        header.append(editbutton);
        header.append(savebutton);
        header.append(removebutton);
        nextnotes.append(header);

        //creating the notes area
        const notes = document.createElement('div');
        notes.classList.add('notes');

        //Creating the title of notes
        const title = document.createElement('input');
        title.type = "text";
        title.placeholder = "Title";
        title.classList.add('title');
        var titleid = "t" + nextnotes.id;
        title.id = titleid;
        title.style.backgroundColor=notecolor;
        console.log(titleid);

        //creating textarea to store notes
        const notesinput = document.createElement('textarea');
        notesinput.cols = '35';
        notesinput.rows = '10';
        notesinput.placeholder = "Add Note..";
        notesinput.classList.add('inputnotes');
        notesinput.style.backgroundColor=notecolor;
        var dataid = "n" + nextnotes.id;
        notesinput.id = dataid;
        console.log(notesinput.id);

        notes.append(title);
        notes.append(notesinput);
        nextnotes.append(notes);
        results.append(nextnotes);

        return {
            noteid: nextnotes.id,
            titleid: titleid,
            noteid: dataid
        };
    }
    else {
        //creating the div for next note
        const nextnotes = document.createElement('div');
        nextnotes.classList.add('n1');
        var nextnoteid = parseInt(titleId.substring(1));
        nextnotes.id = nextnoteid;
        nextnotes.style.backgroundColor=notecolor;
        console.log(nextnotes.id);
        if(maxid<nextnoteid) {
            console.log("I am smaller than nextnodeid");
            maxid = nextnoteid;
        }
        console.log("Maxid " + maxid);
        idcounter = maxid + 1;


        //creating the header of note
        const header = document.createElement('div');
        header.classList.add('header');

        //creating button to add notes
        const addbutton = document.createElement('button');
        addbutton.classList.add('buttons');
        addbutton.textContent = "+";
        addbutton.addEventListener("click", event => {
            event.stopPropagation(); // Prevent the event from bubbling up
            createnote();
        });

        //creating button to edit data of notes
        const editbutton = document.createElement('button');
        editbutton.classList.add('savebtn');
        editbutton.textContent = "Edit";
        editbutton.addEventListener("click", () => {
            editnote(titleid, dataid);
        });

        //creating button to save data of notes
        const savebutton = document.createElement('button');
        savebutton.classList.add('savebtn');
        savebutton.textContent = "Save";
        savebutton.addEventListener("click", () => {
            savenote(titleid, dataid);
        });

        //creating button to remove notes
        const removebutton = document.createElement('button');
        removebutton.classList.add('buttons');
        removebutton.textContent = "-";
        removebutton.addEventListener("click", () => {
            removenote(titleid, nextnotes.id);
        });

        header.append(addbutton);
        header.append(editbutton);
        header.append(savebutton);
        header.append(removebutton);
        nextnotes.append(header);

        //creating the notes area
        const notes = document.createElement('div');
        notes.classList.add('notes');

        //Creating the title of notes
        const title = document.createElement('input');
        title.type = "text";
        title.placeholder = "Title";
        title.classList.add('title');
        var titleid = titleId;
        title.setAttribute("id", titleId);
        console.log(titleid);
        console.log("I am set title id" + title.id);
        title.style.backgroundColor=notecolor;

        //creating textarea to store notes
        const notesinput = document.createElement('textarea');
        notesinput.cols = '35';
        notesinput.rows = '10';
        notesinput.placeholder = "Add Note..";
        notesinput.classList.add('inputnotes');
        var dataid = noteId;
        notesinput.style.backgroundColor=notecolor;
        notesinput.setAttribute("id", dataid);
        // notesinput.id=dataid;
        console.log("I am set notes id " + notesinput.id);
        console.log(dataid);

        notes.append(title);
        notes.append(notesinput);
        nextnotes.append(notes);
        results.append(nextnotes);
        return {
            noteId: nextnotes.id,
            titleid: titleid,
            noteid: dataid
        };

    }

}

//function to save the notes to the local storage
function savenote(titleid, dataid) {
    var title = document.getElementById(titleid).value;
    var data = document.getElementById(dataid).value;
    console.log(title);
    console.log(data);
    if (data) {
        var existingdata= JSON.parse(localStorage.getItem("notes"));
        if (!existingdata) {
            existingdata = [];
        }
        const titleexists = existingdata.some(item => item.titleid === titleid);
        if(titleexists){
            window.alert("Saved note can't be resaved.For further changes, please edit the note")
        }
        else{
        let obj = { title: title, notes: data, titleid: titleid };
        dataofnotes.push(obj);
        localStorage.setItem("notes", JSON.stringify(dataofnotes));
        console.log(dataofnotes);
    }
    }
    else {
        window.alert("Please enter the data first");
    }
}

//function to edit the existing note
function editnote(titleid, dataid) {
    var index = -1;
    console.log(titleid);
    for (var i = 0; i <= dataofnotes.length - 1; i++) {
        if (dataofnotes[i].titleid == titleid) {
            index = i;
            break;
        }
    }
    console.log(index);
    if (index != -1) {
        var editedtitle = document.getElementById(titleid).value;
        var editeddata = document.getElementById(dataid).value;

        if (editeddata) {
            dataofnotes[index].title = editedtitle;
            dataofnotes[index].notes = editeddata;
            console.log(dataofnotes);
            localStorage.setItem("notes", JSON.stringify(dataofnotes));
        } else {
            window.alert("Please enter the data first");
        }
    } else {
        window.alert("Please save the data before editing.");
    }
}

//function to display the existing notes stored locally
function display() {
    var savedNotes = JSON.parse(localStorage.getItem("notes"));
    console.log(savedNotes);

    // Create and populate initial note from HTML
    const initialTitleInput = document.getElementById('t1');
    const initialNoteInput = document.getElementById('n1');
    if (initialTitleInput && initialNoteInput) {
        initialTitleInput.value = savedNotes[0].title;
        initialNoteInput.value = savedNotes[0].notes;
    }
    console.log(savedNotes.length);

    // Display additional notes using existing createnote function
    for (let i = 1; i < savedNotes.length; i++) {

        console.log("Heyyy");
        const note = savedNotes[i];
        console.log(note);
        const titleid = note.titleid;
        const noteid = "n" + parseInt(titleid.substring(1));

        const newNote = createnote(noteid, titleid);
        console.log(newNote);
        console.log(noteid);
        console.log(titleid);
        console.log(note.title);
        console.log(note.notes);
        var titleinput = document.getElementById(titleid);
        console.log(titleinput);
        titleinput.value = note.title;

        var notesinput = document.getElementById(noteid);
        notesinput.value = note.notes;
    }
}


// function to delete existing notes
function removenote(titleid = '', noteid) {
    console.log("Note id: " + noteid);
    console.log("Title id: " + titleid);
    var index = -1;
    if (titleid) {
        for (var i = 0; i <= dataofnotes.length - 1; i++) {
            if (dataofnotes[i].titleid == titleid) {
                index = i;
                break;
            }
        }
    }
    console.log(index);
    if (index !== -1) {
        dataofnotes.splice(index, 1);
    }
    const noteElement = document.getElementById(noteid);
    if (noteElement) {
        noteElement.remove();
    }
    console.log(dataofnotes);

    localStorage.setItem('notes', JSON.stringify(dataofnotes));
}

//function to generate random pastel colors
function getpastelcolor() {
    const r = 150 + Math.random() * 105; // Red component
    const g = 150 + Math.random() * 105; // Green component
    const b = 150 + Math.random() * 105; // Blue component

    return "rgb(" + r + ", " + g + ", " + b + ")";
    // return `rgb(${r}, ${g}, ${b})`;
}
