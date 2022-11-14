function validateData(data) {
    const errors = [];

    // check if username is alphanumeric
    if (!validator.isAlphanumeric(data.username)) {
        errors.push('Username must be alphanumeric');
    }

    // check if name with correct length
    if (!validator.isLength(data.name, { min: 3 })) {
        errors.push('Name length must be greater than 2');
    }

    // check if email is correct
    if (!validator.isEmail(data.email)) {
        errors.push('Email is not valid');
    }

    // check if address is not empty
    if (validator.isEmpty(data.address)) {
        errors.push('Address is empty');
    }

    // check if phone is correct
    if (!validator.isMobilePhone(data.phone)) {
        errors.push('Phone is not valid');
    }

    // check if website is not empty
    if (validator.isEmpty(data.website)) {
        errors.push('Website is empty');
    }

    // check if company is not empty
    if (validator.isEmpty(data.company)) {
        errors.push('Company is empty');
    }

    if (errors.length) {
        const errorMessage = `${errors.join('\n')}`;

        throw new Error(errorMessage);
    }
}


function createTableCellElement(value) {
    const tableCellElement = document.createElement('div');
    const tableCellClass = 'table__cell';

    tableCellElement.textContent = value;
    tableCellElement.classList.add(tableCellClass);

    return tableCellElement;
}


function getUsersData() {
    const usersData = localStorage.getItem('usersData');

    return usersData ? JSON.parse(usersData) : [];
}

function getRowData(userData) {
    return [
        userData.number,
        userData.username,
        userData.name,
        userData.email,
        userData.address,
        userData.phone,
        userData.website,
        userData.company,
    ];
}

function createTableRowElement(userData) {
    const rowData = getRowData(userData);

    const cells = rowData.map(createTableCellElement);

    insertCells(cells);
}

function insertCells(cells) {
   const table = document.querySelector('.table');

    cells.forEach(cell => {
       table.insertAdjacentElement('beforeend', cell);
   })
}


function saveUserData(data) {
    const usersData = getUsersData();
    usersData.push(data);

    localStorage.setItem('usersData', JSON.stringify(usersData));
}

function initFromLS() {
    const usersData = getUsersData();

    usersData.forEach(createTableRowElement);
}

function setFormOnSubmit () {
    const form = document.querySelector('.form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            ...Object.fromEntries(formData),
            number: getUsersData().length + 1,
        };

        try {
            validateData(userData);
            createTableRowElement(userData);
            saveUserData(userData);

            form.reset();
        } catch (e) {
            alert(e.message)
        }
    })
}


initFromLS();
setFormOnSubmit();
