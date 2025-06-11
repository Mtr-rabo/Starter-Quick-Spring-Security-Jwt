import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Profile } from '../../model/profile.model';
import { ProfileService } from '../../services/profile';
import { UserService } from '../../services/user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../services/loading';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
})
export class CreateUser implements OnInit {
  user: User = { username: '', email: '', password: '' };
  profile: Profile = {};
  profiles: Profile[] = [];
  userId!: number;

  constructor(
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    if (history.state.user) {
      this.user = history.state.user;
      this.user.profileId = this.user.profile?.id;
    } else {
      console.log('User ID from route non trouver', this.userId);
    }
    this.loadProfiles();
  }
  loadProfiles(): void {
    this.loadingService
      .withLoading(this.profileService.getProfileData())
      .subscribe((data: Profile[]) => {
        this.profiles = data;
      });
  }
  createUser(): void {
    if (this.userId) {
      // Mise à jour de l'utilisateur existant
      this.user.id = this.userId;
      this.userService.updateUser(this.user).subscribe((updatedUser: User) => {
        updatedUser.profileId = this.user.profile?.id;
        console.log('User updated:', updatedUser);
        this.router.navigate(['/admin/users']);
      });
      return;
    }
    this.userService.createUser(this.user).subscribe((createdUser: User) => {
      console.log('User created:', createdUser);
      this.router.navigate(['/admin/users']);
    });
  }
  onCancel() {
    this.router.navigate(['/admin/users']);
  }
}
