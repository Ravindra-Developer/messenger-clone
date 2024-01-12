'use client'
import { IconType } from "react-icons";
interface AuthSocialButtonsProps {
    icon: IconType,
    onClick: () => void
}

export const AuthSocialButtons: React.FC<AuthSocialButtonsProps> = ({ icon:Icon, onClick }) => {
    return (
        <button type="button" onClick={onClick} className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow ring-1 ring-inset ring-gray-300 hover:bggray-50 focus:outline-offset-0">
            <Icon />
        </button>
    )
}
