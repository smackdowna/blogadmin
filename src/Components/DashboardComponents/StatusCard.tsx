import { ReactNode } from "react";

type TStatusCardProps = {
    title:string;
    value:number;
    iconBgColor:string;
    icon:ReactNode;
}

const StatusCard:React.FC<TStatusCardProps> = ({title, value, icon, iconBgColor}) => {
    return ( 
        <div className="bg-white rounded-xl p-5 border border-neutral-30/40 flex items-center gap-5">
                <div className={`size-[70px] rounded-full flex items-center justify-center text-2xl bg-opacity-20 ${iconBgColor}`}>
                {icon}
                </div>

                <div>
                <h1 className='text-neutral-20 text-xl font-bold leading-[32px]'>{title}</h1>
                    <p className='text-neutral-25 text-base leading-5 mt-1'>
                        {value}
                    </p>
                </div>
        </div>
    );
};

export default StatusCard;