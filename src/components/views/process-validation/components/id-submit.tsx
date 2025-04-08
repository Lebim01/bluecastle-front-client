import { Skeleton } from "@heroui/react";
import { RiUserSmileLine } from "react-icons/ri";
const Step2 = () => {
    return (
        <div className="flex flex-col gap-12 items-center">
            <span className="text-3xl text-center">Necesitamos validar tu identificación para poder continuar con el proceso.</span>
            <div className="flex flex-col gap-2">
                <span>Tienes que capturar la identificación de ambos lados, con una calidad clara y buena iluminación</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-4 border-green-500 rounded-lg p-4 flex flex-col gap-4">
                        <div className="flex gap-6 items-center">
                            <span className="text-9xl text-green-500"><RiUserSmileLine /></span>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="rounded-lg w-3/5"><div className="h-3 w-3/5 rounded-lg bg-green-500" /></Skeleton>
                                <Skeleton className="rounded-lg"><div className="h-3 w-[200px] rounded-lg bg-green-500" /></Skeleton>
                                <Skeleton className="rounded-lg"><div className="h-3 w-[200px] rounded-lg bg-green-500" /></Skeleton>
                            </div>
                        </div>
                        <span className="text-center text-md">PARTE FRONTAL DE LA IDENTIFICACIÓN</span>
                    </div>
                    <div className="border border-4 border-green-500 rounded-lg p-4 flex flex-col gap-4">
                        <div className="h-8 bg-green-500"></div>
                        <div className="flex flex-col gap-2 w-4/5 items-center w-full">
                            <Skeleton className="rounded-lg"><div className="h-3 w-[200px] rounded-lg bg-green-500" /></Skeleton>
                            <Skeleton className="rounded-lg"><div className="h-3 w-[200px] rounded-lg bg-green-500" /></Skeleton>
                            <Skeleton className="rounded-lg"><div className="h-3 w-[200px] rounded-lg bg-green-500" /></Skeleton>
                        </div>
                        <span className="text-center text-md mt-8">PARTE FRONTAL DE LA IDENTIFICACIÓN</span>
                    </div>
                </div>
                
            </div>
            <div className="flex gap-4 justify-center">
                    <button className="p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Continuar en el navegador
                        </div>
                    </button>
                    <button className="p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
                        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                            Continuar en mi teléfono
                        </div>
                    </button>
                </div>
        </div>
    )
}

export default Step2