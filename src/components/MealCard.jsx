export default function MealCard({meal}) {
   if(!meal) return null;
   
   return (
   <div id="mealCard">
       <img src={meal.strMealThumb} alt={meal.strMeal} />
      <h3>{meal.strMeal}</h3>
   </div>
   )
}