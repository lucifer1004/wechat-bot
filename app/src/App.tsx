import React, {useState} from 'react'
import QRCode from 'qrcode'
import {startBot} from './client'

const App: React.FC = () => {
  const [qrcode, setQrcode] = useState('')

  const handleClick = async () => {
    const qrcode = await startBot()
    setQrcode(await QRCode.toDataURL(qrcode))
  }

  return (
    <div className="App">
      <button onClick={handleClick}>Click</button>
      {qrcode === '' ? null : <img src={qrcode} />}
    </div>
  )
}

export default App
