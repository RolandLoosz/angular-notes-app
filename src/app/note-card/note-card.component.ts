import { NotesService } from 'src/app/shared/notes.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { NoteDetailsComponent } from '../pages/note-details/note-details.component';
import {MatDividerModule} from '@angular/material/divider';
import { NotesListComponent } from '../pages/notes-list/notes-list.component';
@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {
  @Input('title') title: string;
  @Input('description') description: string;
  @Input('id') id: string;
  @Input('date') date: number;
  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  // user=JSON.parse(localStorage.getItem('user') as string) as firebase.default.User;
  // userId=this.user.uid;

  constructor(private notesService :NotesService,private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  deleteClicked() {
    //this.deleteEvent.emit();
    this.notesService.delete(this.id);
  }

  modifyNote(){
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NoteDetailsComponent, {
      width: '50%',
      autoFocus: true,
      disableClose: false,
      data:{
        id:this.id,
        title:this.title,
        description :this.description,

      }

    });
  }
}
