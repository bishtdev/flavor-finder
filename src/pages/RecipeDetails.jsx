import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchRecipeDetails } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, addRecipeToDay, removeFavorite } from '../app/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faHeartCircleMinus } from '@fortawesome/free-solid-svg-icons';
import Notification from '../Components/Notification';


const RecipeDetails = () => {
    const {id} = useParams(); //get recipe ID from url
    const [recipe , setRecipe] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error,setError] = useState(null)
    const [selectedDay, setSelectedDay] = useState('Monday')
    const [showNotification , setShowNotification] = useState(false)

    const dispatch = useDispatch();

    const favorite = useSelector((state)=> state.favorites.items)
    const isFavorite = favorite.some((fav) => fav.id === parseInt(id))



    useEffect(() =>{
        const getRecipeDetails = async () => {
            const data = await fetchRecipeDetails(id);
            if (data) {
                setRecipe(data);
                setLoading(false)

            }else{
                setError('failed to fetch recipe details')
                setLoading(false)
            }
        }
        getRecipeDetails()
    },[id])

    const handleFavoriteToggle = () => {
      if (isFavorite){
        dispatch(removeFavorite(parseInt(id))) //remove from favroite
      }else{
        dispatch(addFavorite(recipe)) // add to favorites
      }
    }

    const handleAddToMealPlanner = () =>{
      if(recipe){
        dispatch(addRecipeToDay({day: selectedDay, recipe}))
        setShowNotification(true)
        setTimeout(() => {
          setShowNotification(false)
        }, 3000);
      }
    }

    if (loading) return <p> Loading....</p>
    if (error) return <p className='text-red-600'> {error}</p>


    return( 
    <div className="p-2 md:p-4">
         {recipe && (
        <>
          
          <div className="mb-4 pt-16 ">
          <img src={recipe.image} alt={recipe.title} className="h-60 object-contain rounded mb-4 mx-auto shadow-lg" />
          <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>
            <label htmlFor="day" className="block text-lg font-semibold mb-2">
              Select a day:
            </label>
            <select
              id="day"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              className="border p-2 rounded w-72 transparent-input"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                <option key={day} value={day} className='bg-slate-700'>
                  {day}
                </option>
              ))}
            </select>
          </div>

          <div className='flex gap-5'>
          <button
            onClick={handleAddToMealPlanner}
            className="bg-green-500 text-white p-2 mb-4 rounded text-sm font-bold"
          >
            Add to Meal Planner
          </button>
          <button
            onClick={handleFavoriteToggle}
            className={`p-2 rounded mb-4  text-sm font-bold ${isFavorite ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          >
             <FontAwesomeIcon icon={isFavorite ? faHeartCircleMinus : faHeart} className="mr-2" />
            {isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
          </button>
          
          </div>
          <a 
          href={recipe.spoonacularSourceUrl}
           className='bg-pink-500 p-2 rounded text-white text-sm font-bold'>
           More thorough Instruction
           </a>

         
          
         <div className='grid grid-cols-2 justify-center gap-4 md:gap-0'>
         <div>
          <h2 className="text-xl font-semibold mb-2 mt-3">Ingredients</h2>
          <ul>
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li className='font-mono' key={`${ingredient.id}-${index}`}>{ingredient.original}</li>
            ))}
            {/* {<li>{recipe.spoonacularSourceUrl}</li>} */}
          </ul>
          </div>


          <div>
          <h2 className="text-xl font-semibold mb-2 pt-[10px] md:pt-0">Instructions</h2>
          <p className="mb-4 text-justify">{recipe.instructions || 'No instructions provided.'}</p>
          </div>
         </div>
        </>
      )}

      {showNotification && (
        <Notification
          message={`Recipe added to ${selectedDay}'s meal planner!`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
    )
};

export default RecipeDetails;
