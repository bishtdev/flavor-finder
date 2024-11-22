import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import Modal from '../Components/Modal';
import logo from '../assets/app-logo.jpg'

const Navbar = () => {
  const [user] = useAuthState(auth); // Get current user
  const [menuOpen, setMenuOpen] = useState(false); // Track user dropdown visibility
  const [navOpen, setNavOpen] = useState(false); // Track mobile nav visibility
  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // alert('Logout successful');
      setShowModal(true)
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleModalConfirm = () =>{
    setShowModal(false)
  }

  return (
   <div>
     <nav className="text-white font-bold p-4 absolute w-full z-50">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-xl ">FLAVOR <span className='text-yellow-500 font-extrabold'>FINDER</span></h1> */}
        <img src={logo} alt="" className='w-14 rounded-full' />

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setNavOpen((prev) => !prev)}
          className="lg:hidden block focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={navOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>

        {/* Links for Larger Screens */}
        <div className="hidden lg:flex gap-5">
          <a href="/" className="hover:underline">Home</a>
          <a href="/meal-planner" className="hover:underline">Meal Planner</a>
          <a href="/saved-recipes" className="hover:underline">Saved Recipes</a>
        </div>

        {user && (
          <div className="relative hidden lg:block">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="flex items-center space-x-2 bg-slate-700 px-4 py-2 rounded hover:bg-slate-600"
            >
              <span>{user.email}</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <button
                  onClick={handleLogout}
                  className="block rounded-md w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="lg:hidden mt-4">
          <a href="/" className="block py-2 hover:underline">Home</a>
          <a href="/meal-planner" className="block py-2 hover:underline">Meal Planner</a>
          <a href="/saved-recipes" className="block py-2 hover:underline">Saved Recipes</a>
          {user && (
            <div className="mt-2">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 bg-white rounded-md hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
    <div>
       {/* Show modal after successful login */}
       {showModal && (
          <Modal
            title="Logout Successful"
            message="You have successfully logged out."
            onConfirm={handleModalConfirm}
          />
        )}
    </div>
   </div>
   
  );
};

export default Navbar;
