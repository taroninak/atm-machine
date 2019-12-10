const { expect } = require('chai')
const withdrawer = new (require('../../lib/Withdrawer'))
const OutOfCashError = require('../../lib/errors/OutOfCashError')

describe('Withdrawer class tests', () => {
    it('Should return correct number of bills which all have the same value', () => {
        const bills = [
            { value: 1000, count: 4 },
            { value: 500, count: 3 },
            { value: 100, count: 1 }
        ]

        const withdrawals = withdrawer.find(bills, 4000)

        const expected = [{ value: 1000, count: 4 }]

        expect(expected.length).equal(withdrawals.length)
        expect(withdrawals).to.have.deep.members(expected)
    })

    it('Should throw OutOfCashError when there are not enough bills', () => {
        const bills = [{ value: 100, count: 4 }]

        expect(() => withdrawer.find(bills, 500)).to.throw(OutOfCashError)
    })

    it('Should take into account that there is a lack of some bills', () => {
        const bills = [
            { value: 1000, count: 1 },
            { value: 500, count: 3 },
            { value: 100, count: 1 }
        ]

        const withdrawals = withdrawer.find(bills, 2500)

        const expected = [
            { value: 1000, count: 1 },
            { value: 500, count: 3 }
        ]

        expect(expected.length).equal(withdrawals.length)
        expect(withdrawals).to.have.deep.members(expected)
    })


    it('Should work when withdrawing is not possible as a combination of the highest bill but it can be done with a combination of a lower bills', () => {
        const bills = [
            { value: 1000, count: 1 },
            { value: 700, count: 1 },
            { value: 500, count: 1 },
            { value: 100, count: 1 }
        ]

        const withdrawals = withdrawer.find(bills, 1200)

        const expected = [
            { value: 700, count: 1 },
            { value: 500, count: 1 }
        ]

        expect(expected.length).equal(withdrawals.length)
        expect(withdrawals).to.have.deep.members(expected)
    })
})