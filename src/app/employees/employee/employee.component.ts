/*
Author: rishu.gupta@gmail.com
Employee Util Class
Time Spent to Design this - 5 hrs
*/

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Department } from './idepartment';
import { Employee } from './iemployee';
import { DatePipe } from '@angular/common'
import { EmployeeService } from 'src/app/shared/employee.service';
declare var $: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private datepipe: DatePipe, private employeeService: EmployeeService) {
    this.getEmployeeData();
  }

  ngOnInit() {
  }

  //Trigger Success Msg
  showSuccessMsg: boolean = false;
  showWarningMsg: boolean = false;
  staticData: Employee = null;
  error: String;

  //Form Reactive Model
  employeeForm = new FormGroup({
    empFirstName: new FormControl('', [Validators.pattern('^[A-Z a-z]*$'), Validators.required]),
    empLastName: new FormControl('', [Validators.pattern('^[A-Z a-z]*$'), Validators.required]),
    empGender: new FormControl('', Validators.required),
    empDOB: new FormControl('', Validators.required),
    empDepartment: new FormControl('', Validators.required)
  });

  //Department is driven by the model not hard corded-  We can seperate into JSON even.
  departments: Department[] = [
    { value: 'CIB', viewValue: 'CIB' },
    { value: 'ERT', viewValue: 'ERT' },
    { value: 'CT', viewValue: 'CT' }
  ];

  //Save Fucntion to trigger Service Call
  saveEmployeeRerord() {
    var dateObj = this.employeeForm.value.empDOB;
    let latest_date = this.datepipe.transform(dateObj, 'dd/MM/yyyy');
    this.employeeForm.value.empDOB = latest_date;
    this.employeeForm.value.id = this.halperFunciton.genterateUniqueToken(5000);
    this.employeeService.sendEmployeeData(this.employeeForm.value).subscribe(response => {
      this.clearData();
      this.table.destroy();
      this.getEmployeeData();
      this.showSuccessMsg = true;
      setTimeout(() => {
        this.showSuccessMsg = false;
      }, 5000);
    });
  }

  //Helper Function Block to Add More util Function
  halperFunciton = {
    genterateUniqueToken: function (max: any) {
      return Math.floor(Math.random() * Math.floor(max));
    }
  }


  //Draw Table is the seperte Model only for Config
  table = null;
  drawTable(employeeList: Employee) {
    this.table = $('#employeetable').DataTable({
      "data": employeeList,
      "order": [[1, "asc"]],
      "columns": [
        { "data": "id" },
        { "data": "empFirstName" },
        { "data": "empLastName" },
        { "data": "empGender" },
        { "data": "empDOB" },
        { "data": "empDepartment" }
      ]
    });
  }

  //Service Call to get Employee List from Angular service
  getEmployeeData() {
    this.employeeService.getEmployeesData().subscribe(employeeList => {
      this.drawTable(employeeList);
    },
      error => {
        this.error = error;
        this.showWarningMsg = true;
        this.drawTable(this.staticData);
        setTimeout(() => {
          this.showWarningMsg = false;
        }, 5000);
      } // error path
    )

  }

  clearData() {
    this.employeeForm.reset();
  }


}
