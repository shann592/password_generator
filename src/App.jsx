import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function App() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')
  const passRef = useRef(null)
  const generatePassword = useCallback(() => {
    let tempPassword = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    if (numbersAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+'
    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1)
      tempPassword += str.charAt(charIndex)
    }

    setPassword(tempPassword)
  }, [length, numbersAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [length, numbersAllowed, charAllowed])

  const copyPasswordToClipboard = function () {
    navigator.clipboard.writeText(password)
    passRef.current.select()
  }

  return (
    <main>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="display-copy">
          <input
            type="text"
            placeholder="Password"
            value={password}
            readOnly
            ref={passRef}
          />
          <button onClick={copyPasswordToClipboard}>copy</button>
        </div>
        <div className="options">
          <label>
            <input
              type="range"
              min={6}
              max={15}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />{' '}
            Length:
            {length}
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setNumbersAllowed((prevVal) => !prevVal)}
              checked={numbersAllowed}
            />{' '}
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              onChange={() => setCharAllowed((prevVal) => !prevVal)}
              checked={charAllowed}
            />{' '}
            Characters
          </label>
        </div>
      </div>
    </main>
  )
}
