import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [],
  template: `<h1>{{ user?.name }}</h1>`,
  standalone: true
})
export class UserComponent implements OnInit {
  user: { name: string } | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUser().subscribe((data) => {
      this.user = data;
    });
  }
}
