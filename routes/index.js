const express = require('express')
const { Readable } = require('stream')
const getCustomers = require('../fakeGetCustomers')

const router = express.Router()

function stringifyCustomer (customer) {
  return JSON.stringify(customer)
}

async function getCustomersReadableStream () {
  return Readable.from((await getCustomers()).map((customer) => `${stringifyCustomer(customer)}--record-finish--`))
}

/* GET users listing. */
router.get('/getCustomers', async (req, res) => {
  (await getCustomersReadableStream())
    .pipe(res)
})

module.exports = router
