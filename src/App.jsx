import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// PAGES
// import WeatherApp from './pages/home' './pages/home'
import WeatherApp from './pages/home'
// PAGES

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
<BrowserRouter>
<Routes>
  <Route path='/' element={<WeatherApp/>} ></Route>
  <Route path='/signin' element></Route>
  <Route path='/signup' element></Route>


</Routes>

</BrowserRouter>
   </>
  )
}

export default App
