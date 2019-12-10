const OutOfCashError = require('./errors/OutOfCashError')


class Vault {
    constructor(bills = []) {
        this.bills = bills
    }

    getBills() {
        return this.bills.map(({ value, count }) => ({ value, count }))
    }

    search(value) {
        for (const bill of this.bills) {
            if (bill.value == value) {
                return bill
            }
        }
        return null
    }

    takeOut({ value, count }) {
        const bill = this.search(value)

        if (bill == null || bill.count < count) throw new OutOfCashError()

        bill.count -= count
    }

}

module.exports = Vault
