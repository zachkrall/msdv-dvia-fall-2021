import { promises as fs } from 'fs'
import chalk from 'chalk'

import { Project } from '../model/projectApi'
import { formatFileName } from '../utils/files'

export const formatProjects = async (projects: { [key: string]: any }) => {
  const data = { ...projects }

  const replaceImagePaths = (blocks) => {
    return [...blocks].map((block) => {
      const type = block.type

      if (['image', 'video', 'file', 'pdf'].includes(block.type) && block[type]?.file?.url) {
        block[type].file.url = formatFileName(block[type].file.url)
      }

      if(block.type === 'column_list' && block.column_list?.children){
        block.column_list.children = block.column_list.children.map(columnChildren => {
          return columnChildren.map(columnBlock => {
            if (['image', 'video', 'file', 'pdf'].includes(columnBlock.type) && columnBlock[columnBlock.type]?.file?.url) {
              columnBlock[columnBlock.type].file.url = formatFileName(columnBlock[columnBlock.type].file.url)
            }

            return columnBlock
          })
        })
      }

      // if (block.type === 'column_list' && block?.column_list?.children) {
      //   block.column_list.children = block.column_list.children.map((column) => {
      //     return column.map((columnChildren) => {
      //       return columnChildren.map((columnBlock) => {
      //         if (
      //           ['image', 'video', 'file', 'pdf'].includes(columnBlock.type) &&
      //           columnBlock[type]?.file?.url
      //         ) {
      //           columnBlock[type].file.url = formatFileName(columnBlock[type].file.url)
      //         }

      //         return columnBlock
      //       })
      //     })
      //   })
      // }

      // return makeBlock(block)
      return block
    })
  }

  Object.values(data).forEach((project: Project) => {
    const { meta, content } = project

    /* write over entry */
    data[meta.id].content = replaceImagePaths(content || [])
  })

  return data
}

export const saveJSON = async ({ data, savePath }: { data: any; savePath: any }) => {
  const { projects, ...rest } = data
  const project_data = await formatProjects(projects)

  await fs.writeFile(
    savePath,
    JSON.stringify(
      {
        ...rest,
        projects: project_data,
      },
      null,
      4
    ),
    {
      encoding: 'utf-8',
    }
  )

  console.log(`${chalk.bgGreen(' DONE ')} Saved API JSON`)
}
