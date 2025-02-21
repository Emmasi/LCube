---
title: Project Euler with T-SQL
date: 2012-05-26
description: Me and colleague in my current Project Tomas Eriksson  decided to start to try the Project Euler problemes in Microsoft SQL Servers  Language Transact SQL (T-SQL).
img: 
alt: 
---

Me and colleague in my current Project Tomas Eriksson  decided to start to try the Project Euler problemes in Microsoft SQL Servers  Language Transact SQL (T-SQL).
First problem was:
[Add all the natural numbers below one thousand that are multiples of 3 or 5.](https://projecteuler.net/problem=1)
I made my solution hack back in 2008. It has some flaws. But I post it here to invite criticism. ( Yes I know I should have used % for mod instead of floor, yes I know while loops in SQL do not earn respect)

— Euler 1. Add all the natural numbers below one thousand that are multiples of 3 or 5.

```js
declare @NumSerie table ( NatNum int )
declare @i int
select @i=1
While  (@i<1000)
Begin
    insert into @NumSerie (NatNum)
    select @i
    select @i=1+@i
End
select sum(NatNum) from @NumSerie
where NatNum*1.0/3-floor(NatNum*1.0/3)=0
or
NatNum*1.0/5-floor(NatNum*1.0/5)=0
```
Tomas solution is much more elegant although it does not work everywhere. But it works on the big and complex Enterprise database where he resides and the sys.objects has enough tuples to impress.

```js
USE
tempdb;GO
WITH
int_CTE AS (SELECT ROW_NUMBER() OVER (ORDER BY object_id)
        AS number FROM sys.objects)
SELECT SUM(number)FROM int_CTE WHERE
number < 1000 AND (number % 5 = 0 OR number % 3 = 0);
```

### Kommentar

#### Aaron
Just change FROM sys.objects
to FROM sys.objects o1, sys.objects o2

or sys.objects CROSS JOIN sys.objects

A cross-product join of two or three copies of the table is plenty for 1000 numbers.