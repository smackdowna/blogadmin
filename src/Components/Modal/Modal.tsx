import { Dispatch, ReactNode, SetStateAction } from "react";

export type ModalProps = {
    children: ReactNode;
    openModal: boolean;
    setOpenModal: Dispatch<SetStateAction<boolean>>
    classNames?: string;
}

const Modal : React.FC<ModalProps> = ({children,openModal, setOpenModal, classNames}) => {
    return (
        <div className="mx-auto w-fit">
            <div onClick={() => setOpenModal(false)} className={`fixed z-[100] w-screen ${openModal ? 'visible opacity-100' : 'invisible opacity-0'} inset-0 grid place-items-center bg-primary-10/50 duration-100 dark:bg-transparent`}>

                <div onClick={(e_) => e_.stopPropagation()} className={`absolute overflow-y-auto rounded-lg bg-white drop-shadow-2xl dark:bg-gray-800 dark:text-white ${openModal ? 'opacity-1 duration-300' : 'scale-110 opacity-0 duration-150'} ${classNames}`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;