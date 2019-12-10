const { expect } = require('chai')
const Vault = require('../../lib/Vault')


describe('Vault class tests', () => {
    it('getBills should return all available bills', () => {
        const expected = [
            { value: 1000, count: 1 },
            { value: 500, count: 3 },
            { value: 100, count: 1 }
        ]

        const vault = new Vault(expected)
        const actual = vault.getBills()


        expect(actual).to.have.deep.members(expected)
        expect(actual.length).deep.equal(expected.length)
    })
})