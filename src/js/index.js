const getDate = (format) => {
    const date = new Date()
    const replaces = {
        yyyy: date.getFullYear(),
        mm: ('0' + (date.getMonth() + 1)).slice(-2),
        dd: ('0' + date.getDate()).slice(-2),
        hh: ('0' + date.getHours()).slice(-2),
        MM: ('0' + date.getMinutes()).slice(-2),
    }
    let result = format
    for (const replace in replaces) {
        result = result.replace(replace, replaces[replace]);
    }
    return result
}
const dateFormat = 'dd-mm-yyyy hh:MM';
const randomString = i => {
    var rnd = '';
    while (rnd.length < i)
        rnd += Math.random().toString(36).substring(2);
    return rnd.substring(0, i);
}

const notes = [
    {
        _id: randomString(8),
        date: getDate(dateFormat),
        text: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, et.'
    },
];

(function (arrOfNotes) {
    const addBtn = document.querySelector('.note-add');
    const container = document.querySelector('.container');
    
    const objOfNotes = arrOfNotes.reduce((acc, note) => {
        acc[note._id] = note;
        return acc;
    }, {});

    const renderAllNotes = notesList => {
        if (!notesList) {
            console.error('Нет заметок');
            return;
        }

        const fragment = document.createDocumentFragment();
        Object.values(notesList).forEach(note => {
            const div = noteTemplate(note);
            fragment.appendChild(div);
        });
        container.appendChild(fragment);
    }

    const noteTemplate = ({_id, date, text} = {}) => {
        const div = document.createElement('div');
        div.className = 'note fadeIn',
        div.setAttribute('data-id', _id);
        div.insertAdjacentHTML('afterbegin',
            `<div class="note-header">
                <div class="note-date">${date}</div>
                <button class="note-del" title="Удалить заметку"></button>
            </div>
            <textarea class="note-textarea" spellcheck="false" contenteditable="true">${text || ''}</textarea>
        `)

        return div
    }

    const addNote = () => {
        const date = getDate(dateFormat);
        const note = createNote(date);
        const item = noteTemplate(note);
        container.insertAdjacentElement('afterbegin', item);
    }

    const createNote = date => {
        const newNote = {
            _id: randomString(8),
            date,
            text: ''
        };

        objOfNotes[newNote._id] = newNote;

        return { ...newNote };
    }

    const deleteNote = (id, el) => {
        delete objOfNotes[id];
        el.remove();
    }

    const onDeleteHandler = ({target}) => {
        if (!target.classList.contains('note-del')) return;
        const parent = target.closest('[data-id]');
        const id = parent.dataset.id;
        parent.classList.remove('fadeIn');
        setTimeout(() => {
           deleteNote(id, parent);
        }, 300);

    }

    addBtn.addEventListener('click', addNote);
    container.addEventListener('click', onDeleteHandler);

    renderAllNotes(objOfNotes);

})(notes);