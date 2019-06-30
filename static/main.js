class Profile {
    constructor({username, name: { firstName, lastName }, password}) {
        this.username = username;
        this.name = {
            firstName,
            lastName
        };
        this.password = password;
    }

    createUser(callback) {
		return ApiConnector.createUser({
				username: this.username,
				name: this.name, 
				password: this.password
		}, (err, data) => {
				console.log(`Creating user ${this.username}`);
				callback(err, data);
		});
}

    performLogin(callback) {
        return ApiConnector.performLogin(
                { username: this.username, password: this.password }, 
                (err, data) => {
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
        return ApiConnector.transferMoney({ to, amount }, (err, data) => {
            console.log(`Transfering ${amount} to ${to}`);
            callback(err, data);
        });
    }
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data[99]);
    });
}

let stocksInfo;

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });
    
    const Ira = new Profile({
        username: 'ira',
        name: { firstName: 'Ira', lastName: 'Syzikh' },
        password: 'irapass',
    });

    const startCapital = { currency: 'EUR', amount: 500000 };

    getStocks((err, data) => {
        if (err) {
                console.error('Error during getting stocks');
                throw err;
        }
        stocksInfo = data;
    });

    Ivan.createUser((err, data) => {
        if (err) {
            console.error(`Error creating new user ${Ivan.username}`);
        } else {
            console.log(`New user ${Ivan.username} successfully created`);
            Ivan.performLogin((err, data) => {
                if (err) {
                    console.error(`Error authorization failed ${Ivan.username}`);
                } else {
                    console.log(`User ${Ivan.username} successfully authorization`);
                    Ivan.addMoney( startCapital, (err, data) => {
                        if (err) {
                                console.error('Error during adding money to Ivan');
                        } else {
                            console.log(`Added ${startCapital.amount} ${startCapital.currency} to ${Ivan.username}`);
                            const targetAmount = stocksInfo['RUB_NETCOIN'] * startCapital.amount;

                            Ivan.convertMoney({ fromCurrency: startCapital.currency, targetCurrency: 'NETCOIN', targetAmount: targetAmount}, (err, data) => {
                                if (err) {
                                    console.error(`Error converting money  from ${startCapital.currency} to ${Ivan.targetCurrency}`);
                                } else {
                                    console.log(`Money successfully converted from ${startCapital.amount} ${startCapital.currency} to ${targetAmount} NETCOIN`);

                                    Ira.createUser((err, data) => {
                                        if (err) {
                                            console.error(`Error creating new user ${Ira.username}`);
                                        } else {
                                            console.log(`New user ${Ira.username} successfully created`);
                                            Ira.performLogin((err, data) => {
                                                if (err) {
                                                    console.error(`Error authorization failed ${Ira.username}`);
                                                } else {
                                                    console.log(`User ${Ira.username} successfully authorization`);
                                                    Ivan.transferMoney({ to: Ira.username, amount: targetAmount }, (err, data) => {
                                                        if (err) {
                                                            console.error(`Error transfer money to ${Ira.username}`);
                                                        }
                                                        else {
                                                            console.log(`Successfully transfered ${targetAmount} NETCOIN to ${Ira.username}`);
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

main();

