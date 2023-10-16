import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import NotFound from './pages/NotFound'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CourseList from './pages/course/CourseList'
import Denied from './pages/Denied'
import CourseDescription from './pages/course/CourseDescription'
import RequireAuth from './components/auth/RequireAuth'
import CreateCourse from './pages/course/CreateCourse'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'
import React from "react"
import Checkout from './pages/payment/Checkout'
import CheckoutSuccess from './pages/payment/CheckoutSuccess'
import CheckoutFailure from './pages/payment/CheckoutFailure'
import Displaylectures from './pages/Dashboard/Displaylectures'
import Addlecture from './pages/Dashboard/Addlecture'
import AdminDashboard from './pages/Dashboard/AdminDashboard'
import ChangePassword from './pages/user/ChangePassword'
import ForgotPassword from './pages/user/ForgotPassword'
import ResetPassword from './pages/user/ResetPassword'
import Contact from './pages/Contact'
const App = () => {
  return (
    <div>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/courses' element={<CourseList />} />
        <Route path='/course/description' element={<CourseDescription />} />
        <Route path='/denied' element={<Denied />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password/:resetToken' element={<ResetPassword />} />


        <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
          <Route path='/course/create' element={<CreateCourse />} />
          <Route path='/course/addlecture' element={<Addlecture />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={['ADMIN', 'USER']} />}>
          <Route path='/user/profile' element={<Profile />} />
          <Route path='/user/editprofile' element={<EditProfile />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/checkout/success' element={<CheckoutSuccess />} />
          <Route path='/checkout/fail' element={<CheckoutFailure />} />
          <Route path='/course/displaylectures' element={<Displaylectures />} />
          <Route path='/changepassword' element={<ChangePassword />} />

        </Route>


        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

    </div>
  )
}

export default App
