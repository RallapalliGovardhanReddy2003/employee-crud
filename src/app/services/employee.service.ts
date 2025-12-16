import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8085/User';

  constructor(private http: HttpClient) {}

  createUser(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>('http://localhost:8085/User/createuser',employee)
  };

  getAllUsers(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/getallusers`);
  }

  getUserById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/getuser/${id}`);
  }

  updateUser(id: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/updateuser/${id}`,
    employee);

  }

  deleteUser(id: number) {
    return this.http.delete<void>(
      `http://localhost:8085/User/harddelete/${id}`
    );
  }

}
