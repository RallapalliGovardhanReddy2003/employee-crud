import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];

  showPopup = false;
  selectedId?: number;
  sendEmail: boolean = false;
  sendSms: boolean = false;


  employee: Employee = {
    firstname: '',
    lastname: '',
    emailid: '',
    monbno: 0
  };

  constructor(private service: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.service.getAllUsers().subscribe(data => {
      this.employees = data;
    });
  }

  openCreate(): void {
    this.selectedId = undefined;
    this.employee = { firstname: '', lastname: '', emailid: '', monbno: 0 };
    this.sendEmail=false;
    this.sendSms=false;
    this.showPopup = true;
  }

  openEdit(emp: Employee): void {
    this.selectedId = emp.id;
    this.employee = { ...emp };
    this.sendEmail=false;
    this.sendSms=false;
    this.showPopup = true;
  }

  submit(): void {
    if (this.selectedId) {
      // UPDATE
      this.service.updateUser(this.selectedId, this.employee).subscribe(() => {
        alert('Employee updated successfully');
        this.afterSave();
      });
    } else {
      // CREATE
      this.service.createUserWithFlags(this.employee,this.sendEmail,this.sendSms
      ).subscribe(() => {
        alert('Employee created successfully');
        this.afterSave();
      });
    }
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete?')) {
      this.service.deleteUser(id).subscribe(() => {
        alert('Employee deleted successfully');
        this.loadEmployees();
      });
    }
  }

  afterSave(): void {
    this.showPopup = false;
    this.loadEmployees();
  }

  closePopup(): void {
    this.showPopup = false;
  }
}
