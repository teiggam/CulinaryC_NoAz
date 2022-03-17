
using CulinaryC3.Model;
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
        public List<Recipe> GetRecipes()
        {
            List<Recipe> recipeList = db.Recipes.OrderByDescending(x => x.Score).ToList();
            return recipeList;
        }

        [HttpGet("id={userId}")]
        public List<Recipe> DisplayUserRecipes(int userId)
        {
            List<Recipe> userRecipes = db.Recipes.Where(x => x.UserId == userId).ToList();

            return userRecipes.OrderByDescending(x => x.Id).ToList();
        }

        [HttpPost("Add/T={title}&U={userId}")]

        public void AddNewRecipe(string title, int userId)
        {
            Recipe r = new Recipe
            {
                RecipeName = title,
                UserId = userId,
                Score = 0
            };

            db.Recipes.Add(r);
            db.SaveChanges();
        }

        [HttpGet("Ingredients/All")]
        public List<Ingredient> GetIngredients()
        {
            List<Ingredient> ingrList = db.Ingredients.ToList();
            return ingrList;
        }

        [HttpGet("GetRecipesByIngName={ingName}")]
        public List<Recipe> GetRecipesByIngName(string ingName)
        {
            List<Recipe> RList = db.Recipes.ToList();
            List<Ingredient> I = db.Ingredients.Where(x => x.Item.Contains(ingName)).ToList();
            List<Recipe> RFound = new List<Recipe>();
            foreach (Ingredient i in I)
            {
                foreach (Recipe r in RList)
                {
                    if (i.RecipeId == r.Id)
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
            Recipe r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();
            User u = db.Users.Find(r.UserId);

            u.Score = u.Score - 5;

            r.Score = r.Score - 10;

            db.Recipes.Update(r);
            db.Users.Update(u);
            db.SaveChanges();
        }

        [HttpPut("updateScore={recipeId}")]
        public void completeRecipe(int recipeId)
        {
            Recipe r = db.Recipes.Where(x => x.Id == recipeId).ToList().First();

            r.Score = r.Score + 10;

            db.Recipes.Update(r);
            db.SaveChanges();
        }
            

            // Need to switch to contains
        [HttpGet("N={name}")]
        public Recipe GetRecipeByName(string name)
        {
            Recipe rec = db.Recipes.Where(x => x.RecipeName.ToLower() == name.ToLower()).ToList().Last();

            return rec;
        }

        [HttpGet("search/N={name}")]
        public List<Recipe> GetAllRecipeByName(string name)
        {
            List<Recipe> rec = db.Recipes.Where(x => x.RecipeName.ToLower().Contains(name.ToLower())).ToList();

            return rec;
        }

        [HttpPost("Ingredients/Add")]
        public void AddIngredient(Ingredient ing)
        {
            db.Ingredients.Add(ing);
            db.SaveChanges();
        }

        [HttpPut("Update/N={name}/D={desc}/S={serv}/I={image}")]
        public void UpdateRecipe(string name, string desc, int serv, string image)
        {
            Recipe r = db.Recipes.Where(x => x.RecipeName == name).ToList().Last();
            User u = db.Users.Where(x => x.Id == r.UserId).ToList().First();
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
        public Recipe FindRecipeById(int id)
        {
           Recipe r = db.Recipes.Find(id);
           return r;
        }

        [HttpGet("Ingredients/Id={id}")]
        public Ingredient GetIngredientById(int id)
        {
            Ingredient ing = db.Ingredients.Find(id);
            return ing;

        }

        [HttpDelete("deleteRecipe={id}")]
        public void DeleteRecipe(int id)
        {
            Recipe r = db.Recipes.Find(id);
            List<Ingredient> I = db.Ingredients.Where(x => x.RecipeId == r.Id).ToList();
            foreach(Ingredient ing in I)
            {
                db.Ingredients.Remove(ing);
            }

            db.Recipes.Remove(r);
            db.SaveChanges();
        }
    }
}
