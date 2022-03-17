using System;
using System.Collections.Generic;

#nullable disable

namespace CulinaryC3.Model
{
    public partial class User
    {
        public User()
        {
            Favorites = new HashSet<Favorite>();
            Friends = new HashSet<Friend>();
            Groups = new HashSet<Group>();
            Recipes = new HashSet<Recipe>();
        }

        public int Id { get; set; }
        public string LoginId { get; set; }
        public string Name { get; set; }
        public int? Score { get; set; }
        public string Title { get; set; }
        public string Picture { get; set; }
        public string Password { get; set; }

        public virtual ICollection<Favorite> Favorites { get; set; }
        public virtual ICollection<Friend> Friends { get; set; }
        public virtual ICollection<Group> Groups { get; set; }
        public virtual ICollection<Recipe> Recipes { get; set; }
    }
}
