import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private apiUrl = 'https://heterozygous-stephnie-oversweetly.ngrok-free.dev/api/pedidos';

  constructor(private http: HttpClient) {}

  criarPedido(pedido: { duvida: string, solicitante_email?: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/criar`, pedido);
  }

  // Para o dashboard do professor listar pedidos pendentes:
  getPedidosPendentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pendentes`);
  }
}
