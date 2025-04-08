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
    },
    methods: {
    }
});