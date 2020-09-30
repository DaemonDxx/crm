import { IReportDriver } from './interface/IReportDriver';
import { DOCXReportDriver } from './DOCXReportDriver';
import { XLSXReportDriver } from './XLSXReportDriver';

class FactoryDrivers {

  drivers: Map<string, IReportDriver>

  constructor() {
    this.drivers = new Map<string, IReportDriver>();
  }

  getDriver(typeFile: string): IReportDriver {
    if (this.drivers.has(typeFile)) {
      return this.drivers[typeFile]
    } else {
      const driver = this.createDriver(typeFile);
      this.drivers.set(typeFile, driver);
      return driver
    }
  }

  private createDriver(typeFile: string): IReportDriver {
    switch (typeFile) {
      case 'docx': return new DOCXReportDriver(); break;
      case 'xlsx': return new XLSXReportDriver(); break;
    }
  }

}

export {FactoryDrivers}

