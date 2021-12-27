import path from 'path'
import dotenv from 'dotenv'

import { selectImagePaths, selectVideoPaths, selectFilePaths } from './notion/cache/selectPaths'
import { downloadImages, downloadVideos, downloadFiles } from './notion/cache/download'
import fetch from './notion/fetch'
import { saveJSON } from './notion/json'

import { setup } from './utils/setup'

import {Params} from './model/params'

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
  encoding: 'utf-8',
  debug: false
});

const params: Params = {
    imageOutput: path.resolve(__dirname, '..', 'www', 'public', 'notion-images'),
    videoOutput: path.resolve(__dirname, '..', 'www', 'public', 'notion-videos'),
    fileOutput: path.resolve(__dirname, '..', 'www', 'public', 'notion-files'),
    jsonOutput:  path.resolve(__dirname, '..', 'www', 'public', 'api', 'projects.json'),
    databaseId: "0c5985116a51453cb6ccec91aaf3c2c3",
    apiToken: process.env.NOTION_API_TOKEN || ''
}

async function main () {
    // run setup functions
    await setup(params)

    // get data from notion
    const data = await fetch(params) 

    // // get images from data
    const images = await selectImagePaths(data.projects)
    const videos = await selectVideoPaths(data.projects)
    const files = await selectFilePaths(data.projects)
    
    // download images
    await downloadImages({
        images: images,
        saveDir: params.imageOutput
    })

    // download videos
    await downloadVideos({
        videos: videos,
        saveDir: params.videoOutput
    })

    // download files
    await downloadFiles({
        files: files,
        saveDir: params.fileOutput
    })

    // save api json
    await saveJSON({data: {
        ...data,
        cache: {images, videos, files}
    }, savePath: params.jsonOutput})    
}

main()