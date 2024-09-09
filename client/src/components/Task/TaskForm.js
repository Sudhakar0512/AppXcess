import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // await axios.post('http://localhost:5000/api/tasks', { title, description, priority, dueDate }, {
            await axios.post('https://app-x-cess.vercel.app/api/tasks', { title, description, priority, dueDate }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                <h1 className="text-3xl font-semibold text-blue-700 mb-6">Add New Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-semibold">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-semibold">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="priority" className="block text-gray-700 font-semibold">Priority</label>
                        <select
                            id="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dueDate" className="block text-gray-700 font-semibold">Due Date</label>
                        <input
                            type="date"
                            id="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-lg hover:bg-gradient-to-l transition duration-300"
                    >
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
