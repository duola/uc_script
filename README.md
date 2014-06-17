## 存放些自己用的UC脚本
### [addMenuPlus](https://github.com/duola/uc_script/tree/master/addMenuPlus)
增强Firefox右键菜单、标签页功能，可以调用外部软件（工具）
* `addMenuPlus.uc.js` 为功能脚本
* `_addmenu.js` 为上面脚本配置

### [TU_undoCloseTabButton](https://github.com/duola/uc_script/tree/master/TU_undoCloseTabButton)
撤销关闭标签页按钮，图标位置修改为下载按钮前
```js
(function TU_undoCloseTabButton() {
  var refNode = document.getElementById("downloads-button");
  if (!refNode)
    return;
```

### [标签页加强整合](https://github.com/duola/uc_script/tree/master/%E6%A0%87%E7%AD%BE%E9%A1%B5%E5%8A%A0%E5%BC%BA%E6%95%B4%E5%90%88)
从网上找的一些标签页增强，如：
* 右键关闭
* 新标签打开：书签、历史、搜索栏、地址栏
* 中键点击bookmark菜单不关闭
* 总在当前标签右则打开新标签
* 关闭当前标签后转到左边的标签
* 鼠标停留标签自动聚焦
* 自动关闭下载产生的空白标签
* 双击关闭标签页

### [AddonsPage](https://github.com/duola/uc_script/tree/master/AddonsPage)
附件组件页面右键新增查看所在目录，详细信息页面新增安装地址或路径，新增 uc脚本管理页面。