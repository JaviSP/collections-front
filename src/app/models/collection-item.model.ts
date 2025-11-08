export interface CollectionItem {
  id: string;
  collectionId: string;
  fieldValues: { [fieldId: string]: any };
  createdAt: Date;
  updatedAt: Date;
}
