import React, { useEffect,useState, useLayoutEffect  } from 'react'
import axios from 'axios'
import QRCode from 'qrcode'
import {useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')

	const GenerateQRCode = () => {
		QRCode.toDataURL(url, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})}
	useLayoutEffect(() => {
		
			document.body.style.backgroundColor = "#335383FF";
			

	   });
		
	
  return (
   
    <div className="app">
			<h1>QR Generator</h1>
			<input 
				type="text"
				placeholder="enter unique id"
				value={url}
				onChange={e => setUrl(e.target.value)} />
			<button onClick={GenerateQRCode}>Generate</button>
			{qr && <>
				<img src={qr} />
				<a href={qr} download="qrcode.png">Download</a>
			</>}
		</div>
  )
}

export default Home
