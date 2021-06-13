import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide: any;
  hideConfirm: any;
  submitted = false;
  signUpForm: FormGroup;
 ;
  user: any;
  errorMessage = '';
  ifExist: boolean = false;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,50}$/;

  registrationRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  /**
  * Creates an instance of documenter.
  */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userServiceService:UserServiceService
  ) { }

  ngOnInit() {
    this.createSignUpForm();
  }

  /**
  * get : f
  * Purpose : returns form controls value
  * @return form controls 
  */
  get f() { return this.signUpForm.controls; }

  /**
  * Method : createSignUpForm
  * Purpose : First time Form initialization
  */
  createSignUpForm() {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
      newPassword: ['', [Validators.required]],
    },
    );
  }

  /**
  * Method : onSubmit
  * Purpose : Submit form for signup user 
  */
  onSubmit() {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    else {
      this.registrationRequest.firstName = this.signUpForm.value.firstName;
      this.registrationRequest.lastName = this.signUpForm.value.lastName;
      this.registrationRequest.email = this.signUpForm.value.email;
      this.registrationRequest.password = this.signUpForm.value.newPassword;
      this.signUp();

    }
  }

  /**
  * Method : signUp
  * Purpose : signUp the user
  */
  signUp() {
    this.userServiceService.signUp(this.registrationRequest).then((res: any) => {
      this.router.navigateByUrl('/login')
    }).catch(err => {
      this.ifExist = true;
      this.errorMessage = err.error.message;
      console.log(err);
    })
  }
}


