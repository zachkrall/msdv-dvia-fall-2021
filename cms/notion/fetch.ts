import { Client } from '@notionhq/client'
import chalk from 'chalk'

import { ProjectApi } from '../model/projectApi'

const fetch = async ({ apiToken, databaseId }) => {
    const data: ProjectApi = {
      projects: {},
    }

    // create notion client
  const notion = new Client({
    auth: apiToken
  })

  // get pages from database
  const { results: pages } = await notion.databases.query({
    database_id: databaseId,
  })

  // page count
  const totalPages = pages.length

  console.log(`\nFound ${chalk.green(totalPages)} projects`)

  const hydrate = () =>
    new Promise((resolve, reject) => {
      let index = 0

      const loop = async () => {
        let position = `${index + 1}/${totalPages}`.padStart(String(totalPages).length * 2 + 1, ' ')
        console.log(`[${position}] ${chalk.gray(pages[index].id)}`)

    
        const projectId = pages[index].id

          const content = await notion.blocks.children.list({
            block_id: projectId,
          })

          const properties = pages[index]['properties'] as any

          // remap project properties to api schema
          data['projects'][projectId] = {
            meta: {
              id: projectId,
              title: properties['Project Title']?.title?.[0].text?.content || 'Untitled',
              author: {
                name: properties['Student Name']?.rich_text?.[0]?.text?.content || 'Anonymous',
                url: properties['Student Website']?.url || undefined,
                major: properties['Student Major']?.rich_text?.[0]?.text?.content || undefined,
                section: properties['DVIA Section']?.select?.name || undefined,
              },
              tags: (properties['Tags']?.rich_text?.[0]?.text?.content || '')
                .split(',')
                .map((i) => i.trim())
                .filter((i) => i.length > 0),
            },
            content: await Promise.all([...content.results.map(async (block) => {
                if(block.type === 'column_list'){
                    const {results} = await notion.blocks.children.list({
                        block_id: block.id
                    })

                    return {
                        ...block, 
                        column_list: {
                            children: await Promise.all(results.map(async(columnBlock)=>{
                                const {results} = await notion.blocks.children.list({
                                    block_id: columnBlock.id
                                })
                                return results
                            }))
                        }
                    } as any
                }

                return block
            })]),
          }
        
          index += 1

          if (index < pages.length) {
            loop()
          } else {
            resolve(void '')
          }
        
        }
      loop()
    })

  await hydrate()

  return data
}

export default fetch
