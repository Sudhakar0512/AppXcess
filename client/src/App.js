// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Auth/Login';
// import Register from './components/Auth/Register';
// import TaskList from './components/Task/TaskList';
// import TaskForm from './components/Task/TaskForm';
// import Navbar from './components/Navbar';
// import { AuthProvider, useAuth } from './context/AuthContext';

// const AppRoutes = () => {
//     const { user } = useAuth();

//     return (
//         <Router>
//             <Navbar />
//             <Routes>
//                 <Route path="/" element={user ? <TaskList /> : <Register />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Register />} />
//                 {user && (
//                     <>
//                         <Route path="/tasks" element={<TaskList />} />
//                         <Route path="/tasks/new" element={<TaskForm />} />
//                     </>
//                 )}
//             </Routes>
//         </Router>
//     );
// };

// const App = () => (
//     <AuthProvider>
//         <AppRoutes />
//     </AuthProvider>
// );

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TaskList from './components/Task/TaskList';
import TaskForm from './components/Task/TaskForm';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';

const PrivateRoute = ({ element }) => {
    const { user } = useAuth();
    return user ? element : <Navigate to="/login" />;
};

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={user ? <TaskList /> : <Navigate to="/register" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<PrivateRoute element={<TaskList />} />} />
                <Route path="/tasks/new" element={<PrivateRoute element={<TaskForm />} />} />
            </Routes>
        </Router>
    );
};

const App = () => (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
);

export default App;
