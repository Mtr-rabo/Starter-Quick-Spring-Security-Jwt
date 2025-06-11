import { Component } from '@angular/core';
import { Profile } from '../model/profile.model';
import { ProfileService } from '../services/profile';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading';
import { AuthService } from '../services/auth-service';

@Component({
  selector: 'app-list-profile',
  standalone: false,
  templateUrl: './list-profile.html',
  styleUrl: './list-profile.css',
})
export class ListProfile {
  profiles: Profile[] = [];
  loading = false;
  constructor(
    private profileService: ProfileService,
    private router: Router,
    public loadingService: LoadingService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProfiles();
  }

  loadProfiles(): void {
    this.loadingService
      .withLoading(this.profileService.getProfileData())
      .subscribe((data: Profile[]) => {
        this.profiles = data;
      });
  }

  deleteProfile(profileId: number): void {
    alert(`vous voulez supprimer le profil avec l'ID : ${profileId}?`);
    this.profileService.deleteProfile(profileId).subscribe(() => {
      this.profiles = this.profiles.filter(
        (profile) => profile.id !== profileId
      );
    });
  }

  updateProfile(profile: Profile): void {
    console.log(profile);

    this.router.navigate(['/admin/update-profile', profile.id], {
      state: { profile: profile },
    });
  }
}
