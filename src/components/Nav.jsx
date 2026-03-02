import axios from "axios";
import { useState, useEffect } from "react";

export default function Nav() {
   const [cat, setCat] = useState([]);
   const [area, setArea] = useState([]);
   const [letter, setLetter] = useState([]);

   const [dropdown, setDropdown] = useState(null);


   async function getDropDown(type) {
      try {
         let url
         switch (type) {
            case 'cat':
               url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
               const catRes = await axios.get(url);
               setCat(catRes.data.meals);
               break;
            case 'area':
               url = "https://www.themealdb.com/api/json/v1/1/list.php?a=list";
               const areaRes = await axios.get(url);
               setArea(areaRes.data.meals);
               break;
            case 'letter':
               const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
               setLetter(letters);
               break;
            default:
               console.log('Unknown type!')
         }

      } catch (error) {
         console.error(error.message);
      }
   }

   useEffect(() => {
      getDropDown('cat');
      getDropDown('area');
      getDropDown('letter');
   }, [])

   return (
      <>
         <div className="dropdown">
            <button className="dropbtn" onMouseOver={() => setDropdown(dropdown === 'cat' ? null : 'cat')}>Category</button>
            {dropdown === 'cat' && (
               <div id="cat">
                  {cat.map((cat, index) => (
                     <div  className="dropdown-content" key={index}>
                        <a href={`www.themealdb.com/api/json/v1/1/filter.php?c=${cat.strCategory}`}>{cat.strCategory}</a>
                     </div>
                  ))}
               </div>
            )}
         </div>
         <div className="dropdown">
            <button className="dropbtn" onMouseOver={() => setDropdown(dropdown === 'letter' ? null : 'letter')}>Letter</button>
            {dropdown === 'letter' && (
               <div className="dropdown-content" id="letter">
                  {letter.map((letter, index) => (
                     <div key={index}>
                        <a href="#">{letter}</a>
                     </div>
                  ))}
               </div>
            )}
         </div>
         <div className="dropdown">
            <button className="dropbtn" onMouseOver={() => setDropdown(dropdown === 'area' ? null : 'area')}>Country</button>
            {dropdown === 'area' && (
               <div className="dropdown-content" id="area">
                  {area.map((area, index) => (
                     <div className="dropdown-content" key={index}>
                        <a href="#">{area.strArea}</a>
                     </div>
                  ))}
               </div>
            )}
         </div>
      </>
   )
}