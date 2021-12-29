import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncrDecrService {
  enkey:string;
  
  constructor() {   
    this.enkey=environment.encryptionkey;
  }

 
  Encrypt(value) {

     var key = CryptoJS.enc.Utf8.parse(this.enkey);
     var data = CryptoJS.enc.Utf8.parse(value.toString());
    var encryptedData = CryptoJS.AES.encrypt(data, key, {
     iv: key,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
     });
     var encryout=encryptedData.toString();
     return encryout;
  } 
  

  securityEncrypt(value,LoginName) {
     var key = CryptoJS.enc.Utf8.parse(this.enkey+LoginName.toLowerCase()+value.toString());
     var data = CryptoJS.enc.Utf8.parse(value.toString());
     var encryptedData = CryptoJS.AES.encrypt(data, key, {
     iv: key,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
     });
     return encryptedData.toString();
  }

  Decrypt(value) {
    var key = CryptoJS.enc.Utf8.parse(this.enkey);
     var decryptedData = CryptoJS.AES.decrypt(value, key, {
     iv: key,
     mode: CryptoJS.mode.CBC,
     padding: CryptoJS.pad.Pkcs7
     });
     var output=null;
     try
     {
     output=decryptedData.toString(CryptoJS.enc.Utf8);
     if(!output){
    output=value;
     }
    }
    catch(error)
    { 

    }
    return output;
  }

}
