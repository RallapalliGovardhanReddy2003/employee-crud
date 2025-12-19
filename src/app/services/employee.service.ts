import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8085/employees';

  constructor(private http: HttpClient) {}



  createUser(employee: Employee): Observable<Employee> {
  return this.http.post<Employee>(`${this.baseUrl}/createuser`,employee)
  };

   createUserWithFlags(employee: Employee, sendEmail: boolean, sendSms: boolean) {
       return this.http.post(
         `${this.baseUrl}/createuser?sendEmail=${sendEmail}&sendSms=${sendSms}`,
         employee
       );
     }
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
      `${this.baseUrl}/harddelete/${id}`
    );
  }
  getAllUsersWithDeleted(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/getalluserswithdeleted`);

}
}
