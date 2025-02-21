---
title: Project Euler problem 2 T-SQL
date: 2012-05-27
description: Euler problem 2 By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
img: http://upload.wikimedia.org/wikipedia/commons/d/dc/Pentagram_and_human_body_%28Agrippa%29.jpg
alt: Human body relationship to golden ration
---

Euler problem 2: By considering the terms in the Fibonacci sequence whose values do not exceed four million, find the sum of the even-valued terms.
This is a sort of running sum problem that used to be hard (before T-SQL in SQL server 2012) I solved it with known math formula and recursion with common table expression. Tomas as usual solved with single-statement magic.

Fibonacci can formula can be calculated by using golden ratio with Binets formula. (cool) .

I define a function to calculate Fibonacci for the term n as: golden ratio raised to n divided with sqr of 5 and the get the closest integer.
Or in T-SQL is:
![Alt text](http://upload.wikimedia.org/wikipedia/commons/d/dc/Pentagram_and_human_body_%28Agrippa%29.jpg "Human body relationship to golden ration")

```js
Create FUNCTION dbo.FiboN (@n int)
RETURNS int
AS
Begin
	DECLARE @phi float; --golden ratio
	SET @phi=(1+ SQRT(5))/2
	DECLARE @f AS float
	SET @f = FLOOR(POWER(@phi,@n)*SQRT(5)/5+0.5	)
	return (@f)
END;
```
I then use a common table expression in T-SQL to recursively find the sum unfortunately i had to limit to k<45 otherwize it ends with an overflow.

```js
DECLARE	 @int_tbl TABLE  ( k INTEGER) ;
With int_CTE( i ) as
(
Select 1 as j
union all
Select i +1
from int_CTE
where <1000
)
INSERT  INTO @int_tbl
Select i
From int_CTE N
Option (MaxRecursion 0);
WITH fib_serie (n,fibb) AS
(select
 k AS n, dbo.FiboN(k)AS fibb
from @int_tbl d
WHERE   k < 45
AND dbo.FiboN(k)%2=0
AND dbo.FiboN(k) <= 4000000
)
SELECT SUM(fibb)AS ProjectEuler_problem_2 FROM fib_serie;
```
My colleague Tomas solution do not use any fancy algorithms more the power of sets and SQL Server. I still do not understand how it can work. He starts by using all the columns in the sys tables to get a table with integers and then the magic happens where he can refer to the previous tuple with @current += @previous. I thought that was impossible with sets and T-SQL in 2008 version.

```js
USE master;
GO
DECLARE @current    bigint = 1
      ,@previous   bigint = 0
      ,@temp       bigint = 0
      ,@sum        bigint = 0
      ,@limit      bigint = 4000000;
SELECT TOP 50 @temp     = @current
            ,@current += @previous
            ,@previous = @temp
            ,@sum     += CASE WHEN @current % 2 = 0
                         AND @current < @limit
                         THEN @current ELSE 0 END
FROM sys.all_columns;
SELECT @current AS [current]
       , @previous AS previous
       , @temp AS temp
       , @sum  AS [sum of all even fibonacci numbers below 4M];
```

### Kommentarer:

#### Jane
Jag vill se resultat från Euler 3 + 4 NU!!!
Gärna med syntax från SQL 2012

#### Patrik
Japp jag ska börja med det nästa helg. Lösning kommer. Tomas har redan löst problem 3.

#### Fredrik
Euler 2

Lösning och förklaring

Timing[
Total[Select[Fibonacci /@
Range[1, NestWhile[(# + 1) &, 1, Fibonacci[#] <= 4*10^6 &] – 1],
EvenQ]
]]

{0., 4613732}

Fibonacci är en färdig funktion i Mathematica. Vilket är lite fuskigt jämfört m Patriks lösning. Några förklaringar- inifrån & ut:
Fibonacci[n] returnerar det n:te Fibonaccinumret.
Range[..] skapar en lista med heltal från 1 till det Fibonaccinummer som är mindre än vår gräns, .t.ex. 4 millioner. Övre gränsen för Range bestäms av funktionen NestWhile hjälper till med att hitta övre gränsen på listan med heltal.
Fibonacci /@ gör om lista av Fibonaccinummer n till tal genom att "mappa" funktionen Fibonacci på listan.
Select [lista, kriterier], väljer de element ur listan som uppfyller kriterier, ex. att elementen är jämna (görs med inbyggda funktinen EvenQ)
Total är en inbyggd funktion som summerar alla element i en lista.
Timing returnerar hur lång tid som datorn behövde på sig. Jag behövde öka till 10^200 för att det skulle ta någon nämnvärd tid, se nedan

Mathematicakoden blir svår att förstå i detalj om man är obekant med Mathematicas syntax för funktionell programmering (/@, &, etc.). Intuitivt så mappar det dock bra vis a vis problembeskrivningen.

Timing[
Total[Select[Fibonacci /@
Range[1, NestWhile[(# + 1) &, 1, Fibonacci[#] <= 4*10^200 &] – 1],
EvenQ]
]]

{0.031, 2486536980944494035657517433235891279450308298864884827272294875847635\
086470138534314038827005946268556581842513530802320498944542073091826135225017\
39061101416995758180656703597023916782383168918383040}

#### Patrik
Kul med Mathematica koden ska visa den för annan projektkollega Andreas Broström som är vän av Mathematica. Ja dess kod är intuitivt lätt att förstå. Vad betyder /@ och & ?
Jag hittade den här Mathematica Tips, Tricks, and Techniques

Där stod det:
5 Bells and Whistles. (Advanced)
5.1 How can I easily apply a function to a whole bunch of argument values?
To map a function onto a list, you can give the list to the function as its argument (enclosed
in square brackets).
Alternatively, you can use the mapping symbol @.

5.2 What’s a handy, powerful shorthand way to define functions? 8
Tip Most built-in Mathematica functions act on lists element-by-element. That is, Mathematica typically
maps functions across lists. Such functions have the Attribute Listable. Ify ou want to give this attribute
to your own function f, type SetAttributes[f,Listable].
5.2 What’s a handy, powerful shorthand way to define functions?
Use anonymous functions.
To write an anonymous pure function, we use two symbols. Immediately after the function definition,
use the symbol & to tell Mathematica that whatever preceded this symbol is a pure function. In the body of
the function, we represent the argument by the symbol #.

I T-SQL finns inte anonyma funktioner (mig veterligen). Men jag undrar om kan se @ operatorn ungefär som apply och cross apply funktionen i T-SQL. Ska fundera på det.

#### Fredrik
Ja, att sätta sin funktion till “Listable” är en smart möjlighet. Man kan iterera sig fram till något som fungerar för ett element och sedan slippa använda Map[..] .
/@ är kortformen för Map[f, {..}]:
Map[f, {a, b, c, d, e}]
{f[a], f[b], f[c], f[d], f[e]}

& är korformen för anonyma funktioner som du skriver. Praktiskt att ibland slippa behöva ge funktioner ett namn om man inte känner att de egentligen tillför något.