import React, { useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../redux/slices/AuthSlice';

const ResetPassword: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const { resetToken } = useParams()

    const handleForgotPassword = async (e: any) => {
        e.preventDefault();
        const data = {
            resetToken,
            password
        }
        const response = await dispatch(resetPassword(data))
        if (response?.payload?.success) {
            navigate("/user/profile");
            setPassword('')
        } else {
            navigate('/forgot-password')
            setPassword('')
        }


    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[90vh]'>
                <form noValidate onSubmit={handleForgotPassword} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Forgot password Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'>New password</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password...."
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

export default ResetPassword
