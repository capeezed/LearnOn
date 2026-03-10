import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  criarPedido(dados: any) {
    return this.http.post(`${this.api}/requests`, dados, { headers: this.headers() });
  }

  meusPedidos() {
    return this.http.get(`${this.api}/requests`, { headers: this.headers() });
  }
}