import { BrowserRouter, Route, Routes } from "react-router-dom"
import Addscenario from "./components/Addscenario"
import Addvehicle from "./components/Addvehicle"
import Allscenario from "./components/Allscenario"
import Home from "./components/Home"
import Sidebar from "./components/Sidebar"


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar>
          <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/addscenario' element={<Addscenario/>}/>
              <Route path='/allscenario' element={<Allscenario/>}/>
              <Route path='/addvehicle' element={<Addvehicle/>}/>
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </div>
  )
}

export default App
