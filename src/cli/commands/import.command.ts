import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e;
      }

      console.log(`Не удалось прочитать файл ${filename}`);
      console.log(`Ошибка: ${e.message}`);
    }
  }
}
