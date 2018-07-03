import React from 'react';
import Menu from './Menu';
import AntellMenu from './AntellMenu';
import './MenuList.css';

const MenuList = ({ sodexoMenus, antellMenus }) => (
  <div className="MenuList">
    {sodexoMenus.map((menu, i) => (
      <Menu key={i} { ...menu } />
    ))}
    {antellMenus.map((menu, i) => (
      <AntellMenu key={i} { ...menu } />
    ))}
  </div>
);

export default MenuList;
