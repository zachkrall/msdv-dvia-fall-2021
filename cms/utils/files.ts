import { promises as fs } from 'fs'
import path from 'path'
import chalk from 'chalk'

export const fileExists = async (filepath) => {
  try {
    const res = await fs.stat(filepath)
    return res.isFile()
  } catch (e) {
    return false
  }
}

export const folderExists = async (filepath) => {
  try {
    const res = await fs.stat(filepath)
    return res.isDirectory()
  } catch (e) {
    return false
  }
}

export const formatFileName = (str) => {
  return str
    .replace(/\?.*$/g, '')
    .replace(/^.*\/secure.notion-static.com\//g, '')
    .replace(/[^A-Za-z0-9-_.]/g, '-')
}

export const setupImageFolder = async (folderPath) => {
  let exists = await folderExists(folderPath)

  if (!exists) {
    await fs.mkdir(folderPath)
  }

  console.log(`[✓] Set up image directory: ${chalk.gray(folderPath)}`)

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