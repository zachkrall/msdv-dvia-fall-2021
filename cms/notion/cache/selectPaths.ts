import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"
import { ProjectApi } from "../../model/projectApi"

export const unwrapBlocks = (obj: ProjectApi['projects']): any[] => {
  return Object.values(obj).reduce((prev, cur) => {
    let output: any[] = []

    if(cur.content){
      cur.content.forEach(block => {
        
        if(block.type === 'column_list' && block.column_list?.children){
          let column = block.column_list.children as any[]
          column.forEach(columnChildren => {
            columnChildren.forEach(columnBlock => {
              output.push(columnBlock)
            })
          })
        } else {
          output.push(block)
        }
      })
    }

    return [...prev, ...output]
  }, [] as any[])
}

export const crawlPaths = (projects: ProjectApi['projects'], blockType: string | string[]) => {
  return unwrapBlocks(projects).map(block => {
    let options = Array.isArray(blockType) ? blockType : [blockType]
    let isMatch = options.includes(block.type)

    if(
        isMatch
    ){
      return block[block.type]?.file?.url
    } else {
      return null
    }
  }).filter(i => i !== null)
}


export const selectImagePaths = (projects: ProjectApi['projects']) => {
  return crawlPaths(projects, 'image')
}

export const selectVideoPaths = (projects: ProjectApi['projects']) => {
  return crawlPaths(projects, 'video')
}

export const selectFilePaths = (projects: ProjectApi['projects']) => {
 return crawlPaths(projects, ['file', 'pdf'])
}
