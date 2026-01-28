import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { AppLoggerService } from '../app-logger/app-logger.service';
import { discoverServicePath } from '../general/service-path.util';

@Injectable()
export class FileManagementService {
  private readonly DATA_DIR_PATH = path.join(process.cwd(), 'data'); //default

  constructor(private readonly logger: AppLoggerService) {
    this.logger.setContext(FileManagementService.name);
    this.DATA_DIR_PATH = path.join(discoverServicePath(__dirname), 'data');
    fs.mkdir(this.DATA_DIR_PATH, { recursive: true }).catch((err) => {
      this.logger.error(`Error creating data directory: ${err}`);
    });
  }

  async createDB(name: string) {
    try {
      await fs.access(path.join(this.DATA_DIR_PATH, `${name}.json`));
    } catch (error) {
      if (error.code === 'ENOENT') {
        await this.writeJSON(name, []);
        this.logger.log(
          `DB file did not exist, created new db file: ${name}.json`,
        );
      } else throw new Error('Error accessing file system');
    }
  }

  async readJSON<T extends object>(filename: string): Promise<T | null> {
    const filePath = path.join(this.DATA_DIR_PATH, `${filename}.json`);
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data) as T;
    } catch (error) {
      this.logger.error(`Error reading file: ${filePath} - ${error}`);
      throw new Error(`Error reading file: ${filePath}`);
    }
  }

  async writeJSON<T extends object>(filename: string, data: T): Promise<void> {
    const filePath = path.join(this.DATA_DIR_PATH, `${filename}.json`);
    try {
      await fs.writeFile(filePath, JSON.stringify(data), 'utf-8');
      this.logger.log(`File written: ${filePath}`);
    } catch (error) {
      this.logger.error(`Error writing to file: ${filePath} - ${error}`);
      throw new Error(`Error writing to file: ${filePath}`);
    }
  }
}
