'use client'

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { SafeUser } from "../types";
import useFavorite from "../hooks/userFavorite";

interface HeartButtonProps{
    listingId: string;
    currentUser?: SafeUser | null
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId,
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
       listingId,
       currentUser
    });
    
    return ( 
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80
                transition
                cursor-pointer
            "
        >
            <AiOutlineHeart
                size={28}
                className="
                    fill-blue-800
                    absolute
                    -top-[2px]
                    -right-[1px]
                "
            />
            <AiFillHeart
                size={28}
                className={`
                absolute
                -top-[2px]
                -right-[1px]
                ${hasFavorited ? 'fill-blue-800' : 'fill-transparent'}
                `}
            />

        </div>
     );
}
 
export default HeartButton;