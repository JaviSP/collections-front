import { Injectable, signal } from '@angular/core';
import { Collection } from '../models/collection.model';
import { CollectionItem } from '../models/collection-item.model';
import { FieldDefinition } from '../models/field-definition.model';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private collections = signal<Collection[]>([]);
  private items = signal<CollectionItem[]>([]);

  constructor() {
    this.loadFromLocalStorage();
  }

  // Collection methods
  getCollections() {
    return this.collections.asReadonly();
  }

  getCollectionById(id: string): Collection | undefined {
    return this.collections().find(c => c.id === id);
  }

  createCollection(name: string, description: string, fieldDefinitions: FieldDefinition[]): Collection {
    const collection: Collection = {
      id: this.generateId(),
      name,
      description,
      fieldDefinitions,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.collections.update(collections => [...collections, collection]);
    this.saveToLocalStorage();
    return collection;
  }

  updateCollection(id: string, updates: Partial<Collection>): void {
    this.collections.update(collections => 
      collections.map(c => 
        c.id === id 
          ? { ...c, ...updates, updatedAt: new Date() }
          : c
      )
    );
    this.saveToLocalStorage();
  }

  deleteCollection(id: string): void {
    this.collections.update(collections => collections.filter(c => c.id !== id));
    this.items.update(items => items.filter(i => i.collectionId !== id));
    this.saveToLocalStorage();
  }

  // Item methods
  getItemsByCollectionId(collectionId: string): CollectionItem[] {
    return this.items().filter(item => item.collectionId === collectionId);
  }

  getItemById(id: string): CollectionItem | undefined {
    return this.items().find(i => i.id === id);
  }

  createItem(collectionId: string, fieldValues: { [fieldId: string]: any }): CollectionItem {
    const item: CollectionItem = {
      id: this.generateId(),
      collectionId,
      fieldValues,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.items.update(items => [...items, item]);
    this.saveToLocalStorage();
    return item;
  }

  updateItem(id: string, fieldValues: { [fieldId: string]: any }): void {
    this.items.update(items =>
      items.map(i =>
        i.id === id
          ? { ...i, fieldValues, updatedAt: new Date() }
          : i
      )
    );
    this.saveToLocalStorage();
  }

  deleteItem(id: string): void {
    this.items.update(items => items.filter(i => i.id !== id));
    this.saveToLocalStorage();
  }

  // Helper methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('collections', JSON.stringify(this.collections()));
    localStorage.setItem('items', JSON.stringify(this.items()));
  }

  private loadFromLocalStorage(): void {
    const collectionsData = localStorage.getItem('collections');
    const itemsData = localStorage.getItem('items');
    
    if (collectionsData) {
      const collections = JSON.parse(collectionsData);
      // Convert date strings back to Date objects
      collections.forEach((c: Collection) => {
        c.createdAt = new Date(c.createdAt);
        c.updatedAt = new Date(c.updatedAt);
      });
      this.collections.set(collections);
    }
    
    if (itemsData) {
      const items = JSON.parse(itemsData);
      // Convert date strings back to Date objects
      items.forEach((i: CollectionItem) => {
        i.createdAt = new Date(i.createdAt);
        i.updatedAt = new Date(i.updatedAt);
      });
      this.items.set(items);
    }
  }
}
