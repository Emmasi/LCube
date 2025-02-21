---
title: Use set operators in powershell like sql
date: 2022-11-01
description: In Powershell there are no set operators like union, Except, Intersection by default. Set operators are used in sql like inner-join, union etc. You could use these operator for example..
img: /img/2016-11-01-18_48_45-A-or-B-venn-diagram-Wolfram_Alpha.png
alt: Diagram
---

## Use set operators in powershell like sql
In Powershell there are no set operators like union, Except, Intersection by default.
Set operators are used in sql like inner-join, union etc.
You could use these operator for example to find out which certificates exist on server A but not B or to find what data is new in a huge csv file compared with the previous on.
I will show you in a few articles a simple way to this good performance with some help from linq in CSharp and using the set operators that you can use on dictionaries.

### What common set operators are there?
![Diagram](/img/2016-11-01-18_48_45-A-or-B-venn-diagram-Wolfram_Alpha.png)

### We want the following set operations:
not A and B => DiffFile see [Explanation of expression](https://www.wolframalpha.com/input/?i=not+A+and+B) or see more easily [Venn diagram](https://www.wolframalpha.com/share/clip?f=d41d8cd98f00b204e9800998ecf8427e41kvo33uui)
A and B => IntersectionFile see [Explanation of expression](https://www.wolframalpha.com/input/?i=A+and+B) or see more easily [Venn diagram](https://www.wolframalpha.com/share/clip?f=d41d8cd98f00b204e9800998ecf8427e7e2qko5194)
NotaBene combined => (not A and B) or (A and B) see [Explanation of expression](https://www.wolframalpha.com/input/?i=%28not+A+and+B%29+or+%28A+and+B%29) or see more easily [Venn diagram](https://www.wolframalpha.com/share/clip?f=d41d8cd98f00b204e9800998ecf8427eguh00j5eik)
DiffFile+IntersctionFile => FileB

### With help from Linq in C# and dictionaries.
Here is some C# sharp code to explain the strategy:

### Why a comparison class?
We need a class that tells how to make the comparision of the dictionary.
You would think that default is if the key differs that is an equality, but no. Default is a comparison of both key and value.
So therefore we have to make a comparison class.
(This is of course unnecessary if you agree with Microsoft that the both the key and the value is the key. – which I don´t)

```js
public class DictCompareOnKeyOnly : IEqualityComparer<KeyValuePair<string, string>>
{
    public bool Equals(KeyValuePair<string, string> x, KeyValuePair<string, string> y)
    {
        return x.Key.Equals(y.Key);
    }

    public int GetHashCode(KeyValuePair<string, string> obj)
    {
        return obj.Key.GetHashCode();
    }
}
```

### C# and Linq Magic
Now we can focus on the core code that actually does anything. Lets make two dictionaries with test data and use the linq expression on them.
These dict-linq-set expression have good performance since they are part of the dotnet framework. I have used them make diff on two 50 Gb csv files.
It took like 100GB of memory but finished after a few minutes.
I take one dictionary: set2 use the operator Union on it with the parameters set1 and compare class keyOnly this result as an IEnumberable. 
```js
    //Set up two dummy directores with data
    Dictionary<string,string> set1 = new Dictionary<string, string>() { { "1","Adam"}, {"3","Caesar"}, { "4", "David" } };
    Dictionary<string,string> set2 = new Dictionary<string, string>() { { "1", "Adam" }, { "3", "Caesar" }, { "2", "Bertil" } };
    //Try different set operators Union, Intersection, Diff -both ways
    Dictionary<string,string> unionResult = set2.Union(set1, keyOnly).ToDictionary(d => d.Key, d => d.Value);
    Dictionary<string,string> interSectionResult = set2.Intersect(set1, keyOnly).ToDictionary(d => d.Key, d => d.Value);
    Dictionary<string,string> exceptResult1 = set2.Except(set1, keyOnly).ToDictionary(d => d.Key, d => d.Value);
    Dictionary<string,string> exceptResult2 = set1.Except(set2, keyOnly).ToDictionary(d => d.Key, d => d.Value);
```
I then force the IEnumberable back become a dictionary and tell it with the lambda function how: d => d.Key, d => d.Value

### Now how to make this happen in Powershell?
You can easily mix C# code with Powershell without writing cmdlet etc. The powershell will just be a long escaped string. I can then use it as a object type with
Add-Type -TypeDefinition $CSharpDictLinqOpLib -Language CSharp

### Finally the Powershell code
[Link to my Github account and the latest version of this example Use-SetOperator.ps1](https://github.com/patriklindstrom/Powershell-pasen/blob/master/Use-SetOperator.ps1)

```js
$CSharpDictLinqOpLib = @"
using System.Collections.Generic;
using System.Linq;
namespace SetToolbox
{
    public class DictCompareOnKeyOnly : IEqualityComparer<KeyValuePair<string, string>>
    {
        public bool Equals(KeyValuePair<string, string> x, KeyValuePair<string, string> y)
        {
            return x.Key.Equals(y.Key);
        }
        public int GetHashCode(KeyValuePair<string, string> obj)
        {
            return obj.Key.GetHashCode();
        }
    }
    public static class SetOperator
    {
        static public Dictionary<string, string> Union(Dictionary<string, string> setA, Dictionary<string, string> setB  )
        { 
           return setA.Union(setB, new DictCompareOnKeyOnly()).ToDictionary(ld => ld.Key, ld => ld.Value); ;          
        }
        static public Dictionary<string, string> Except(Dictionary<string, string> setA, Dictionary<string, string> setB)
        {
            return setA.Except(setB, new DictCompareOnKeyOnly()).ToDictionary(ld => ld.Key, ld => ld.Value); ;
        }
        static public Dictionary<string, string> InterSect(Dictionary<string, string> setA, Dictionary<string, string> setB)
        {
            return setA.Intersect(setB, new DictCompareOnKeyOnly()).ToDictionary(ld => ld.Key, ld => ld.Value); ;
        }
    }
}
"@

 
$Set1 =   New-Object "System.Collections.Generic.Dictionary[string,string]"
$Set2 =   New-Object "System.Collections.Generic.Dictionary[string,string]"
 
$Set1.Add(1,"Adam")
$Set1.Add(3,"Caesar")
$Set1.Add(4,"David")
$Set2.Add(1,"Adam")
$Set2.Add(3,"Caesar")
$Set2.Add(2,"Bertil")
Add-Type -TypeDefinition $CSharpDictLinqOpLib -Language CSharp 
Write-host "Union - What is in all the sets" -ForegroundColor Red
[SetToolbox.SetOperator]::Union($Set1,$Set2) | Format-Table 
Write-host "Except - What is the difference between the sets Set1 - Set2" -ForegroundColor Cyan
[SetToolbox.SetOperator]::Except($Set1,$Set2) |Format-Table
Write-host "Except - What is the difference between the sets Set2 - Set1" -ForegroundColor DarkCyan
[SetToolbox.SetOperator]::Except($Set2,$Set1) |Format-Table
Write-host "InterSect - What do the sets have in common" -ForegroundColor DarkMagenta
[SetToolbox.SetOperator]::InterSect($Set1,$Set2) |Format-Table
```

![operators in powershell like sql](/img/2016-11-01-21_42_26-Use-set-operators-in-powershell-like-sql-_-LCube.png)
### Next Article about sets
Next article will be about using set operators on powershell hashlists
so you can do:
```js
$testhash1 = @{"1" = "Adam"; "3"= "Cesar"; "4"= "David"};
$testhash2 = @{"1" = "Anna"; "3"= "Cesar"; "2"= "Bertil"};
$testdict1 = ConvertTo-Dictionary $testhash1
$testdict2 = ConvertTo-Dictionary $testhash2
$resultDict_InterSect = [CompareTool.SetOperator]::InterSect($testdict1,$testdict2)
Write-host "InterSect" -ForegroundColor DarkMagenta
$resultDict_InterSect |Format-List
```