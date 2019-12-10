const Atm = require('../lib/Atm')
const Vault = require('../lib/Vault')

const formatBills = ({ value, count }) => `${count}x${value}`

const bills = [
    { value: 1000, count: 2 },
    { value: 500, count: 3 },
    { value: 100, count: 5 },
]
const vault = new Vault(bills)
const atm = new Atm(vault)

const withdrawls = [
    1500,
    700,
    400,
    1100,
    1000,
    700,
    300
]

for (const amount of withdrawls) {
    try {
        console.log(`Requested withdrawal: ${amount}`)
        const result = atm.withdraw(amount)
        console.log(`Given bills: ${result.map(formatBills).join(' , ')}`)
    } catch (e) {
        console.log(`Rejected withdrawal of ${amount}. Resaon: ${e.message}`)
    }
    console.log()
}
console.log('Remaing bills:', vault.getBills().map(formatBills))