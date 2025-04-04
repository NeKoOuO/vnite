import { getDataPath } from '../utils/path'
import { themePreset } from './services'
import fse from 'fs-extra'
import log from 'electron-log/main.js'

/**
 * A class to manage the theme of the application
 */
export class ThemeManager {
  private static instance: ThemeManager | null = null
  private themePath: string

  private constructor(themePath: string) {
    this.themePath = themePath
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      const themePath = getDataPath('theme.css')
      ThemeManager.instance = new ThemeManager(themePath)
    }
    return ThemeManager.instance
  }

  async saveTheme(cssContent: string): Promise<void> {
    try {
      await fse.writeFile(this.themePath, cssContent, 'utf-8')
    } catch (error) {
      log.error('Failed to save topic:', error)
    }
  }

  async loadTheme(): Promise<string | null> {
    try {
      if (await fse.pathExists(this.themePath)) {
        const themeContent = await fse.readFile(this.themePath, 'utf-8')
        if (!themeContent || !themeContent.includes('dark')) {
          return await themePreset('default')
        } else {
          return themeContent
        }
      } else {
        return await themePreset('default')
      }
    } catch (error) {
      log.error('Failed to read topic:', error)
    }
    return null
  }
}
