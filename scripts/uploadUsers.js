const result = document.querySelector('.result');


function clearData() {
    result.replaceChildren();
}

function renderResult(element) {
    result.insertAdjacentElement('afterbegin', element);
}

function setLoading() {
    clearData();

    const loadingGif = document.createElement('img');
    loadingGif.src = 'img/loading.gif';

    renderResult(loadingGif)
}

function setError(message) {
    clearData();

    const error = document.createElement('div');
    error.classList.add('error');
    error.textContent = message;

    renderResult(error)
}

function mapUserResponse(userData) {
    return {
        id: userData.id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        address: [userData.address.city, userData.address.street, userData.address.suite].join(', '),
        phone: userData.phone,
        website:userData.website,
        company: userData.company.name,
    };
}


async function getUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        const users = await response.json();

        const usersLength = 5;

        return users
            .sort(() => 0.5 - Math.random())
            .slice(0, usersLength)
            .map(mapUserResponse);
    } catch {
        throw new Error('Network Errro');
    }
}

function createTableTitle() {
    const title = document.createElement('h2');
    title.textContent = 'Remote users';

    result.insertAdjacentElement('afterbegin', title);
}

function createTableHeaders(table) {
    const headers = ['Id', 'Username', 'Name', 'Email', 'Address', 'Phone', 'Website', 'Company'];

    const cells = headers.map(createTableCellElement);

    insertCellsIntoTable(table, cells);
}

function createTableCellElement(value) {
    const tableCellElement = document.createElement('div');
    const tableCellClass = 'table__cell';

    tableCellElement.textContent = value;
    tableCellElement.classList.add(tableCellClass);

    return tableCellElement;
}


function getRowData(userData) {
    return [
        userData.id,
        userData.username,
        userData.name,
        userData.email,
        userData.address,
        userData.phone,
        userData.website,
        userData.company,
    ];
}

function createTableRowElement(table, userData) {
    const rowData = getRowData(userData);

    const cells = rowData.map(createTableCellElement);

    insertCellsIntoTable(table, cells);
}

function createTable(usersData) {
    clearData();

    const table = document.createElement('div');
    const tableClass = 'table';

    table.classList.add(tableClass);


    createTableHeaders(table);

    usersData.forEach(userData => createTableRowElement(table, userData));

    renderResult(table);

    createTableTitle();
}

function insertCellsIntoTable(table, cells) {
    cells.forEach(cell => {
        table.insertAdjacentElement('beforeend', cell);
    })
}


function setButtonOnClick () {
    const button = document.querySelector('.upload-button');

    button.addEventListener('click', async () => {
        try {
            setLoading();
            const usersData = await getUsers();
            createTable(usersData);
        } catch (e) {
            setError(e.message);
        }
    })
}


setButtonOnClick();
