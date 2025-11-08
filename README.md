# Collections Manager - Web Application

A modern web application for managing any kind of collections (stickers, mugs, URLs, etc.) built with Angular.

## Features

- **Dynamic Collection Creation**: Define custom fields for each collection with different data types
- **Flexible Item Management**: Add items with custom field values specific to each collection
- **Multiple Field Types**: Support for text, number, date, image URLs, web URLs, and textarea fields
- **Required Field Validation**: Mark fields as required during collection setup
- **Local Storage**: All data is stored in the browser's local storage
- **Responsive Design**: Clean, modern UI that works on different screen sizes

## Architecture

This is the frontend webapp layer of a three-tier application:
- **Frontend (This Repo)**: Angular web application
- **Backend/API**: Java/Spring Boot (separate repository)
- **Database**: PostgreSQL (separate repository)

Currently, the webapp uses local storage for data persistence. It's designed to be easily integrated with a REST API backend.

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)

### Installation

```bash
# Install dependencies
npm install

# Start development server
ng serve

# Navigate to http://localhost:4200/
```

### Build

```bash
# Build for production
npm run build

# The build artifacts will be stored in the `dist/` directory
```

## Usage

1. **Create a Collection**:
   - Click "Create New Collection"
   - Enter a name and description
   - Define fields for your collection items (e.g., "Title", "Year", "Price")
   - Choose field types and mark required fields
   - Click "Create Collection"

2. **Manage Collection Items**:
   - Click "View Items" on any collection
   - Click "Add Item" to create new items
   - Fill in the custom fields you defined
   - Edit or delete items as needed

3. **Delete Collections**:
   - Click "Delete" on any collection card
   - This will remove the collection and all its items

## Field Types

- **text**: Single-line text input
- **number**: Numeric values
- **date**: Date picker
- **url**: Web URL with link display
- **image**: Image URL with preview
- **textarea**: Multi-line text input

## Development

### Project Structure

```
src/app/
├── components/          # Angular components
│   ├── collections-list/    # Main collections list view
│   ├── collection-create/   # Create new collection
│   ├── collection-detail/   # View collection items
│   └── item-form/           # Create/edit items
├── models/             # TypeScript interfaces
│   ├── collection.model.ts
│   ├── collection-item.model.ts
│   └── field-definition.model.ts
├── services/           # Angular services
│   └── collection.service.ts
└── app.routes.ts       # Route configuration
```

### Technology Stack

- **Angular 19**: Modern web framework with standalone components
- **TypeScript**: Type-safe development
- **CSS**: Custom styling (no external UI framework)
- **LocalStorage API**: Client-side data persistence

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Running unit tests

To execute unit tests with the Karma test runner:

```bash
ng test
```

## Future Enhancements

- Integration with REST API backend
- User authentication and authorization
- Image upload functionality
- Search and filter capabilities
- Export/import collections
- Collection sharing
- Advanced field types (dropdown, multi-select, etc.)

## Additional Resources

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## License

This project is part of a portfolio/learning application.
