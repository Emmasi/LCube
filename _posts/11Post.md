---
title: Hello World Rhino ETL
date: 2012-11-25
description: Rhino-Etl is an Opensource framework for doing Extract Transform and Load of data (ETL) in C#. There are other commercial ETL products that can do this as well. I have mostly used Microsofts SSIS. It is easy to get started with SSIS and it has good performance.
img: https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/durer-rhinoceros.jpg
alt: rhinoceros
---

Rhino-Etl is an Opensource framework for doing Extract Transform and Load of data (ETL) in C#. There are other commercial ETL products that can do this as well. I have mostly used Microsofts SSIS. It is easy to get started with SSIS and it has good performance.
![Rhinoceros](https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/durer-rhinoceros.jpg)
But in my humble opinion is it hard to keep track of the changes in the SSIS projects. All logical rules of the transformation of the data dissapperas in a forrest of boxes and lines that has to be clicked on. SSIS marriage to code repositories resemble the marriage Tom & Kate – its just afront. The debate over ETL tools as SSIS can be emotional so I wanted to show an other path: An ETL tool that is more traditional C# developer centric: Rhino-ETL. With this tool you can program all ETL in normal C# classes or you can choose to do it with DSL script files in the BOO language and run them with Rhino-ETL-command tool.

The example that follows with Rhino-ETL shows how to load two textfiles, join them and transform columns and finally put the rows somewhere. In this example it only puts them on the screen. I hope it will get people up to speed a little faster than it took me to realize that it was quit simple. All code is avaible at my github repository:github.com/patriklindstrom/HelloWorld-Rhino-ETL

1. First step is to create a simple console windows application in Visual Studio.
![createHelloRhino project](https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/CreateHelloRhino-ETLProject_small.png)

2. Second step is to install Rhino-ETL components.

The simplest way is to import a Nuget package with Rhino-ETL and all its dependent objects. You could instead download Rhino-ETL yourself build it and include the components in your project. It is a little more cumbersome and will take five to 30 minutes instead of just under a 1 minute.
You could use the built in powershell package manager or the graphical one. Below is a screenshot how I use the graphical Nuget package manager and search for Rhino-ETL.

![Get From Nuget](https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/GetFromNuget_small.png)

You can see what packages that was installed:

![Install Nuget](https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/InstalledNugetPackages_small_cut.png)

3. Third step write your code.

Rhino-ETL has two main classes: EtlProcess and AbstractOperation. You register your operation in the Initialize() method of the EtlProcess.

![Main Classes](https://raw.github.com/patriklindstrom/HelloWorld-Rhino-ETL/master/Images/MainClasses_small_cut.png)

So if would have three Operations: Extract data, Transform data and Load the data somewhere. This would look like this in the EtlProcess class called ExNihiloProcess :

```js
    public class ExNihiloProcess : EtlProcess
    {
        protected override void Initialize()
        {   
            Register(new SimpleFileDataGet(@"..\..\..\UntransformedWordList1.csv"));
            Register(new TransformWord());
            Register(new PutData());
        }
    }
```

But since we wanted a simple hash join as well – a join is needed as well in the ExNihiloProcess . We use
Built in methods for the join.

```js
    public class ExNihiloProcess : EtlProcess
    {
        protected override void Initialize()
        {  
            //A hash join operation between the files on the id
            Register(new JoinWordLists()
                .Left(new SimpleFileDataGet(@"..\..\..\UntransformedWordList1.csv"))
                .Right(new SimpleFileDataGet(@"..\..\..\UntransformedWordList2.csv")));
            // A silly Transformation of each row
            Register(new TransformWord());
            //Put the data on the screen. Should normally be file or database table
            Register(new PutData());
        }
    }
```

The code for the class JoinWordLists has to written.
We also have to write the code for the classes for SimpleFileDataGet, TransformWord and PutData. (See my code at the end of this post.)
The SimpleFileDataGet Class could just as well get data from a database, webservice. There are many methods in the Rhino-ETL to handle the Extract step and make it much easier. Just as an example
I only need to give the Annotation before the class definition that my file is a comma separated file with [DelimitedRecord(“,”)] in the row definition and it will magically understand it

```js
   /// <summary>
    /// The Data Class that represent each row. Notice the DelimetedRecord annotation. That is from the File Helper
    /// </summary>
    [DelimitedRecord(",")] 
    public class DataRecord
    {
        public int Id;
        public string AWord;
    }
```

I have not shown in this example anything about how simple it is for example to get data about funds in a database table. There are special classes that handle

```js
public class GetFonds : ConventionInputCommandOperation
{
    public PutFonds()
        : base("FundConnect")
    {
        Command = "SELECT f.[ISIN,f.[FundName],f.Currency FROM FundTbl AS f";
    }
}
```

or to insert data in a table. Notice that the code understands that the Id is a property in the Row object that it should insert. Hence the Convention part of the class name. Read more about it at the original blog about Rhino-ETL 2.0

```js
   public class NumberInput : ConventionOutputCommandOperation
    {
        public NumberInput()
            : base("test")
        {
            Command = "INSERT INTO Fibonacci (Id) VALUES(@Id)";
        }
    }
```
Here is the complete code for this tiny Hello World C# program (downloadlink to complete VS2012 project):

```js
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FileHelpers;
using Rhino.Etl.Core;
using Rhino.Etl.Core.Files;
using Rhino.Etl.Core.Operations;

namespace HelloRhinoEtl
{

    /// <summary>
    /// The Data Class that represent each row. Notice the DelimetedRecord annotation. That is from the File Helper
    /// </summary>
    [DelimitedRecord(",")] 
    public class DataRecord
    {
        public int Id;
        public string AWord;
    }
    /// <summary>
    /// Just get data from a File. Could be database or fake constructed data
    /// </summary>
    public class SimpleFileDataGet  : AbstractOperation
    {
        public SimpleFileDataGet(string inPutFilepath)
        {
            FilePath = inPutFilepath;
        }
        public string FilePath { get; set; }
        public override IEnumerable Execute(IEnumerable rows)
        { 

            using (FileEngine file = FluentFile.For().From(FilePath))
            {
                foreach (object obj in file)
                {
                    yield return Row.FromObject(obj);
                }
            }
        }
    }

    public class TransformWord :AbstractOperation
{
        public override IEnumerable Execute(IEnumerable rows)
        {
            foreach (Row row in rows)
            {
                var revWord = (string)row["AWord"];
                row["AWord"] = new string(revWord.ToCharArray().Reverse().ToArray());                                 
                yield return row;
            }            
        }
}

    public class JoinWordLists : JoinOperation
    {
        protected override void SetupJoinConditions()
        {
            InnerJoin
                .Left("Id")
                .Right("Id");
        }

        protected override Row MergeRows(Row leftRow, Row rightRow)
        {
            Row row = leftRow.Clone();
            row["AWord"] = leftRow["AWord"].ToString() + " " +
                                       rightRow["AWord"].ToString();
            return row;
        }
    }

    /// <summary>
    /// We will just put data on the screen. Would be more realistic to put to other file or database
    /// </summary>
    public class PutData : AbstractOperation
    {
        public override IEnumerable Execute(IEnumerable rows)
        {
            foreach (Row row in rows)
            {
                var record = new DataRecord
                    {
                        Id = (int) row["Id"],
                        AWord = (string)row["AWord"]
                    };
                Console.WriteLine(record.AWord);
            }
            yield break;
        }
    }
    /// <summary>
    /// Here is the actual ETL process where all steps are registred. 
    /// It represent one dataflow, We get two datasources Join them, Transform data and put it somewhere.
    /// </summary>
    public class ExNihiloProcess : EtlProcess
    {
        protected override void Initialize()
        {    // my path to the file is D:\Users\Patrik\Documents\GitHub\HelloWorld-Rhino-ETL\HelloRhinoEtl\UntransformedWordList.csv
            //Relative Path is for me : ..\..\..\UntransformedWordList1.csv
            //A hash join operation between the files on the id
            Register(new JoinWordLists()
                .Left(new SimpleFileDataGet(@"..\..\..\UntransformedWordList1.csv"))
                .Right(new SimpleFileDataGet(@"..\..\..\UntransformedWordList2.csv")));
            // A silly Transformation of each row
            Register(new TransformWord());
            //Put the data on the screen. Should normally be file or database table
            Register(new PutData());
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("----Lets create a Rhino-ETL ----");
            Console.WriteLine("--------------------------------");
            // Here is the actual work. 
            var exNihiloP = new ExNihiloProcess();
            exNihiloP.Execute();
            Console.WriteLine("-------------------------------");
            Console.WriteLine("----Hit any Rhino to exit------");
            Console.ReadKey();

        }
    }
}
```

The file thar are used as humorous data exmaples are:
UntransformedWordList1.csv
---
1,dlrow
2,skcus
---
AND

UntransformedWordList2.csv
---
1,olleh
2,SISS
---

### More information :
Latest version of this Hello World Example should be here:
https://github.com/patriklindstrom/HelloWorld-Rhino-ETL
There might be more examples in future.

Original Authors of Rhino-ETL Blog
http://ayende.com/blog/3102/rhino-etl-2-0
Rhino-Etl at Github
https://github.com/hibernating-rhinos/rhino-etl
Hibernating Rhino
http://www.hibernatingrhinos.com/oss/rhino-etl
More in depth about Rhino ETL to understand how it uses IEnumerable and Yield
http://www.codeproject.com/Articles/34556/Write-ETL-jobs-in-pure-C
About Test benefits of Rhino-ETL
http://vadimdev.blogspot.se/2011/11/writing-testable-etl-processes-with.html
Stackoverflow Q&A about Rhino-ETL
http://stackoverflow.com/questions/tagged/rhino-etl
Google discussion group where Rhino-ETL is discussed
https://groups.google.com/forum/?fromgroups#!forum/rhino-tools-dev

### Kommentarer

#### Christer
Jag måste å det bestämdaste varna för SSIS. Det är en fruktansvärd kökkenmödding.
Det är ett grafiskt verktyg, avsett att kunna användas av icke-programmerare. Glöm det.
Man kan inte versionshantera resultatet. Filen som skapas är fruktansvärt stor, och
innehåller en uppsjö av olika format. Jag anropade en proc som gav tillbaks några job som
skulle köras. Varje job bestod i att hämta en xml-sträng från en tabell, via en proc
och xsla den. Därefter ftpa den till en server. Detta låter som max tio rader Ruby,
lätt att förstå. Men icke. Om man ser grafiken, så framgår det inte vad som ska göras.
Om man skriver ut textfilen, så är den på 6000 rader. Det finns inte något mittimellan
som skulle kunna motsvara de tio raderna Ruby.

Någon månad senare återvände jag till detta SSIS-paket. Skulle modifiera ett filnamn.
Det tog banne mig en hel dag.

SSIS bygger på att anropa sprocar, så där kan du vara lugn.

Ayende drabbades också av SSIS. Han blev så illa berörd att han skrev ett eget ETL-paket:
http://ayende.com/wiki/I%20Hate%20SSIS.ashx
http://ayende.com/Blog/archive/2008/01/16/Rhino-ETL-2.0.aspx

#### Patrik
Ja det är svårt att versionhantera SSIS. Det finns ett verktyg (Bids helper) för BIDS som jag läst skalar bort grafiska ändringar: typ man flyttar en låda till höger eller vänster utan att ändra logiken. Då blir det lite lättare att hantera ändringar. Som det är idag drunknar alla logiska ändringar i att någon bara flyttat en linje. Det är som du säger massiva mängder data som skapas för små ändringar.
Jag tror inte SSIS är byggt för mjukvaru projekt med code control. Det är mer gjort för att DBA lätt ska kunna importera en fil eller två från Excel. Eller man ska snabbt flytta mycket stora datamängder från konstigt system A till dina tabeller i SQL Server. Det hanterar datatvätt som finns på en rad snabbt. Men så fort man i SSIS börjar joina mellan två datakällor blir det långsamt. Då är det bättre att först flytta in det i SQL Server. Indexera där och sedan göra joinen i T-SQL.
Snabbast att dunka in data i SQL server tror jag fortfarande är bcp. se exvis http://www.sql-server-performance.com/2007/bcp/ eller http://msdn.microsoft.com/en-us/library/aa337544.aspx

SSIS används ofta som ETL verktyg i Datawarehouse projekt vilket jag kan tycka är olyckligt eftersom koden är svår att överblicka och underhålla och ofta lever datawarehousen länge. Men det beror på hur mycket logik man lägger i alla boxarna och strecken imellan.

Jag håller med om att en del som har som jobb att bara skapa SSIS paket inte har programmerat i andra språk eller upplevt projekt lyckokänslan där man har god code management.

Vad kul att du provat Rhino-ETL.
Jag har gjort en fork till den på GitHub. Funderar på om jag ska ge mig på att lägga till Fuzzy lookup.
Dvs man ska kunna joina och få träff mellan :
två namn som låter likadant
Jane = Yen
eller
två telefonnummer som är lika
+46 8 660 16 07 = 086601607
eller om telefonnummer är identiskt men namnet bara låter lika är det en bättre träff än att adressen och VD namn är identiska.

SSIS har fuzzy lookup. se:[magazine/cc163731.](http://msdn.microsoft.com/en-us/magazine/cc163731.aspx).


Jag har jobbat lite med den typ av datatvätt på Eniro när vi skulle tvätta data och hitta gemensamma kunder mellan två olika affärsystem.
Den typ av tvätt kräver lite fingertopskänsla. Man kan inte automatisera den helt. Men man kan använda färdiga algoritmer som Soundex eller Double metaphone [Double_Metaphone](https://en.wikipedia.org/wiki/Double_Metaphone#Double_Metaphone).
Jag har gjort Double metaphone i T-SQL

Har du några tips om algoritmer förutom Double metaphone för att gissa om två saker är lika ?

#### Fabio
Great Post!
Very useful.
Thanks

#### fulton armory 
Hi there, after reading this remarkable article i am as well glad to share my
experience here with friends.

#### Bruno
Hi DBA Dave,I am trying to acecss a Tandem NonStop SQL / MP database from SSIS and seem to be having similar issues to you. I have managed to create the ODBC connection manager, but I am struggling with the Data Flow source. You suggest using ADO.NET but I don’t seem otbe able to acecss the ODBC connection manager via this object type. Are you able to provide a screen shot example of how you did this or explain. ThanksEric