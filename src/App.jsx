import './App.css'
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import MealPlanner from './pages/MealPlanner';
import SavedRecipes from './pages/SavedRecipes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './Components/Navbar';

function App() {
  const [user, loading, error] = useAuthState(auth); // Check user authentication status

  console.log("Current User:", user);
  console.log("Loading:", loading);
  console.log("Error:", error);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-0 home-body">
      <Navbar/>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/recipe/:id" element={user ? <RecipeDetails /> : <Navigate to="/login" />} />
          <Route path="/meal-planner" element={user ? <MealPlanner /> : <Navigate to="/login" />} />
          <Route path="/saved-recipes" element={user ? <SavedRecipes /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
