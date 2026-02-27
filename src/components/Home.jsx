import {useState, useEffect} from "react";
import Nav from "./Nav.jsx";
import Search from "./Search.jsx";
import axios from "axios";

export default function Home() {
   const [display, setDisplay] = useState(null)
   const url = `https://www.themealdb.com/api/json/v1/1/random.php`;

   async function getRandMeal() {
      try {
         const res = await axios.get(url);
         setDisplay(res.data);
      } catch (error) {
         console.error(error.message);
      }
   }

   useEffect(() => {
      getRandMeal();
   }, [])

   return (
      <>
      <div>
         <h1>Find My Recipe</h1>
         <Nav />
         <Search />
      </div>
      {display && display.meals && (
         <div>
           <a href=""> <img src={display.meals[0].strMealThumb} alt={display.meals[0].strMeal} /></a>
            <h3>{display.meals[0].strMeal}</h3>
         </div>
      )}
         <main>{getRandMeal}</main>
      </>
   )
}