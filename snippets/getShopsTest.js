const streamResponse = require('./streamResponse')

function getShopsTest () {
  return streamResponse(
    () => fetch(api.getSHops, { method: 'POST' }),
    (shopData) => console.log(shopData),
    () => console.log('Done'),
    (error) => console.error(error)
  )
}
