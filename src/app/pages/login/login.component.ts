import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup = new FormGroup({
    email : new FormControl('', [Validators.email, Validators.required]),
    password : new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.loginform.valid) {
      this.authService.login(this.loginform.get("email")?.value, this.loginform.get("password")?.value
      ).then(result => {
        this.navigationTo('/home');
        // if(this.authService.isLoggedIn){
        //   this.isSignedIn = true
        // }
    
      }, (error) => {
        console.error(error);
        alert('Wrong username or password.')
      }
      );
    }
  }
  navigationTo(url: string): void {
    this.router.navigateByUrl(url);
  }

}
