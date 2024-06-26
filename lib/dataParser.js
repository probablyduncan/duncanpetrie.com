import fs from 'fs';
import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import matter from 'gray-matter';

const articleDir = path.join(process.cwd(), 'data', 'articles');

// returns article id, frontmatter, and jsx
export async function getArticle(a) {
    const fullPath = path.join(articleDir, `${a}.mdx`);
    const contents = fs.readFileSync(fullPath, 'utf8');

    const { code, frontmatter } = await bundleMDX({
        source: contents,
        globals: {'ArticleImage': 'ArticleImage', 'LightboxLink': 'LightboxLink'}
    });
    
    return { a, frontmatter, code };

}

// returns paths for all articles
export async function getArticleIDs() {
    const filenames = fs.readdirSync(articleDir);
    return filenames.map((fileName) => {
        return {
            params: { 
                a: fileName.replace(/\.mdx$/, '')
            }
        };
    });
}

// returns frontmatter for all articles
export async function getArticleData() {
    const filenames = fs.readdirSync(articleDir);
    const data = filenames.map((fileName) => {
        const fileContents = fs.readFileSync(path.join(articleDir, fileName), 'utf8');
        const matterResult = matter(fileContents);

        const id = fileName.replace(/\.mdx$/,'');
        return {
            id,
            ...matterResult.data,
        };
    });

    return data;
}

const worldDir = path.join(process.cwd(), 'data', 'world');

// get single world card data
export async function getWorldCard(w) {
    const contents = fs.readFileSync(path.join(worldDir, `${w}.mdx`), 'utf8');
    const { code, frontmatter } = await bundleMDX({
        source: contents,
        globals: {'Img': 'Img', 'ComicSans': 'ComicSans'}
    });

    return { w, frontmatter, code };
}

export async function getWorldCardIDs() {
    const filenames = fs.readdirSync(worldDir);
    return filenames.map((fileName) => {
        return {
            params: { 
                w: fileName.replace(/\.mdx$/, '')
            }
        };
    });
}

// array of data of all cards in params
export async function getWorldCards(w) {

    let data = [];

    for(let i = 0; i < w.length; i++) {
        const contents = fs.readFileSync(path.join(worldDir, `${w[i]}.mdx`), 'utf8');
        const { code, frontmatter } = await bundleMDX({
            source: contents,
        });

        data.push({ w: w[i], code, frontmatter});
    };

    return data;
}

export async function getWorldCardData() {
    const filenames = fs.readdirSync(worldDir);
    const data = filenames.map((fileName) => {
        const fileContents = fs.readFileSync(path.join(worldDir, fileName), 'utf8');
        const matterResult = matter(fileContents);

        const id = fileName.replace(/\.mdx$/,'');
        return {
            id,
            ...matterResult.data,
        };
    }).sort((b, a) => (a.priority ?? 0) - (b.priority ?? 0));

    return data;
}

// generate all single routes as well as all potential pairs of routes
export async function getWorldCardPaths() {

    const filenames = fs.readdirSync(worldDir).map(f => f.replace(/\.mdx$/,''));
    let paths = [];

    for (let i = 0; i < filenames.length; i++) {
        paths.push({ params: { w: [filenames[i]] } });
        for (let j = 0; j < filenames.length; j ++) {
            if (i != j) {
                paths.push({ params: { w: [filenames[i], filenames[j]] } });
            }
        }
    }

    return paths;
}






// new for wiki

const componentsForMDX = {'Img': 'Img', 'ComicSans': 'ComicSans'};

// just get page ids, for GetStaticPaths
export async function getWikiPaths() {

    const filenames = fs.readdirSync(worldDir);
    return filenames.map(f => ({ 
        params: { id: f.replace(/\.mdx$/, '') } 
    }));

}

// get all wiki frontmatter, and attach mdx code of 
export async function getWikiData({ allCode, id }) {
    
    const filenames = fs.readdirSync(worldDir);
    const data = await Promise.all(filenames.map(async f => {

        const fileID = f.replace(/\.mdx$/,'');
        const contents = fs.readFileSync(path.join(worldDir, f), 'utf8');

        if (allCode || id == fileID) {
            const {code, frontmatter} = await bundleMDX({
                source: contents,
                globals: componentsForMDX
            });

            return {id: fileID, ...frontmatter, code};
        } else {
            const matterResult = matter(contents);
            return {id: fileID, ...matterResult.data}
        }

    }));

    return data;
}

export async function getWikiDataAsObject(initialID) {
    
    const filenames = fs.readdirSync(worldDir);
    const data = {};

    for (const f of filenames) {
        const id = f.replace(/\.mdx$/, '');
        const contents = fs.readFileSync(path.join(worldDir, f), 'utf8');

        if (initialID && id == initialID) {

            const { code, frontmatter } = await bundleMDX({
                source: contents,
                globals: componentsForMDX
            });

            data[id] = { id, ...frontmatter, code };

        } else {
            const frontmatter = matter(contents);
            data[id] = { id, ...frontmatter.data };

        }
    }

    return data;
}

export async function getSortedIDsForIndex(data) {
    
    if (!data) data = await getWikiDataAsObject();

    const prepareTitle = (title) => title?.toLowerCase()?.replace('the ', '')?.replace('a ', '') ?? '';

    const sorted = [...Object.keys(data)].sort((a, b) => {
        return prepareTitle(data[a].title).localeCompare(prepareTitle(data[b].title))
    });

    return sorted;
}

export async function getWikiCardCode(id) {

    const contents = fs.readFileSync(path.join(worldDir, `${id}.mdx`), 'utf8');
    const { code } = await bundleMDX({
        source: contents,
        globals: componentsForMDX
    });

    return code;

}