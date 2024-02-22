import { Service } from "../service";
import escpos from "escpos";
escpos.Network = require("escpos-network");
escpos.Serial = require("escpos-serialport");
escpos.USB = require("escpos-usb");

class ESCPOSService extends Service {
  private _devices: Record<string, escpos.Adapter>;
  constructor() {
    super();

    this._devices = {};
  }

  public createNetworkDevice(id: string, address: string, port: number): void {
    this._devices[id] = new escpos.Network(address, port);
  }

  public createSerialDevice(
    id: string,
    port: number,
    options?: { baudRate: number; autoOpen: boolean } | undefined,
  ): void {
    this._devices[id] = new escpos.Serial(port, options);
  }

  public createUSBDevice(
    id: string,
    vid?: string | undefined,
    pid?: string | undefined,
  ): void {
    this._devices[id] = new escpos.USB(vid, pid);
  }

  public updateUSBDevice(id: string, adapter: escpos.USB): void {
    this._devices[id] = adapter;
  }

  public findUSBPrinter(): escpos.USB[] {
    const printers = escpos.USB.findPrinter();
    if (printers) {
      return printers;
    } else {
      return [];
    }
  }

  public createPrinter(
    id: string,
    options?: {
      encoding?: string | undefined;
    } | undefined,
  ): escpos.Printer {
    return new escpos.Printer(this._devices[id], options);
  }

  public openDevice(
    id: string,
    printer: escpos.Printer,
    callback: (printer: escpos.Printer, error: any) => void,
  ): escpos.Adapter | null {
    console.log(this._devices[id]);
    if (!Object.keys(this._devices).includes(id)) {
      return null;
    }

    return this._devices[id]?.open((error: any) => {
      callback(printer, error);
    });
  }
}

export default new ESCPOSService();
