import { NotesListComponent } from './../notes-list/notes-list.component';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss']
})
export class NoteDetailsComponent implements OnInit {
  ttl: string = "";

  note: Note;
  noteId: number;
  new: boolean;
  notes: Note[] = new Array<Note>();

  noteform = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl(''),
  });

  constructor(private notesService: NotesService, private _snackBar: MatSnackBar, private router: Router, private route: ActivatedRoute, public dialogRef: MatDialogRef<NoteDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id:string, title:string, description:string }) { }

  ngOnInit(): void {
    this.noteform.patchValue({id: this.data?.id,title:this.data?.title, description: this.data?.description});

  }

  openSnackBar(message) {
    this._snackBar.open(message, null, {
      duration: 3000
    });
  }


  onSubmit() {
    if (!this.noteform.get('id')?.value) {

      this.notesService.create(this.noteform.value);
    }else{
      this.notesService.update(this.noteform.value);
    }

    this.dialogRef.close();
  }

  cancel() {
    this.noteform.reset();
    this.dialogRef.close();
  }

}
