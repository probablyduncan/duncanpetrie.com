import { Dept, UnderLonk, Paragraph, Title } from "@/components/TextStyles";
import Head from "next/head";

export default function FourOhFour() {

    return (<>
        <Head>
            <title>{`404? Uh oh. Somebody's lost.`}</title>
            <meta name="author" content="Duncan Petrie" />
            <meta name="description" content="How'd you end up here, huh?" />

            <link rel="icon" href="/favicon-32.png" sizes="32x32" />
            <link rel="icon" href="/favicon-128.png" sizes="128x128" />
            <link rel="icon" href="/favicon-180.png" sizes="180x180" />
            <link rel="icon" href="/favicon-192.png" sizes="192x192" />
            
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div style={{
            maxWidth: '90vw',
            margin: '120px 0 240px 0',
            textAlign: 'center',
        }}>
            <Dept color={'orange'}>⚠️ 404 ⚠️</Dept>
            <br />
            <Title>                
                Hey! Watch it!!
            </Title>
            <P>What&apos;s the big idea, fella?</P>
            <P>I&apos;m workin here!</P>
            <P>Get outta here! Go <H>back to the homepage</H>!</P>
            <BR />
            <P>What&apos;s so hard to understand?</P>
            <P><i>Four Oh Four!</i></P>
            <P><i>Page Not Found!</i></P>
            <P>Doesn&apos;t look like there&apos;s much here, huh, smarty-pants?</P>
            <P>Does this look like a place you want to be?</P>
            <P><H>Go home</H>!</P>
            <BR size={2} />
            <P>What are you still doing here?!</P>
            <P>Go on, <H>git</H>!</P>
            <P>Scram!</P>
            <P>Agitate the gravel!</P>
            <P>Blow this pop stand!</P>
            <P><H>Go home</H>!</P>
            <BR />
            <P>I <i>am</i> working on this, you know!</P>
            <P>Making pretty good progress, if I do say so myself.</P>
            <P>Writin&apos; code, by the boatload!</P>
            <P>It&apos;s a regular monkey-chain-typewriter situation over here!</P>
            <P>Check back in a little while.</P>
            <P>Maybe this page will be done soon.</P>
            <P>And in the meantime...</P>
            <P><H>Go home</H>!</P>
            <BR size={8} />
            <P>What?! You&apos;re still here?!</P>
            <P>This place is dangerous!</P>
            <P>There&apos;s workplace hazards left and right!</P>
            <P>Wrenches, forklifts, nails flying everywhere!</P>
            <P>Splinters waiting to be had!</P>
            <P>Osha violations up the wazoo!</P>
            <P>I&apos;m beggin you!</P>
            <P>Just click the <H>link</H>!</P>
            <P>Go <H>back</H>!</P>
            <P>Please!</P>
            <BR size={4} />
            <P>Hey, don&apos;t touch that!</P>
            <P>Yeah, you!</P>
            <P>Put that down!</P>
            <BR size={3} />
            <P>Ok, seriously. Joke time is over.</P>
            <P>I mean it.</P>
            <P>Notice the change in my voice?</P>
            <P>My measured tone?</P>
            <P>No more exclaimation marks here, buddy.</P>
            <P>You&apos;ve gone too far.</P>
            <BR size={12} />
            <P>There are consequences to these things, you know.</P>
            <P>Files to be made with your name on them.</P>
            <P>Lists to be updated.</P>
            <P>People to be notified.</P>
            <P>Probably, they&apos;re wearing sunglasses.</P>
            <BR />
            <P>You still have a chance.</P>
            <P>Just <H>go home</H>.</P>
            <BR size={2} />
        </div>
    </>);
}

function P({ children }) {
    return <Paragraph style={{textAlign: 'center', margin: '0'}}>{children}</Paragraph>
}

function BR({ size = 1 }) {
    return <><P>...</P><div style={{marginBottom: `${80 * size}px`}}></div></>
}

function H({ children }) {
    return <UnderLonk href={'/'}>
        {children}
    </UnderLonk>
}

function B({ children }) {
    return <UnderLonk action={() => history.back()}>
        {children}
    </UnderLonk>
}