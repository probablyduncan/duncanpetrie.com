import Layout from '@/components/Layout';
import Section, {FeatureSection, FooterSection, MagnifierSection, SlideshowSection, MobileHero} from '@/components/Section';
import Story from '@/components/Story';
import { ViewportContext } from '@/components/Viewport';
import { useContext } from 'react';
import { MobileTopNav } from '@/components/Navbar';
import { imgData } from '@/data/images';

export default function FrontPage( props ) {

  const {mobile} = useContext(ViewportContext);

  return ( 
    <Layout pageName="home" menuLink="/i/all" newsNav>{!mobile ? <>
      <SlideshowSection 
        images={[
          imgData.jubilee, 
          imgData.pampas, 
          imgData.surrogate, 
          imgData.mawes
        ]}
        storyLeft={{
          dept: "ON YEARNING",
          color: "#74aec5",
          title: "Lingermyth",
          text: [
            "Gradually, we grew out of our past, explained away halos and beasts and cities of clouds. History, after all, is written by those that live in the present.",
            "But it’s still there, that old world. Beneath our own, like a first coat of paint, glinting through chips and scratches."
          ],
          link: "gallery",
          route: "/a/myth"
        }}
        storyRight={{
          dept: "PROFILE",
          color: "#faa659",
          title: "Hello! I'm Duncan Petrie",
          text: [
            "I'm a photographer, writer, and full stack web developer based in London.",
            "In 2019, I needed an online portfolio. I took one look at the price of a website builder and decided to make my own from scratch.",
            "Three years and four redesigns later, I’m proud of this messy work-in-progress."
          ],
          link: "about/cv",
          route: "/a/about"
        }}
      />
      <Section type="three">
        <Story 
          img={imgData.cover_wiki}
          dept="FOR REEL"
          color="#72b2a8"
          title="The Triumph of the Commons"
          text={[
            "24 Dutch children in a phone booth? It’s more common than you think.",
            "The full breadth of humanity, every hope and every sorrow, every song and every sigh, is on Wikimedia Commons, an open file repository maintained by Wikipedia. In Spring of 2021 I created this film, for free, using 144 of those files."
          ]}
          link="youtube"
          route="https://youtu.be/JRXZAaDxGCQ"
        />
        <Story 
          img={imgData.cover_fluffy}
          dept="THE CUTTING EDGE"
          color="#49617b"
          title={["Cloud Discovered, Fluffiest", "in World"]}
          text={["You heard that right. I’ve done it. I’ve found a fluffy cloud.", "“But Duncan,” people tell me, “there are fluffy clouds in the sky all of the time!” They clearly haven’t seen this fluffy cloud."]}
          link="read"
          route="/a/cloud"
        />
        <Story 
          img={imgData.pizzagif}
          dept="THE CUTTING BOARD"
          title="Man Makes Pizza, Fast"
          text="This short timelapse film, produced in spring of 2020, was created from almost 2,500 individual photographs over the course of several days. It is best watched with sound on."
          link="watch"
          route="/a/pizza"
        />
      </Section>
      <MagnifierSection img={imgData.bigmap} magImg={imgData.bigmapnames} 
        magStory={{
          dept: "mind map",
          title: "Charting the Wilds",
          text: [
            "I've had maps on my walls since before I can remember: world maps, maps of places I've been, maps of places I want to go. They're like windows, windows you don't need curtains for.",
            "I've spent more of my life than I care to admit looking at maps. There's always something new to see, and even familiar names feel like discoveries.",
            "So, it was only natural I create my own."
          ],
          //link: "Explore",
          //route: "/world"
        }} 
        sideStory={{
          img: imgData.daybreak4,
          dept: "dept. of blurry pictures",
          title: "Crystalizing the Vastness",
          text: [
            "For years I struggled to photograph water; my photos were much too busy, seeing everything while capturing nothing.",
            "Now, I distill the water into its simplest form, making abstract what is too big to capture conventionally."
          ],
          link: "Gallery",
          route: "/a/blurry"
        }}
      />
      <Section type="four">
          <Story
            color="#fe809d"
            dept="trolley folley"
            title="I Mourn the Forlorn Carts"
            link="gallery"
            route="/a/cart"
          />
          <Story
            color="#ceb654"
            dept="color code"
            title="Synesthesia Alive!"
            link="play"
            route="/a/synesthesia"
          />
          <Story
            color="#d96f17"
            dept="heartland"
            title="New Beauty, Old Wisconsin"
            link="gallery"
            route="/a/heartland"
          />
          <Story
            color="#6f7bb8"
            dept="high fashion"
            title="Birds Have Hats, Now"
            link="showtime"
            route="/g/birdhat"
          />
      </Section>
      <FeatureSection 
        story={{
          dept: "on yearning",
            title: "From The Edge of Impassable Vastness",
            text: [
              "The wide blue sea spread before me, a quilt of the patterns of the wind. I was suddenly struck by profound desire. A desire for what, I was not sure.",
              "I was on the edge of the world, and I wanted to see beyond. It was a sort of nostalgia, but not for any real past. A nostalgia for the future, maybe, the future that can no longer be.",
              "I wrote my undergraduate dissertation about this feeling. If you're interested in the theories behind my photographic practice, check it out."
            ],
            link: "Read",
            route: "/a/yearn"
        }}
        img={imgData.diss}
      />
      <FooterSection />
    </> : <>
        <MobileTopNav />
        <MobileHero img={imgData.surrogate} />
        <Story
          img={imgData.aboutprints}
          dept='profiles'
          title='Who am I?'
          text={[
            "I'm a photographer, writer, and web developer from Milwaukee, based in London.",
            "I graduated from Falmouth University in 2022, and since then I’ve been working as a full stack web developer."
          ]}
          link="ABOUT/CV"
          route="/a/about"
          background="#FFEEEE"
        />
        <Story
          img={imgData.jubilee}
          color='#ff9200'
          dept='on yearning'
          title='Lingermyth'
          text={[
            "Gradually, we grew out of our past, explained away halos and beasts and cities of clouds.",
            "But it’s still there, that old world, glinting through chips and scratches."
          ]}
          link="gallery"
          route="/a/myth"
        />
        <Story
          img={imgData.bigmap}
          dept='mind map'
          title='Charting the Wilds'
          route="/world"
          background="#FAFAFF"
          annotateMap
        />
        <Story
          img={imgData.cover_wiki}
          dept='for reel'
          title='A Triumph of the Commons'
          text={[
            "24 Dutch children in a phone booth? It’s more common than you think.",
            "The full breadth of humanity, every hope and every sorrow, every song and every sigh, is on Wikimedia Commons, an open file repository maintained by Wikipedia. In Spring of 2021 I created this film, for free, using 144 of those files."
          ]}
          link="youtube"
          route="https://youtu.be/JRXZAaDxGCQ"
        />
        <Story 
          img={imgData.diss}
          dept='on yearning'
          title='From The Edge of Impassable Vastness'
          text={[
            "I wrote my undergraduate dissertation about, basically, the nostalgic feeling I get when I watch the sun go down.","If you're interested in the theories behind my photographic practice, check it out."
          ]}
          link='read'
          route='/a/yearn'
        />
    </>}</Layout>
  )
}