import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private apiUrl = 'https://heterozygous-stephnie-oversweetly.ngrok-free.dev/api/pedidos';

  constructor(private http: HttpClient) {}

 
  private getHeaders() {
    return new HttpHeaders({
      'ngrok-skip-browser-warning': 'true', 
      'Content-Type': 'application/json'
    });
  }

  criarPedido(pedido: { duvida: string, solicitante_email?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, pedido, { headers: this.getHeaders() });
  }


  getPedidosPendentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendentes`, { headers: this.getHeaders() });
  }
}