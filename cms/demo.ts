import {NotionAPI} from 'notion-client'
import {parsePageId} from 'notion-utils'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
  encoding: 'utf-8'
});

async function main() {

    // const database = 'https://www.notion.so/visualize-data/DVIA-Uncertainties-and-Illusions-a6d7260461a647a2a9f29694951b1fcc'
    const database = `https://visualize-data.notion.site/0c5985116a51453cb6ccec91aaf3c2c3?v=ca16365329bc4d1db23774596220322f`

    const db = parsePageId(database)

    // console.log(process.env.NOTION_API_TOKEN)
    const notion = new NotionAPI({
        activeUser: process.env.NOTION_USER_ID,
        authToken: process.env.NOTION_TOKEN_V2
    })

    console.log(notion)

    const data = await notion.getPage(db)


    notion.getBlocks

    console.log(data)

    console.log(JSON.stringify(data, null, 4))

}

main()

