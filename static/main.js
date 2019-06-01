class Profile {
    constructor(username, name: { firstName, lastName }, password) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
    }

    createUser(callback) {
        return ApiConnector.createUser((err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);
        });
    }

    performLogin(callback) {
        return ApiConnector.performLogin((err, data) => {
            console.log(`Authorizing user ${this.username}`);
            callback(err, data);
        });
    }

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
        });
    }

    convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.addMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} to ${to}`);
            callback(err, data);
        });
    }
}

function getCourse() {
    let exchangeRate = [];
    let unitExchangeRate = ApiConnector.getStocks((err, data) => {
        callback(err, data);
    exchangeRate.push(unitExchangeRate);
    return exchangeRate;
    });
}

function main() {
    const Ivan = new Profile('ivan', {firstNname: 'Ivan', lastName: 'Chernyshev'}, 'ivanpass');
    const Ira = new Profile('ira', {firstNname: 'Ira', lastName: 'Syzikh'}, 'irapass');

    Ivan.createUser();
    
    Ivan.performLogin();

    Ivan.addMoney({ currency: 'RUB', amount: 100 }, (err, data) => {
        if (err) {
                console.error('Error during adding money to Ivan');
        } else {
                console.log(`Added 500000 euros to Ivan`);
        });
}

main();

