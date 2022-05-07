import { AuthService } from 'src/app/shared/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit, OnDestroy {

  constructor(private authService:AuthService, private router: Router ) { }

  navigationTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    alert('You are leaving the webpage. Goodbye!');
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('login');
  }

}
