import { UndoDeleteDialogService } from './../../services/undo-delete-dialog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'undoDelete-dialog',
  templateUrl: './undo-delete-dialog.component.html',
  styleUrls: ['./undo-delete-dialog.component.scss'],
})
export class UndoDeleteDialogComponent implements OnInit {
  constructor(public undoDialogService: UndoDeleteDialogService) { }

  ngOnInit(): void { }

  onUndoClick() {
    this.undoDialogService.result.emit({ result: 'undo button clicked' });
  }
}
