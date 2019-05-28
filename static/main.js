class Profile {
    constructor(username, name, password) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
    }

    createUser(this.username, name, this.password , callback) {
        return ApiConnector.createUser( , (err, data) => {
            console.log(`Adding ${this.username}. Welcome!`);
            callback(err, data);
        });
    }

    authorization() {

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