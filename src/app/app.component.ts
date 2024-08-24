import { Component, OnInit } from '@angular/core';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CRUD-Angular';
  rowHeight = 40;

  columnDefs = [
    { field: 'name', editable: true },
    { field: 'experience', editable: true },
    { field: 'gender', editable: true },
    { field: 'hobbies', editable: true },
    { field: 'salary', editable: true },
    {
      headerName: 'Actions',
      cellRenderer: (params: any) => {
        return `
          <button class="btn btn-success" onclick="onSave(${params.data._id})">Save</button>
          <button class="btn btn-danger" onclick="onDelete(${params.data._id})">Delete</button>
          <button class="btn btn-warning" onclick="onEdit(${params.data._id})">Edit</button>
        `;
      }
    }
  ];

  rowData: any[] = [];

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.service.getEmployees().subscribe(data => {
      this.rowData = data;
    });
  }

  addEmployee() {
    const newEmployee = { name: '', experience: '', gender: '', hobbies: '', salary: 0 };
    this.service.addEmployee(newEmployee).subscribe(employee => {
      this.rowData = [...this.rowData, employee];
    });
  }

  updateEmployee(id: string, updatedData: any) {
    this.service.updateEmployee(id, updatedData).subscribe(() => {
      console.log('Employee updated successfully');
    }, error => {
      console.error('Error updating employee:', error);
    });
  }

  deleteEmployee(id: string) {
    this.service.deleteEmployee(id).subscribe(() => {
      this.rowData = this.rowData.filter(emp => emp._id !== id);
    }, error => {
      console.error('Error deleting employee:', error);
    });
  }

  onSave(newEmployee:any) {
    this.service.addEmployee(newEmployee).subscribe(employee => {
      console.log(employee)
    });
    // const updatedData = this.rowData.find(emp => emp._id === id);
    // if (updatedData) {
    //   this.updateEmployee(id, updatedData);
    // }
  }

  onDelete(id: string) {
    this.deleteEmployee(id);
  }

  onEdit(id: string) {
    // Handle edit logic here (e.g., open a modal with the employee data)
  }
}
