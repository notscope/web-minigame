import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const getCurrentTime = () => {
    const now = new Date();
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    };
    return now.toLocaleString(undefined, options);
};

const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const Clock = () => {
    const [dateTime, setDateTime] = useState(getCurrentTime());
    const [timezone] = useState(getTimezone());

    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(getCurrentTime());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <>
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <div className="mx-auto bg-white rounded-lg shadow-lg">
                    <div className='header bg-gray-200 p-4'>
                        <Link to="/" className="text-blue-500 hover:underline">
                            <FontAwesomeIcon icon={faArrowLeft} /> Back to Home
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-3xl font-bold mb-4 text-gray-800">Current Date & Time</h1>
                        <p className="text-xl text-gray-700 mb-2">{dateTime}</p>
                        <p className="text-lg text-gray-500">Timezone: {timezone}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default Clock;