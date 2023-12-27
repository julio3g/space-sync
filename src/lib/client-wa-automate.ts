import fs from 'node:fs'

import {
  Client,
  create,
  ev,
  NotificationLanguage,
  QRFormat,
  QRQuality,
} from '@open-wa/wa-automate'

export function clientWAAutomate() {
  create({
    sessionId: 'bot',
    multiDevice: true, // required to enable multiDevice support
    authTimeout: 60, // wait only 60 seconds to get a connection with the host account device
    qrRefreshS: 20,
    blockCrashLogs: true,
    disableSpins: true,
    hostNotificationLang: NotificationLanguage.PTBR,
    logConsole: true,
    qrFormat: QRFormat.PNG,
    qrQuality: QRQuality.TEN,
  }).then((client: Client) => {
    client.onStateChanged((state) => {
      if (state === 'UNPAIRED') {
        console.log('QR Code expirado, gerando novo...')
      }
    })
  })
}

ev.on('qr.**', async (qrcode) => {
  // qrcode is base64 encoded qr code image
  // now you can do whatever you want with it
  const imageBuffer = Buffer.from(
    qrcode.replace('data:image/png;base64,', ''),
    'base64',
  )
  fs.writeFileSync('qr_code.png', imageBuffer)
})
