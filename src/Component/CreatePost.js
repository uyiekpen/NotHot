import React,{useContext, useState} from 'react'
import styled from 'styled-components'
import pix from "../Component/Image/big.jpg"
import { app } from './base'
import firebase from 'firebase'
import { AuthContext } from './Global/AuthProvider'
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {
    const {currentUser} = useContext(AuthContext)
    const [avatar,setAvatar] =useState("")
    const [image,setImage] =useState(pix)
    const [percent, setPercent] = useState(0);
    const [yourpix,Setyourpix] =useState("")
    const navigate = useNavigate();
    const [show, setShow] = useState(false);





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
                    Setyourpix(url)
                    console.log(url)
                }))
            }
        )
    }

    const postImage = async () => {
        
            await app.firestore().collection("post").doc().set({
                createdBy: currentUser.uid,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                yourpix,
              });
        Setyourpix("")
        navigate("/");


    }

  

    return (
        <Container>
            <Wrapper>
                <Card>
                <ImageHolder>
                        <Image src={image}/>
                        <ImageLabel htmlFor="pix">Upload an Image</ImageLabel>
                        <ImageInput id="pix" 
                        onChange={UploadImage} 
                        type="file" 
                        accept="image/jpg"
                        placeholder=" image"

                        />  
    
                    </ImageHolder>
                    <div>{show}</div>

                    {
                        yourpix === ""?(
                            <Imagebutton cl ="blue"
                            onClick={() => {
                                setShow(!show);
                                console.log("Hello: ", show);
                              }}
                             
                             >Post</Imagebutton>

                        ) : (
                            <Imagebutton cl ="red" 
                            onClick={() => {
                                console.log("Click: ");
                                postImage();
                              }}
                            >Post</Imagebutton>
                            
                        )}
                    {show ? (
            <div>
              {yourpix !== "" ? <div> You can't upload yet</div> : null}
            </div>
          ) : null}

                </Card>
            </Wrapper>
        </Container>
    )
}

export default CreatePost


const Imagebutton = styled.button`
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


const Image = styled.img`
height: 250px;
width: 250px;
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