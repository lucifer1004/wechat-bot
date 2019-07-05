import React, {useState} from 'react'
import QRCode from 'qrcode'
import {startBot, stopBot, currentUser} from './client'

const App: React.FC = () => {
  const [qrcode, setQrcode] = useState('')
  const [userName, setUserName] = useState('')

  const handleStart = async () => {
    const qrcode = await startBot()
    setQrcode(await QRCode.toDataURL(qrcode))

    const interval = setInterval(async () => {
      const name = await currentUser()
      if (!!name) {
        setUserName(name)
        clearInterval(interval)
      }
    }, 1000)
  }

  const handleStop = async () => {
    await stopBot()
    setQrcode('')
    setUserName('')
  }

  return (
    <div className="App">
      {qrcode === '' ? (
        <button onClick={handleStart}>Start</button>
      ) : userName === '' ? (
        <img src={qrcode} alt="QR code for Wechat login" />
      ) : (
        <>
          <h1>当前登陆用户：{userName}</h1>
          <button onClick={handleStop}>Stop</button>
        </>
      )}
    </div>
  )
}

export default App
