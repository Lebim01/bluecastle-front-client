import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const NationalId = () => {
    const router = useRouter()
    const params = useParams()
    const token_user = params?.token_user
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [counter, setCounter] = useState(5);
    const [hasCaptured, setHasCaptured] = useState(false);
    console.log(params)
    useEffect(() => {
        async function enableCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error('Error accessing the camera', err);
            }
        }

        enableCamera();
    }, []);

    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter(counter - 1), 1000);
            return () => clearTimeout(timer);
        } else if (!hasCaptured) {
            capturePhoto();
        }
    }, [counter]);


    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext("2d");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            canvas.toBlob(async (blob) => {
                if (blob) {
                    const formData = new FormData();
                    formData.append("file", blob, "photo.jpg");

                    await axios.post(
                        `${process.env.NEXT_PUBLIC_URL_API}/users/add-document/national_id`,
                        formData,
                        {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: `Bearer ${token_user}`,
                            },
                        }
                    );
                    setHasCaptured(true);
                }
            }, "image/jpeg");
        }
    };
    return (
        <div className="relative w-full h-screen">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
            />
            <div className="absolute z-[999] text-white font-bold flex flex-col items'center gap-4 justify-center top-[50%] text-center -rotate-90 w-full">
                <span>Tomaremos captura de la parte frontal</span>
                <span>Coloca la identificación en el recuadro</span>
                <div className="text-5xl mt-4">{counter > 0 && counter}</div>
            </div>

            <canvas ref={canvasRef} style={{ display: "none" }} />

            <div className="absolute inset-0 bg-white/40 pointer-events-none clip-overlay"></div>

            {/* Corner borders */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="relative w-72 h-3/5">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-sm" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-sm" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-sm" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-sm" />
                </div>
            </div>

        </div>

    )
}

export default NationalId