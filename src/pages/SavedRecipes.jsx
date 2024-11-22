import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const SavedRecipes = () => {
  const favorites = useSelector((state)=> state.favorites.items)
  return (
    <div className="p-1 md:p-4">
    <h1 className="text-2xl font-bold mb-4">Saved Recipes</h1>
    {favorites.length === 0 ? (
      <p>No saved recipes yet. Start adding some!</p>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 pt-5">
        {favorites.map((recipe) => (
          <div key={recipe.id} className="bg-white p-2 rounded shadow hover:scale-105 duration-500 card-body">
            <Link to={`/recipe/${recipe.id}`}>
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{recipe.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default SavedRecipes;
