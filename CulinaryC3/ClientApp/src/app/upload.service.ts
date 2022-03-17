import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';

@Injectable({
  providedIn: 'root'
})

export class UploadService {
  accountName = "recipephotos"
  containerName = "photos"


  constructor() {

  }



  public async listImages(): Promise<string[]> {
    let result: string[] = []

    let blobs = this.containerClient().listBlobsFlat();
    for await (const blob of blobs) {
      result.push(blob.name);
    }
    return result;
  }

  public uploadImage(sas: string, content: Blob, name: string, handler: () => void) {
    const blockBlobClient = this.containerClient(sas).getBlockBlobClient(name);
    blockBlobClient
      .uploadData(content, { blobHTTPHeaders: { blobContentType: content.type } })
      .then(() => handler())
  }

  private containerClient(sas?: string): ContainerClient {
 
    return new BlobServiceClient(`https://recipephotos.blob.core.windows.net/photos?sp=racw&st=2021-08-11T18:01:18Z&se=2021-09-09T02:01:18Z&spr=https&sv=2020-08-04&sr=c&sig=XIxfUf8KBqVfZsh%2FXktnE0I%2FmevhyIbuy9JzB8QWSDs%3D`)
      .getContainerClient(this.containerName);
  }


}
