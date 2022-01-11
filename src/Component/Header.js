import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { app } from './base'
import { AuthContext } from './Global/AuthProvider'

const Header = () => {
    const {currentUser} = useContext(AuthContext)
    const [auth, setAuth] =useState(false)
    const [UserData, setUserData] = useState([])

    const Toggle = () => {
        setAuth(!auth)
    }

    const getUser = async () => {
        await app.firestore()
        .collection("RegisterUser")
        .doc(currentUser?.uid)
        .get()
        .then((user)=>{
            setUserData(user.data())
        })

    }

    useEffect (()=>{
        getUser()
    },[])
        return (
        <Container>
            <Wrapper>
               <Link to="/">
               <Logo />
               </Link>
               {
                   currentUser ? ( 
                   <Nav1 >
                         <Link to="/create">
                         <Button cl ="#123456">Create a post</Button>
                         </Link>
                         <Button  cl="teal"> Edit profile</Button>
                         <Button cl ="red">Profile</Button>
                    < Button onClick={()=>{
                        app.auth().signOut()
                    }}>Logout</Button>
                    </Nav1> ) : (
                         <Nav>
                         <Link to="/create">
                         <Button cl ="#123456">Create a post</Button>
                         </Link>
                         <Button  cl="teal"> Edit profile</Button>
                         <Button cl ="red">Profile</Button>
                         <Link to="/register">
                         < Button>Register</Button>
                         </Link>
                     </Nav>
                    )
               }
               
                  
                   
                  
                    

            </Wrapper>
        </Container>
    )
}

export default Header

const Button = styled.button`
 height: 35px;
width:120px;
border-radius: 3px;
border-radius: 2px;
border: none;
margin: 0px 10px;
background-color:${({cl})=>cl};
font-weight: bold;
font-family: Poppins;


`

const Nav1 = styled.div``


const Nav = styled.div``
const Logo = styled.div`
height: 35px;
width: 70px;
border: 1px solid white;
`
const Wrapper = styled.div`
height: 70px;
width: 90%;
display: flex;
background-color: thistle;
align-items:center ;
justify-content: space-between;

`

const Container = styled.div`
display: flex;
background-color: thistle;
height: 70px;
width: 100%;
justify-content: center;
align-items: center;
font-family: Poppins;
`