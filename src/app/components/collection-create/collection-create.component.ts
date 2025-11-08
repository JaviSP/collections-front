import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollectionService } from '../../services/collection.service';
import { FieldDefinition, FieldType } from '../../models/field-definition.model';

@Component({
  selector: 'app-collection-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css']
})
export class CollectionCreateComponent {
  private collectionService = inject(CollectionService);
  private router = inject(Router);

  collectionName = signal('');
  collectionDescription = signal('');
  fieldDefinitions = signal<FieldDefinition[]>([]);
  
  fieldTypes: FieldType[] = ['text', 'number', 'date', 'image', 'url', 'textarea'];
  
  newFieldName = signal('');
  newFieldType = signal<FieldType>('text');
  newFieldRequired = signal(false);

  addField() {
    if (!this.newFieldName().trim()) {
      alert('Please enter a field name');
      return;
    }

    const field: FieldDefinition = {
      id: this.generateId(),
      name: this.newFieldName(),
      type: this.newFieldType(),
      required: this.newFieldRequired()
    };

    this.fieldDefinitions.update(fields => [...fields, field]);
    
    // Reset form
    this.newFieldName.set('');
    this.newFieldType.set('text');
    this.newFieldRequired.set(false);
  }

  removeField(id: string) {
    this.fieldDefinitions.update(fields => fields.filter(f => f.id !== id));
  }

  createCollection() {
    if (!this.collectionName().trim()) {
      alert('Please enter a collection name');
      return;
    }

    if (this.fieldDefinitions().length === 0) {
      alert('Please add at least one field definition');
      return;
    }

    this.collectionService.createCollection(
      this.collectionName(),
      this.collectionDescription(),
      this.fieldDefinitions()
    );

    this.router.navigate(['/']);
  }

  cancel() {
    this.router.navigate(['/']);
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}
