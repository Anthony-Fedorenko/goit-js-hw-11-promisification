let ul = document.querySelector('ul');

// Task 1

const delay = ms => {
    return new Promise(res => {
        setTimeout(() => {
            res(ms);
        }, ms);
    });
};
const logger1 = (time) => {console.log(`Resolved after ${time}ms`);
ul.insertAdjacentHTML('beforeend', `</br><li>Resolved after ${time}ms</li>`);
};

delay(2000).then(logger1); // Resolved after 2000ms
delay(1000).then(logger1); // Resolved after 1000ms
delay(1500).then(logger1); // Resolved after 1500ms


// Task 2
const users = [
    { name: 'Mango', active: true },
    { name: 'Poly', active: false },
    { name: 'Ajax', active: true },
    { name: 'Lux', active: false },
];

const toggleUserState = async (allUsers, userName) => {
    const updatedUsers = allUsers.map(user => (user.name === userName ? { ...user, active: !user.active } : user));
    return updatedUsers;
};

const logger = (updatedUsers) => {console.table(updatedUsers);
ul.insertAdjacentHTML(
    'beforeend',
    `<li>
    ${updatedUsers[0].name} ${updatedUsers[0].active}</br>
    ${updatedUsers[1].name} ${updatedUsers[1].active}</br>
    ${updatedUsers[2].name} ${updatedUsers[2].active}</br>
    ${updatedUsers[3].name} ${updatedUsers[3].active}</br>
    </li></br>`
  );
};

toggleUserState(users, 'Mango').then(logger);
toggleUserState(users, 'Lux').then(logger);


// Task 3
const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = transaction => {
    return new Promise((resolve, reject) => {
        const delay = randomIntegerFromInterval(200, 500);
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;
            if (canProcess) {
                resolve([transaction.id, delay]);
            } else {
                reject(transaction.id);
            }
        }, delay);
    });
};

const logSuccess = ([id, time]) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
    ul.insertAdjacentHTML(
        'beforeend',
        `<li>Transaction ${id} processed in ${time}ms</li>`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
    ul.insertAdjacentHTML(
        'beforeend',
        `<li>Error processing transaction ${id}. Please try again later.</li>`);
};

/*
 * Работает так
 */
// makeTransaction({ id: 70, amount: 150 }, logSuccess, logError);
// makeTransaction({ id: 71, amount: 230 }, logSuccess, logError);
// makeTransaction({ id: 72, amount: 75 }, logSuccess, logError);
// makeTransaction({ id: 73, amount: 100 }, logSuccess, logError);
/*
 * Должно работать так
 */
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);

makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);

makeTransaction({ id: 72, amount: 75 }).then(logSuccess).catch(logError);

makeTransaction({ id: 73, amount: 100 }).then(logSuccess).catch(logError);


