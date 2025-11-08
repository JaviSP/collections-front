export type FieldType = 'text' | 'number' | 'date' | 'image' | 'url' | 'textarea';

export interface FieldDefinition {
  id: string;
  name: string;
  type: FieldType;
  required: boolean;
}
