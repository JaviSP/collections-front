import { FieldDefinition } from './field-definition.model';

export interface Collection {
  id: string;
  name: string;
  description: string;
  fieldDefinitions: FieldDefinition[];
  createdAt: Date;
  updatedAt: Date;
}
