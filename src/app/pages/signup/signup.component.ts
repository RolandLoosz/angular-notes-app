import { UserService } from './../../shared/user.service';
import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  password2: any;
  alertMessage = '';

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router,private userService: UserService) { }

  registerform: FormGroup = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.minLength(6), Validators.required]),
      password2: new FormControl('', [Validators.minLength(6), Validators.required]),
    },
    Validators.required
  );

  async register() {
    if (this.registerform.valid) {

      if (this.registerform.value.password === this.registerform.value.password2) {

        this.authService.signup(this.registerform.get("email")?.value, this.registerform.get("password")?.value
        ).then(result=> {
          const user: User = {
            id: result.user?.uid as string,
            email: this.registerform.get('email')?.value,
          };
          this.userService.create(user).then(_ => {

        }).catch(error => {
            console.error(error);
          })
          this.navigationTo('/login');
        }, (error) => {
          this.alertMessage = (error.code === 'email-already-in-use')
            ? this.alertMessage='Email' : this.alertMessage='';
        }
        );
      }else {
        this.alertMessage = 'The password fields are not the same.';
      }
    }
  }

  navigationTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
