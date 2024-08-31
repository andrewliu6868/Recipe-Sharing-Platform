import { useEffect, useState } from 'react';

import axios from 'axios';


export const HomePage = () =>{
    const [recipes, setRecipes] = useState([])

    useEffect(() =>{
        const fetchRecipe = async() => {
            try{
                const response = await axios.get("http://localhost:3005/recipes");
                setRecipes(response.data);
                console.log(response.data);
            }catch(err){
                console.error(err);
            }
        };
        fetchRecipe();
    }, []);
    return (
        <div className="home">
            <h1>Recipes</h1>
            <ul>
                {recipes.map((recipe) =>(
                    <li key={recipe._id}>
                        <div>
                            <h2> {recipe.name}</h2>
                        </div>
                        <div>
                            <h2> {recipe.instructions}</h2>
                        </div>
                        <img src = {recipe.imageUrl} alt="Food picture"/>
                        <p>Cooking Time: {recipe.cookingTime} (minutes) </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};