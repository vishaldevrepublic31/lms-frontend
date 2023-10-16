import React, { Dispatch, useState } from 'react'
import HomeLayout from '../../layout/HomeLayout'
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { changePassword } from '../../redux/slices/AuthSlice';
import { AnyAction } from '@reduxjs/toolkit';

interface IChangePassword {
    oldPassword: string
    newPassword: string
}
const ChangePassword: React.FC = () => {
    const dispatch: Dispatch<AnyAction> = useDispatch()
    const navigate: NavigateFunction = useNavigate()
    const [passwordData, setPasswordData] = useState<IChangePassword>({
        oldPassword: '',
        newPassword: '',
    });

    const handlePasswordInput = (e: any) => {
        const { name, value } = e.target
        console.log(name, value);

        setPasswordData({
            ...passwordData, [name]: value
        })
    }
    const handleChangePassword = async (e: any) => {
        e.preventDefault();
        const response: any = await dispatch(changePassword(passwordData))
        if (response?.payload?.success) {
            navigate("/user/profile");
            setPasswordData({
                oldPassword: '',
                newPassword: '',
            })
        } else {
            navigate('/changepassword')
            setPasswordData({
                oldPassword: '',
                newPassword: '',
            })
        }


    }

    return (
        <HomeLayout>
            <div className='flex overflow-x-auto items-center justify-center h-[90vh]'>
                <form noValidate onSubmit={handleChangePassword} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <h1 className="text-center text-2xl font-bold">Change password Page</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="oldpassword" className='font-semibold'>Old password</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="password"
                            id="oldpassword"
                            name="oldPassword"
                            value={passwordData.oldPassword}
                            onChange={handlePasswordInput}
                            placeholder="Enter your old password.."
                        />
                        <label htmlFor="newpassword" className='font-semibold'>New password</label>
                        <input
                            className="bg-transparent px-2 py-1 border"
                            type="password"
                            id="newpassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInput}
                            placeholder="Enter your new password.."
                        />
                    </div>
                    <button
                        type='submit'
                        className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                        Change Password
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default ChangePassword
