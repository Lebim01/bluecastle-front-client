import { Card, Progress } from "@heroui/react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import Step1 from "./components/step-1"
import Step2 from "./components/id-submit"

const MainProcess = () => {
    const validation1 = () => {

        return false
    }
    return (
        <div className="flex flex-col items-center gap-4">
            <div className="flex justify-betwee items-center gap-4 p-4 bg-gray-400 ">
                <div className="flex gap-1 items-center">
                    <span><FaArrowLeft /></span>
                    <span>ATRÁS</span>
                </div>
                <Progress className="w-[300px]" color="secondary" aria-label="Loading..." size="md" value={60} />
                <div className="flex gap-1 items-center">
                    <span>SIGUIENTE</span>
                    <span><FaArrowRight /></span>
                </div>


            </div>
            <Card className="w-full p-8">
                {/* <Step1 /> */}
                <Step2 />
            </Card>
        </div>
    )
}

export default MainProcess