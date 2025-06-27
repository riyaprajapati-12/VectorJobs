import React, { useState, useRef, useEffect } from 'react';
import Btn from './Btn';
import Freelancer from './Freelancer';
import BG from "../assets/BG.png";
import ClientReg from './ClientReg';
import ProfileFreelancer from '../tmp/ProfileFreelancer';
import ProfileClient from '../tmp/ProfileClient';


export default function LandingPage() {
    const [activeComponent, setActiveComponent] = useState(null);
    const formRef = useRef(null);
    const form2Ref = useRef(null);
    const pageRef = useRef(null);

    // Function to handle clicks outside of forms
    function handleClickOutside(e) {
        if (formRef.current && !formRef.current.contains(e.target) &&
            form2Ref.current && !form2Ref.current.contains(e.target)) {
            setActiveComponent(null);
        }
    }

    const [jobs, setJobs] = useState([]);

    

    useEffect(() => {
        // Adding event listener to handle clicks outside
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Cleanup: remove event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    function slide() {
        setActiveComponent('client');
    }

    function slide2() {
        setActiveComponent('freelancer');
    }

    return (
        <>
            <div id="page" className={`absolute flex flex-row justify-center items-center w-full h-screen ${activeComponent ? 'blur' : ''}`}>
                <div className="w-full h-screen relative" style={{
                    backgroundImage: `url(${BG})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                </div>
                <div className="relative m-auto flex flex-col items-center justify-center w-full h-screen bg-white">
                    <div className="flex flex-col items-center justify-center gap-y-10">
                        <div className='flex flex-col items-center justify-center max-w-[600px] gap-y-10 text-center'>
                            <p className='text-gray-600 font-serif text-lg text-pretty'>
                                Start reaching out to a wide network of qualified professionals and streamline your hiring process today.
                            </p>
                            <Btn text="Hire a Freelancer" func={slide} />
                        </div>
                        <div className="flex items-center w-full my-4 h-full">
                            <div className="border-t border-gray-300 flex-grow"></div>
                            <span className="mx-4 text-gray-500 font-semibold">or</span>
                            <div className="border-t border-gray-300 flex-grow"></div>
                        </div>
                        <div className='flex flex-col items-center justify-center max-w-[600px] gap-y-10 text-center'>
                            <p className='text-gray-600 font-serif text-lg'>
                                Take control of your freelance career and discover new projects that inspire you.
                            </p>
                            <Btn text="Find a Job" func={slide2} />
                        </div>
                    </div>
                </div>
            </div>
            <div ref={formRef} id="form" className={`${activeComponent === 'client' ? 'slide-right' : 'hidden'}`}>
                {activeComponent === 'client' && <ClientReg />}
                {/* {activeComponent === 'client' && <ProfileClient />} */}
            </div>
            <div ref={form2Ref} id="Form2" className={`${activeComponent === 'freelancer' ? 'slide-left' : 'hidden'}`}>
                {activeComponent === 'freelancer' && <Freelancer fet/>}
                {/* {activeComponent === 'freelancer' && <ProfileFreelancer fet/>} */}
            </div>
            
        </>
    );
}
