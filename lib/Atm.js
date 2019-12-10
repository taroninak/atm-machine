const Withdrawer = require('./Withdrawer')
const Vault = require('./Vault')
const InvalidAmountError = require('./errors/InvalidAmountError')

/**
 * This is the main class which provides basic ATM functionality 
 */
class Atm {
    /**
     * 
     * @param {Vault} vault 
     * @param {Withdrawer} withdrawer
     */
    constructor(vault = new Vault(), withdrawer = new Withdrawer()) {
        this.vault = vault
        this.withdrawer = withdrawer
    }


    /**
     * Withdraws money from atm
     * @param {Number} amount amount which should be withdrawn. Should be greater than 0
     */
    withdraw(amount) {
        if (amount <= 0) throw new InvalidAmountError(amount)

        const bills = this.withdrawer.find(this.vault.getBills(), amount)
        bills.forEach(({ value, count }) => this.vault.takeOut({value, count}))
        return bills
    }


    ///TODO: Add refill method

}

module.exports = Atm