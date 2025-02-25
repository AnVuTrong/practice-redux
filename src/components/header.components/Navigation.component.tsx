import React from 'react';
import { NavigationItem } from './NavigationItem.component';
import { NAVIGATION_ITEMS } from '../../constants/navigation.constant';

export const Navigation = () => {
  return (
    <div className="flex-1 flex justify-center">
      <div className="bg-[#e5e7eb] rounded-lg flex">
        {NAVIGATION_ITEMS.map((item, index) => (
          <NavigationItem 
            key={item.path} 
            {...item} 
            isFirst={index === 0} 
          />
        ))}
      </div>
    </div>
  );
}; 