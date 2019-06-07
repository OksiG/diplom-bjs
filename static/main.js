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
                { username: this.username, password: this.username }, 
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
        return ApiConnector.addMoney({ to, amount }, (err, data) => {
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

function main() {
    const Ivan = new Profile({
        username: 'ivan',
        name: { firstName: 'Ivan', lastName: 'Chernyshev' },
        password: 'ivanspass',
    });
    
    const Ivan = new Profile({
        username: 'ira',
        name: { firstName: 'Ira', lastName: 'Syzikh' },
        password: 'irapass',
    });

    getStocks((err, data) => {
        if (err) {
                console.error('Error during getting stocks');
                throw err;
        }
        const stocksInfo = data;
    });

    Ivan.createUser( {username: Ivan.username, name: Ivan.name, password: Ivan.password}, (err, data) => {
        if (err) {
            console.error(`Error creating new user ${Ivan.username}`);
        } else {
            console.log(`New user ${Ivan.username} successfully created`);
            Ivan.performLogin( {username: Ivan.username, password: Ivan.password}, (err, data) => {
                if (err) {
                    console.error(`Error authorization failed ${Ivan.username}`);
                } else {
                    console.log(`User ${Ivan.username} successfully authorization`);
                    Ivan.addMoney( { currency: 'RUB', amount: 100 }, (err, data) => {
                        if (err) {
                                console.error('Error during adding money to Ivan');
                        } else {
                            console.log(`Added 500000 euros to Ivan`);
                            const targetAmount = stocksInfo['RUB_NETCOIN'] * amount;

                            Ivan.convertMoney({ fromCurrency: currency, targetCurrency: 'NETCOIN', targetAmount}, (err, data) => {
                                if (err) {
                                    console.error(`Error converting money  from ${fromCurrency} to ${targetCurrency}`);
                                } else {
                                    console.log(`Money successfully converted from ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
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

