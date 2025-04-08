import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivesService } from '../actives/actives.service';

@Injectable({
  providedIn: 'root'
})
export class InitialConfigurationsService {
  private activesService = inject(ActivesService);

  // Aqui vou fazer as requisições necessárias para: Header, Home e Input Search.
  private sectors = new BehaviorSubject<any>([]);
  sectorsInformations = this.sectors.asObservable();

  private mostViewed = new BehaviorSubject<any>([]);
  mostViewedInformations = this.mostViewed.asObservable();

  private topActives = new BehaviorSubject<any>([]);
  topActivesInformations = this.topActives.asObservable();

  constructor() { }

  async getSectors(){
    const response = await this.activesService.getAllSectors('all', 4);

    if (typeof(response) == 'object'){
      this.sectors.next(response);
    } else {
      this.sectors.next([]);
    }
  }

  async getMostViewed(){
    const response = await this.activesService.getMostViewed('all', 4);

    if (typeof(response) == 'object'){
      this.mostViewed.next(response);
    } else {
      this.mostViewed.next([]);
    }
  }

  async getTopActives(){
    const response = await this.activesService.getTopActives('all', 4);

    if (typeof(response) == 'object'){
      this.topActives.next(response);
    } else {
      this.topActives.next([]);
    }
  }
}
