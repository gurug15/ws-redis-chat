import { Navigate, Route, Routes } from "react-router-dom"
import SignUp from "./pages/SIgnup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import { useAuthContext } from "./context/AuthContext"




function App() {
 const {authUser,isLoading} = useAuthContext()


 if(isLoading) return null

  return (
    <div className="p-4 h-screen flex justify-center items-center">
      <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to={"/login"}/>}/>
        <Route path="/signup" element={!authUser?<SignUp/>: <Navigate to={'/'}/>}/>
        <Route path="/login" element={!authUser?<Login/>:<Navigate to={"/"}/>}/>
      </Routes>
    </div>
  )
}

export default App
