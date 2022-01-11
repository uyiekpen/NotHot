import React,{useState} from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { app } from './base'

const Sigin = () => {
    const [email, setEmail] =useState("")
    const [password, setpassword] =useState("")

    const Signin = async() =>{
        await app.auth().createUserWithEmailAndPassword(email,password)
        
    } 
    return (
        <Container>
            <Wrapper>
                <Card>
                    <Form>
                        <Input placeholder='Email' value={email} 
                        onChange={(e)=>{
                            setEmail(e.target.value)
                        }}
                        />
                        <Input placeholder='password'
                        value={password} 
                        onChange={(e)=>{
                            setpassword(e.target.value)
                        }}
                        />
                        <Imagebutton onClick={Signin}cl ="red">Submit</Imagebutton>

                    </Form>
                    <Text>
                            Don't have an Account,<Link to="/register">Register here</Link>
                        </Text>
                </Card>
            </Wrapper>
        </Container>
    )
}

export default Sigin


const Text = styled.div`
font-family: Poppins;
font-weight: bold;
text-decoration:none;
span {
    color: red;
}
`

const Input = styled.input`
height: 45px;
width: 300px;
margin: 5px 0px 10px;
border-radius: 8px;
border:none;
outline: none;

::placeholder{
    font-family: Poppins;
    color: grey;
    margin-left: 2px;
}

`

const Form = styled.form`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`


const Imagebutton = styled.button`
height: 45px;
width:120px;
border-radius: 12px;
border: none;
margin: 5px 0px 10px;
background-color:${({cl})=>cl};
font-weight: bold;
font-family: Poppins;
`


const Card = styled.div`
background-color: whitesmoke;
height:300px;
width: 400px;
border-radius: 8px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;

`

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
width: 100vw;
`