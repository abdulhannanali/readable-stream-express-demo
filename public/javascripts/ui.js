(function () {
  const customersClass = document.getElementsByClassName('customers')[0]
  const streamStatus = document.getElementsByClassName('stream-status')[0]

  window.ui = {}

  window.ui.onError = function onError (error) {
    streamStatus.textContent = 'Error! (Check Logs)'
    console.error(error)
  }

  window.ui.onDone = function onDone () {
    streamStatus.textContent = 'Done!'
  }

  window.ui.onCustomerData = function onCustomerData (customerData) {
    streamStatus.textContent = 'Streaming!'

    customersClass.innerHTML += `
      <div class="panel">
        <div class="panel-heading">
            ${customerData.name} (email: ${customerData.email})
        </div>
        <div class="panel-body">
            <code>
                ${JSON.stringify(customerData, null, 2)}
            </code>
        </div>
      </div>
      `
  }

  function main () {
    const fetchFunction = () => fetch('/getCustomers')

    window.streamResponse(
      fetchFunction,
      window.ui.onCustomerData,
      window.ui.onDone,
      window.ui.onError
    )
  }

  main()
})()
