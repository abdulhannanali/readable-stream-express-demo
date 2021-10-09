const express = require('express')
const { Readable } = require('stream') // AddThis

// Replace this fakeGetCustomers call with an original one, as long as it's returning an iterable that can be converted
// into a stream
// this logic would work without errors
const getCustomers = require('../fakeGetCustomers')

const router = express.Router()

/**
 * Add This
 * Creates a readable stream that can be consumed by the function in the UI by piping
 * @returns {Readable} returns a readable stream that can be piped into res
 */
function getCustomersStream (customersArray) {
  return Readable.from(customersArray.map((customer) => `${JSON.stringify(customer)}--record-finish--`))
}

router.get('/getCustomers', async (req, res) => {
  const customersArray = await getCustomers() // This can be yours

  // AddThis
  // Pass your own customersArray
  getCustomersStream(customersArray)
    .pipe(res)
})

module.exports = router
