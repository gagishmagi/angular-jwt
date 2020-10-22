import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading:Boolean =  false;
  submitted:Boolean = false;
  returnUrl: String = '';
  error: String = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {

    if(this.authService.currentUserValue){
      this.router.navigateByUrl('/');
    }

   }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return ;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error,
            this.loading = false
          }
        )
  }

}
