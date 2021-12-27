import path from 'path'
import axios from 'axios'
import chalk from 'chalk'
import { createWriteStream } from 'fs'
import { formatFileName } from '../../utils/files'

const downloadStream = (type: string, resources: string[], dir: string) => {
  console.log(`
Downloading ${chalk.green(resources.length)} ${type}`)

  const writeFile = async (resourceURL, filepath) => {
    let res = await axios({
      url: resourceURL,
      method: 'GET',
      responseType: 'stream',
    })

    return new Promise((resolve, reject) => {
      let output = path.resolve(dir, filepath)
      res.data
        .pipe(createWriteStream(output))
        .on('error', reject)
        .once('close', () => {
          resolve(filepath)
        })
    })
  }

  resources.filter(Boolean).forEach(async (resourceURL, index, arr) => {
    const filepath = formatFileName(resourceURL)
    await writeFile(resourceURL, filepath)

    let position = `${index + 1}/${arr.length}`.padStart(String(arr.length).length * 2 + 1, ' ')
    console.log(`[${position}] ${chalk.gray(filepath)}`)
  })
}

export const downloadImages = async ({ images, saveDir }) => {
  return downloadStream('images', images, saveDir)
}

export const downloadVideos = async ({ videos, saveDir }) => {
  return downloadStream('images', videos, saveDir)
}

export const downloadFiles = async ({ files, saveDir }) => {
  return downloadStream('images', files, saveDir)
}
