import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-item.html',
  styleUrls: ['./task-item.scss']
})
export class TaskItemComponent implements OnChanges {
  @Input() task!: {
    id: number;
    title: string;
    completed: boolean;
    editing: boolean;
  };

  @Output() delete = new EventEmitter<number>();
  @Output() complete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();
  @Output() save = new EventEmitter<{ id: number; title: string }>();

  editedTitle = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task']) {
      this.editedTitle = this.task.title;
    }
  }

  onSave() {
    if (this.editedTitle.trim()) {
      this.save.emit({ id: this.task.id, title: this.editedTitle.trim() });
    }
  }
}
