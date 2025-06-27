import React from "react";
import { getInitials } from "../utils/helper";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Navbar = ({ userInfo ,profile }) => {
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleClick = (e) => {
        e.preventDefault();
        navigate(profile);
    }

    const goToChat = () => {
        navigate("/Chat");
    }

    return (
        <nav className="fixed w-full h-16 flex items-center justify-between bg-[rgba(66,63,193,.9)] backdrop-blur-lg z-50">
            <div className="flex flex-row justify-center bona-nova-sc-bold items-center">
                <h1 className="text-[36px] text-white font-light p-10">Vector Jobs</h1>
            </div>

            <div className="flex items-center mr-8 gap-4">
                <div className="ChatButton flex justify-end">
                    <button onClick={goToChat}>
                        <svg stroke-linejoin="round" stroke-linecap="round" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" height="52" width="52" xmlns="http://www.w3.org/2000/svg" className="w-10 hover:scale-125 duration-200 hover:rgba(66,63,193,0.8)" fill="none">
                            <path fill="none" d="M0 0h24v24H0z" stroke="none"></path>
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                            <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
                        </svg>
                    </button>
                </div>

                {userInfo && (
                    <div className="flex items-center gap-3 p-2 sm:p-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-lg border-stone-800 rounded-full text-slate-900 bg-slate-100 font-medium" onClick={handleClick}>
                            {getInitials(userInfo.name)}
                        </div>
                        <div>
                            <p className="text-[16px] text-white font-bold">{userInfo.name}</p>
                            <button
                                className="text-sm text-white underline"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
