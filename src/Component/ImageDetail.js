import React, { useEffect,useState } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useParams } from 'react-router-dom';
import { app } from './base';
import Personal from './Personal';

const ImageDetail = () => {
    const {id} = useParams()
    const [data, setData] = useState([]);

    const marks = [
        {
          value: 10,
          label: '1',
        },
        {
          value: 20,
          label: '2',
        },
        {
          value: 30,
          label: '3',
        },
        {
          value: 40,
          label: '4',
        },
        {
            value: 50,
            label: '5',
          },
          {
            value: 60,
            label: '6',
          },
          {
            value: 70,
            label: '7',
          },
          {
            value: 80,
            label: '8',
          },
          {
            value: 90,
            label: '9',
          },
          {
            value: 100,
            label: '10',
          },
          
      ];
    
    const getDataProfile = async () =>{
        await app
        .firestore()
        .collection("post")
        .doc(id)
        .get()
        .then((Datasamp)=>{
            setData(Datasamp.data())
        })
    }

    useEffect(()=>{
        getDataProfile()
    },[])
    const valuetext = (value) =>{
        return `${value}°C`;
    }
    return (
        <Container>
            <Slide>Choose the degree of hotness and Notness</Slide>
            <Box sx={{ width: 300 }}>
            <Slider
                color='secondary'
            aria-label="Custom marks"
            defaultValue={10}
            getAriaValueText={valuetext}
            step={10}
            valueLabelDisplay="auto"
            marks={marks}
            />
            </Box>
            <Vote>vote</Vote>

            <Card>
                <ImageHolder>
                    
                  <Personal who={data?.createdBy} time={data?.createdAt} />
                    <MainImage src={data?.yourpix}/>
                </ImageHolder>
               
               
            </Card>

        </Container>
    )
}

export default ImageDetail
const MainImage = styled.img`
height: 300px;
width: 400px;
background-color: teal;
object-fit: cover;
`
const Time = styled.div``
const Name = styled.div``
const Details = styled.div`
margin-left: 5px;
`
const Image = styled.div`
height: 50px;
width: 50px;
background-color: teal;
border-radius: 100%;
margin-left: 5px;
`
const ImageHolder = styled.div`
width: 400px;
border: 1px solid black;
display: flex;
flex-direction:column;
`
const Card = styled.div`
height: 400px;
width: 400px;
`


const Vote = styled.button`
height: 40px;
width: 70px;
background-color: #123456;
font-family: Poppins;
border-radius: 4px; 
margin-bottom: 10px ;
color: white;
font-weight: bold;
`


const Slide = styled.div``

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
font-family: Poppins;
`