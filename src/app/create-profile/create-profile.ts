import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../services/loading';
import { Profile } from '../model/profile.model';
import { Role } from '../model/role.model';
import { RoleService } from '../services/role-service';

@Component({
  selector: 'app-create-profile',
  standalone: false,
  templateUrl: './create-profile.html',
  styleUrl: './create-profile.css',
})
export class CreateProfile implements OnInit {
  profile: Profile = {};
  roles: Role[] = [];
  rolesItemSelect: Role[] = [];
  profileId!: number;
  constructor(
    private profileService: ProfileService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute,
    public loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.profileId = Number(this.route.snapshot.paramMap.get('id'));

    if (history.state.profile) {
      this.profile = history.state.profile;
    } else {
      console.log('Profile ID from route non trouver', this.profileId);
    }
    this.loadRoles();
  }
  loadRoles(): void {
    this.loadingService
      .withLoading(this.roleService.getRoleData())
      .subscribe((data: Role[]) => {
        this.roles = data;
      });
  }
  /*   roleChecked(role: Role): void {
      role.checked = !role.checked;
    } */
  createProfile(): void {
    this.profile.roles = this.roles.filter((r) => r.checked == true);
    if (this.profileId) {
      // Mise à jour du profil existant
      this.profile.id = this.profileId;
      this.profileService
        .updateProfile(this.profile, this.profileId)
        .subscribe((updatedProfile: Profile) => {
          console.log('Profile updated:', updatedProfile);

          this.router.navigate(['/admin/profiles']);
        });
      return;
    }

    console.log(this.profile);

    this.profileService
      .createProfile(this.profile)
      .subscribe((createdProfile: Profile) => {
        console.log('Profile created:', createdProfile);

        this.router.navigate(['/profiles']);
      });
  }
}
