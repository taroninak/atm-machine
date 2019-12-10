class AtmError extends Error {
    constructor(code = 500, message = 'Internal Server Error') {
        super(message)
        this.code = code
    }

    getCode() {
        return this.getCode
    }
}

module.exports = AtmError