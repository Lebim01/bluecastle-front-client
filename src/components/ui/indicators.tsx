import { FC, JSX } from "react"

type Props = {
    children?: React.ReactNode
    icon: JSX.Element
    color: 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'brown' | 'orange'
    background: 'bg-red-200' | 'bg-green-200' | 'bg-blue-200' | 'bg-yellow-200' | 'bg-purple-200' | 'bg-brown-200' | 'bg-orange-200'
    title: string
    value: string | number

}

const Indicators: FC<Props> = ({ ...props }) => {
    return (
        <div className="border border-[1px] border-sold border-gray-500 p-4 rounded-md transition bg-primary duration-300 ease-in-out cursor-pointer hover:-translate-y-1 hover:scale-105 hover:shadow-md">
            <div className="flex gap-4 items-center ">
                <div className={`p-8 rounded-md ${props.background} text-${props.color}-500 text-3xl`}>{props.icon}</div>
                <div className="flex flex-col gap-2">
                    <span className="font-light text-md">{props.title}</span>
                    <span className="font-bold text-2xl">{props.value}</span>
                </div>
            </div>

        </div>
    )
}

export default Indicators