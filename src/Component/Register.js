import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import pix from "../Component/Image/big.jpg"
import { app } from './base'
import firebase from 'firebase'

const Register = () => {
    const [username, setUserName] =useState("")
    const [email, setEmail] =useState("")
    const [password, setpassword] =useState("")
    const [avatar,setAvatar] =useState("")
    const [image,setImage] =useState(pix)
    const [percent, setPercent] = useState(0);


    const UploadImage = async(e) => {
        const file = e.target.files[0]
        const save = URL.createObjectURL(file);
        setImage(save)

        const fileRef = await app.storage().ref();
        const storageRef = fileRef.child("userImage/" + file.name).put(file)

        storageRef.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot)=>{
                const counter = (snapshot.bytesTransferred / snapshot.totalbytes)*100
                setPercent(counter)
                console.log(counter)
            },
            (error) => console.log(error),
            ()=>{
                storageRef.snapshot.ref.getDownloadURL().then((url=>{
                    setAvatar(url)
                    console.log(url)
                }))
            }
        )
    }

    

    const Register = async() =>{
        const Saveauser = await app.auth().createUserWithEmailAndPassword(email,password)
        if (Saveauser){
            await app.firestore().collection("RegisterUser").doc(Saveauser.user.uid).set({
                password,
                email,
                username,
                avatar,
            })
        }
    } 
    return (
        <Container>
            <Wrapper>
                <Card>
                    <ImageHolder>
                        <Image src={image}/>
                        <ImageLabel htmlFor="pix">Upload an Image</ImageLabel>
                        <ImageInput id="pix" onChange={UploadImage} type="file" />      
                    </ImageHolder>
                    <Form>
                        <Input placeholder='Name'
                        value={username}
                        onChange={(e)=>{
                            setUserName(e.target.value)
                        }}
                        />
                        <Input placeholder='Email'
                        value={email}
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
                        <Imagebutton cl ="red" onClick={Register}>Submit</Imagebutton>
                        <Text>
                            Already have an Account,<Link to="/signin">Sign in here</Link>
                        </Text>
                    </Form>
                </Card>
            </Wrapper>
        </Container>
    )
}

export default Register

const  Space = styled.div``
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
const ImageInput = styled.input`
  display: none;
`;

const ImageLabel = styled.label`
  padding: 10px 20px;
  background-color: gray;
  margin: 10px 0;
  border-radius: 30px;
  color: white;
font-family: Poppins;
  transition: all 350ms;
  transform: scale(1);

  :hover {
    transform: scale(0.97);
    cursor: pointer;
  }
`;

const Imagebutton = styled.label`
height: 45px;
width:120px;
border-radius: 12px;
border: none;
margin: 5px 0px 10px;
background-color:${({cl})=>cl};
font-weight: bold;
font-family: Poppins;
display: flex;
justify-content: center;
align-items: center;
`

const Image = styled.img`
height: 150px;
width: 150px;
border-radius: 100%;
object-fit: cover;
`
const ImageHolder = styled.div`
height: 250px;
width: 250px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;

`
const Card = styled.div`
background-color: whitesmoke;
height:600px;
width: 500px;
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