'use client';
import { createContext, useContext } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { LuGripVertical } from 'react-icons/lu';

const HandleContext = createContext(null);

// Generic drag-to-reorder list. `ids` is an array of stable ids (numbers/strings).
// `onReorder(newIds)` is called after a drop. Children are SortableItem nodes.
export const Sortable = ({ ids, onReorder, layout = 'vertical', children }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = ids.indexOf(active.id);
    const newIndex = ids.indexOf(over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onReorder(arrayMove(ids, oldIndex, newIndex));
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleEnd}>
      <SortableContext
        items={ids}
        strategy={layout === 'grid' ? rectSortingStrategy : verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export const SortableItem = ({ id, className = '', children }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    zIndex: isDragging ? 10 : undefined,
  };
  return (
    <HandleContext.Provider value={{ attributes, listeners }}>
      <div ref={setNodeRef} style={style} className={className}>
        {children}
      </div>
    </HandleContext.Provider>
  );
};

// Drag handle — place anywhere inside a SortableItem.
export const DragHandle = ({ className = '' }) => {
  const ctx = useContext(HandleContext);
  return (
    <button
      type="button"
      aria-label="Prevuci za promenu redosleda"
      className={`cursor-grab active:cursor-grabbing text-text-muted hover:text-accent touch-none ${className}`}
      {...(ctx?.attributes ?? {})}
      {...(ctx?.listeners ?? {})}
    >
      <LuGripVertical className="w-4 h-4" />
    </button>
  );
};
