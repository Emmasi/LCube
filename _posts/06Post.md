---
title: Project Euler problem 4 T-SQL
date: 2012-06-07
description: Project Euler problem 4 was easier then 3. A palindromic number reads the same both ways. The largest...
img: 
alt: 
---

Project Euler problem 4 was easier then 3. A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91*99
Find the largest palindrome made from the product of two 3-digit numbers.
[Palindromic number](https://en.wikipedia.org/wiki/Palindromic_number)

```js
USE tempdb
WITH Scheherazade (i) AS
( 
SELECT TOP 600  ROW_NUMBER()OVER(ORDER BY object_id)+399
  FROM sys.all_objects  
  ) 
SELECT TOP 11 a.i,b.i , a.i*b.i AS j
    FROM Scheherazade  a CROSS JOIN Scheherazade  b  
    WHERE 
    FLOOR((a.i*b.i)%1000000/100000)=FLOOR((a.i*b.i)%10/1) 
    AND FLOOR((a.i*b.i)%100000/10000)=FLOOR((a.i*b.i)%100/10) 
    AND FLOOR((a.i*b.i)%10000/1000)=FLOOR((a.i*b.i)%1000/100)
    ORDER BY a.i*b.i desc;
```

Tomas solution uses the REVERSE function. I have never thought of using REVERSE on numbers.

```js
-- Problem 4
-- Find the largest palindrome made from the product of two 3-digit numbers.
USE tempdb;
GO
 
WITH Numbers_CTE AS    (
                        SELECT ROW_NUMBER() OVER (ORDER BY object_id) AS number
                        FROM 
                            sys.all_columns
                       )
    ,Products_CTE AS (
                      SELECT DISTINCT n1.number * n2.number AS product
                                     ,REVERSE(n1.number * n2.number) AS reverseproduct
                      FROM
                          Numbers_CTE AS n1
                      CROSS JOIN
                          Numbers_CTE AS n2
                      WHERE n1.number BETWEEN 100 AND 999
                      AND   n2.number BETWEEN 100 AND 999
                     )
SELECT TOP 1 product AS [largest palindrome]
FROM Products_CTE
WHERE product = reverseproduct
ORDER BY product DESC;
```

### Kommentarer

#### Christer
Eftersom jag inte kommit på hur man får färgsyntax att fungera på denna blogg, så lämnar jag en länk till min lösning här:

http://tribonacci.blogspot.se/2012/06/euler-4.html

Fick tyvärr inte det att gå snabbare än 50 ms.

#### Patrik
Min ligger kring 200–300ms och Tomas på 380 ms ca. So you beat us.