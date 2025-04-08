let app = new Vue({
    el: '#app',
    data: {
        columns: {
            planned: [],
            inProgress: [],
            testing: [],
            done: [],
        },
        columnTitles: {
            planned: 'Запланированные задачи',
            inProgress: 'Задачи в работе',
            testing: 'Тестирование',
            done: 'Выполненные задачи',
        },
        newNote: {
            title: '',
            description: '',
            deadline: '',
        },
        columnLimits: {
            planned: 3,
            inProgress: 5,
            testing: 5,
            done: Infinity,
        },
    },
    methods: {
        addNote(column) {
            if (this.columns[column].length >= this.columnLimits[column]) {
                alert(`Лимит карточек для "${this.columnTitles[column]}" достигнут.`);
                return;
            }

            const newNote = {
                id: Date.now(),
                title: this.newNote.title,
                description: this.newNote.description,
                deadline: this.newNote.deadline,
                createdDate: new Date().toLocaleString(),
                lastEdited: new Date().toLocaleString(),
                status: 'planned',
                isLate: false,
            };

            this.columns[column].push(newNote);
            this.newNote.title = '';
            this.newNote.description = '';
            this.newNote.deadline = '';
        },
        deleteNote(noteId) {
            Object.keys(this.columns).forEach(column => {
                this.columns[column] = this.columns[column].filter(note => note.id !== noteId);
            });
        },
        editNote(note) {
            const newTitle = prompt('Введите новый заголовок:', note.title);
            const newDescription = prompt('Введите новое описание:', note.description);
            const newDeadline = prompt('Введите новый дэдлайн:', note.deadline);

            if (newTitle && newDescription && newDeadline) {
                note.title = newTitle;
                note.description = newDescription;
                note.deadline = newDeadline;
                note.lastEdited = new Date().toLocaleString();
            }
        },
    }
});