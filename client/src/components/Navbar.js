import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <nav className="bg-blue-600 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    {user ? (
                        <span className="text-white text-lg">
                            Hello, <span className="font-semibold">{user.username}!</span>
                        </span>
                    ) : (
                        <Link to="/" className="text-white text-2xl font-bold hover:text-gray-300 transition duration-300">Task Manager</Link>
                    )}
                </div>
                <div className="flex space-x-4">
                    {user ? (
                        <>
                            <Link to="/tasks" className="text-white hover:bg-white hover:text-blue-600 py-2 px-4 rounded transition duration-300">Tasks</Link>
                            <Link to="/tasks/new" className="text-white hover:bg-white hover:text-blue-600 py-2 px-4 rounded transition duration-300">Add Task</Link>
                            <button onClick={handleLogout} className="text-white bg-red-600 hover:bg-red-500 py-2 px-4 rounded transition duration-300">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-white hover:bg-white hover:text-blue-600 py-2 px-4 rounded transition duration-300">Login</Link>
                            <Link to="/register" className="text-white hover:bg-white hover:text-blue-600 py-2 px-4 rounded transition duration-300">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
