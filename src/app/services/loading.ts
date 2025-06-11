import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  // BehaviorSubject pour suivre l'état du loading
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  constructor() {}

  // Méthode pour activer le loading
  show(): void {
    this.loadingSubject.next(true);
  }

  // Méthode pour désactiver le loading
  hide(): void {
    this.loadingSubject.next(false);
  }

  // Méthode pour exécuter une fonction avec loading automatique
  withLoading<T>(observable: Observable<T>): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.show();
      const subscription = observable.subscribe({
        next: (value) => subscriber.next(value),
        error: (err) => {
          this.hide();
          subscriber.error(err);
        },
        complete: () => {
          this.hide();
          subscriber.complete();
        },
      });
      return subscription;
    });
  }
}
