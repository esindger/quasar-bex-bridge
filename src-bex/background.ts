import { bexBackground } from 'quasar/wrappers'

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.onClicked.addListener((/* tab */) => {
    // Opens our extension in a new browser window.
    // Only if a popup isn't defined in the manifest.
    chrome.tabs.create(
      {
        url: chrome.runtime.getURL('www/index.html')
      },
      (/* newTab */) => {
        // Tab opened.
      }
    )
  })
})

declare module '@quasar/app-vite' {
  interface BexEventMap {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    log: [{ message: string; data?: any[] }, never];
    getTime: [never, number];

    'storage.get': [{ key: string | null }, any];
    'storage.set': [{ key: string; value: any }, any];
    'storage.remove': [{ key: string }, any];
    /* eslint-enable @typescript-eslint/no-explicit-any */
  }
}

export default bexBackground((bridge /* , allActiveConnections */) => {
  bridge.on('test.bg', async ({
    data,
    eventResponseKey,
    respond
  }) => {
    bridge.send('test', data).then((res) => {
      // NEVER REACHED
      console.log('[background] test RESOLVED', res)
      respond()
    })

    console.log(`[background] call "test" ${eventResponseKey}, eventNames: ${JSON.stringify(bridge.eventNames())}`)
  })

  // setInterval(() => {
  //   bridge.send('test2').then((res) => {
  //     // NEVER REACHED
  //     console.log('[background] test2 RESOLVED', res)
  //   })
  //
  //   console.log(`[background] call "test2" eventNames: ${JSON.stringify(bridge.eventNames())}`)
  // }, 5000)
})
