import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
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
    this.service.getAllUsers().subscribe((data: Employee[]) => {
      this.employees = data;
    });
  }

  create(): void {
    this.router.navigate(['/employees/create']);
  }

  edit(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }

  // ✅ RENAMED METHOD
  onDelete(id: number): void {
    if (window.confirm('Are you sure?')) {
      this.service.deleteUser(id).subscribe({
      next: () => {
      this.loadEmployees();
      },
      error: (err) => {
      console.error('Error deleting employee',err);
      }
      });
    }
  }
}
