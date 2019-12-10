const OutOfCashError = require('./errors/OutOfCashError')

const getNearestBill = (bills = [], amount) => {
    //  It is impractical to have very large number of bills thus further optimisations will bring only additional complexity without any noticeable performance gain
    let nearest = null
    for (const { value, count } of bills) {
        if (value <= amount && count > 0 && (nearest === null || nearest.value < value)) {
            nearest = { value, count }
        }
    }
    return nearest
}

/**
 * This class is responsible for finding appropriate bills for withdrawing specified amount of money
 * 
 */
class Withdrawer {

    /**
     * 
     * @param {Bill} bills 
     * @param {Number} amount 
     */
    find(bills, amount) {
        if (amount === 0) return []

        if(bills.length < 0) throw new OutOfCashError()

        const withdrawals = []
        const nearest = getNearestBill(bills, amount)

        if (nearest === null) throw new OutOfCashError()

        const bill = bills.find(({ value }) => value === nearest.value)

        let count = parseInt(amount / nearest.value)
        if (count > bill.count) {
            count = bill.count
        }

        withdrawals.push({ value: nearest.value, count })
        bill.count -= count

        const remaining = amount - count * nearest.value

        try {
            withdrawals.push(...this.find(bills, remaining))
            return withdrawals
        } catch (e) {
            if(!(e instanceof OutOfCashError)) throw e
            
            return this.find(bills.filter(b => b.value !== nearest.value), amount)
        }

    }
}

module.exports = Withdrawer