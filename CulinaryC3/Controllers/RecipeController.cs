
using CulinaryC3.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CulinaryC.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RecipeController : Controller
    {
        //Create a Database object
        CookBook2Context db = new CookBook2Context();

        [HttpGet("All")]
        public List<Recipes> GetRecipes()
        {
            List<Recipes> recipeList = db.Recipes.OrderByDescending(x => x.Score).ToList();
            return recipeList;
        }

        [HttpGet("id={userId}")]
        public List<Recipes> DisplayUserRecipes(int userId)
        {
            List<Recipes> userRecipes = db.Recipes.Where(x => x.UserId == userId).ToList();

            return userRecipes.OrderByDescending(x => x.Id).ToList();
        }

        [HttpPost("Add/T={title}&U={userId}")]

        public void AddNewRecipe(string title, int userId)
        {
            Recipes r = new Recipes
            {
                RecipeName = title,
                UserId = userId,
                Score = 0
            };

            db.Recipes.Add(r);
            db.SaveChanges();
        }

        [HttpGet("Ingredients/All")]
        public List<Ingredients> GetIngredients()
        {
            List<Ingredients> ingrList = db.Ingredients.ToList();
            return ingrList;
        }

        [HttpGet("/RecipeIngredients/{recipeID}")]
        public List<IngData>GetIngredientDetails(int recipeID)
        {
            List<IngData> recipeIngredients = new List<IngData>();
            List<RecipeIngredients> riList = db.RecipeIngredients.Where(x => x.RecipeId == recipeID).ToList();


            foreach(RecipeIngredients ri in riList)
            {
                if(ri.RecipeId == recipeID)
                {
                    Ingredients ing = db.Ingredients.Where(x => x.Id == ri.IngredientId).FirstOrDefault();
                    IngData inToAdd = new IngData();

                    inToAdd.RecipeID = ri.RecipeId;
                    inToAdd.Name = ing.Name;
                    inToAdd.BaseAmount = ing.BaseAmount;
                    inToAdd.BaseUnit = ing.BaseUnit;
                    inToAdd.AmountUsed = ri.AmountUsed;
                    inToAdd.InputUnit = ri.InputUnit;
                    inToAdd.Calories = ing.Calories;
                    inToAdd.Protein = ing.Protein;
                    inToAdd.Fats = ing.Fats;
                    inToAdd.Aisle = ing.Aisle;

                    recipeIngredients.Add(inToAdd);
                }

            }
            return recipeIngredients;
        }

        [HttpGet("GetRecipesByIngName={ingName}")]
        public List<Recipes> GetRecipesByIngName(string ingName)
        {
            List<Recipes> RList = db.Recipes.ToList();
            List<Ingredients> I = db.Ingredients.Where(x => x.Name.Contains(ingName)).ToList();
            List<RecipeIngredients> inRecipe = new List<RecipeIngredients>();
            foreach(Ingredients i in I)
            {
                RecipeIngredients RecIn = db.RecipeIngredients.Where(x => x.IngredientId == i.Id).First();
                inRecipe.Add(RecIn);
            }

            List<Recipes> RFound = new List<Recipes>();
            foreach (RecipeIngredients ri in inRecipe)
            {
                foreach (Recipes r in RList)
                {
                    if (ri.RecipeId == r.Id)
                    {
                        RFound.Add(r);
                    }
                }

            }
            return RFound;
        }

        [HttpPut("removescore={recipeId}")]
        public void removeRecipe(int recipeId)
        {
            Recipes r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();
            Users u = db.Users.Find(r.UserId);

            u.Score = u.Score - 5;

            r.Score = r.Score - 10;

            db.Recipes.Update(r);
            db.Users.Update(u);
            db.SaveChanges();
        }

        [HttpPut("updateScore={recipeId}")]
        public void CompleteRecipe(int recipeId)
        {
            Recipes r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();

            r.Score = r.Score + 10;

            db.Recipes.Update(r);
            db.SaveChanges();
        }
            

            // Need to switch to contains
        [HttpGet("N={name}")]
        public Recipes GetRecipeByName(string name)
        {
            Recipes rec = db.Recipes.Where(x => x.RecipeName.ToLower() == name.ToLower()).ToList().Last();

            return rec;
        }

        [HttpGet("search/N={name}")]
        public List<Recipes> GetAllRecipeByName(string name)
        {
            List<Recipes> rec = db.Recipes.Where(x => x.RecipeName.ToLower().Contains(name.ToLower())).ToList();

            return rec;
        }

        [HttpPost("Ingredients/Add")]
        public void AddIngredient(IngData ing)
        {
            //First need to check if ingredient is in DB
            List<Ingredients> IList = db.Ingredients.Where(x => x.Name.ToLower() == ing.Name.ToLower()).ToList();
            if (IList.Count > 0)
            {
                //If yes, then add new line to RecipeIngredients in relation to new recipe.
                int ingID = IList.First().Id;
                RecipeIngredients recipeIngredients = new RecipeIngredients();
                recipeIngredients.IngredientId = ingID;
                AddRecipeIngredient(ing, recipeIngredients);
            }
            else
            {
                //If no, add the new ingredient to the ingredient table, then add new line in RecipeIngredient
                AddToIngredientTable(ing);
            }
            //Save in DB
            db.SaveChanges();
        }

        [HttpPut("Update/N={name}/D={desc}/S={serv}/I={image}")]
        public void UpdateRecipe(string name, string desc, int serv, string image)
        {
            Recipes r = db.Recipes.Where(x => x.RecipeName == name).ToList().Last();
            Users u = db.Users.Where(x => x.Id == r.UserId).ToList().First();
            u.Score = u.Score + 20;
            db.Users.Update(u);
            // string newPath = "https://recipephotos.blob.core.windows.net/photos/photos/" + image;
            r.Description = desc;
            r.Servings = serv;
            // r.Picture = newPath;
            r.Picture = "resources/images/" + image;
            db.Recipes.Update(r);
            db.SaveChanges();
        }

        //used currently in details componet
        [HttpGet("FindRecipe/Id={id}")]
        public Recipes FindRecipeById(int id)
        {
            Recipes r = db.Recipes.Where(x => x.Id == id).FirstOrDefault();
            return r;
        }

        [HttpGet("Ingredients/Id={id}")]
        public Ingredients GetIngredientById(int id)
        {
            Ingredients ing = db.Ingredients.Find(id);
            return ing;

        }

        [HttpDelete("deleteRecipe={id}")]
        public void DeleteRecipe(int id)
        {
            Recipes r = db.Recipes.Find(id);
            List<RecipeIngredients> ri = db.RecipeIngredients.Where(x => x.RecipeId == r.Id).ToList();
               foreach (RecipeIngredients recing in ri)
                {
                    if (r.Id == recing.RecipeId)
                    {
                        db.RecipeIngredients.Remove(recing);
                    }
                }
            db.Recipes.Remove(r);
            db.SaveChanges();
        }

        private void AddRecipeIngredient(IngData ing, RecipeIngredients ringtoDB)
        {
            ringtoDB.RecipeId = ing.RecipeID;
            ringtoDB.AmountUsed = ing.AmountUsed;
            ringtoDB.InputUnit = ing.InputUnit;

            db.RecipeIngredients.Add(ringtoDB);
        }

        private void AddToIngredientTable(IngData ing)
        {
            Ingredients newIng = new Ingredients();
            newIng.Name = ing.Name;
            newIng.BaseUnit = ing.BaseUnit;
            newIng.BaseAmount = ing.BaseAmount;
            newIng.Calories = ing.Calories;
            newIng.Carbs = ing.Carbs;
            newIng.Protein = ing.Protein;
            newIng.Fats = ing.Fats;
            newIng.Aisle = ing.Aisle;

            db.Ingredients.Add(newIng);
        }
    }
}
