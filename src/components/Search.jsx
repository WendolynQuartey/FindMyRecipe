import {useState} from "react";
import axios from "axios";

export default function Search({onSearch}) {
   const [searchTerm, setSearchTerm] = useState("");

   async function handleSearch(e){
      e.preventDefault;
      if(!searchTerm.trim()) return;

      try {
         const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
         onSearch(res.data);
      } catch (error) {
         console.error(error.message);
      }
   }

   return (
      <form onChange={handleSearch}>
      <label>Search
         <input type="text" name="searchBar" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for a meal..."/>
      </label>
      </form>
   )
}