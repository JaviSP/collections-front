import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CollectionService } from '../../services/collection.service';
import { Collection } from '../../models/collection.model';
import { CollectionItem } from '../../models/collection-item.model';

@Component({
  selector: 'app-collection-detail',
  imports: [CommonModule],
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent implements OnInit {
  private collectionService = inject(CollectionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  collection = signal<Collection | undefined>(undefined);
  items = signal<CollectionItem[]>([]);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const coll = this.collectionService.getCollectionById(id);
      if (coll) {
        this.collection.set(coll);
        this.loadItems(id);
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  loadItems(collectionId: string) {
    this.items.set(this.collectionService.getItemsByCollectionId(collectionId));
  }

  navigateToAddItem() {
    const coll = this.collection();
    if (coll) {
      this.router.navigate(['/collections', coll.id, 'items', 'create']);
    }
  }

  navigateToEditItem(itemId: string) {
    const coll = this.collection();
    if (coll) {
      this.router.navigate(['/collections', coll.id, 'items', itemId, 'edit']);
    }
  }

  deleteItem(itemId: string) {
    if (confirm('Are you sure you want to delete this item?')) {
      this.collectionService.deleteItem(itemId);
      const coll = this.collection();
      if (coll) {
        this.loadItems(coll.id);
      }
    }
  }

  backToCollections() {
    this.router.navigate(['/']);
  }

  getFieldValue(item: CollectionItem, fieldId: string): any {
    return item.fieldValues[fieldId] || 'N/A';
  }

  formatValue(value: any, fieldType: string): string {
    if (value === null || value === undefined || value === '') {
      return 'N/A';
    }
    
    if (fieldType === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    if (fieldType === 'image' && value) {
      return value; // Will be used in img src
    }
    
    return String(value);
  }
}
