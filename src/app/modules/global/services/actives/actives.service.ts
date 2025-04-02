import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Fiis } from '../../interfaces/Fiis';
import { Acoes } from '../../interfaces/Acoes';

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
}
