// ==UserScript==
// @name           TU_undoCloseTabButton.uc.js
// @namespace      TU_undoCloseTabButton@ithinc.cn
// @description    撤销关闭标签页按钮
// @include        main
// @compatibility  Firefox 4.0
// @author         ithinc
// @homepage       http://board.mozest.com/thread-32810-1-1
// @version        1.0.5.2
// @updateURL     https://j.mozest.com/ucscript/script/19.meta.js
// ==/UserScript==

/* :::: 撤销关闭标签页按钮 :::: */

(function TU_undoCloseTabButton() {
  var refNode = document.getElementById("downloads-button");
  if (!refNode)
    return;

  var button = refNode.parentNode.insertBefore(document.createElement("toolbarbutton"), refNode);
  button.setAttribute("id", "undoclosetab-button");
  button.setAttribute("class", "toolbarbutton-1 chromeclass-toolbar-additional");
  button.setAttribute("label", "Undo Close Tab");
  button.setAttribute("image", "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAVdJREFUOE9jYBgUQMvY5j8IIztG29jaQdPYZoGWsfV9TWPr91pG1htAYlgdrGfu8B+EYZJ6Zg7zYWIYNFAOwxAja5f/IKxvby9gaOWyH8bHRRtaO6MaYmLv8R+CvS4i2B7/Q5LyXi7duPsQCMdlVTxGljO29wyAu8Tcyfc/Oi5p7Lvx79+/mv///xuDMJBdlFHWchemzjUodj/cAGv3wP/IePayzceBGmLR/Xri4s0qmDoH74hvcHk7r7D/uDCyIQvWbVOGqfOOTP0Ml3Pyi/qPCyMb4B2RkgpTl1vddQ0uB3TuMlwY2QDP8JTnQL//B+FlG/f2kpSIPcMS5nuGJf4H4bzqrsdACzWJNsA7Im2+T2TafxCOzCj58uLVuyqiNQfGZu4H4v8gDEwLX05curEUGK1cRBtw5OzVKRmlTe9A+N37j9OBTpcnWjNIIUjD6w+f+kAYm80AwqgJcAXC0pYAAAAASUVORK5CYII=");
  button.setAttribute("command", "History:UndoCloseTab");
  button.setAttribute("tooltiptext", "Undo Close Tab");
  button.setAttribute("type", "menu-button");

  var popup = button.appendChild(document.createElement("menupopup"));
  popup.setAttribute("onpopupshowing", "this.parentNode.populateUndoSubmenu();");
  popup.setAttribute("oncommand", "event.stopPropagation();");
  popup.setAttribute("context", "");
  popup.setAttribute("tooltip", "bhTooltip");
  popup.setAttribute("popupsinherittooltip", "true");

  button._ss = Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore);
  button._undoCloseMiddleClick = HistoryMenu.prototype._undoCloseMiddleClick;
  button.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");

  var ss = document.styleSheets[0];
  ss.insertRule('#undoclosetab-button[disabled="true"] {opacity: 0.5 !important;}', ss.cssRules.length);

  UpdateUndoCloseTabCommand = function() {
    document.getElementById("History:UndoCloseTab").setAttribute("disabled", Cc["@mozilla.org/browser/sessionstore;1"].getService(Ci.nsISessionStore).getClosedTabCount(window) == 0);
  };
  UpdateUndoCloseTabCommand();
  gBrowser.mTabContainer.addEventListener("TabClose", function() {UpdateUndoCloseTabCommand();}, false);
  gBrowser.mTabContainer.addEventListener("SSTabRestoring", function() {UpdateUndoCloseTabCommand();}, false);
  gSessionHistoryObserver.observe = eval("(" + gSessionHistoryObserver.observe.toString().replace(/(?=}$)/, "UpdateUndoCloseTabCommand();") + ")");
})();