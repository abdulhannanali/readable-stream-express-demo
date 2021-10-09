const express = require('express')
const { Readable } = require('stream')

// Replace this fakeGetCustomers call with an original one, as long as it's returning an iterable that can be converted
// into a stream
// this logic would work without errors
const getCustomers = require('../fakeGetCustomers')

const router = express.Router()

function stringifyCustomer (customer) {
  return JSON.stringify(customer)
}

/**
 *
 *
 * @returns {Readable} returns a readable stream that can be piped into res
 */
async function getCustomersReadableStream () {
  return Readable.from((await getCustomers()).map((customer) => `${stringifyCustomer(customer)}--record-finish--`))
}

/* GET users listing. */
router.get('/getCustomers', async (req, res) => {
  (await getCustomersReadableStream())
    .pipe(res)
})

module.exports = router
