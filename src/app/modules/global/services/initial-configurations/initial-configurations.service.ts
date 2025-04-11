import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ActivesService } from '../actives/actives.service';
import { Filters } from '../../interfaces/Filter';

@Injectable({
  providedIn: 'root'
})
export class InitialConfigurationsService {
  private activesService = inject(ActivesService);

  // Aqui vou fazer as requisições necessárias para: Header, Home e Input Search.
  private filters = new BehaviorSubject<Filters | null>(null);
  filtersInformations = this.filters.asObservable();

  private mostViewed = new BehaviorSubject<any>([]);
  mostViewedInformations = this.mostViewed.asObservable();

  private topActives = new BehaviorSubject<any>([]);
  topActivesInformations = this.topActives.asObservable();

  constructor() { }

  async getFilters(){
    const response = await this.activesService.getAllFilters('all', 4);

    if (typeof(response) == 'object'){
      this.filters.next(response);
    } else {
      this.filters.next(null);
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
