import express from 'express'
import mongoose from 'mongoose'
import  cors  from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import csv from 'fast-csv'
import axios from 'axios'

const app=express()

dotenv.config()

const PORT=5001

app.use(cors())
app.use(express.json())

const filePath='backend-project2.csv'

let films=[]


fs.createReadStream(filePath)
  .pipe(csv.parse({ headers: true })) 
  .on('data', (row) => {
    films.push(row)
    console.log(row)
  })
  .on('error', (error) => {
    console.error('Error while reading CSV:', error);
  })
  .on('end', (rowCount) => {
    console.log(`Parsed ${rowCount} rows`);
  });

app.get('/random-film',async(req,res)=>{
  if(films.length>0){
    const randoFilm=films[Math.floor(Math.random()*films.length)]
    const movieName=randoFilm.Name
    const movieYear=randoFilm.Year
    
  try{
    const response=await axios.get("https://www.omdbapi.com/",{

      params:{
        apikey: process.env.OMDB_API_KEY,
        t:movieName,
        y:movieYear,

      }
    })
    const movieDetails=response.data

    const enrichedFilm={
      ...randoFilm,
      director:movieDetails.Director,
      poster:movieDetails.Poster,
      runtime:movieDetails.Runtime,
      description:movieDetails.Plot
      
    }
    res.json(enrichedFilm)
  }catch(error){
    console.error('error fetching data from OMDB API',error)
  }

  }
  
  else{
      res.status(404).send('no films found')
    }
  })

app.listen(PORT,()=>{
  console.log(`Server is running on https://localhost:${PORT}`)

})
