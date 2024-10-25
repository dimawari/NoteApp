let btnCreateNote = document.getElementById('create-new');
let noteContainer = document.querySelector('.note-container');

// Elements for grid and list buttons
const btnGridView = document.getElementById('grid-view');
const btnListView = document.getElementById('list-view');

// Event listeners for grid and list view buttons
btnGridView.addEventListener('click', () => switchView('grid'));
btnListView.addEventListener('click', () => switchView('list'));

function switchView(view) {
    console.log(`Switching to ${view} view`);
    if (view === 'grid') {
        noteContainer.classList.add('grid-view');
        noteContainer.classList.remove('list-view');
    } else {
        noteContainer.classList.add('list-view');
        noteContainer.classList.remove('grid-view');
    }
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    savedNotes.forEach(note => {
        createNoteElement(note.title, note.body, note.isPinned, note.timestamp);
    });
}

// Create a note element and append to the container
function createNoteElement(title, body, isPinned = false, timestamp = new Date().toLocaleString()) {
    let noteItem = document.createElement('div');
    noteItem.classList.add('note-item');

    let pinButton = document.createElement('button');
    pinButton.classList.add('pin-button');
    pinButton.innerHTML = `<img src="https://th.bing.com/th/id/OIP.Sjsbx5vk0Cmrc5Grc0bAawHaHa?rs=1&pid=ImgDetMain" alt="Pin" width="24" height="24">`;

    let archiveButton = document.createElement('button');
    archiveButton.classList.add('archive-button');
    archiveButton.innerHTML = `<img src="https://cdn2.iconfinder.com/data/icons/document-89/64/document_archive_box_open_library0-1024.png" alt="Archive" width="24" height="24">`;

    let noteTitle = document.createElement('input');
    noteTitle.classList.add('note-title');
    noteTitle.value = title;
    noteTitle.placeholder = "Type Your Title Here";

    let noteBody = document.createElement('div');
    noteBody.classList.add('note-body');
    noteBody.setAttribute('contenteditable', 'true');
    noteBody.innerText = body || "Your Thoughts Here...";

    let timestampDisplay = document.createElement('span');
    timestampDisplay.classList.add('note-timestamp');
    timestampDisplay.innerText = timestamp;
    timestampDisplay.style.color = 'gray';
    timestampDisplay.style.fontStyle = 'italic';

    let deleteButton = document.createElement('img');
    deleteButton.classList.add('delete-button');
    deleteButton.src = 'https://i.pinimg.com/564x/d9/9d/3f/d99d3f8d4f908076a1e5f5b317f54400.jpg';
    deleteButton.alt = 'Delete note';

    noteItem.appendChild(pinButton);
    noteItem.appendChild(archiveButton);
    noteItem.appendChild(noteTitle);
    noteItem.appendChild(noteBody);
    noteItem.appendChild(timestampDisplay);
    noteItem.appendChild(deleteButton);
    noteContainer.appendChild(noteItem);

    deleteButton.addEventListener('click', function() {
        noteContainer.removeChild(noteItem);
        saveNotes();
    });

    if (isPinned) {
        noteItem.classList.add('pinned-note');
    }

    pinButton.addEventListener('click', function() {
        noteItem.classList.toggle('pinned-note');
        saveNotes();
    });

    archiveButton.addEventListener('click', function() {
        noteItem.classList.toggle('archived-note');
        saveNotes();
    });

    noteTitle.addEventListener('input', saveNotes);
    noteBody.addEventListener('input', saveNotes);
}

// Save notes to localStorage
function saveNotes() {
    const notes = [];
    document.querySelectorAll('.note-item').forEach(noteItem => {
        const title = noteItem.querySelector('.note-title').value;
        const body = noteItem.querySelector('.note-body').innerText;
        const isPinned = noteItem.classList.contains('pinned-note');
        const isArchived = noteItem.classList.contains('archived-note');
        const timestamp = noteItem.querySelector('.note-timestamp').innerText;
        notes.push({ title, body, isPinned, isArchived, timestamp });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

// Load existing notes when the page loads
window.addEventListener('load', loadNotes);

// Create full-screen note with combined save and exit functionality
function createFullScreenNote() {
    let fullScreenNote = document.createElement('div');
    fullScreenNote.classList.add('full-screen-note');

    let saveExitButton = document.createElement('button');
    saveExitButton.classList.add('save-exit-button');
    saveExitButton.innerHTML = "<"; // Combined Save and Exit button

    let pinButton = document.createElement('button');
    pinButton.classList.add('pin-button');
    pinButton.innerHTML = `<img src="URL_TO_PIN_ICON" alt="Pin" width="24" height="24">`;

    let archiveButton = document.createElement('button');
    archiveButton.classList.add('archive-button');
    archiveButton.innerHTML = `<img src="URL_TO_ARCHIVE_ICON" alt="Archive" width="24" height="24">`;

    let noteTitle = document.createElement('input');
    noteTitle.classList.add('note-title');
    noteTitle.placeholder = "Type Your Title Here";

    let noteBody = document.createElement('div');
    noteBody.classList.add('note-body');
    noteBody.setAttribute('contenteditable', 'true');
    noteBody.innerText = "Your Thoughts Here...";

    let deleteButton = document.createElement('img');
    deleteButton.classList.add('delete-button');
    deleteButton.src = 'https://i.pinimg.com/564x/d9/9d/3f/d99d3f8d4f908076a1e5f5b317f54400.jpg';
    deleteButton.alt = 'Delete note';

    // Append the save and exit button at the top
    fullScreenNote.appendChild(saveExitButton);
    fullScreenNote.appendChild(pinButton);
    fullScreenNote.appendChild(archiveButton);
    fullScreenNote.appendChild(noteTitle);
    fullScreenNote.appendChild(noteBody);
    fullScreenNote.appendChild(deleteButton);

    document.body.appendChild(fullScreenNote);

    // Event listener for combined Save and Exit button
    saveExitButton.addEventListener('click', function() {
        createNoteElement(noteTitle.value, noteBody.innerText);
        saveNotes();
        document.body.removeChild(fullScreenNote);
        // Redirect to the homepage after saving
        window.location.href = 'index.html'; // Replace with your homepage URL if different
    });

    pinButton.addEventListener('click', function() {
        fullScreenNote.classList.toggle('pinned-note');
    });

    archiveButton.addEventListener('click', function() {
        fullScreenNote.classList.toggle('archived-note');
    });

    noteTitle.addEventListener('input', function() {
        noteTitle.value = noteTitle.value.trim();
    });
}

// Event listener to create a new note
btnCreateNote.addEventListener('click', createFullScreenNote);
