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
    }
});