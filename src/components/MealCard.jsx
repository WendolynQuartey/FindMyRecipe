export default function MealCard({display}) {
   return (
   <div id="mealCard">
       <img src={display.meals[0].strMealThumb} alt={display.meals[0].strMeal} />
      <h3>{display.meals[0].strMeal}</h3>
   </div>
   )
}