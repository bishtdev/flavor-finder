const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const fetchRecipes = async (query) => {
    try {
        const response = await fetch(
            `${BASE_URL}/complexSearch?query=${query}&number=40&apiKey=${API_KEY}`
        );
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        return data.results; // returns an array of recipes
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};

export const fetchRecipeDetails = async (id) =>{
    try{
        const response = await fetch(`${BASE_URL}/${id}/information?apiKey=${API_KEY}`)
        if (!response.ok) throw new error('failed to fetch details')
        const data = await response.json()
        return data
        
    }catch(error){
        console.log(error);
        return null
        
    }
}