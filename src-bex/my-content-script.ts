// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'

export default bexContent((bridge) => {
  bridge.on('test', ({
    // data,
    eventResponseKey,
    respond
  }) => {
    console.log(`[my-content-script] ${eventResponseKey}, eventNames: ${JSON.stringify(bridge.eventNames())}`)

    respond()
  })

  bridge.on('test2', ({
    // data,
    eventResponseKey,
    respond
  }) => {
    console.log(`[my-content-script] ${eventResponseKey}, eventNames: ${JSON.stringify(bridge.eventNames())}`)

    respond()
  })
})
