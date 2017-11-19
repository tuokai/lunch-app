import React from 'react';
import Menu from './Menu';

const MenuList = ({ children }) => (
  <div>
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
