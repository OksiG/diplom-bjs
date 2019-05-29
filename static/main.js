class Profile {
    constructor(username, name, password) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
    }

    createUser(username, name, password, callback) {
        let users = [];
        if (this.username === undefined) {
            users.push(username, name, password);
        }
        return ApiConnector.createUser( , (err, data) => {
            console.log(`Adding ${this.username}. Welcome!`);
            callback(err, data);
        });
    }

    authorization() {
        let foundUser;
        for (let i = 0; i < users.length; i++) {//имя пользователя и логин есть, то поприветствуем, если нет, то отправим на регистрацию
            let u = users[i];
            if (u.username === && u.password ===) {
                foundUser = u.username;
            } else ()
        }
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {

    };
}

const log = new Profile('login', {firstNname: 'name', lastName: 'surname'}, 'pass');

console.log(log);