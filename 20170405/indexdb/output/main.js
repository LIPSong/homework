var addBtn = document.querySelector('button');
function init() {
    var dbManager = new DBManager('pro', '2');
    addBtn.onclick = function () {
        dbManager.addObject('user', {
            name: 'jhon',
            phone: '111',
            age: '30'
        });
    };
}
init();

var addBtn = document.querySelector('button');
function init() {
    var dbManager = new DBManager('pro', '2');
    addBtn.onclick = function () {
        dbManager.addObject('user', {
            name: 'jhon',
            phone: '111',
            age: '30'
        });
    };
}
init();
