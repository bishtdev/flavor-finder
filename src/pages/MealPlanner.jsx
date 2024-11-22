// src/pages/MealPlanner.js

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeRecipeFromDay } from '../app/store';
import { Link } from 'react-router-dom';

const MealPlanner = () => {
  const dispatch = useDispatch();
  const mealPlan = useSelector((state) => state.mealPlanner.plan);

  const handleRemove = (day, recipeId) => {
    dispatch(removeRecipeFromDay({ day, recipeId }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Meal Planner</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {Object.keys(mealPlan).map((day) => (
          <div key={day} className="bg-white p-4 rounded shadow mealplan-body">
            <h2 className="text-xl font-semibold mb-2">{day}</h2>
            <ul>
              {mealPlan[day].map((recipe) => (
                <li key={recipe.id} className="mb-2 flex justify-between items-center">
                  <Link to={`/recipe/${recipe.id}`} className="text-black text-[13px] ">
                    {recipe.title}
                  </Link>
                  {/* <Link to={recipe.spoonacularSourceUrl} className="text-blue-500 text-[10px] font-bold">
                    {recipe.title}
                  </Link> */}
                  <button
                    onClick={() => handleRemove(day, recipe.id)}
                    className="bg-red-500 text-white px-2 text-[12px] font-mono font-bold"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealPlanner;
