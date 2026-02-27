import {useState, useEffect} from "react";
import Nav from "./Nav.jsx";
import Search from "./Search.jsx";
import MealCard from "./MealCard.jsx";
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
         <br />
         <Search />
      </div>
      {display && display.meals && (
         <MealCard  display={display}/>
      )}
      </>
   )
}