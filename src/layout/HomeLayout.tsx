import React, { ReactNode } from 'react';
import { FiMenu } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';

const HomeLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector<any>((state) => state?.auth?.isLoggedIn);

    const role = useSelector<any>((state) => state?.auth?.role);

    function changeWidth() {
        const drawerSide: any = document.getElementsByClassName('drawer-side');
        drawerSide[0].style.width = 'auto';
    }
    function hideDrawer() {
        const element: any = document.getElementsByClassName('drawer-toggle');
        element[0].checked = false;
    }
    async function handleLogout(e: { preventDefault: () => void; }) {
        e.preventDefault();

        const res = await dispatch(logout());
        if (res?.payload?.success)
            navigate("/");
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" type="checkbox" id="my-drawer" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="cursor-pointer relative">
                        <FiMenu
                            onClick={changeWidth}
                            size={'32px'}
                            className="font-bold text-white m-4"
                        />
                    </label>
                </div>
                <div className="drawer-side w-0">
                    <label htmlFor="my-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-48 h-[100%] sm:w-80 bg-base-200 text-base-content relative">
                        <li className="w-fit absolute right-2 z-50">
                            <button onClick={hideDrawer}>
                                <AiFillCloseCircle size={24} />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <>
                            {isLoggedIn && role === 'ADMIN' && (
                                <li>
                                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )}
                        </>
                        <>
                            {isLoggedIn && role === 'ADMIN' && (
                                <li>
                                    <Link to="/course/create">Create new course</Link>
                                </li>
                            )}
                        </>

                        <li>
                            <Link to="/courses">All courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/about">About Us</Link>
                        </li>

                        <> {!isLoggedIn && (
                            <span className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <li>
                                        <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>

                                            <Link to="/login">Login</Link>
                                        </button>
                                    </li>
                                    <li>
                                        <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                            <Link to="/signup">Signup</Link>
                                        </button>
                                    </li>
                                </div>
                            </span>
                        )}
                        </>
                        <> {isLoggedIn && (
                            <span className="absolute bottom-4 w-[90%]">
                                <div className="w-full flex items-center justify-center gap-2">
                                    <li>
                                        <button className='btn-primary px-4 py-1 font-semibold rounded-md w-full'>
                                            <Link to="/user/profile">Profile</Link>
                                        </button>
                                    </li>
                                    <li>
                                        <button className='btn-secondary px-4 py-1 font-semibold rounded-md w-full'>
                                            <Link to='/' onClick={handleLogout}>Logout</Link>
                                        </button>
                                    </li>
                                </div>
                            </span>
                        )}
                        </>
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
};

export default HomeLayout;
