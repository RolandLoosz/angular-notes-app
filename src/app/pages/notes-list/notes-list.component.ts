import { NoteDetailsComponent } from './../note-details/note-details.component';
import { Router } from '@angular/router';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      // entry animation (from void to any state)
      transition('void => *', [
        // set initial state
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,

          // 'expand' out the padding properties because of a browser bug (Firefox etc.)
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0
        }),
        // animate the spacing (height, margin)
        animate('50ms', style({
          height: '*', // * : height of the element
          'margin-bottom': '*',
          paddingTop: '*',
          paddingBottom: '*',
          paddingLeft: '*',
          paddingRight: '*'
        })),
        animate(180)
      ]),
      // delete animation (anystate to void state)
      transition('* => void', [
        // scale up
        animate(50, style({
          transform: 'scale(1.05)'
        })),
        // scale down back to normal size and fade out
        animate(50, style({
          transform: 'scale(1)',
          opacity: 0.75
        })),
        // scale down, fade out completely
        animate('120ms ease-out', style({
          transform: 'scale(0.7)',
          opacity: 0,
        })),
        // then animate the spacing (height, margin, padding)
        animate('150ms ease-out', style({
          height: 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingLeft: 0,
          paddingRight: 0,
          'margin-bottom': '0'
        }))
      ])
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(':enter', [
          style({
            opacity: 0,
            height: 0
          }),
          stagger(100, [
            animate('0.2s ease')
          ])
        ], {
          optional: true
        })

      ])
    ])
  ]
})
export class NotesListComponent implements OnInit {

  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  pageSlice = this.notes.slice(0, 3);

  constructor(private notesService: NotesService, private router: Router,private dialog: MatDialog) { }

  ngOnInit(): void {
    // retreive all notes from NotesService
    this.notesService.getAll().subscribe(data=> {
      this.notes=data;
      this.filteredNotes = this.notes;
    });

    console.log("Notes tömb elemei:");
    console.log(this.notes);

    //location.reload();
  }

  reloadCurrentPage() {
    window.location.reload();
  }

  addNote() {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(NoteDetailsComponent, {
      width: '70%',
      autoFocus: true,
      disableClose: false,

    });
  };



  filter(query: string) {
    query = query.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    let terms: string[] = query.split(' ');

    terms = this.removeDuplicates(terms);

    terms.forEach(term => {
      let results: Note[] = this.relevantNotes(term);
      // merge arrays
      allResults = [...allResults, ...results]
    });

    // particular note can be the result of many search terms -> remove duplicates
    let uniqueResults = this.removeDuplicates(allResults);
    this.filteredNotes = uniqueResults;
  }

  removeDuplicates(arr: Array<any>) : Array<any> {
    let uniqueResults: Set<any> = new Set<any>();
    arr.forEach(e => uniqueResults.add(e));

    return Array.from(uniqueResults);
  }

  relevantNotes(query: string) : Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter(note => {
      if (note.description?.toLowerCase().includes(query) || note.title.toLowerCase().includes(query)) {
        return true;
      }
      return false;
    })

    return relevantNotes;
  }

  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.notes.length) {
      endIndex = this.notes.length;
    }
    this.pageSlice = this.notes.slice(startIndex, endIndex);
  }

}
