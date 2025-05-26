'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Logo = () => {
    const router = useRouter();

    return(
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="w-16 sm:w-20 md:w-16 lg:w-16 xl:w-16 cursor-pointer ml-5"
            height="100"
            width="100"
            src="/images/logo.png"
        />
    )
}
export default Logo;