
// 可以导入多文件的配置。默认在这个文件加载后执行。 include('');
// 调整位置3种方法: insertBefore, insertAfter, position

// 添加样式
// css('\
// /* 右键菜单 */ \
// #context-savepage
// { display: none; !important; }\
// ')

// app({
//     label: "重启浏览器",
//     oncommand: "Application.restart();"
// });


page([
    {   // 给 Firebug 换个快捷键
        id: "menu_firebug_firebugInspect",
        accesskey: "F",
        clone: false
    },
]);
/*
// Host Exceptions 设置显示条件
css('#exex-menu {display: none;}')
page({
    label: "Host Exceptions",
    oncommand: "ExEx.onCommand()",
    condition: "nolink noimage noselect nomedia noinput  nomailto"
}) */

// 标签右键菜单
tab([
    {
        label: "关闭右边所有的标签页",
        insertAfter: "context_closeOtherTabs",
        oncommand: function() {
            var tabs = gBrowser.mTabContainer.childNodes;
            for (var i = tabs.length - 1; tabs[i] != gBrowser.selectedTab; i--) {
                gBrowser.removeTab(tabs[i]);
            }
        }
    },
    {},
    {
        label: "复制标题",
        text: "%TITLE%",
        accesskey: "s"
    },
    {
        label: "复制标题+地址",
        text: "%TITLE%\n%URL%",
        accesskey: "d"
    },
/*    {
        label: "复制标题+地址(简短)",
        text: "%TITLES%\n%URL%",
        accesskey: "f"
    }, */
 /*    {
        label: "复制所有标签标题+地址",
        class: "copy",
        oncommand: function(){
            let text = "";
            let tabs = gBrowser.mTabContainer.childNodes;
            for (let i = 0, l=tabs.length; i < l; i++) {
                let win = tabs[i].linkedBrowser.contentWindow;
                text += win.document.title + "\n" +
                    win.location.href + "\n";
            }

            Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                .getService(Components.interfaces.nsIClipboardHelper).copyString(text);
        }
    },*/
    {},
    {   // 标签的右键菜单中加入复制图标网址的功能
        label: "复制 Favicon 的 URL",
        text: "%FAVICON%",
        accesskey: "g"
    },
    {
        label: "复制 Favicon 的 base64",
        text: "%FAVICON_BASE64%",
        accesskey: "h"
    }
]);

// 链接
css("#context-copylink {display: none}");  // 给自带的添加图标，先隐藏，后面添加
page([
    {
        label: "复制链接文本",
        accesskey: "C",
        text: "%LINK_TEXT%",
        insertAfter: "context-copylink",
        condition: "link noimage"
    },
    {
        label: "复制链接地址",
        accesskey: "Y",
        text: "%LINK%",
        insertAfter: "context-copylink",
        condition: "link noimage"
    },
])

// 图像
var imagesub = PageMenu({
    label: "Reverse Image Search",
    accesskey: "I",
    condition: "image",
    insertAfter: "context-inspect",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACxklEQVQ4jaXT72sbdQDH8fsDSh/3D9hDn7mJD33QJz4abI5JCBtVdKy4sSGUtbOiTKgOgnbTtcjowjoUklX6A+lcXL60sTbz0mtySdprm+bnJb3kmia5NtndjvD2wRC3h7r388/r2UeSXrf5+fmxFTnRTaZSaU3TphOJxIiqqh5ZlvsVRTmuKMpxWZb7VVX1JBKJEU3TppOpVHpFVrsLCwtjkhBCPIobLG21WCt00AyHXN2l1HhOueFQbjiUGs/J1100w2Gt0GFpq8WjeJWwWBaSEMtiOW0gZy0Suk3acNk0u2j7sFF1UbJ11jNV4rk68eIRatkmlrOIbLwErO0YbOgWmZpN/sCl2OyyqTe563/At9/fZfzOFLcn/dy68yN/pfNs6BbKThXxD6DlDQpVi72GjXnoUm05jIx+wfTMY3SzTeXgGeX9DuHVJBc/uUIqU0IrvAxkdfYPLKy2Tcd2ebK6yNkL51nKL1KwMhw5Lkd2l3K9w5c3J5ny30fLlhFCvAC+fhBlOrzLk1Sdsd+GOHntTT66PoTYXkbWV0nsxam0HHKmw8TPv/Pe+Ut85V9hMRT+F7gX2mU2ZhLabPPN1AwfXhlFLTXJ1m1KzS6FRpctw+bmZBDPheFXgadRP/HkHOrWH6xnNUS6Qv+7J4lpe1SaDjXLpma12a2YnD7rYW7+B35amH0BhIUIFdRhzO1RWvkbHBbHSMXu8fDhDN5z51hPqlTrJpl8jqufXmXCdwZz+3OK6jBChEJSMBg8tRaddXXtFoY2wuT4RQYGBvjOd51U5ANuXHuboUvvMHz5BH/++j7m9mfo2m2Up3NuMBg8JUmSJAUCgWORSGTQ5/Mder1e+vr62o8Xf2nX9Ag1PUK5HGtXCupusZgT6XR6IhqNfhwIBI698onBwcFxr9dLT0+PKUnSG//5VB6P563e3t6d/zV+nf4GlMZlg8I0vOAAAAAASUVORK5CYII=",
});
imagesub([
{
    label: 'Google Search',
    url: 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "http://www.google.com/favicon.ico"
}, 
{
    label: 'Baidu Search',
    url: 'http://stu.baidu.com/i?rt=0&rn=10&ct=1&tn=baiduimage&objurl=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoklEQVQ4jZ2T6UuUURSHzz9QRhCpJJVZERUFmVmp7bZYZiUttpiEVliEtCctJtGHPgQGEm1EUbQHUlCBWSI1NbagJfheX3XG1LSmhWL0NTtPH6ZmEulLF86XcznPPb/7O0eksAYprEEK3iKHqpED1Uj+a2TvK2TXC2SHG8lzIVufILkVyKZyJLsMySpF1t1HpLCG/z2ScQ+Rgre9LqzaTj1S0K7VVR0KYKxOtY2jvQAr7iBysLpH0nGUPTvaGBVTp5kZzWobh2mTGzVljldt4/QEpJcgsr8qmPj8qRuAXXltTB7fQE5mC26Xn7hx9cyd4cHt8vcEpN1GZN9rADyNXWxY26y5Oa1668ZXcjJbKC7yAVBc5KO4yIfb5cfr6QoBFt1EZPdLAK5d+sKQgZYmxjUogG0cOjtCsm3jsGrZO1YuadLWlh8BwPxriOysBOC5y09CbANLFzZxt+QbtnHYvKGFvC2t2Mbh2NGPTBpfT0ykwe3yK4DMvYLI9mcAdHfDjatftbjIp7ZxSE326ogoo2NibNYsf6e2cViW6iVtvlcb6gOOyKxLiGx7Gmyzo+MntnFIm+dlZJTR6HDDn1ixuElt4/D44XfltzKZfhGR3Iog4E1VJymzvYwYVMffxdHhhnHDbbIymrHrQlZK4nlENpUDoAqH89t18ACjQweaXoDBA4yOHWbzqPR78Gdl6jlEssuCgKMFHzS8r6WR/SwiwywN71OrEWEWUf0tHdTf0mERhssXvoQA8WcRySoNtuRp7GJLdivJSR7SU5o4cdzHieM+Zk1tJHZ0PRvXN9P2/kdIQtxpRNY9+Hu4FKgEnvwjKntM4sRTiKy+F1iK9BJkyW0k9Say4HrA49mXkZkXkaQLSMJ5ZMo5JP5M4OXYU8iEk/wC6ZkDX3ssK20AAAAASUVORK5CYII="
}, 
{
    label: 'Sougou Search',
    url: 'http://pic.sogou.com/ris?query=%IMAGE_URL%',
    condition: "image",
    where: "tab",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0klEQVQ4jZ3Sv2sUQRQH8FdsZSURK0tB8D/Qa3Iii1oIwcIuSnoLf4AigkUgWqQXLhgQQgqxDUHsrCTFtoJL4G53dmcvs7t37M3uODur97WYuPFMUM8Hr5vvZ+bxhvr9/mIQBHtBEOCkDsMQjDEwxhBFEeI4Bud8L0mSRSIiGgwGSfzgCrjr/Hs/vArGWEZEpykIgvnChy2EABF1ZoDh7XMo367D+B6mSuLX+j5K8PXju/ZslmUgom4LiJWL+JZGbaBhX1DtbKDa2YB6/wbG92B8rwXyPLdAGIbgroNqd3PmxvzJtT+OMB6PLcAYA3cdFK/u4/eqP3+C3F5D/uwmkqUzM0BRFBaIouhIXV+B9j5gqtUxbKoV5PYakhunwF0HUkoLxHF84hPTe5cwef0UxvdmILm1Cu46KMvSApzzNjR6voSD5fNHW7l19thoPzehlLLAcDhsA3+rqVbIHtlPp7W2gBCiBardzXZdTbxv1xnvw/ge5NYqxN0L7dm6ri2Qpul//URjjAWyLIsOXtyZKzx6uQwpZUpEXcrz/LoQIiuKApPJBFJKlGWJqqqglILWGnVdwxgDYwyapkFVVXmv13tMRJfpsBaIqENE3Tm6Q0QLPwAGVa1p0zMtjwAAAABJRU5ErkJggg=="
}, 
{
    label: 'TinEye Search',
    url: 'http://www.tineye.com/search?url=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRElEQVQ4jW3Tf0zUdRzH8Y9QkUHLOW9KYEmtGkziPMexDicMuB/Q0TFg2MQK2gkRP+JEQjhyJr8Kji/I7zhghLBkghvS6cFUfhxwcXLFFvpPK4iTWLM/+0NW7dkftwJX7+315+vxx2t7C3X9ZEy8ZWYxt64PveUWGsnxv1E3TJF8yUFK2wKJzXPEW2YW1fWTMSLBMr3Z3VTN2vkIhk1xaKXZf0sZHfPIM84gC1PxbGAI+4JfQhb4ArFqLeUDtzk77N4UGsnBNXMKK4VBTBSEo5EcaCUHxYMuDsmjEUI8lmOh+8mtbya5ppuMum6ERnJgaLCTYniLTGmcU1YXlpvLpGVloZUJSo4KqmOexvKmjK7UA/S2f8JHc79gmlzhw+t3vYBGchD5fhX5fQ4sN5dI77FT+2Uf9p6PGb3aSf9wHy2D/Vzs7KLA0kG+ZKWwyUpRc+828LZkI+ezTnJGnZTZlzFarOiyC4nUGHg5XIHsQBDyqGiSUtKRyWQE+D3JHv/d20DxoIuTHSMUX53myBvH0CTq0adlIHb5IITgOdl+XMvf8+iPP+m/MoKv327vLv8A58fuYbK5OXQkisOvy/n90RYAn7d2Inx8USXo2HkZWUYvoG6cJb5hhrKBWd7ttSF8nyI7J4/fHj5kdXWVv4CjquOEK1UsLC6SlpoKwNDomBeIqryB0mzjvdoh0lqG2RvyGrFqLaXnKjiVmQnA6fwi/J4JwDowRE11NQA9l7/yAkqzDaXZhrZmkqrriyR92o4QgtN5BWx41tna2iI6Ng4hBK+EHmbi1h1u35kiLELBnsCD24DSbMN0+S5VC6skVDQSoT9BZYuV7DPl7A15lefD5BxUqIgwZBKbV05yVQe5Y0uPA0qzjbNDS7S5PFTM/4xxzE32iJOiiXuUzPxE6fw6JY41yhY8SN/9SvP0j/8FlGYbxy/Yye9zUnfjPm1ODy0uD63frNPuXOPS1A9UXnGS1ziCIceMUFaMP9hZTmya4YP+OYq7xiltGsBYWEbSCSP6k7no0rOJM7zDi6EKdvk8gRDigVCUXtNFnvt6M/qCnSLbfWrdHmq/3eCie4PKqRVMrV8QH7qPAH9/goKDdz7Wpr8Qur8B/c1d/jmhRwsAAAAASUVORK5CYII="
}, 
{
    label: 'IQDB Search',
    url: 'http://iqdb.org/?url=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "data:image/png;base64,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"
}, 
{
    label: 'Regex Search',
    url: 'http://regex.info/exif.cgi/?url=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADpElEQVQ4jQXB2VPUBQDA8d9qjDwQRzSwhhCwu2MpwR7cIBDbcuoaLQuBICznEldcCxmgAoPAqrASBqikLosIq6BxyiEmKQ7E4TE19eJMM73YQ//Bt89HePvHKzbm7azP3mVjwc72yjRrD8dZvGdjeWqM9blJXv0yw5uns+ysTrO7Os328hRbi3Z2FicR1qZGsbUZGWkuZKytlNykaHzFYqReXiikEhKVQeRrorlmymN5oJGZy7U86K7C3lbCw7YihI15OzdairHU5xKrOIpItB+RSIRo33u4ODkjdnPnk4NeHJPJuFKZzYPLdUx0fIOtpQB7awHCxsI9rG1GOsr07N/ngKeTC0ovbyL8/PlSIeeEXI5CIkX6sS/JIUrsXd/y86Va7O1G5jrLEF48us9YRzk91dkcdHXDoFDSk6DhVkY6c0UGntWVM2WqIFoexGE/CZaGfJ4ON7PYW8ev/fUIm0vT2DoqGTlnJPyIDINcQV9CEqM6PSO6dMxfaXl0tg6bqRyZlw+jNaVs3u5i/VobL62dCFsrs4x3NTLR00ROUhyB4o+Qe/nQHKumPzMDrULJ4Gk9e12NVGrUPD97hnWrhcfXe/jd/gPCwv1xvi/OpsGQSb42kc/9Jah9JJhCotirrmHiZAZbRWX8PWRhq6+dgTIDSdFh9DWU8M/CTYSRwaskRAQTH6pAHaniVEgwdfJwypWhTBaU8qMuF7NOz+vhS+wNm1EHHcXDxYULlXm8WxlFuDk8REJUGOqIYDRRISSHqcgOkhPnK6Eq7gtuFBoxaRIYrTeyM9RNQXwEnh+4Ya4p4N2KDWH89i2+M+Qy2FTFw74uLtSUoQk8Qoq/jAplJAMpGQydysGkO86GuZU961WSQgLpbzTy75NJhN2leV4M9rJ5w8Lr8evsWgcZqa4iPSYavSyAYlUkyYEK6k4kstTTQok2BZX0MA1ZabwZsyD8+WSRv+5c5fngRZZ629kYG+G/7R3WxqwEHDqEt6s7kVIJ9WlJBMtkiJ3dSQ9TUpt8jO7c4whvn63y2zUzPeVFnM83cP/ceSba27E0mTgRFswRTzHhMn8OODji5yEmPyaM0vgIDHHhVKbGIrxcnmV1oBOzPpOfUtMYT89isaSEr0NV+Hp44u3+ISKRA67vO3NSFYg+VEFWlIq8mFBqtWqEx3etzF88x0xzK7OnC5kpqeBOaSnVqRqcDjji7OiE7tMAcpQKtIrPOKkKJCtChVETxRldAv8DCURA7EPC5P4AAAAASUVORK5CYII="
}, 
{
    label: 'saucenao Search',
    url: 'http://saucenao.com/search.php?db=999&url=%IMAGE_URL%',
    condition: "image",
    where: 'tab',
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVElEQVQ4ja2SwQ4AMARD+/8/bbdlw8ogcdK9RQsApNmQal2A359dgCK7j07tBmiBByGzWMjABsBMfaaQgdAYxwGtFVomMiGZDRxSYFLulCtFY8z2AmZhBhe3B+XrAAAAAElFTkSuQmCC"
}, ]);


page([
/* {
        label: 'Google 相似图片搜索',
        url : 'http://www.google.com/searchbyimage?image_url=%IMAGE_URL%',
        accesskey: "S",
        insertAfter: "context-viewimageinfo",
        condition: "image"
    }, */
    {
        label: '复制图像base64',
        text: "%IMAGE_BASE64%",
        insertAfter: "context-viewimageinfo",
        condition: "image"
    }, 
    {   // 替换 openImgRar.uc.js
        label: "打开图像RAR",
        accesskey: "R",
        condition: 'image',
        image: "moz-icon://file:///c:/program%20files/WinRAR/WinRAR.exe?size=16",
        insertBefore: "context-savevideo",
        oncommand: function(){
            var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
            try {
                var path = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefService).getCharPref("browser.cache.disk.parent_directory") + "\\Cache\\" + new Date().getTime() + ".rar";
                file.initWithPath(path);
            } catch (e) {
                var path = Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfLD", Components.interfaces.nsILocalFile).path + "\\Cache\\" + new Date().getTime() + ".rar";
            }
            file.initWithPath(path);
            Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"].createInstance(Components.interfaces.nsIWebBrowserPersist).saveURI(Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI((gContextMenu.mediaURL || gContextMenu.imageURL), null, null), null, null, null, null, file, null);
            setTimeout(function () {
                file.launch();
            }, 100);
        }
    }
]);


// 自定义子菜单，混杂
var pagesub = PageMenu({ label: "子菜单杂", accesskey: "z", image: "chrome://browser/content/abouthome/bookmarks.png"});
pagesub([
     {// 使用 Everything 搜索选中的文字
label: "Everything 搜索",
oncommand: function(){
var str = addMenu.convertText("-search %s");
addMenu.exec("C:\\Program Files\\Everything\\Everything.exe", str);
}
},
   {
       label: "用 Flvcd 解析当前页面",
       url: "http://www.flvcd.com/parse.php?kw=%URL_ENCODE%&flag=&format=high",
        condition: "nolink",
        where: "tab"
    },
    {
         label: "用 Flvcd 解析当前链接",
        url: "http://www.flvcd.com/parse.php?kw=%LINK_ENCODE%&flag=&format=high",
         where: "tab"
    },
	{label: "Google Site Search",
		accesskey: "s",
		url: "javascript:q%20=%20%22%22%20+%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection%20?%20document.getSelection()%20:%20document.selection.createRange().text);%20if%20(!q)%20q%20=%20prompt(%22%E8%AF%B7%E8%BE%93%E5%85%A5%E5%85%B3%E9%94%AE%E8%AF%8D:%22,%20%22%22);%20if%20(q!=null)%20{var%20qlocation=%22%20%22;qlocation=('http://www.google.com/search?num=30&hl=zh-CN&newwindow=1&q='+q+'&sitesearch='+location.host+'');window.open(qlocation);}%20void%200"
	},
	{label : "View Source",
		url   : "view-source:%l",
		accesskey: "s",
		where : "tab"
	},
	{label: "Google docs",
		url  : "http://docs.google.com/viewer?url=%l",
		accesskey: "d",
		where: "tab"
	},
	{label: "Google Translate",
		url: "http://translate.google.cn/translate?u=%u",
		condition: "nolink",
		accesskey: "t"
	},
	{label: "Google Web Cache",
		url: "http://webcache.googleusercontent.com/search?q=cache:%u",
		condition: "nolink",
		accesskey: "c"
	},
	{label: "Google Web Cache",
		url: "http://webcache.googleusercontent.com/search?q=cache:%l",
		accesskey: "c"
	},
    {
        label: "重新加载配置",
        accesskey: "r",
        oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);"
    },

	// {label: "Web Archive",
	// 	url: "http://web.archive.org/web/*/%u",
	// 	accesskey: "w",
	// 	condition: "nolink"
	// },
	// {label: "Web Archive",
	// 	accesskey: "w",
	// 	url: "http://web.archive.org/web/*/%l"
	// },
	{},
    {
        label: "Mouseover DOM Inspector",
        url: "javascript:void(z=document.body.appendChild(document.createElement('script')));void(z.language='javascript');void(z.type='text/javascript');void(z.src='http://slayeroffice.com/tools/modi/modi.js');void(z.id='modi');"
    },
    {},
    {
        label: "明文显示密码",
        condition: "input",
        url: "javascript:(function()%7Bvar%20IN,F;IN=document.getElementsByTagName('input');for(var%20i=0;i<IN.length;i++)%7BF=IN%5Bi%5D;if(F.type.toLowerCase()=='password')%7Btry%7BF.type='text'%7Dcatch(r)%7Bvar%20n,Fa;n=document.createElement('input');Fa=F.attributes;for(var%20ii=0;ii<Fa.length;ii++)%7Bvar%20k,knn,knv;k=Fa%5Bii%5D;knn=k.nodeName;knv=k.nodeValue;if(knn.toLowerCase()!='type')%7Bif(knn!='height'&&knn!='width'&!!knv)n%5Bknn%5D=knv%7D%7D;F.parentNode.replaceChild(n,F)%7D%7D%7D%7D)()"
    },
    {
        label: "页面可见区域截图",
        condition: "noinput",
        oncommand : function() {
            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.innerWidth;
            canvas.height = content.innerHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, content.pageXOffset, content.pageYOffset, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
        }
    },
    {
        label: '页面所有区域截图',
        condition: "noinput",
        oncommand: function() {
            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = content.document.documentElement.scrollWidth;
            canvas.height = content.document.documentElement.scrollHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(content, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
        }
    },
    {
        label : '浏览器界面截图',
        condition: "noinput",
        oncommand: function() {
            var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "canvas");
            canvas.width = innerWidth;
            canvas.height = innerHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawWindow(window, 0, 0, canvas.width, canvas.height, "rgb(255,255,255)");
            saveImageURL(canvas.toDataURL(), content.document.title + ".png",  null, null, null, null, document);
        }
    },
    { },
	{label: "在侧边栏打开",
		condition: "noselect nomedia noinput nomailto",
		ccesskey: "b",
		oncommand: function(event) {
			var title = gContextMenu.onLink? gContextMenu.linkText() : gContextMenu.target.ownerDocument.title;
			var url = gContextMenu.linkURL || gContextMenu.target.ownerDocument.location.href;
			openWebPanel(title, url);
		}
	},
	{ },
	{label: "重新加载配置",
		accesskey: "r",
		oncommand: "setTimeout(function(){ addMenu.rebuild(true); }, 10);"
	}
]);


// IE 等外部程序菜单
var execute = PageMenu({ label: "外部应用程序", accesskey: "E", class: "exec" });
execute([
	{
		label: "用 IE 打开当前页面",
		text: "%u",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe",
		accesskey: "I",
		condition: "nolink"
	},
	{
		label: "用 IE 打开当前链接",
		text: "%l",
		accesskey: "I",
		exec: "C:\\Program Files\\Internet Explorer\\iexplore.exe"
	},
    {
        label: "用 Qian Xun 打开当前页面 ",
        text : "%u",
        exec : "c:\\Users\\hu\\AppData\\Local\\qianxun\\1.0.100.524\\qianxun.exe",
        accesskey: "O",
        condition: "nolink"
    },
    {
        label: "用 Qian Xun 打开当前链接",
        text : "%l",
        accesskey: "O",
        exec : "c:\\Users\\hu\\AppData\\Local\\qianxun\\1.0.100.524\\qianxun.exe",
    },
	{
		label: "用 Chrome 打开当前页面",
		text: "%u",
		exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\TheWorld6\\Application\\TheWorld.exe",
		accesskey: "C",
		condition: "nolink"
	},
	{
		label: "用 Chrome 打开当前链接",
		text: "%l",
		exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\TheWorld6\\Application\\TheWorld.exe",
		accesskey: "C",
	},
	{
		label: "用 Chrome 打开当前页面(禁用扩展)",
		text: "%u -disable-extensions",
		exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
		accesskey: "E",
		condition: "nolink"
	},
	{
		label: "用 Chrome 打开当前链接(禁用扩展)",
		text: "%l -disable-extensions",
		exec: Services.dirsvc.get("LocalAppData", Ci.nsILocalFile).path + "\\Google\\Chrome\\Application\\chrome.exe",
		accesskey: "E",
	},
]);

var selmenu = PageMenu({ label: "选取范围", condition:"select", accesskey: "R", insertBefore: "context-sep-open" });
selmenu([
	{
		label: "站内搜索"
		,url: "http://www.google.com.hk/search?q=site:%HOST%+%SEL%"
	},
    {
		label: "勾选所有选择框"
		,icon: "checkbox"
		,checked: true
		,oncommand: function(event) {
			addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a){
				a.checked = true;
			});
		}
	},
    {
		label: "取消所有选择框"
		,icon: "checkbox"
		,oncommand: function(event) {
			addMenu.$$('input[type="checkbox"]:not(:disabled)', null, true).forEach(function(a){
				a.checked = false;
			});
		}
	},
]);