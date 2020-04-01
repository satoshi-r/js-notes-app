const _createNote = (date, text) => {
    const note = document.createElement('div')
    note.className = 'note'
    note.insertAdjacentHTML('afterbegin',
        `<div class="note-header">
            <div class="note-date">${date}</div>
            <button class="note-del" title="Удалить заметку"></button>
        </div>
        <textarea class="note-textarea" spellcheck="false">${text || ''}</textarea>
        <div class="note-output"></div>`)

    return note
}

const _getDate = (format) => {
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

export default class Note {
    constructor() {
        this.container = document.querySelector('.container')
        this.addBtn = document.querySelector('.note-add')
        
        this.addBtn.addEventListener('click', () => this.add())
        
    }

    add(text) {
        const date = _getDate('dd-mm-yyyy hh:MM')
        const note = _createNote(date, text)
        let textarea = null // придумать норм поиск
        for (var i = 0; i < note.childNodes.length; i++) {
            if (note.childNodes[i].className == "note-textarea") {
                textarea = note.childNodes[i];
                break;
            }
        }
        console.log(textarea);

        this.container.appendChild(note)
        this.remove.bind(note)

        note.addEventListener('click', this.remove)
    }

    remove(event) {
        if (event.target.className !== 'note-del') return
        event.currentTarget.remove()
        event = null;
    }

}