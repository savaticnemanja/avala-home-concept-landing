// Public URL for an uploaded image. Files live in the uploads dir and are
// served statically at /uploads/<filename>. Safe to import in client code.
export const imageUrl = (filename) => (filename ? `/uploads/${filename}` : '');
