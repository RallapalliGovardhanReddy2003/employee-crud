import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  constructor(
    private service: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.service.getAllUsers().subscribe({
      next: (data: Employee[]) => {
        console.log('Employees:', data);
        this.employees = data;   // ✅ UI binding
      },
      error: (err) => {
        console.error('API Error:', err);
      }
    });
  }

  create(): void {
    this.router.navigate(['/employees/create']);
  }

  edit(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  delete(id: number): void {
    console.log('delete', id);
  }
}
