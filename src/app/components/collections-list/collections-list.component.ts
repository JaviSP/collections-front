import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-collections-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './collections-list.component.html',
  styleUrls: ['./collections-list.component.css']
})
export class CollectionsListComponent {
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  collections = this.collectionService.getCollections();

  navigateToCreate() {
    this.router.navigate(['/collections/create']);
  }

  deleteCollection(id: string) {
    if (confirm('Are you sure you want to delete this collection? This will also delete all items in it.')) {
      this.collectionService.deleteCollection(id);
    }
  }
}
