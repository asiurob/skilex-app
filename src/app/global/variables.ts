import { Observable } from 'rxjs';
export const urlservice = 'http://localhost:9000';

export const backResponse: any = ( ob: Observable<any> ) => {
    ob.subscribe(
        ( res: any ) => {
            return { response: res, error: null };
        },
        ( err: any ) => {
            return { response: null, error: err.message };
        }
    );
};