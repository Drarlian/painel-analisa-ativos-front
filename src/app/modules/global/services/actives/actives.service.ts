import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ActivesService {
  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  async getAcoes(acoes: string[]){
    return new Promise((resolve, _) => {this.http.get('').subscribe({
      next: (data: any) => {
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

  async getFiis(fiis: string[]){
    return new Promise((resolve, _) => {this.http.get('').subscribe({
      next: (data: any) => {
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
}
