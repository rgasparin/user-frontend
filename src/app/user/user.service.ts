import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { User } from "./user";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private headers = new HttpHeaders().set('Content-Type','application/json');
  private static RESOURCE_URI: string = environment.api.contextPath + "/user";
  constructor(private http:HttpClient) { }

  public save(user: User): Observable<User> {
      return this.http
          .put<User>(UserService.RESOURCE_URI, user);
  }

  public findById(id: number): Observable<User> {
    return this.http.get<User>(UserService.RESOURCE_URI+ "/"+id);
  }

  public findByParam(filter: User): Observable<User> {
    let params = this.setParams(filter);
    return this.http.get<User>(UserService.RESOURCE_URI+ "/findParam", {params: params});
  }

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(UserService.RESOURCE_URI+"/find-all");
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(UserService.RESOURCE_URI+ "/"+id, {headers:this.headers});
  }

  setParams(filter : User) : HttpParams {
		let params = new HttpParams();

		if (filter.name) {
			params = params.set('name', filter.name);
		}
		if (filter.cpf) {
			params = params.set('uf', filter.cpf);
		}

		return params;
	  }
}
