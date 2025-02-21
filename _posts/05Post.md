---
title: Project Euler problem 3 T-SQL Find Prime factors
date: 2012-06-06
description: Project Euler Problem 3 is The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143 ? 
img: https://upload.wikimedia.org/wikipedia/commons/a/a2/Portrait_of_Eratosthenes.png
alt: Portrait of Eratosthenes
---

Project Euler Problem 3 is: The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143 ? I thought of finding prime numbers and try to divide the number 600851475143 with them and then check if I found all the factors and finding the biggest one.

For finding primes quickly under 10 millions Sieve of Eratosthenes is wellknown algorithm that has been around for 2500 years. ( What I do not understand of the algorithm is that I only have to check up to the square root of the number serie see row 23. If I hade done this myself I would have looped till then of the list of numbers I am checking )

![Alt text](https://upload.wikimedia.org/wikipedia/commons/a/a2/Portrait_of_Eratosthenes.png "Portrait of Eratosthenes")

```js
USE tempdb
SET NOCOUNT ON 
DECLARE @IntSeq  AS TABLE (j int IDENTITY(1,1)
        PRIMARY KEY clustered ,	isPrime BIT DEFAULT 0 )
DECLARE @n INT,@p INT,@j INT  ,@ToFactor BIGINT
SET @n=10000;
--pull upp integer sequence with 10000 rows
-- I grab 100 rows and cross join them to get 
-- the rows I think suffice. Cross join is more then  20 times 
--faster then a while loop for this number grabbing
WITH NumRange (num_int) AS
(SELECT TOP 100 ROW_NUMBER()OVER (ORDER BY object_id)
  FROM sys.columns) 
  INSERT  @IntSeq (isPrime)
SELECT  1 
    FROM NumRange one CROSS JOIN NumRange sqr  ; 

    -- 1 is not a prime   
UPDATE @IntSeq SET isPrime=0 WHERE j=1
    -- Find primenumbers less then @n with  
    -- the Sieve of Eratosthenes
UPDATE @IntSeq SET isPrime=0 WHERE j=1
SET @p=2
  while SQUARE(@p)  <  @n 
  BEGIN
	SET @j = SQUARE(@p)

      while (@j =<  @n) 
       BEGIN
	UPDATE @IntSeq SET isPrime=0 WHERE j=@j
	    SET @j += @p
        END   
	    SELECT @p=MIN(j) 
            FROM  @IntSeq 
            WHERE isPrime=1 AND j<@p   
   END
  -- End the Sieve of Eratosthenes
   -- now list good candidates for biggest primefactor
SET @ToFactor = 600851475143 
SELECT j,LOG(j)[Log of j] FROM @IntSeq 
WHERE isPrime=1 AND @ToFactor%j=0
ORDER BY j DESC
-- if sum of logs and log(600851475143) are same then
-- product of all factors I found are the same
SELECT SUM(LOG(j))-LOG(@ToFactor)IfZeroAllFactorAreFound 
FROM @IntSeq WHERE isPrime=1 AND @ToFactor%j=0
```
My senior colleague Tomas solution solves the problem in a single select and with brute force. I liked the triangulare join at the end.

```js
 --Find the largest prime factor of a composite number.
USE tempdb;
GO

DECLARE @composite  bigint = 600851475143;

     -- Create a numbers table 
     -- Max available composite depends on the number 
     -- of objects in the database, ~27M in my case.
     -- Add another cross join if one wants REALLY large numbers 
WITH Numbers_CTE AS    
     (
     SELECT ROW_NUMBER() OVER (ORDER BY sc1.object_id) AS number
      FROM  
      sys.all_columns AS sc1 
      CROSS JOIN 
      sys.all_columns AS sc2
      --CROSS JOIN 
        --    sys.all_columns AS sc3
          )
    -- Find all numbers that are factors of the input
    -- Brute force...
    ,Factors_CTE AS    (
                        SELECT number
                        FROM  Numbers_CTE 
                        WHERE number     <= @composite
                        AND   @composite % number = 0
                       )
    -- Find the primes among the factors.
    -- Incurs a triangular join, but the main work 
    -- has been done in finding the factors
    ,Primes_CTE AS     
           (
              SELECT f.number
              FROM Factors_CTE AS f
              WHERE NOT EXISTS (SELECT *
                                FROM  Factors_CTE
                                WHERE number < f.number
                                AND   f.number % number = 0
                                AND   <> 1)
                       )
SELECT TOP 1 number AS [largest prime factor] 
FROM Primes_CTE
ORDER BY number DESC;
```
Reine Lindqvist a senior T-SQL developer contributed with this short and direct solution:
```js
use tempdb
go
declare @n       bigint = 600851475143
declare @newnum  bigint = @n;
declare @factors varchar(max) = '';
declare @tryme   bigint = 2;
SELECT top(cast(SQRT(@n) as int)+1)
@factors = CASE WHEN (@newnum % @tryme = 0) THEN cast(@tryme as varchar(20)) ELSE @factors END
,@newnum  = CASE WHEN (@newnum % @tryme = 0) THEN @newnum/@tryme ELSE @newnum END
,@tryme   = CASE WHEN (@newnum % @tryme = 0) THEN @tryme ELSE @tryme + 1 END
FROM sys.all_columns a CROSS JOIN sys.all_columns b
WHERE @tryme*@tryme <= @newnum
SELECT @factors as factors
go
```

### Kommentarer

#### Christer
Is it possible to see the execution times, as well?
Euler has a limit of one minute.

I’m Christer at project Euler.

My 2 cents:
```js
# Ruby
require 'mathn'
def primeFactors(n)
  res = []
  prime = Prime.new
  r = prime.next
  while r * r < n
    while n % r == 0 
      res << r
      n /= r
    end
    r = prime.next
  end
  res <1
  res
end

def assert(expect, actual)
  return if expect == actual
  puts "expect " 
  p expect 
  puts "actual " 
  p actual  
end

assert [7], primeFactors(7)
assert [2, 2, 5], primeFactors(20)
assert [5, 7, 13, 29], primeFactors(13195)
assert [67, 829, 1459, 3919], primeFactors(317584931803)
puts "Ready!"
```

#### Patrik
I got 83 to 120 ms on my code. I do not know why my code varied the most. Same test took 18466 ms for Tomas code. When we ran his code on a more powerfull machine with more cores, it dropped.
Reines code wich was the shortest T-SQL took 340 ms
I used this code to measure:
```js
--DBCC DROPCLEANBUFFERS It did not matter if I emptied the buffer. 
 DECLARE @StartTime DATETIME, @EndTime   DATETIME
 SET @StartTime = GETDATE() -- Measurement Starts  
-- Code to measure
SELECT      StartTime= CONVERT(VARCHAR,@StartTime,121),
            EndTime = CONVERT(VARCHAR,@EndTime,121),
            DurationInMS =  CONVERT(VARCHAR, DATEDIFF(ms,@StartTime, @EndTime))

```

#### Fredrik
```js
Max[FactorInteger[600851475143][[All, 1]]]
```

#### Christer
This post should be less error prone, hopefully.
Getting the result #### (censor) took 766 microsecs.

```js
require 'mathn'

def primeFactors(n)
  res = []
  Prime.each.take_while do |r|
    while n % r == 0
      res << r
      n /= r
    end
    r*r < n
  end
  res << n if 1 > 1
  res
end

def assert(expect, actual)
  puts "#{expect} != #{actual}" if expect != actual
end

start = Time.now
assert [7], primeFactors(7)
assert [2, 2, 5], primeFactors(20)
assert [5, 7, 13, 29], primeFactors(13195)
assert [67, 829, 1459, 3919], primeFactors(317584931803)
assert [71, 839, 1471, 6857], primeFactors(600851475143)
puts Time.now-start
```

#### MDiamond
The last code item is very cool however it looks like it will fail to give the correct largest prime factor for 14.