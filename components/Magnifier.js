import React, { useState } from "react";
import style from './section.module.css';
import Head from "next/head";
import Img from "./Img";
import { getSrc } from "@/lib/imageHelper";

export default function Magnifier({ img, magImg, magWidth, magHeight, magStrength, noBorder }) {

    const width = (magWidth ?? 160);
    const height = (magHeight ?? 200);

    const [hover, setHover] = useState(false);
    const [pos, setPos] = useState({ x: -2 * width, y: -2 * height });
    const [relPos, setRelPos] = useState({ x: 0, y: 0 });
    
    const updatePos = (e) => {

        // set mouse position on page
        setPos({ x: e.clientX, y: e.clientY });

        // set mouse position in map, from 0-1
        const ePos = e.target.getBoundingClientRect();
        
        setRelPos({ x: (e.clientX - ePos.x) / ePos.width, y: (e.clientY - ePos.y) / ePos.height });
    }

    // add a bit of space on either side of the background position
    // so that the center of mag is exactly where the mouse is pointing
    const calcBackPos = (positionOnMap, mapDimension) => {
        return `calc(${100 * positionOnMap}% - ${(positionOnMap - 0.5) * mapDimension}px)`;
    }
    
    return (<>
        <Head>
            <link rel="preload" as="image" href={getSrc(magImg)} />
        </Head>
        <div 
            className={style.magnifier}
            style={{
                display: (hover ? 'block' : 'none'),
                width: width + 'px',
                height: height + 'px',
                backgroundColor: 'white',
                backgroundImage: `url(${getSrc(img)})`,
                backgroundImage: `url(${getSrc(magImg)})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: (1200 * (magStrength ?? 1)) + '%',
                backgroundPosition: calcBackPos(relPos.x, width) + ' ' + calcBackPos(relPos.y, height),
                left: pos.x - width/2,
                top: pos.y - height/2,
                pointerEvents: 'none',
                position: 'fixed',
                boxShadow: '4px 4px',
                zIndex: '20'
            }}
        >
        </div>
        <Img
            className="crisp"
            img={img} 
            onMouseEnter={() => setHover(true)} 
            onMouseLeave={() => setHover(false)}
            onMouseMove={updatePos}
            onWheel={updatePos}
            style={{
                cursor: 'none',
            }}
            noBorder={noBorder}
        />
    </>);
}