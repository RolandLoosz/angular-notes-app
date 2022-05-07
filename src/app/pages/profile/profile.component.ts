import { AuthService } from '../../shared/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl ,Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public authservice: AuthService) { }

  ngOnInit(): void {
  }
  newpasswordform: FormGroup = new FormGroup({
    newpassword1: new FormControl('', [Validators.minLength(6), Validators.required]),
    newpassword2: new FormControl('', [Validators.minLength(6), Validators.required]),
  });

  submitPassword() {
    let password1 = this.newpasswordform.controls['newpassword1'].value;
    let password2 = this.newpasswordform.controls['newpassword2'].value;
    if (password1 === password2) {
      this.authservice.newPassword(password1).then(res => {
        this.onClearPassword();
      });
    }
  }

  onClearPassword() {
    this.newpasswordform.reset();
  }

 
}
