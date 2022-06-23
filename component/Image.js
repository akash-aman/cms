import React from 'react'
import Image from 'next/image';
const NextImage = ({ src, alt, width, height, layout }) => {

    return (
        <>

            <Image src={src} width="100%" height="100%" layout={layout || "responsive"} priority />

        </>
    )
}

export default NextImage;
