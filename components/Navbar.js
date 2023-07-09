import Lonk from './Lonk';
import style from './navbar.module.css';
import React, { useState, useEffect } from 'react';
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CinzelWrapper, GaramondWrapper, LatoWrapper } from './TextStyles';
import { colors, printColors } from '@/data/colors';

const logo = 'The Daily DunCAn';
const linkSpacer = '/';
const defaultLinks = [
    {text: 'photography', link: '/i/photography'},
    {text: 'writing', link: '/i/writing'},
    {text: 'short films', link: '/i/films'},
    // {text: 'websites of yore', link: '/a/sites'},
    {text: 'world', link: '/world'},
    {text: 'about', link: '/a/about'},
    {text: 'cv', link: '/resume.pdf'},
    {text: 'linkedin', link: 'https://www.linkedin.com/in/probablyduncan/'},
    {text: 'instagram', link: 'https://instagram.com/probablyduncan/'},
];

export function NewsNav( {homelink, links} ) {

    // refresh date
    const [date, setDate] = useState(null);
    useEffect(() => {
        var d = new Date();
        setDate(d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));

        printColors();
    }, []);

    const [emailHover, setEmailHover] = useState(false);

    links = links ?? defaultLinks;

    const logoBackgroundStyle = {
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent',
    }
    const logoColor = {
        background: `linear-gradient(130deg, ${colors.red} 0%, ${colors.yellow} 100%)`, ...logoBackgroundStyle
    }
    const logoColorReverse = {
        background: `linear-gradient(130deg, ${colors.yellow} 0%, ${colors.red} 100%)`, ...logoBackgroundStyle
    }
    const logoBlack = {
        background: `linear-gradient(120deg, ${colors.black} 0%, ${colors.black} 100%)`, ...logoBackgroundStyle
    }

    return (<>
        <header style={{
            position: 'fixed',
            top: '12px',
            right: '0',
            left: '0',
            textAlign: 'center',
            zIndex: '0',
            userSelect: 'none',
        }}>
            <CinzelWrapper>
                <motion.h1 
                    style={{fontSize: '52px'}}
                >
                    <Lonk href={"/"}>
                        <motion.span
                            whileHover={logoColor}
                            initial={logoColor} 
                            animate={{
                                ...logoBlack,
                                transition: {duration: 0.4, delay: 1}
                            }}
                        >&nbsp;{logo}&nbsp;</motion.span>
                    </Lonk>
                </motion.h1>
            </CinzelWrapper>
        </header>

        <nav className={style.navbar}>

            {/* either date or link back to home */}
            <GaramondWrapper className={style.links}>
                {homelink ? (
                    <Lonk className={style.sidelink} href={homelink ?? "/"}>back! to the front page</Lonk>
                ) : (
                    <span className={style.sidelink}>{date}</span>
                )}
            </GaramondWrapper>

            {/* list of links */}
            <LatoWrapper className={style.links}>
                {links.map((linkdata, i) => {
                    return (
                        <span key={`navlink-${linkdata.text}`}>
                            {i != 0 ? linkSpacer : ""}
                            <Navlink href={linkdata.link} text={linkdata.text} />
                        </span>
                    );
                })}
            </LatoWrapper>
            
            {/* email */}
            <GaramondWrapper className={style.links + " right"}>
                <RoughNotationGroup show={emailHover}>
                    <RoughNotation
                        type="highlight"
                        strokeWidth={1}
                        padding={10}
                        iterations={1}
                        animationDuration={200}
                        color={colors.highlight}
                    >
                        <a 
                            className={style.sidelink} 
                            href="mailto:duncanpetrie.com" target="_blank" 
                            rel="noopener noreferrer"
                            onMouseEnter={() => setEmailHover(true)}
                            onMouseLeave={() => setEmailHover(false)}
                        >
                            duncanpetrie1@gmail.com
                        </a>
                    </RoughNotation>
                </RoughNotationGroup>
            </GaramondWrapper>

        </nav>
    </>);
}

export function Navlink({text, href}) {

    const [hover, toggleHover] = useState(false);

    return (<RoughNotationGroup show={hover}>
        <RoughNotation
            type={"circle"}
            strokeWidth={2}
            padding={[4,8]}
            iterations={1}
            animationDuration={text.length * 30}
            color={colors.rellow}
        >
            <LatoWrapper>
                <h3 
                    className={style.link} 
                    onMouseEnter={() => toggleHover(true)} 
                    onMouseLeave={() => toggleHover(false)}
                >
                    <Lonk href={href}>
                        {text.toUpperCase()}
                    </Lonk>
                </h3>
            </LatoWrapper>
        </RoughNotation>
    </RoughNotationGroup>);
}

export function MobileTopNav({ }) {
    return <LatoWrapper div className={"opacityLink"} style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 24px'
    }}>
        <Link href='mailto:duncanpetrie1@gmail.com' style={{color: colors.surrogateGreen}}>EMAIL ME</Link>
        <Lonk href='https://instagram.com/probablyduncan' style={{color: colors.surrogateYellow}}>INSTAGRAM</Lonk>
    </LatoWrapper>;
}

export function MobileNav( props ) {
    
    const mobileNavMenu = () => {
        
    };

    return <LatoWrapper className={style.mobileNavContainer} div>
        <nav className={style.mobileNav}>
            <Menurl {...props} menuFunction={mobileNavMenu} spread />
        </nav>
    </LatoWrapper>;
}

export function SimpleNav( props ) {

    const {scrollY} = useScroll();
    const color = useTransform(
        scrollY,
        [350, 450],
        [colors.black, props.galleryColor ?? colors.cornflowerBlue]
    )

    const galleryName = props.galleryName === true || !props.galleryName ? 'GALLERY' : props.galleryName.toUpperCase();

    return <LatoWrapper div>
        <nav className={style.simpleNav}>
            <Menurl {...props} />
            {props.galleryAction && <motion.button style={{color}} whileHover={{rotate: 4}} whileTap={{rotate: 16}} onClick={props.galleryAction}>{galleryName}</motion.button>}
        </nav>
    </LatoWrapper>;
}

function Menurl({ pageName = "menu", menuName = "menu", color, menuFunction, menuLink, spread }) {

    const [hover, setHover] = useState(false);

    return (<div style={{
        display: 'flex',
        justifyContent: spread ? 'space-between' : 'flex-start',
    }}>
        <Link href={"/"} >DUNCANPETRIE.COM&nbsp;&nbsp;&nbsp;/</Link>
        {menuLink ? 
            <motion.span
                whileHover={{ x: spread ? -8 : 8 }} 
                whileTap={{x : spread ? -16 : 16 }}
                style={{color : color ?? colors.cornflowerBlue}} 
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
            >
                <Lonk href={menuLink}>
                    &nbsp;&nbsp;&nbsp;&nbsp;{hover ? menuName?.toUpperCase() : pageName?.toUpperCase()}
                </Lonk>
            </motion.span>
        :
            <motion.button  
                whileHover={{ x: spread ? -8 : 8 }} 
                whileTap={{x : spread ? -16 : 16 }}
                style={{color : color ?? colors.cornflowerBlue}} 
                onClick={menuFunction}
                onHoverStart={() => setHover(true)}
                onHoverEnd={() => setHover(false)}
            >
                &nbsp;&nbsp;&nbsp;&nbsp;{hover ? menuName?.toUpperCase() : pageName?.toUpperCase()}
            </motion.button>
        }
    </div>)
}