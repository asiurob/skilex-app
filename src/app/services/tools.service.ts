import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() {}

 viewImg(file: Blob, maxSize: number, maxHeight ?: number, maxWidth ?: number): Promise<any> {

    const prom = new Promise( (resolve: any, reject: any) => {

      const fileType = /image.*/;
      if (!file.type.match(fileType)) {
        reject('El archivo no es una imagen valida');
      }

      if (Math.ceil(file.size / 1024) > maxSize) {
        reject(`El archivo pesa ${ Math.ceil( file.size / 1024 ) }Kb, sólo ${ ( maxSize ) }Kb permitidos`);
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();

        const imProm = new Promise( (resolves, rejects) => {
          img.onload = () => {
            if ( img.width > maxWidth || img.height > maxHeight ) {
              rejects(`El archivo sobrepasa las dimensiones de ${ maxWidth }x${ maxHeight }px. Actual ${ img.width }x${ img.height }px`);
            } else {
              resolves( reader.result );
            }
          };
        });

        img.src = String(reader.result);

        imProm
        .then( ( res ) => resolve( res ) )
        .catch( ( err ) => reject( err ) );
      };

      reader.readAsDataURL(file);
    });

    return prom;
  }
}
