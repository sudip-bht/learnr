"use client";
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

const DraggableCard = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      header: 'Course 1',
      length: "12:24",
      author: "Manis",
    },
    {
      id: 2,
      header: 'Course 2',
      length: "2:24",
      author: "Shyam",
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
  
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
  
        const updatedItems = arrayMove(items, oldIndex, newIndex);
  
        // Log the updated order to the console
        console.log('New item order:', updatedItems.map(item => item.header));
  
        return updatedItems;
      });
    }
  };
  

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {items.map((item) => (
            <SortableItem 
              key={item.id} 
              id={item.id} 
              header={item.header} 
              length={item.length}
              author = {item.author}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default DraggableCard;