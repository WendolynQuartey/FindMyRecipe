import { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import Search from "./Search.jsx";
import MealCard from "./MealCard.jsx";
import axios from "axios";

export default function Home() {
   const [display, setDisplay] = useState(null);
   const [isFiltered, setIsFiltered] = useState(false);
   const url = `https://www.themealdb.com/api/json/v1/1/random.php`;

   async function getRandMeal() {
      try {
         const res = await axios.get(url);
         setDisplay(res.data);
         setIsFiltered(false);
      } catch (error) {
         console.error(error.message);
      }
   }

   useEffect(() => {
      getRandMeal();
   }, [])

   function handleFilter(data) {
      setDisplay(data);
      setIsFiltered(true);
   }

   return (
      <>
         <div>
            <h1>Find My Recipe</h1>
            <Nav display={display} setDisplay={handleFilter} />
            <br />
            <Search onSearch={handleFilter} />
         </div>
         <main>
            {!display && <h2>Loading...</h2>}

            {display && display.meals && (
               <>
                  {!isFiltered && display.meals.length == 1 && (
                     <MealCard meal={display.meals[0]} />
                  )}

                  {isFiltered && display.meals.length > 0 && (
                     <div>
                        {display.meals.map((meal) => (
                           <MealCard key={meal.idMeal} meal={meal} />
                        ))}
                     </div>
                  )}

                  {isFiltered && display.meals.length == 0 && (
                     <p>No meal found.</p>
                  )}
               </>
            )}
         </main>
      </>
   )
}