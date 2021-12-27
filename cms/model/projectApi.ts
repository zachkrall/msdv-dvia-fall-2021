import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints'

export interface Author {
  name: string
  url: string | undefined
  major: string | undefined
  section: string | undefined
}

export interface Project {
  meta: {
    id: string
    title: string
    author: Author
    tags: string | string[]
  }
  content: ListBlockChildrenResponse['results']
}

export interface ProjectApi {
  projects: {
    [key: string]: Project
  }
}
