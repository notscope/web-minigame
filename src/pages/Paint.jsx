import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEyeDropper, faTrash } from '@fortawesome/free-solid-svg-icons';


const Paint = () => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(4);

    const startDrawing = (e) => {
        setDrawing(true);
        draw(e);
    };

    const endDrawing = () => {
        setDrawing(false);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
    };

    const draw = (e) => {
        if (!drawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.nativeEvent.clientX - rect.left;
        const y = e.nativeEvent.clientY - rect.top;

        ctx.lineWidth = brushSize;
        ctx.lineCap = "round";
        ctx.strokeStyle = color;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

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
                    <div className="main bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl justify-center">
                        <h1 className="text-2xl font-bold mb-4 text-center">Paint</h1>
                        <div className="flex gap-4 mb-4 justify-center">
                            <div className="relative inline-block w-10 h-10">
                                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-10 h-10 p-0 border rounded"></input>
                                <FontAwesomeIcon icon={faEyeDropper} className="absolute top-3 right-3 text-white pointer-events-none" />
                            </div>
                            <button className="bg-red-500 w-10 h-10 p-0 border rounded" onClick={() => setColor("#FF0000")} />
                            <button className="bg-yellow-400 w-10 h-10 p-0 border rounded" onClick={() => setColor("#fcc800")} />
                            <button className="bg-green-500 w-10 h-10 p-0 border rounded" onClick={() => setColor("#00c951")} />
                            <button className="bg-blue-500 w-10 h-10 p-0 border rounded" onClick={() => setColor("#0000FF")} />

                            <input
                                type="range"
                                min="1"
                                max="20"
                                value={brushSize}
                                onChange={(e) => setBrushSize(e.target.value)}
                                className="w-32"
                            />
                            <button
                                onClick={clearCanvas}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            >
                                <FontAwesomeIcon icon={faTrash} />  Clear
                            </button>
                        </div>
                        <canvas
                            ref={canvasRef}
                            width={600}
                            height={400}
                            className="border bg-white rounded shadow"
                            onMouseDown={startDrawing}
                            onMouseUp={endDrawing}
                            onMouseOut={endDrawing}
                            onMouseMove={draw}
                        />
                        <div className="mt-2 text-gray-500">Brush size: {brushSize}</div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
};

export default Paint;