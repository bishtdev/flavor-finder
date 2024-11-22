
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

// export const fetchSimilarRecipes = async (id) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/${id}/similar`, {
//         params: { apiKey: API_KEY, number: 5 }, // Limit to 5 similar recipes
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching similar recipes:', error);
//       return [];
//     }
//   };

// export const fetchSimilarRecipes = async (id) => {
//     try {
//       const response = await fetch(`${BASE_URL}/${id}/similar?apiKey=${API_KEY}&number=5`);
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching similar recipes:', error);
//       return [];
//     }
//   };