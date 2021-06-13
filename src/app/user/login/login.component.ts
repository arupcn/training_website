import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: any;
  submitted = false;
  noLoginFound = false;
  errorMessage = '';
  loginRequest = {
    email: '',
    password: ''
  };

  /**
  * Creates an instance of documenter.
  */
  constructor(
    private formBuilder: FormBuilder,
    private userServiceService:UserServiceService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.initializationForm();
    localStorage.clear();
  }

  /**
  * get : f
  * Purpose : returns form controls value
  * @return form controls 
  */
  get f() { return this.loginForm.controls; }

  /**
  * Method : initializationForm
  * Purpose : First time Form initialization
  */
  initializationForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  /**
  * Method:  onSubmit
  * Purpose : Login user if valid user
  */
  onSubmit() {
    this.submitted = true;
    this.noLoginFound = false;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.loginRequest.email = this.loginForm.value.email;
      this.loginRequest.password = this.loginForm.value.password;
      this.login();
    }
  }
  
  /**
  * Method:  login
  * Purpose : login with user
  */
  login() {
    this.userServiceService.login(this.loginRequest).then((res: any) => {
      localStorage.setItem('accessToken',res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      this.router.navigateByUrl('/dashboard')
    }).catch(err => {
      this.noLoginFound = true;
      this.errorMessage = err.error.message;
      console.log(err);
    })
  }


  }
