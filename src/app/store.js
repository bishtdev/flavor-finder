import {configureStore, createSlice} from '@reduxjs/toolkit'


// recipes slice to handle fetched recipes and search results
const recipesSlice = createSlice({
    name:'recipes',
    initialState:{
        items:[],  //store fetched recipes here
        status: 'idle', //track Api staus: 'idle', 'loading,'succceeded'
        error: null,
    },
    reducers:{
        setRecipes:(state,action)=>{
            state.items = action.payload;
            state.status = 'succeeded';
        },
        setLoading: (state) =>{
            state.status = 'loading';
        },
        setError:(state) =>{
            state.status = 'failed';
        },
       
    },
});

// Utility functions for loading and saving favorites in local storage
const loadFavoritesFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('favorites');
      return serializedState ? JSON.parse(serializedState) : [];
    } catch (e) {
      console.warn('Failed to load favorites from localStorage:', e);
      return [];
    }
  };
  
  const saveFavoritesToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('favorites', serializedState);
    } catch (e) {
      console.warn('Failed to save favorites to localStorage:', e);
    }
  };
  

// favorite slice to manage user-saved recipes
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState:{
        items:loadFavoritesFromLocalStorage(),  //store favorite recipe yaha save hoga
    },
    reducers:{
        addFavorite:(state, action)=>{
            state.items.push(action.payload)
            saveFavoritesToLocalStorage(state.items)
        },
        removeFavorite:(state, action)=>{
            state.items= state.items.filter(item => item.id !== action.payload)
            saveFavoritesToLocalStorage(state.items)
        },
    },
});


  // Utility functions to manage local storage
  const loadFromLocalStorage = (key) => {
    try {
      const serializedState = localStorage.getItem(key);
      return serializedState ? JSON.parse(serializedState) : undefined;
    } catch (e) {
      console.warn('Failed to load from localStorage:', e);
      return undefined;
    }
  };
  
  const saveToLocalStorage = (key, state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(key, serializedState);
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

// meal planner slice
const mealPlannerSlice = createSlice({
    name: 'mealPlanner',
    initialState: loadFromLocalStorage('mealPlanner') || {
      plan: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
        Sunday: [],
      },
    },
    reducers: {
      addRecipeToDay: (state, action) => {
        const { day, recipe } = action.payload;
        state.plan[day].push(recipe);
        saveToLocalStorage('mealPlanner', state); // Save updated state to local storage
      },
      removeRecipeFromDay: (state, action) => {
        const { day, recipeId } = action.payload;
        state.plan[day] = state.plan[day].filter((recipe) => recipe.id !== recipeId);
        saveToLocalStorage('mealPlanner', state); // Save updated state to local storage
      },
    },
  });
  


// export actions from each slice
export const {setRecipes, setLoading, setError} = recipesSlice.actions

export const {addFavorite, removeFavorite} = favoritesSlice.actions

export const {addRecipeToDay, removeRecipeFromDay} = mealPlannerSlice.actions

// configure and create the redux store
const store = configureStore({
    reducer:{
        recipes: recipesSlice.reducer,
        favorites: favoritesSlice.reducer,
        mealPlanner: mealPlannerSlice.reducer
    }
});

export default store