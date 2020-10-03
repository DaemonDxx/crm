import { IStorage } from './interfaces/storage.interface';
import { LocalhostStorage } from './localhost.storage';
import { LocalStorageOptions } from './interfaces/localStorage.options.interface';
import * as fs from 'fs';



describe('LocalhostStorage', () => {

  let storage: IStorage;
  const storageOption: LocalStorageOptions = {
    pathSaveIn: './test/save',
    pathTemplate: './test/template'
  };
  const bufferForCreateFile: Buffer = Buffer.alloc(20, '2');
  const template = {getData: ()=> {return {data: {number: 1}}}, fileNamePrefix: 'test-'}
  let filenameCreationFile: string;

  beforeAll(() => {
    if (!fs.existsSync(storageOption.pathSaveIn)) {
      fs.mkdirSync(storageOption.pathSaveIn);
    }
    if (!fs.existsSync(storageOption.pathTemplate)) {
      fs.mkdirSync(storageOption.pathTemplate);
    }
    storage = new LocalhostStorage(storageOption);
  });


  describe('Создание хранилища', () => {



    it('Должен выдать ошибку, если нет директории, где храняться шаблоны', (done) => {
      try {
        const storage = new LocalhostStorage({
          pathSaveIn: storageOption.pathSaveIn,
          pathTemplate: `${storageOption.pathTemplate}t`});
      } catch (e) {
        expect(e).toBe(e);
        done();
      }
    })

    it('Должен содержать путь, где сохранять фалы', () => {
      expect(storage).toHaveProperty('pathSaveIn');
      expect(storage).toMatchObject({pathSaveIn: storageOption.pathSaveIn});
    });

    it('Должен содержать путь, от куда считывать файлы шаблонов', () => {
      expect(storage).toHaveProperty('pathTemplate');
      expect(storage).toMatchObject({pathTemplate: storageOption.pathTemplate});
    });

    it('Должен содержать объект генератора имен', () => {
      expect(storage).toHaveProperty('nameGenerator');
      expect(storage.nameGenerator).not.toBeUndefined();
    });



  })

  describe('Функция fileSave()', () => {
    it('Должна создать файл в папке указанную в параметрах', async (done) => {
      try {
        // @ts-ignore
        filenameCreationFile = await storage.saveFile(bufferForCreateFile, template);
        const buff: Buffer = fs.readFileSync(`${storageOption.pathSaveIn}/${filenameCreationFile}`);
        expect(buff).toEqual(bufferForCreateFile);
        done();
      } catch (e) {
        expect(e).not.toBeDefined();
        done()
      }
    });
  });
  describe('Функция fileRead()', () => {
    it('Должна вернуть buffer из файла, который был ранее сохранен', async (done) => {
      try {
        const buffer: Buffer = await storage.readFile(filenameCreationFile);
        expect(buffer).toEqual(bufferForCreateFile);
        done();
      } catch (e) {
        expect(e).not.toBeDefined();
        done();
      }
    })
  });

  afterAll(() => {
    fs.rmdirSync(storageOption.pathSaveIn, {recursive: true});
    fs.rmdirSync(storageOption.pathTemplate, {recursive: true});
  })

});