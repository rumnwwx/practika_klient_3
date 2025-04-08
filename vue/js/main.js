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
    created() {
        const savedData = localStorage.getItem('kanbanAppData');
        if (savedData) {
            this.columns = JSON.parse(savedData);
        }
    },
    watch: {
        columns: {
            handler() {
                localStorage.setItem('kanbanAppData', JSON.stringify(this.columns));
            },
            deep: true
        }
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
        moveNote(noteId, fromColumn, toColumn) {
            const noteIndex = this.columns[fromColumn].findIndex(note => note.id === noteId);
            if (noteIndex !== -1) {
                const note = this.columns[fromColumn].splice(noteIndex, 1)[0];
                note.lastEdited = new Date().toLocaleString();

                if (toColumn === 'done') {
                    this.markDeadlineStatus(note);
                }

                this.columns[toColumn].push(note);
            }
        },
        moveNoteBackToInProgress(noteId) {
            const noteIndex = this.columns.done.findIndex(note => note.id === noteId);
            if (noteIndex !== -1) {
                const note = this.columns.done.splice(noteIndex, 1)[0];
                const reason = prompt('Укажите причину возврата задачи в "В работу"');
                if (reason) {
                    note.returnReason = reason;
                    this.columns.inProgress.push(note);
                    note.lastEdited = new Date().toLocaleString();
                }
            }
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
                this.markDeadlineStatus(note);
            }
        },
        markDeadlineStatus(note) {
            const deadlineDate = new Date(note.deadline);
            const completedDate = new Date(note.createdDate);
            if (completedDate > deadlineDate) {
                note.isLate = true;
            } else {
                note.isLate = false;
            }
        }
    }
});