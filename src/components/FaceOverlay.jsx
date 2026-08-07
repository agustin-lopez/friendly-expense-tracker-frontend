import { useState, useEffect } from "react";
import YellowBall from "../assets/yellow_ball-x32.png";

const FACES = [":)",  "XD", ":D",  " B)", ":P", ":O", ";)", ":v", ":>"];
const INTERVAL_MS = 4000;

export default function FaceOverlay() {
    const [faceIndex, setFaceIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setFaceIndex((prev) => (prev + 1) % FACES.length);
        }, INTERVAL_MS);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <div className="bg-white rounded-full flex items-center justify-center p-1.5">
                <div className="w-30 h-30 yellow-face border-6 border-black rounded-full flex items-center justify-center">
                    <span className="text-5xl font-bold text-black select-none font-[DotGothic16] relative -top-1">
                        {FACES[faceIndex]}
                    </span>
                </div>
            </div>
{/*            <span className="text-5xl text-gray-900 font-bold text-black select-none font-[DotGothic16] relative -top-1 z-30">
                {FACES[faceIndex]}
            </span>
            <img src={YellowBall} className="yellow-ball w-35 h-35 absolute"/>*/}
        </div>
    );
}