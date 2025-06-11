import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-list-users',
  standalone: false,
  templateUrl: './list-users.html',
  styleUrl: './list-users.css',
})
export class ListUsers implements OnInit {
  users: User[] = [];
  loading = false;
  constructor(
    private userService: UserService,
    private router: Router,
    public loadingService: LoadingService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loadingService
      .withLoading(this.userService.getUserData())
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }
  deleteUser(userId: number): void {
    alert(`vous voulez supprimer l'utilisateur avec l'ID : ${userId}?`);
    this.userService.deleteUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
    });
  }

  updateUser(user: User): void {
    console.log('=====================');
    console.log(user);

    this.router.navigate(['/admin/update-user', user.id], {
      state: { user: user }, // 👈 Passage de l'objet ici
    });
  }
}
