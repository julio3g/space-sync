import { create, NotificationLanguage, QRFormat, QRQuality, Client, ev } from "@open-wa/wa-automate"
import fs from "node:fs"

export async function GET(request: Request) {
  create({
    sessionId: 'bot',
    multiDevice: true, // required to enable multiDevice support
    authTimeout: 60, // wait only 60 seconds to get a connection with the host account device
    qrRefreshS: 20,
    blockCrashLogs: true,
    disableSpins: true,
    browserWSEndpoint: 'wss://chrome.browserless.io?token=b16f1a49-7142-4016-b1a3-12e2eeeccbcc',
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

  ev.on('qr.**', async (qrcode) => {
    // qrcode is base64 encoded qr code image
    // now you can do whatever you want with it
    const imageBuffer = Buffer.from(
      qrcode.replace('data:image/png;base64,', ''),
      'base64',
    )
    fs.writeFileSync('qr_code.png', imageBuffer)
  })
}
