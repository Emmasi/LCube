---
title: Use set operators in powershell like sql
date: 2022-11-01
description: In Powershell there are no set operators like union, Except, Intersection by default.
img: /dataimg.jpg
alt: blåtonade bilder av dator
---

## Use set operators in powershell like sql 
In Powershell there are no set operators like union, Except, Intersection by default.
Set operators are used in sql like inner-join, union etc.
You could use these operator for example to find out which certificates exist on server A but not B or to find what data is new in a huge csv file compared with the previous on.
I will show you in a few articles a simple way to this good performance with some help from linq in CSharp and using the set operators that you can use on dictionaries.
![Alt text](/dataimg.jpg "blåtonad bild av dator")

### We want the following set operations:
not A and B => DiffFile see Explanation of expression or see more easily Venn diagram
A and B => IntersectionFile see Explanation of expression or see more easily Venn diagram
NotaBene combined => (not A and B) or (A and B) see Explanation of expression or see more easily Venn diagram
DiffFile+IntersctionFile => FileB

### With help from Linq in C# and dictionaries.
Here is some C# sharp code to explain the strategy:

### Why a comparison class?
We need a class that tells how to make the comparision of the dictionary.
You would think that default is if the key differs that is an equality, but no. Default is a comparison of both key and value.
So therefore we have to make a comparison class.
(This is of course unnecessary if you agree with Microsoft that the both the key and the value is the key. – which I don´t)

### C# and Linq Magic
Now we can focus on the core code that actually does anything. Lets make two dictionaries with test data and use the linq expression on them.
These dict-linq-set expression have good performance since they are part of the dotnet framework. I have used them make diff on two 50 Gb csv files.
It took like 100GB of memory but finished after a few minutes.
I take one dictionary: set2 use the operator Union on it with the parameters set1 and compare class keyOnly this result as an IEnumberable. I then force the IEnumberable back become a dictionary and tell it with the lambda function how: d => d.Key, d => d.Value

### Now how to make this happen in Powershell?
You can easily mix C# code with Powershell without writing cmdlet etc. The powershell will just be a long escaped string. I can then use it as a object type with
Add-Type -TypeDefinition $CSharpDictLinqOpLib -Language CSharp

### Finally the Powershell code
Link to my Github account and the latest version of this example Use-SetOperator.ps1
### Next Article about sets
Next article will be about using set operators on powershell hashlists
so you can do: