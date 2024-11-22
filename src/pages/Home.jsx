import React, { useState } from 'react';
import { fetchRecipes } from '../api';
import {useDispatch, useSelector} from 'react-redux'
import { setRecipes, setLoading, setError, addFavorite, removeFavorite } from '../app/store';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items)

  const isFavorite = (id) => favorites.some((fav) => fav.id === id);

  // access recipes , status, and error from redux store
  const {items: recipes, status, error} = useSelector((state) => state.recipes);

  const handleSearch = async (e) =>{
    e.preventDefault();
    if (query.trim() === '') return;

    dispatch(setLoading())
    const recipes = await fetchRecipes(query);
    if(recipes.length > 0){
      dispatch(setRecipes(recipes));
    }else {
      dispatch(setError())
    }
  }

  return(
    <div className='sm:p-4 p-2 homepage'>
      <h1 className='text-4xl font-bold mb-4 text-white px-3 md:px-0 pt-28 '> Search Recipes</h1>
      <form onSubmit={handleSearch} className='mb-4 flex gap-6 pt-5'>
        <input
         type="text"
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         placeholder='search by ingredient or recipe name'
         className='transparent-input p-2 rounded w-96 mb-2'
         />
         <button type='submit' 
         className=' text-white p-2 rounded w-48 mb-2 font-bold '>
          Search
         </button>

      </form>


      {/* Display loading spinner */}
      {status === 'loading' && <p>Loading....</p>}

      {/* Display error message */}
      {status === 'failed' && <p className='text-red-500'>{error}</p>}

      {/* Display recipes in a grid layout */}
      {status === 'succeeded' && recipes.length > 0 && (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5'>
          {recipes.map((recipe)=>(
            <div  key={recipe.id} className='bg-white p-2 sm:p-4 rounded shadow hover:scale-105 duration-500 flex flex-col justify-between card-body'>
              <Link to={`/recipe/${recipe.id}`}>
              <img 
              
              src={recipe.image} 
              alt={recipe.title}
              className='w-full h-40 object-cover rounded mb-2'
              />
              </Link>
              <h2 className='text-[14px] md:text-lg font-semibold'>{recipe.title}</h2>

              <button
            onClick={() => {
              isFavorite(recipe.id)
                ? dispatch(removeFavorite(recipe.id))
                : dispatch(addFavorite(recipe));
            }}
            className={`px-2 mt-2 py-1 card-button rounded ${isFavorite(recipe.id) ? 'bg-[--custome-red]' : 'bg-[--custome-blue]'} text-white`}
          >
            <FontAwesomeIcon icon={isFavorite(recipe.id) ? faHeartCircleMinus : faHeart} className="mr-2" />
            {isFavorite(recipe.id) ? 'Remove Favorite' : 'Save to Favorites'}
          </button>
            </div>
          ))}
        </div>
      )}

        {/* Display message if no results */}
        {status === 'succeeded' && recipes.length === 0 && (
        <p>No recipes found. Try searching for something else.</p>
        )}
    </div>
  )
};

export default Home;
