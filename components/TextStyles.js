import { Lato, Merriweather, EB_Garamond, Cinzel_Decorative } from "@next/font/google";
import { useContext, useRef, useState } from "react";
import { RoughNotation } from "react-rough-notation";
import Lonk from "./Lonk";
import { animate, motion } from "framer-motion";
import { ViewportContext } from "@/pages/_app";
import { colors } from "@/data/colors";
import { sanitizeElementID } from "@/lib/wikihelper";

/**
 * font wrappers
 */
const merriweather = Merriweather({ subsets: ['latin'], variable: true, weight: '700' });
export function MerriweatherWrapper({ children, div, ...props }) {
    return <FontWrapper fontClass={merriweather.className} {...props} div={div}>{children}</FontWrapper>;
}
const garamond = EB_Garamond({subsets: ['latin'], display: 'swap', variable: true, weight: '500'});
export function GaramondWrapper({ children, div, ...props }) {
    return <FontWrapper fontClass={garamond.className} {...props} div={div}>{children}</FontWrapper>;
}
const lato = Lato({ subsets: ['latin'], display: 'swap', weight: '700', variable: true});
export function LatoWrapper({ children, div, ...props }) {
    return <FontWrapper fontClass={lato.className} {...props} div={div}>{children}</FontWrapper>;
}
const cinzel = Cinzel_Decorative({ subsets: ['latin'], display: 'swap', weight: '700' });
export function CinzelWrapper({ children, div, ...props }) {
    return <FontWrapper fontClass={cinzel.className} {...props} div={div}>{children}</FontWrapper>;
}

export function ComicSansWrapper({ children, div, ...props }) {
    return <>&nbsp;<span style={{fontFamily: '"Comic Sans MS", "Comic Sans", "Bradley Hand", "Apple Chancery", cursive', fontWeight: 'bold'}}>{children}</span>&nbsp;</>
}

export function FontWrapper({ children, div, className = '', fontClass = '', style }) {
    return div ? (<div className={fontClass + ' ' + className} style={style}>{children}</div>) : (<span className={fontClass + ' ' + className} style={style}>{children}</span>);
}

export function Title({ children, small, style, ...props }) {

    style = Object.assign({
        color: colors.black,
        fontSize: small ? '23px' : '36px',
        lineHeight: small ? '32px' : '40px',
        margin: small ? '0 0 5px 0' : '0 4px 35px'
    }, style);

    return (<h1 style={style} {...props}><MerriweatherWrapper>{children}</MerriweatherWrapper></h1>);
}

export function Subtitle({ children, small, style, ...props }) {

    style = Object.assign({
        color: colors.black,
        fontSize: small ? '20px' : '30px',
        lineHeight: small ? '37px' : '40px',
        margin: small ? '0 0 6px 0' : '0 4px 25px'
    }, style);

    return (<h1 style={style} {...props}><MerriweatherWrapper>{children}</MerriweatherWrapper></h1>);
}

export function Dept({ children, small, style, color, margin, ...props }) {

    style = Object.assign({
        color: color ?? colors.black,
        fontSize: small ? '13px' : '16px',
        margin: margin ?? (small ? '0' : '25px 4px 0')
    }, style);

    return (<h3 style={style} {...props} ><LatoWrapper>{children}</LatoWrapper></h3>);
}

export function Paragraph({ children, small, style, ...props }) {

    style = Object.assign({
        color: colors.slate,
        fontSize: small ? '16px' : '20px',
        lineHeight: small ? '29px' : '45px',
        textAlign: small ? 'justify' : 'left',
        margin: small ? '0 10px 15px 0' : '0 4px 25px',
        hyphens: small ? 'auto' : 'none',
        msHyphens: small ? 'auto' : 'none',
        WebkitHyphens: small ? 'auto' : 'none',
    }, style);

    return (<p style={style} {...props}><GaramondWrapper>{children}</GaramondWrapper></p>);
}

export function UnorderedList({ children, small, style, ...props }) {

    style = Object.assign({
        color: colors.slate,
        fontSize: small ? '16px' : '20px',
        lineHeight: small ? '30px' : '48px',
        textAlign: small ? 'justify' : 'left',
        margin: small ? '0 10px 15px 0' : '0 4px 25px',
        hyphens: small ? 'auto' : 'none',
        msHyphens: small ? 'auto' : 'none',
        WebkitHyphens: small ? 'auto' : 'none',
    }, style);

    return (<ul style={style} {...props}><GaramondWrapper>{children}</GaramondWrapper></ul>)
}

export function Caption({ children, small, style, textAlign, color, ...props }) {

    style = Object.assign({
        color: color ?? colors.caption,
        fontSize: '18px',
        lineHeight: '27px',
        textAlign: textAlign ?? 'right',
        margin: '12px 4px 0',
    }, style)

    return (<h4 style={style} {...props}><GaramondWrapper>{children}</GaramondWrapper></h4>);
}

// when hover stops, onHover(null) is called
export function UnderLonk({ href, action, noUnderline, color, thick, children, onHover, enter, leave, ...props }) {

    const [hover, setHover] = useState(false);

    const duration = (children?.length ?? 8) * 15;
    color = color ?? colors.cornflowerBlue;

    const hoverFunc = (e, on) => {
        setHover(on);
        if (onHover) onHover(on);

        if (on && enter) enter(e);
        else if (!on && leave) leave(e);
    }

    const style = Object.assign({
        color,
    }, props?.style ?? {});

    return (
        <UnderLine show={!noUnderline && hover} duration={duration} color={style.color} thickness={thick ? 2 : 1.5} >
            {action ? 
                <button onClick={() => setTimeout(action, props?.delay ?? 0)} {...props} style={style}
                    onMouseEnter={(e) => hoverFunc(e, true)} 
                    onMouseLeave={(e) => hoverFunc(e, false)}
                >
                    {children}
                </button>
            :
                <Lonk href={href} {...props} style={style} 
                    onMouseEnter={(e) => hoverFunc(e, true)} 
                    onMouseLeave={(e) => hoverFunc(e, false)}
                >
                    {children}
                </Lonk>
            }
        </UnderLine>
    );
}

export function UnderLine({ show, duration, color, children, thickness }) {

    return (
        <RoughNotation 
            show={show}
            padding={-1.5}
            strokeWidth={thickness ?? 1.5}
            color={color}
            iterations={1}
            animationDuration={duration ?? ((children?.length ?? 8) * 15)}
            multiline
        >
            {children}
        </RoughNotation>
    );
}

export function LightboxText({ color, children, noSelect }) {
    return (<h4 className={garamond.className} style={{
        color: color ?? colors.caption,
        fontSize: '18px',
        lineHeight: '27px',
        textAlign: 'right',
        margin: '12px 4px 0 4px',
        transition: 'none',
        userSelect: noSelect ? 'none' : 'auto'
    }}>{children}</h4>);
}

export function LightboxButton({ action, hoverColor, children }) {
    return (<motion.button 
        whileHover={{color: hoverColor ?? colors.black}} 
        initial={{color: colors.caption, userSelect: 'inherit'}} 
        onClick={action}
    >
        {children}                              
    </motion.button>);
}

export const Heading1 = ( props ) => (<Title className={'heading1'} alt={props.children} id={sanitizeElementID(props.children)} {...props} />);
export const Heading2 = ( props ) => (<><br /><Title className={'heading2'} alt={props.children} id={sanitizeElementID(props.children)} small style={{margin: '0 4px 25px'}} {...props} /></>);
export const Heading3 = ( props ) => (<Paragraph className={'heading3'} alt={props.children} id={sanitizeElementID(props.children)} style={{margin: `0 4px 15px`, fontWeight: 'bold'}} {...props} />);
export const LinkHeading1 = ( props ) => (<Title className={'heading1'} alt={props.children} ><LinkHeadingTemplate {...props} /></Title>);
export const LinkHeading2 = ( props ) => (<><br /><Title className={'heading2'} alt={props.children} small style={{margin: '0 4px 25px'}}><LinkHeadingTemplate {...props} /></Title></>);
export const LinkHeading3 = ( props ) => (<Paragraph className={'heading3'} alt={props.children} style={{margin: `0 4px 15px`}}><LinkHeadingTemplate {...props} /></Paragraph>);

export function LinkHeadingTemplate ({ children, go = true, pageOnly, hSize }) {

    const {mobile} = useContext(ViewportContext);

    // ensure only text is put into the id
    const proccessChildren = (c) => {
        if (!c) return 'uh oh'
        if (typeof c == typeof '') return(c);
        else {
            if (c.length > 0) return c.map(c => proccessChildren(c.props?.children)).join('');
            else return proccessChildren(c.props?.children);
        }
    }

    const id = pageOnly ? '' : `${proccessChildren(children).toLowerCase().replaceAll(' ', '-')}`;
    const copiedRef = useRef();
    const top = 35; // heading scrollto padding

    const copyLink = () => {

        // set link to be current url minus any other selector plus this heading's selector
        const link = window.location.href.split('#')[0] + '#' + id;

        // copy link to clipboard
        navigator.clipboard.writeText(id ? link : link.replace('#', ''));
        
        // scroll to heading
        if (go) window.location.href = link;
        
        // animate 'link copied' text
        animate(copiedRef.current, {x: 0, opacity: 0.3 });
        setTimeout(() => {
            animate(copiedRef.current, {x: -20, opacity: 0});
        }, 800);

    }

    return (
        <motion.strong whileHover="hover" id={id} style={{
            paddingTop: `${top}px`, marginTop: `-${top}px`, whiteSpace: 'nowrap', lineHeight: '0',
            display: !mobile ? 'inline-block' : 'inline', width: !mobile ? 'calc(100% + 80px)' : 'auto', // maybe necessary for longer titles?
        }}>
            {children}
            {!mobile && <>
                <motion.span aria-hidden="true" style={{display: "inline-block", opacity: 0, x: -6, color: colors.grey}} variants={{hover: {x: 0, opacity: 1}}}>
                    &nbsp;&nbsp;
                    <motion.button style={{margin: '-5px', padding: '5px', color: 'inherit'}} whileHover={{color: colors.black }} onClick={copyLink} title="Copy Link">
                        #
                    </motion.button>
                    &nbsp;&nbsp;
                </motion.span>
                <motion.span aria-hidden="true" ref={copiedRef} style={{display: 'inline-block', opacity: 0, x: -20, userSelect: 'none', pointerEvents: 'none'}}>
                    link copied
                </motion.span>
            </>}
        </motion.strong>
    );
}