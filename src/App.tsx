import {Toaster,} from 'sonner' // hiên thị thông báo
import {BrowserRouter, Routes, Route} from 'react-router'
import HomeLayout from "./Layout/HomeLayout"
import './App.css'

function App() {

  return (
      <>
          <Toaster/>
          <BrowserRouter>
              <Routes>
                  <Route path="/"
                         element={<HomeLayout/>}
                  />
              </Routes>
          </BrowserRouter>
          )
      </>
  )
}

export default App
