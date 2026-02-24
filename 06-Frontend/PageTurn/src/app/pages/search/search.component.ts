import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { COVER_PLACEHOLDER } from '../../Constants/cover';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  imports: [NavbarComponent, CommonModule, RouterModule],
})
export class SearchComponent {
  readonly coverPlaceholder = COVER_PLACEHOLDER;
  searchResults: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.searchResults = history.state.searchData;
    console.log(this.searchResults);
  }
}
