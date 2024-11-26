import React from 'react'
import { Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Products/>}/>
      </Routes>
    </div>
  )
}

export default App