import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  setLocalStorage(key: string, informations: any){
    const newInformations = JSON.stringify(informations);
    localStorage.setItem(key, newInformations);
  }

  getLocalStorage(key: string){
    const informations = localStorage.getItem(key);
    if (informations){
      return JSON.parse(informations)
    }
    return null
  }

  deleteLocalStorage(key: string){
    localStorage.removeItem(key);
  }
}
