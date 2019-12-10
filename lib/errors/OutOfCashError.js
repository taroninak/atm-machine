const AtmError = require('./AtmError')

class OutOfCash extends AtmError {
    constructor() {
        super(503, 'ATM ran out of cash. Can not proceed with your request')
    }
}

module.exports = OutOfCash