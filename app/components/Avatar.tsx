'use client';

import Image from "next/image"

interface AvatarProps{
  src: string | null | undefined;
};

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
    return ( 
        <Image
          className="bg-blue-900 rounded-full py-0"  
          height="30"
          width="30"
          alt="Avatar"
          src={src || "/images/Avatar.png"}
        />
     );
}
 
export default Avatar;