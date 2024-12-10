import { Route, Routes } from "react-router-dom"
import SignUp from "./pages/SIgnup"
import Login from "./pages/Login"
import Home from "./pages/Home"




function App() {


  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
