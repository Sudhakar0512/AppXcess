
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditTaskForm = ({ task, onSave, onCancel }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    const [dueDate, setDueDate] = useState(new Date(task.dueDate).toISOString().split('T')[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.patch(`http://localhost:5000/api/tasks/${task._id}`, {
            const res = await axios.patch(`https://app-x-cess.vercel.app/api/tasks/${task._id}`, {
                title,
                description,
                priority,
                dueDate
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            onSave(res.data);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Edit Task</h2>
            <div className="mb-4">
                <label className="block text-gray-700">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    rows="3"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Priority</label>
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Due Date</label>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Save
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
                    Cancel
                </button>
            </div>
        </form>
    );
};

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTask, setEditingTask] = useState(null);
    const [priorityFilter, setPriorityFilter] = useState('');
    const [dueDateFilter, setDueDateFilter] = useState('');

    const fetchTasks = async () => {
        try {
            // const res = await axios.get('http://localhost:5000/api/tasks', {
            const res = await axios.get('https://app-x-cess.vercel.app/api/tasks', {   
                params: {
                    priority: priorityFilter,
                    dueDate: dueDateFilter,
                },
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(res.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [priorityFilter, dueDateFilter]);

    const handleComplete = async (taskId, completed) => {
        try {
            // const res = await axios.patch(`http://localhost:5000/api/tasks/complete/${taskId}`, {}, {
            const res = await axios.patch(`https://app-x-cess.vercel.app/api/tasks/complete/${taskId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            console.log('Task updated:', res.data);

            setTasks(tasks.map(task =>
                task._id === taskId ? res.data : task
            ));
        } catch (err) {
            console.error('Error toggling task completion:', err);
        }
    };

    const handleDelete = async (taskId) => {
        try {
            // await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
            await axios.delete(`https://app-x-cess.vercel.app/api/tasks/${taskId}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (err) {
            console.error('Error deleting task:', err);
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task);
    };

    const handleSave = (updatedTask) => {
        setTasks(tasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
        ));
        setEditingTask(null);
    };

    const handleCancel = () => {
        setEditingTask(null);
    };

    return (
        <div className="p-10 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-500 min-h-screen">
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Task List</h1>
            <div className="mb-6 flex justify-center space-x-4">
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                >
                    <option value="">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <input
                    type="date"
                    value={dueDateFilter}
                    onChange={(e) => setDueDateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm"
                />
            </div>
            <div className="space-y-4">
                {editingTask ? (
                    <EditTaskForm
                        task={editingTask}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                ) : (
                    tasks.map((task) => (
                        <div
                        key={task._id}
                        className={`flex items-center justify-between p-6 bg-white rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-102 ${
                            task.completed ? 'bg-gray-100 line-through' : ''
                        }`}
                    >
                    

                    

                            <div className="flex-1">
                                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
                                <p className="text-gray-600">{task.description}</p>
                                <p className={`font-bold mt-2 ${
                                    task.priority === 'high' ? 'text-red-500' :
                                    task.priority === 'medium' ? 'text-yellow-500' :
                                    'text-green-500'
                                }`}>
                                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                                </p>
                                <p className="text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                            </div>
                            <div className="ml-4 flex items-center space-x-2">
                                <button
                                    onClick={() => handleComplete(task._id, task.completed)}
                                    className={`px-4 py-2 rounded ${
                                        task.completed ? 'bg-gray-500' : 'bg-green-500'
                                    } text-white hover:bg-green-600 transition-colors`}
                                >
                                    {task.completed ? 'Uncomplete' : 'Complete'}
                                </button>
                                <button
                                    onClick={() => handleEdit(task)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TaskList;
