import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './employee-form.component.html'
})
export class EmployeeFormComponent implements OnInit {

  form!: FormGroup;
  id?: number;

  constructor(
    private fb: FormBuilder,
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      emailid: ['', Validators.required],
      monbno: ['', Validators.required]
    });

    // read id from URL (edit mode)
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.getUserById(this.id).subscribe(data => {
        this.form.patchValue(data);
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;

    if (this.id) {
      // EDIT
      this.service.updateUser(this.id, this.form.value).subscribe(() => {
        alert('Updated successfully');
        this.router.navigate(['/employees']);
      });
    } else {
      // CREATE
      this.service.createUser(this.form.value).subscribe(() => {
        alert('Created successfully');
        this.form.reset();
        this.router.navigate(['/employees']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }
}
