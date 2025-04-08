import { useEffect, useRef } from "react";

const NationalId = () => {
    const videoRef = useRef(null);
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
            </div>

            <div className="absolute inset-0 bg-white/40 pointer-events-none clip-overlay"></div>

            {/* Corner borders */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <div className="relative w-72 h-3/5">
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-white rounded-sm" />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-white rounded-sm" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-white rounded-sm" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-white rounded-sm" />

                </div>
            </div>

        </div>

    )
}

export default NationalId