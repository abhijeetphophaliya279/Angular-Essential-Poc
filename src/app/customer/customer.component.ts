import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, FormArray } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs/operators';
import { NumberValidater } from '../shared/number.validater';


function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  console.log('emailControl.value ' + emailControl.value);
  console.log('confirmControl.value ' + confirmControl.value);


  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };
}


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  constructor(private fb: FormBuilder) { }
  emailMessage: string;

get addresses() : FormArray {
  return <FormArray>this.customerForm.get('addresses');
}

  private validationMessages = {
    required: 'This field is required. ',
    email: 'Please enter valid email address. ',
    minlength: 'Please enter atleast 5 characters. ',
    match: 'Email and Confirm email does not match '
  }


  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
        confirmEmail: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      }, { validator: emailMatcher }),
      sendCatalog: false,
      phone: '',
      notificationType: 'email',
      rating: [null, [NumberValidater.RatingRange(1, 5)]],
      addresses: this.fb.array([this.buildAddress()]) 
    })

    this.customerForm.get('notificationType').valueChanges.subscribe(
      value => this.setNotification(value)
    );


    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000))
      .subscribe(
        value => this.setMessage(emailControl)
      );

  }

  deleteAddress(index:number): void {
    this.addresses.removeAt(index);
  }
  
  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }
  
buildAddress() : FormGroup {
  return this.fb.group({
    addressType: 'home',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: ''
  })
}


  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }


  save() {
    console.log(this.customerForm);
    console.log('Saved' + JSON.stringify(this.customerForm.value));
  }

  populateDetails() {
    this.customerForm.patchValue({
      firstName: 'Abhijeet',
      lastName: 'Phophaliya',
      sendCatalog: true
    })
  }

  setNotification(notificationVia: string): void {
    const phoneControl = this.customerForm.get('phone');

    if (notificationVia == 'phone') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
