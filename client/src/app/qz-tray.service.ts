import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import * as qz from 'qz-tray';
import { sha256 } from 'js-sha256';
import { KJUR, KEYUTIL, stob64, hextorstr } from 'jsrsasign';

@Injectable()
export class QzTrayService {
private config;

constructor(private http: HttpClient) {
    qz.api.setSha256Type(data => sha256(data));
    qz.api.setPromiseType(resolver => new Promise(resolver));
  }

initQZ () {

  qz.security.setCertificatePromise(function(resolve, reject) {
      resolve('-----BEGIN CERTIFICATE-----\n' +
      'MIID2jCCAsKgAwIBAgIJAO4MCWl5uZYwMA0GCSqGSIb3DQEBCwUAMIGAMQswCQYD\n' +
      'VQQGEwJJTjELMAkGA1UECAwCTVAxDzANBgNVBAcMBkluZG9yZTEMMAoGA1UECgwD\n' +
      'QUNTMQswCQYDVQQLDAJJVDESMBAGA1UEAwwJbG9jYWxob3N0MSQwIgYJKoZIhvcN\n' +
      'AQkBFhVuZ3VyamFyMTk5MUBnbWFpbC5jb20wIBcNMTkwMTIzMTAxMDA4WhgPMjA1\n' +
      'MDA3MTgxMDEwMDhaMIGAMQswCQYDVQQGEwJJTjELMAkGA1UECAwCTVAxDzANBgNV\n' +
      'BAcMBkluZG9yZTEMMAoGA1UECgwDQUNTMQswCQYDVQQLDAJJVDESMBAGA1UEAwwJ\n' +
      'bG9jYWxob3N0MSQwIgYJKoZIhvcNAQkBFhVuZ3VyamFyMTk5MUBnbWFpbC5jb20w\n' +
      'ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCW/KdcXmH3J0SPg8MB3lvm\n' +
      'm6F7dspxYTykOK9UV9vdd+APiX6nTE+M/beoo4zI1brGbo7L3LVshGffPiCI5IQ4\n' +
      '8MmHVI+32+zDVgyOu465VOSu5MJLXr1bMhuf7wwHnbJcCOYfkQibO4KckQk2rSd7\n' +
      'DF/RDAEsIHFfoHCvAfaw7i0HazIvohhXvv/VEvsTtkL9ZCfNhYVKnmCkjEP+gkwx\n' +
      '70LEzSdNZ2HVTf3H4RzOp7vRceSyg9Wp99HnOoBrJi7BLLf1P0480eDLeIV0wIU3\n' +
      '3d6n05NieVGH4ge7KdSkH3bawlEWQ5R5LygSQX2JeA1OjpRQ8U/tIva88xo79HIj\n' +
      'AgMBAAGjUzBRMB0GA1UdDgQWBBT1rFtIE/FhX5xrqxF3z8WqksZQETAfBgNVHSME\n' +
      'GDAWgBT1rFtIE/FhX5xrqxF3z8WqksZQETAPBgNVHRMBAf8EBTADAQH/MA0GCSqG\n' +
      'SIb3DQEBCwUAA4IBAQBDEUdpzDgIXvmfWRie+YnhlEtgZxjPAhvi3BRbk8WZdulL\n' +
      'AB/cHjuahyhM7/S6pYSLCM7ByLvM5Ddox6axGTsAst3rdh2+1T1QLt8gJgOGcWBP\n' +
      'NWWVLg65+kmVlM7CbNbaty7WVxrhkHwO4p/7SgTZQek0WgDO2feOx0G1LEZuHphS\n' +
      'QY4ddyiMLpZLMb3zn00uWT8/ktXMXT0gfqa/h+8ccCUT6icwDk/hY5sRe19kS1ER\n' +
      'thD6mxrE4gh6q081ewZJqNAToKio5QRSHSSTbE7/xL07kX3HyeHKZzvlRQdzywHr\n' +
      '1kuUCW1JRvlclvtQS1jD6I3P+760tlol4QR2fUNG\n' +
      '-----END CERTIFICATE-----');
    });


    const Key = '-----BEGIN PRIVATE KEY-----\n' +
    'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCW/KdcXmH3J0SP\n' +
    'g8MB3lvmm6F7dspxYTykOK9UV9vdd+APiX6nTE+M/beoo4zI1brGbo7L3LVshGff\n' +
    'PiCI5IQ48MmHVI+32+zDVgyOu465VOSu5MJLXr1bMhuf7wwHnbJcCOYfkQibO4Kc\n' +
    'kQk2rSd7DF/RDAEsIHFfoHCvAfaw7i0HazIvohhXvv/VEvsTtkL9ZCfNhYVKnmCk\n' +
    'jEP+gkwx70LEzSdNZ2HVTf3H4RzOp7vRceSyg9Wp99HnOoBrJi7BLLf1P0480eDL\n' +
    'eIV0wIU33d6n05NieVGH4ge7KdSkH3bawlEWQ5R5LygSQX2JeA1OjpRQ8U/tIva8\n' +
    '8xo79HIjAgMBAAECggEAXimjlo+mOSVcNMTP0VKDrgZRZ1ZmWt9xmllfvxIsJKqm\n' +
    'Kgpt2phU5HE3IQ0euAHTQf2hQLKc0tigjzGHyNf7PietB6FNIDUgK5J2sm12TU8M\n' +
    'b6ZrJeYn4cAWSmAi+Hz4xz0lh3pEC8vJYStyu46xmKPW/eCmuoZhLmo43Gw1FZH/\n' +
    'ePwifrP4tjFav0BqyyevjWHFV7BOcgQPOeOLDSFMOUIjneJr2slw+GRS02GF3KCs\n' +
    '+52Q6M6spTKuPeAiKq9Uv8Yy1cAItP7rf45h8ftaBIWAG4AqnE7AFH2ylNsVXp3l\n' +
    's+rDWklVeqDd92a90twBYlf1dUjfx2WrbnmeCbjXwQKBgQDFWR8QTR/nNX91ARFk\n' +
    'OFePZW3e93TTOvLiNbIK6tAgArgTt9zbPY596MpHNWd1mzvLDqh1tW/n9B6VBLU3\n' +
    'NXGLPzMfUCoeoqiadXe1UZ+l8wxe8V6S+cv7SroqoyUw+H/5NMRhI0DcV973JZCh\n' +
    'qr192P5FbYrn33PySd9Y5b0qBQKBgQDD3Dk4ULR0HTl5L7vGyZ3FJk9CNnywcXbf\n' +
    'gR/Xdof5NX1A/SrDCPMF4qkF8c2GitGMd/XM81wMpxIwTelZxxvQXBM8K+eMK2z3\n' +
    'k4YKNa9nQwR6vuxrgtMkAr5+OVq12Uz8j0pOUgkVmy93kx52MQtOri1L8v5zk5ZY\n' +
    'wTam6LzcBwKBgCvKILhvRJr7JfMCb6d7UQKCkSSeaA/OzsIfBAikHdZchBfr/lev\n' +
    'iwSpOOkgEnroHRZrhDnKLrCbXIXYa5V6iF1Lgr55/T6a/Sp40j0rhW8/RQl0KXYX\n' +
    'c4mpBTIczU3Wdh8H9GNRfTznSpQwg607w5w/H/yr19ynmoSym5qQL685AoGAcYgl\n' +
    'bvxxLeGG4DWILnnOR2qmhOYarxiGZJZvw7DErvOPkG1wLS/x11aEzZpVnYi4YSlk\n' +
    'RRJIKFlsFK4E9vKQr92/lKCKjtjZSEWubBqke0IAxboIR2XFSFmC3J4Yc9LrancR\n' +
    'BodNFsYm5LRV8wMI3+nc/ep0DsDdZMNTD7tXRl8CgYAL3P2sTdbg9+ipe507IniI\n' +
    '/aFVtKjhescb6sEjUBaVrIxpHpEGpIvxD2tB3LeU2oBoG1tjCI4Ln593WrYlGDdm\n' +
    'NieTIH3AS38mLYHz1RyusOMbq8TL+p/H/6s/65XXU0g7st1ESY5JgHWevRg4QtUp\n' +
    'ionZ//np79MDwXXJidBxaA==\n' +
    '-----END PRIVATE KEY-----';
    qz.security.setSignaturePromise(hash => {
      return (resolve, reject) => {

      const pk = KEYUTIL.getKey(Key);
      const sig = new KJUR.crypto.Signature({'alg': 'SHA1withRSA'});
      sig.init(pk);
      sig.updateString(hash);
      const hex = sig.sign();
      // console.log("DEBUG: \n\n" + stob64(hextorstr(hex)));
      resolve(stob64(hextorstr(hex)));
      };
    });

    let qzVersion = 0;
      qz.websocket.connect().then(function() {
        qz.api.getVersion().then(function(data) {
            qzVersion = data;
            console.log(qzVersion);
        }).catch();

      }).catch();
  }

// 	errorHandler(error: any): Observable<any> {
// // tslint:disable-next-line: deprecation
// 		return Observable.throw(error);
// 	}

  getPrinters(): Observable<string[]> {
  return Observable
  .fromPromise(qz.websocket.connect().then(() => qz.printers.find()))
  .map((printers: string[]) => printers);
  }

  getPrinter(printerName: string): Observable<string> {
    return Observable
    .fromPromise(qz.websocket.connect().then(() => qz.printers.find(printerName)))
    .map((printer: string) => printer);
  }

  printHTML(printerName, htmlData) {
  qz.printers.find(printerName).then(function(found) {
  console.log('Printer: ' + found);
  const config = qz.configs.create(printerName);

  qz.print(config, htmlData).then(function() {
  console.log('Sent data to printer'); })
  .catch((err) => console.log(err)); })
  .catch((err) => {console.log(err); });
  }

  // Print data to chosen printer
  printData(printer: string, data: any): Observable<any> {
  qz.printers.find('test_printer').then(function(found) {
  console.log('Printer: ' + found);

  const config1 = qz.configs.create('test_printer');               // Exact printer name from OS
  data = ['^XA^FO50,50^ADN,36,20^FDRAW ZPL EXAMPLE^FS^XZ'];   // Raw commands (ZPL provided)

  qz.print(config1, data).then(function() {
  console.log('Sent data to printer');
  });
  }).catch((err) => {console.log(err); });

  const config = qz.configs.create(printer);

  return Observable.fromPromise(qz.print(config, data))
  .map((anything: any) => anything);
  }

  // Disconnect QZ Tray from the browser
  removePrinter(): void {
    qz.websocket.disconnect();
  }
}
