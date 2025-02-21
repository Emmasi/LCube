---
title: 排序中国汉字字符 javascript – Datatables – jQuery
date: 2012-06-27
description: 为了学习为jQuery 的 组件数据表写插件 ，我为其做了一个专门的网站http://sorting.lcube.se/。
img: https://www.lcube.se/wp-content/uploads/2012/06/fiveeight.png
alt: kinatecken
---

为了学习为jQuery 的 组件数据表写插件 ，我为其做了一个专门的网站http://sorting.lcube.se/ 。您可以尝试为不同的术语排序。我打算解释中国字符的排序，并告诉大家我的排序方法和在此期间遇到的麻烦。

我遇到的第一个问题是，我认为三是在二之后出现的。我曾经深信这是一个错误。但通过仔细思考之后，我意识到数字3三的部首里的笔画数少于二的部首数量，二的部首里有两个笔画。

今天，在JavaScript只有少许的几行代码 。诀窍是使用 localCompare ( 参考 )。然而众所周知这一功能在不同的网页浏览器存在这问题。DataTables 的作者Allan Jardine给我指出了这一点。我会在我的博客上进一步探索看是否给汉字排序带来问题。

![Kinatecken](https://www.lcube.se/wp-content/uploads/2012/06/fiveeight.png )

```js
$.fn.dataTableExt.oSort['chinese-string-asc'] = function (s1, s2) {
    return s1.localeCompare(s2);
};
$.fn.dataTableExt.oSort['chinese-string-desc'] = function (s1, s2) {
    return s2.localeCompare(s1);
};

/* Main function*/
function ColorDataTablesInit(tableDivId) {
   

    $(tableDivId).dataTable({
        "sPaginationType": "full_numbers",
        "aoColumnDefs": [{
            "sType": "chinese-string",
            "aTargets": [1,2,3,4]
        }]
    });
    
}
```

### Kommentarer

#### Christer
Har du sett om det finns någon sajt med kinesiska tecken där ett teckens ritordning framgår av färger?

Antag att ett tecken utgörs av tio streck. Då ska man se vilket streck som ritas frst genom att det är ljusast.
Det sista strecket kan vara svart.

Man ska också kunna se vilken ända av strecket som ritas först genom att strecket blir mörkare i slutet.
(blev inspirerad av din bild)

#### Patrik
Ja det finns ett projekt på wikipedia. Bilden är från kinesiska wikpedia. Klicka på den och då kommer du till slut fram till: Stroke_Order_Project

Bilderna finns sedan här: Red stroke order images . Det finns även animerade gif här: Animated stroke order gif images . Ska du göra något spännande med bilderna ?

#### Manoj
I found myself nodding my noggin all the way thhogur