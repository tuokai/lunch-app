import React from 'react';
import Menu from './Menu';
import './MenuList.css';

const MenuList = ({ children }) => (
  <div className="MenuList">
    { children.map((menu, i) => (
      <Menu
        key={i}
        isFetching={menu.isFetching}
        isError={menu.isError}
        data={menu.data} />
    ))}
  </div>
);

export default MenuList;
