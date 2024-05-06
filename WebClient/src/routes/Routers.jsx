import Home from '../pages/Home'
import Service from '../pages/Service';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Doctor from '../pages/Doctors/Doctors';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import MyAccount from '../Dashboard/user-account/MyAccount';
import ProtectedRoute from './ProtectedRoute';

import { Routes, Route } from 'react-router-dom';
const Routers = () => {

    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/services' element={<Service />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Signup />} />
        <Route path='/doctors' element={<Doctor />} />
        <Route path='/doctors/:id' element={<DoctorDetails />} />
        <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><MyAccount /></ProtectedRoute>} />


    </Routes>

}
export default Routers;