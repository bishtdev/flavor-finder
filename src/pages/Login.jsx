import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Modal from '../Components/Modal'; // Import the Modal component

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setShowModal(true); // Show modal after successful login
    } catch (error) {
      setError(error.message);
    }
  };

  const handleModalConfirm = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex justify-center items-center h-[80vh] login-page">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:max-w-md max-w-[22rem] card-body">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-3 rounded-md w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* Show modal after successful login */}
        {showModal && (
          <Modal
            title="Login Successful"
            message="You have successfully logged in."
            onConfirm={handleModalConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
