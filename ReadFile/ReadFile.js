import fs from 'fs' // fs Provide by Node.js
import path from 'path' // path Provide by Node.js
import matter from 'gray-matter' // Install gray matter 
import { remark } from 'remark' // Install Remark
import html from 'remark-html'  // Install remark-html

const postDirectory = path.join(process.cwd(), 'docs'); // Docs- Expacted folder name.

const ReadFile = () => {
    const fileNames = fs.readdirSync(postDirectory) // Return all files in an array 
    const allDocuments = fileNames.map((fileName) => {
        const id = fileName.replace('.md', ''); // Create a dynamic Id
        const fullPath = path.join(postDirectory, fileName)

        const fileContents = fs.readFileSync(fullPath, 'utf-8')

        const matterResult = matter(fileContents) // Saparate file contents and datas


        return {
            id,
            ...matterResult.data,
        }
    })
    return allDocuments.sort((a, b) => {
        if (a.order < b.order) {
            return -1;
        }
        if (a.order > b.order) {
            return 1
        }
        return 0
    })
};

export default ReadFile;

// Convert markdown filte into html

export async function getDocumentContent(id) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')

    const matterResult = matter(fileContents)

    const processedContent = await remark().use(html).process(matterResult.content)

    const contentHtml = processedContent.toString();
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}