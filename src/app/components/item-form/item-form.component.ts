import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';
import { Collection } from '../../models/collection.model';
import { CollectionItem } from '../../models/collection-item.model';
import { FieldDefinition } from '../../models/field-definition.model';

@Component({
  selector: 'app-item-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  private collectionService = inject(CollectionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  collection = signal<Collection | undefined>(undefined);
  item = signal<CollectionItem | undefined>(undefined);
  isEditMode = signal(false);
  fieldValues: { [fieldId: string]: any } = {};

  ngOnInit() {
    const collectionId = this.route.snapshot.paramMap.get('id');
    const itemId = this.route.snapshot.paramMap.get('itemId');

    if (collectionId) {
      const coll = this.collectionService.getCollectionById(collectionId);
      if (coll) {
        this.collection.set(coll);
        
        // Initialize field values
        coll.fieldDefinitions.forEach(field => {
          this.fieldValues[field.id] = '';
        });

        if (itemId) {
          // Edit mode
          this.isEditMode.set(true);
          const existingItem = this.collectionService.getItemById(itemId);
          if (existingItem) {
            this.item.set(existingItem);
            this.fieldValues = { ...existingItem.fieldValues };
          } else {
            this.router.navigate(['/collections', collectionId]);
          }
        }
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  saveItem() {
    const coll = this.collection();
    if (!coll) return;

    // Validate required fields
    for (const field of coll.fieldDefinitions) {
      if (field.required && !this.fieldValues[field.id]) {
        alert(`${field.name} is required`);
        return;
      }
    }

    if (this.isEditMode()) {
      const item = this.item();
      if (item) {
        this.collectionService.updateItem(item.id, this.fieldValues);
      }
    } else {
      this.collectionService.createItem(coll.id, this.fieldValues);
    }

    this.router.navigate(['/collections', coll.id]);
  }

  cancel() {
    const coll = this.collection();
    if (coll) {
      this.router.navigate(['/collections', coll.id]);
    }
  }

  getInputType(fieldType: string): string {
    switch (fieldType) {
      case 'number':
        return 'number';
      case 'date':
        return 'date';
      case 'url':
        return 'url';
      case 'image':
        return 'url';
      default:
        return 'text';
    }
  }
}
