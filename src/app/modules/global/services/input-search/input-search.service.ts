import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InputSearchService {
  private statusInputSearchDialog = new BehaviorSubject<boolean>(false);
  statusInputSearchDialogInformation = this.statusInputSearchDialog.asObservable();

  toggleStatusInputSearchDialog(){
    this.statusInputSearchDialog.next(this.statusInputSearchDialog.value);
  }

  openInputSearchDialog(){
    this.statusInputSearchDialog.next(true);
  }

  closeInputSearchDialog(){
    this.statusInputSearchDialog.next(false);
  }
}
