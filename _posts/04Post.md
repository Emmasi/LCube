---
title: Sortera kinesiska tecken i javascript
date: 2012-05-28
description: För att träna på att skriva plug-in till jQuery komponenten Datatables så har jag gjort en websida http://sorting.lcube.se/ . Där kan man prova sortera på olika begrepp med min plug-in.
img: 
alt: 
---

![Kinesiska tecken](http://upload.wikimedia.org/wikipedia/commons/a/a4/Chinese_characters_logo.jpg)


För att träna på att skriva plug-in till jQuery komponenten Datatables så har jag gjort en websida: http://sorting.lcube.se/ . Där kan man prova sortera på olika begrepp med min plug-in. Jag tänker förklara hur jag förstått hur kinesiska tecken sorteras samt utveckla hur jag gör  och vilka bekymmer som uppstår. Det första problemet jag hade var att jag trodde att 三 (san1) kom efter 二 (Er4). Det här måste vara en bugg var min första reflektion. Men efter att ha sovit på saken så insåg jag att  talet 3  三 (san1) har ju radikalen 一 vilket har färre streck än vad teckent för två som har två streck i sin radikal.

Min plugin är idag bara ett fåtal rader i javascript. Tricket för att sortera kinesiska tecken  är att använda javascripts localCompare. Det finns dock kända problem med olika webläsare som jag tänkte undersöka och skriva mer om här.

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
To start learning to write a plug-in for jQuery component Datatables  I have made a webpage  http://sorting.lcube.se/. You can try to sort on different terms there. I plan to explain how Chinese characters are sorted and tell how I make the sorting and what troubles i get into.
The first problem I had was that i thought  三 (san1) came after 二 (Er4). I was convinced that this was a bug. But after thinking about it I realized that number 3  三 (san1) has the radical 一 which has fewer strokes than the character for two which has two strokes in its radical.

Today there are just a few lines of code in the javascript. The trick is to use javascripts localCompare (localCompare ref). There are however known problem with this function for different web browsers. Allan Jardine author of Datatables have pointed this out to me. I will try to explore this further here on my blog and see if this gives problem for sorting Chinese characters.