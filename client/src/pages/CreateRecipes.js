import { useState } from "react";
import { useGetUserID } from "../hooks/useGetUserID";
import {useNavigate} from 'react-router-dom';

import axios from 'axios';

export const CreateRecipe = () =>{
    const userID = useGetUserID();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageURL: "",
        cookingTime: 0,
        userOwner: userID,
    });

    const handleChange =(event) =>{
        const{name,value} = event.target;
        setRecipe({...recipe, [name]: value});
    }

    const addIngs = () => {
        setRecipe({...recipe, ingredients: [recipe.ingredients, ""]});
    }

    const handleIngredientChange =(idx, event) =>{
        const {value} = event.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value;
        setRecipe({...recipe, ingredients});
    };

    const onSubmit = async(event) =>{
        event.preventDefault(); // won't automatically refresh page
        try{
            await axios.post("http://localhost:3005/recipes", recipe);
            alert("Recipe Succesfully Created");
            navigate("/");
        }catch(err){
            console.error(err);
        }
    };    
    return (
        <div className="create">
            <h1>Create New Recipe</h1>
            <form>
                <label htmlFor="name">Recipe Name</label>
                <input type="text" id="name" onChange={handleChange}/>
                <label htmlFor="ingredients">Ingredients</label>
                {recipe.ingredients.map((ingredients,idx) =>(
                    <input key={idx} type="text" name="ingredients" value={ingredients} onChange={(event) => {
                        handleIngredientChange();
                    }}/>
                ))}
                <button onClick={addIngs} type="button">Add Ingredient</button>
                <label htmlFor="instructions">Instructions</label>
                <input type="text" id="instructions"/>
                <label htmlFor="imageURL">Image URL of Dish</label>
                <input type="text" id="image"/>
                <label htmlFor="cookingTime">Cooking Time</label>
                <input type="number" id="cookingTime"/>

                <button type="submit">Save Recipe</button>
            </form>
        </div>
    );
};