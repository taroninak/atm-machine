const { expect } = require('chai')
const Atm = require('../../lib/Atm')
const Withdrawer = require('../../lib/Withdrawer')
const Vault = require('../../lib/Vault')
const InvalidAmountError = require('../../lib/errors/InvalidAmountError')


const { mock, stub, fake, match } = require('sinon')

const nextNumber = () => parseInt(1 + Math.random() * 1000)

describe('ATM class tests', () => {
    it('Should return correct bills which are provided by withdrawer', () => {
        const withdrawer = new Withdrawer()
        const vault = new Vault()

        const getBills = stub(vault, 'getBills')
        const takeOut = stub(vault, 'takeOut')
        const find = stub(withdrawer, 'find')

        const amount = nextNumber()

        const expected = [{ value: amount, count: 1 }]

        getBills.returns(expected)

        find.returns([{ value: amount, count: 1 }])
        takeOut.returns()

        const atm = new Atm(vault, withdrawer)


        const actual = atm.withdraw(amount)

        expect(actual).to.have.deep.members(expected)
        expect(actual.length).deep.equal(expected.length)
    })

    it('Should throw InvalidAmountError when provided amount is not greater 0', () => {
        const atm = new Atm()

        expect(() => atm.withdraw(0)).to.throw(InvalidAmountError)
        expect(() => atm.withdraw(-1 * nextNumber())).to.throw(InvalidAmountError)
    })

    it('Should return correct bills',() => {
        const vault = new Vault([{ value: 1000, count: 2 }])
        const atm = new Atm(vault)

        const actual = atm.withdraw(2000)

        const expected = [{ value: 1000, count: 2 }]

        expect(actual).to.have.deep.members(expected)
        expect(actual.length).deep.equal(expected.length)
    })
})
