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