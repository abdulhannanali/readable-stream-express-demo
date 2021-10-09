const streamCustomers = require('./streamCustomers')

function getShopsTest () {
  return streamCustomers(
    () => fetch(api.getSHops, { method: 'POST' }),
    (shopData) => console.log(shopData),
    () => console.log('Done'),
    (error) => console.error(error)
  )
}
