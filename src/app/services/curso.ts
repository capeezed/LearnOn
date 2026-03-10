import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CursoService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService) {}

  private headers() {
    return new HttpHeaders({ Authorization: `Bearer ${this.auth.getToken()}` });
  }

  catalogo(topic?: string) {
    const params = topic ? `?topic=${topic}` : '';
    return this.http.get(`${this.api}/courses${params}`);
  }

  meusCursos() {
    return this.http.get(`${this.api}/courses/my`, { headers: this.headers() });
  }

  detalhe(id: number) {
    return this.http.get(`${this.api}/courses/${id}`);
  }

  salvarProgresso(id: number, dados: any) {
    return this.http.post(`${this.api}/courses/${id}/progress`, dados, { headers: this.headers() });
  }

  minhaAgenda() {
    return this.http.get(`${this.api}/schedules`, { headers: this.headers() });
  }

  perguntas(cursoId: number) {
    return this.http.get(`${this.api}/courses/${cursoId}/questions`, { headers: this.headers() });
  }

  fazerPergunta(cursoId: number, question: string) {
    return this.http.post(`${this.api}/courses/${cursoId}/questions`, { question }, { headers: this.headers() });
  }
}