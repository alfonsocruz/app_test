class Menu {
  mapMenus(data) {
    let menus_parents = data.filter(i => i.parentID === 0);
    let menus = [];

    menus_parents.forEach(item => {
      if (item.collapse === 1) {
        let submenus = data.filter(i => i.parentID === item.idMenu);
        menus.push({ ...item, submenus: submenus });
      } else {
        menus.push({ ...item, submenus: [] });
      }
    });

    return menus;
  }
}

module.exports = new Menu();
