import { Route, Routes } from "react-router-dom"
import UserRouters from "./UserRouters"

const AppRouters = () => {
  return (
   <Routes>
    <Route path="/*" element={<UserRouters/>} />
   </Routes>
  )
}

export default AppRouters