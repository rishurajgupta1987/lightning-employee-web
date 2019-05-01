import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeComponent } from './employee.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'


fdescribe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, MatInputModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule,
        BrowserModule, ReactiveFormsModule, HttpClientModule
      ],
      declarations: [EmployeeComponent],
      providers: [DatePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //Validate the entire form
  it('Employee Form will be invalid if Any value is Empty', () => {
    expect(component.employeeForm.valid).toBeFalsy();
  });

  //Checks if input type has any sought of special chars other than alphabets
  it('Employee Form will be invalid if First Name or last name has any special chars', () => {
    component.employeeForm.controls['empFirstName'].setValue("&*&^^&");
    expect(component.employeeForm.controls['empFirstName'].hasError('pattern')).toBeTruthy();
  });
});
