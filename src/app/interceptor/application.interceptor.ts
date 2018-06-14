import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

// Récupérer l'URL de base qui est une constante environnementale (cf "environments.ts")
// apiUrl = 'http://localhost:8080/BackendDojo/api/v1'
export const API_URL = new InjectionToken<string>('apiUrl');

// Interceptor servant à inclure l'URL de base à chacune des requêtes HTTP
@Injectable()
export class ApplicationInterceptor implements HttpInterceptor {

  constructor(@Inject(API_URL) private apiUrl: string) {
    console.log('apiUrl: ' + apiUrl);
  }

  // Fonction d'interception et de renvoi de requête
  intercept(request: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    request = request.clone({url: this.prepareUrl(request.url)});
    return next.handle(request);
  }

  // Prépare l'URL à partir de API_URL et du complément provenant de la requête initiale
  private prepareUrl(url: string): string {
    url = this.isAbsoluteUrl(url) ? url : this.apiUrl + '/' + url;
    console.log('URL: ' + url);
    return url.replace(/([^:]\/)\/+/g, '$1');
  }

  // Vérifie que l'URL finale soit "absolue"
  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }
}
