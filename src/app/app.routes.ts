import { Routes } from '@angular/router';
import { CollectionsListComponent } from './components/collections-list/collections-list.component';
import { CollectionCreateComponent } from './components/collection-create/collection-create.component';
import { CollectionDetailComponent } from './components/collection-detail/collection-detail.component';
import { ItemFormComponent } from './components/item-form/item-form.component';

export const routes: Routes = [
  { path: '', component: CollectionsListComponent },
  { path: 'collections/create', component: CollectionCreateComponent },
  { path: 'collections/:id', component: CollectionDetailComponent },
  { path: 'collections/:id/items/create', component: ItemFormComponent },
  { path: 'collections/:id/items/:itemId/edit', component: ItemFormComponent },
  { path: '**', redirectTo: '' }
];
