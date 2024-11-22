import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../Components/Modal'

const Signup = () => {
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)

    const navigate = useNavigate()

    const handleSignup = async (e) =>{
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setShowModal(true)
        } catch (error) {
            setError(error.message)
        }   
    }

    const handleModalConfirm = () =>{
        setShowModal(false)
        navigate('/')
    }

  return (
    <div className="flex justify-center items-center h-[80vh] signup-page">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full sm:max-w-md max-w-[22rem] card-body ">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 border border-gray-300 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Sign Up
        </button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Show modal after successful login */}
      {showModal && (
        <Modal 
          title='Signup Successful'
          message='You have Successfully Signed up'
          onConfirm={handleModalConfirm}
        />
      )}
    </div>
  </div>
  )
}

export default Signup