import express from "express";
import cors from "cors";
import { RecipeModel } from "../models/RecipesM.js";
import { UserModel } from "../models/UsersM.js";

const router = express.Router();

// retrieve all saved recipes
router.get("/", async (req,res) => {
    try{
        const response = await RecipeModel.find({});
        res.json(response);
    }catch (err){
        res.json(err);
    }
});

// add a recipe
router.post("/", async (req,res) => {
    const recipe = new RecipeModel(req.body);
    try{
        const response = await RecipeModel.save();
        res.json(response);
    }catch (err){
        res.json(err);
    }
});

// save a recipe
router.put("/", async (req,res) => {
    try{
        // find the recipe and the user
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);

        user.savedRecipes.push(recipe);
        await user.save(); // save changes
        res.json({savedRecipes: user.savedRecipes});
    }catch (err){
        res.json(err);
    }
});

router.get("/savedRecipes/ids/:userID", async (req, res) =>{
    try{
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes});
    } catch(err){
        res.json(err);
    }
});

router.get("/savedRecipes", async (req, res) =>{
    try{
        const user = await UserModel.findById(req.body.userID);
        const savedRecipe = await RecipeModel.find({
            _id: { $in: user.savedReceipes},
        });
        res.json({ savedRecipe});
    } catch(err){
        res.json(err);
    }
});
export {router as recipeRouter};