import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import Display from './component/Display'

function App() {

	return (
		<div className="App">
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Donate $5
				</a>
			</header> */}
			<Display/>
		</div>
	)
}

export default App