const faker = require('faker')

const customers = []

for (let i = 0; i < 100; i += 1) {
  customers.push({
    name: faker.name.findName(),
    email: faker.internet.email(),
    card: faker.helpers.createCard()
  })
}

module.exports = async function fakeGetCustomers () {
  return customers
}
