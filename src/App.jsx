import { useState } from 'react'
import './App.css'
import './header.css'
import './search.css'
import Header from './Header'
import Search from './Search'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Search/>
    </>
  )
}

export default App
