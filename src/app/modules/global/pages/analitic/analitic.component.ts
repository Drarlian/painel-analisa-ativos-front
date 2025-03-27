import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ActivesService } from '../../services/actives/actives.service';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-analitic',
  imports: [CommonModule, CardModule, TagModule, LoadingComponent],
  templateUrl: './analitic.component.html',
  styleUrl: './analitic.component.scss'
})
export class AnaliticComponent implements OnInit{
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private activesService = inject(ActivesService);

  isLoading: boolean = true;

  typeActive: string | null = null;
  nameActive: string | null = null;

  activeInfos: any = {}

  async ngOnInit() {
    this.isLoading = true;

    this.route.paramMap.subscribe(params => {
      this.typeActive = params.get('tipo');
      this.nameActive = params.get('nome');
    });

    // Devo fazer a requisição para obter os dados aqui.
    if (this.typeActive == 'acoes' && this.nameActive){
      const response = await this.activesService.getAcoes([this.nameActive]);

      if (response){
        this.activeInfos = response;
      } else {
        // this.router.navigate(['home']);
      }
    } else if (this.typeActive == 'fiis' && this.nameActive){
      const response = await this.activesService.getFiis([this.nameActive]);

      if (response){
        this.activeInfos = response;
      } else {
        // this.router.navigate(['home']);
      }
    } else {
      this.router.navigate(['home']);
    }

    // Deu tudo certo eu paro o loading.
    this.isLoading = false;
  }
}
