import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Fiis } from '../../interfaces/Fiis';
import { Acoes } from '../../interfaces/Acoes';
import { ActivesViewed } from '../../interfaces/Viewed';
import { Filters } from '../../interfaces/Filter';

@Injectable({
  providedIn: 'root'
})
export class ActivesService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  async getAcoes(acoes: string[]): Promise<Acoes[] | boolean> {
    const acoesString = acoes.join(',');

    return new Promise((resolve, _) => {this.http.get<Acoes[]>(`http://127.0.0.1:8000/acoes?ativos=${acoesString}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getFiis(fiis: string[]): Promise<Fiis[] | boolean> {
    const fiisString = fiis.join(',');

    return new Promise((resolve, _) => {this.http.get<Fiis[]>(`http://127.0.0.1:8000/fiis?ativos=${fiisString}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getAllAcoes(): Promise<Acoes[] | boolean> {
    return new Promise((resolve, _) => {this.http.get<Acoes[]>('http://127.0.0.1:8000/get-all-acoes').subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getAllFiis(): Promise<Fiis[] | boolean> {
    return new Promise((resolve, _) => {this.http.get<Fiis[]>('http://127.0.0.1:8000/get-all-fiis').subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getTopAcoes(acoesQuantity: number): Promise<Acoes[] | boolean> {
    return new Promise((resolve, _) => {this.http.get<Acoes[]>(`http://127.0.0.1:8000/get-top-acoes/${acoesQuantity}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getTopFiis(fiisQuantity: number): Promise<Fiis[] | boolean> {
    return new Promise((resolve, _) => {this.http.get<Fiis[]>(`http://127.0.0.1:8000/get-top-fiis/${fiisQuantity}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async SearchActives(term: string): Promise<Acoes[] | Fiis[] | boolean> {
    return new Promise((resolve, _) => {this.http.get<Acoes[] | Fiis[]>(`http://127.0.0.1:8000/search-actives?term=${term}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getAllFilters(typeActive: string, quantityActives: number): Promise<Filters | boolean> {
    return new Promise((resolve, _) => {this.http.get<Filters>(`http://127.0.0.1:8000/get-all-filters/${typeActive}/${quantityActives}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getMostViewed(typeActive: string, quantityActives: number): Promise<ActivesViewed | boolean> {
    return new Promise((resolve, _) => {this.http.get<ActivesViewed>(`http://127.0.0.1:8000/get-most-viewed/${typeActive}/${quantityActives}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }

  async getTopActives(typeActive: string, activesQuantity: number): Promise<{acoes: Acoes[], fiis: Fiis[]} | boolean> {
    return new Promise((resolve, _) => {this.http.get<{acoes: Acoes[], fiis: Fiis[]}>(`http://127.0.0.1:8000/get-top-actives/${typeActive}/${activesQuantity}`).subscribe({
      next: (data) => {
        if (data) {
          resolve(data);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        // this.messageService.add({severity: 'error', summary: 'Erro com o ativo!', detail: 'O ativo procurado não foi encontrado ou não existe.', life: 6000});
        resolve(false);
      }
    })})
  }
}
