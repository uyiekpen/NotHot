import React,{useContext} from "react"
import {Navigate} from "react-router-dom"
import {AuthContext} from "../Global/AuthProvider"

const PrivateRoute = ({children})=>{
    const {currentUser} = useContext(AuthContext)
    return(
      currentUser? children : <Navigate to="signin"/>
    )
}

export default PrivateRoute
