import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskItemComponent } from '../task-item/task-item';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TaskItemComponent
  ],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})
export class TaskListComponent {
  newTask = '';
  tasks;

  constructor(public taskService: TaskService) {
    this.tasks = this.taskService.tasks;
  }

  addTask() {
  console.log('🟡 addTask called!');
  console.log('Input:', this.newTask);

  const trimmed = this.newTask.trim();
  if (trimmed) {
    this.taskService.addTask(trimmed);
    this.newTask = '';
    console.log('✅ Task added.');
  } else {
    console.log('⛔ Empty input, not adding.');
  }
}

  deleteTask(id: string | number) {
  this.taskService.deleteTask(id.toString());
}

  toggleComplete(task: Task) {
    this.taskService.updateTask({
      ...task,
      completed: !task.completed
    });
  }

  // ✅ Add this method to handle inline edit mode
  editTask(task: Task) {
    task.editing = true;
  }

  // ✅ Add this method to handle saving the edited title
  saveEdit(id: string | number, title: string) {
    const taskToUpdate = this.tasks().find(t => t._id === id || t.id === id);
    if (taskToUpdate) {
      this.taskService.updateTask({
        ...taskToUpdate,
        title,
        editing: false
      });
    }
  }
}
