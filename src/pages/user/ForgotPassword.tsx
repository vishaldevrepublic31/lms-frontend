import React, { useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../redux/slices/AuthSlice';

const ForgotPassword: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [email, setEmail] = useState('');


    const handleForgotPassword = async (e: any) => {
        e.preventDefault();
        const response = await dispatch(forgotPassword({ email }))
        if (response?.payload?.success) {
            navigate("/user/profile");
            setEmail('')
        } else {
            navigate('/forgot-password')
            setEmail('')
        }


    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[90vh]'>
                <form noValidate onSubmit={handleForgotPassword} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Forgot password Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address...."
                        />

                    </div>
                    <button
                        type='submit'
                        className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Forgot Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ForgotPassword
