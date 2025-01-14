import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

unicosArray<T>(array: T[]): T[]{
  const uniques: T[] = [];
  
      for (const value of array) {
          let exists = false;
          for (const unique of uniques) { 
              if (unique === value) {
                  exists = true;
                  break;
              }
          }
          if (!exists) { 
              uniques.push(value);
          }
      }
      return uniques
  }
}
