const recordSeparator = '--record-finish--'
const textDecodingFormat = 'utf-8'

function safeJSONParse (string) {
  try {
    return JSON.parse(string)
  } catch (error) {

  }
}

/**
 * Parses JSON chunks from ReadableStream
 *
 *
 * @param {*} fetchFn this function returns a fetch promise
 * @param {*} onChunkReceived callback function to receive customer
 * @param {*} onDone callback function called once the streaming is done
 * @param {*} onError callback function in case any kind of errors occur
 * @returns {undefined} undefined
 */
export default async function streamResponse (fetchFn, onChunkReceived, onDone, onError) {
  const fetchResponse = await fetchFn()
  const body = await fetchResponse.body
  const reader = body.getReader()
  const textDecoder = new TextDecoder(textDecodingFormat)

  let allDone = false
  let buffer = ''

  function parseBuffer () {
    try {
      if (allDone && buffer.length > 0) {
        onChunkReceived(JSON.parse(buffer))
        return
      }

      const recordArray = buffer.split(recordSeparator)

      for (let i = 0; i < recordArray.length; i += 1) {
        const record = recordArray[i]

        if (record.length === 0) {
          continue
        }

        const parsedBody = (recordArray.length - 1) === i
          ? safeJSONParse(record)
          : JSON.parse(record)

        if (typeof parsedBody === 'object' && parsedBody !== null) {
          onChunkReceived(parsedBody)
        }

        if (!parsedBody) {
          buffer = record
        } else {
          buffer = ''
        }
      }
    } catch (error) {
      allDone = true
      onError(error)
    }
  }

  while (!allDone) {
    try {
      const { done, value } = await reader.read()

      if (done === true) {
        allDone = true
        break
      }

      buffer += textDecoder.decode(value)
      parseBuffer()
    } catch (error) {
      onError(error)
      return
    }
  }

  parseBuffer()
  onDone()
}
