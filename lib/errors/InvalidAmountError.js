const AtmError = require('./AtmError')

class InvalidAmountError extends AtmError {
    constructor(amount) {
        super(406, `Invalid amount: '${amount}' is provided. Only positive amounts are accepted`)
    }
}

module.exports = InvalidAmountError