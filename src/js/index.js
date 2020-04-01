document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.querySelector('.note-add');
    const container = document.querySelector('.container');

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

    const createNote = ({id, date, text} = {}) => {
        const note = document.createElement('div');
        note.className = 'note'
        note.setAttribute('data-note-id', id)
        note.insertAdjacentHTML('afterbegin',
            `<div class="note-header">
            <div class="note-date">${date}</div>
            <button class="note-del" title="Удалить заметку"></button>
        </div>
        <textarea class="note-textarea" spellcheck="false">${text || ''}</textarea>
        `)

        return note
    }

    const addNote = text => {
        const params = {
            date: getDate('dd-mm-yyyy hh:MM'),
            text
        }
        const note = createNote(params);
        container.appendChild(note);
        removeNote();
    }

    const removeNote = () => {
        const notes = document.querySelectorAll('.note');

        notes.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.className !== 'note-del') return
                item.remove();
            })
        })
    }

    addNote('Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, et.');

    addBtn.addEventListener('click', () => {
        addNote();
    })

})