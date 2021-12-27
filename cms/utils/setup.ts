import { promises as fs } from 'fs'
import path from 'path'
import chalk from 'chalk'

import { Params } from '../model/params'

import { folderExists } from './files'

export const setupFolder = async (folderPath) => {
  let exists = await folderExists(folderPath)

  if (!exists) {
    await fs.mkdir(folderPath)
  }

  console.log(`[✓] Set up directory: ${chalk.gray(folderPath)}`)

  let files = await fs.readdir(folderPath)

  files.forEach(async (filePath) => {
    let fullPath = path.join(folderPath, filePath)
    try {
      await fs.unlink(fullPath)
      console.log(`${chalk.bgGray.white(' DELETE ')} ${chalk.gray(filePath)}`)
    } catch (e) {
      console.log(`${chalk.bgRed.black(' ERROR ')} ${filePath}`)
    }
  })
}

export const setupApiJSON = async (filePath) => {
  const data = JSON.stringify({
    projects: [],
  })
  await fs.writeFile(filePath, data, { encoding: 'utf-8' })

  console.log(`[✓] Set up api file: ${chalk.gray(filePath)}`)
}

export const setup = async (params: Params) => {
  if (params.apiToken === '') {
    console.log(`no api token`)
    process.exit(0)
  }

  console.log(`Setup Tasks:`)

  await setupFolder(params.imageOutput)
  await setupFolder(params.videoOutput)
  await setupFolder(params.fileOutput)
  await setupApiJSON(params.jsonOutput)

  return
}
