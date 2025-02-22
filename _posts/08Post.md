---
title: Powershell run sql scripts
date: 2012-07-18
description: In my work today I have to run many sql scripts that other have written. We are talking 100 of them.
img: 
alt: 
---

In my work today I have to run many sql scripts that other have written. We are talking 100 of them. They are configurations, T-SQL code changes, moving data, patches from developers. They can be in nested directories. Some times some of them fail for different reason. I have used Powershell for this. But decided now to try to refine the script and also make it easier for others to run the script.
You call the script in its simplest form by

```js
 .\run-sql.ps1
```

it will then prompt you for the path where the T-SQL script folder is. It will examine any subfolders and try to run any script in them. It will as default run on the localhost Sqlserver if nothing else is said. Any script that does not work will be renamed from badscript.sql to badscript.failed. All bad script will also be output from the script. So you could pipe the directory to run the script and pipe the output to a copy to folder to examin.
like this:

```js
"t:\testsql\"|.\run-sql.ps1 -ren 0|copy-Item -Destination "t:\failedscript\"
```

So I guess the script could be used for running test scripts as well.
The core of the script is:

```js
# Get all sql files to be run. Check also subfolders. Only include sql files

Get-ChildItem -path $SqlDir -recurse  -Filter *.sql

#and
#run sqlcmd on where  $f.fullname is the path to each file

Invoke-SqlCmd -ServerInstance $SQLServer -InputFile $f.fullname
```
The rest of the script is for handling loading of the snap in and some error. And lots of comments. So you could write:

```js
Get-Help .\run-sql.ps1
```
to get help.
To be able to use invoke-sqlcmd you have to have two snapp-in installed on your machine where you run the script.
sqlserverprovidersnapin100
sqlservercmdletsnapin100
They should come with a SQL Server 2008 installation or can be downloaded from Microsoft.
I have a few utility powershell script that I use for different task. I have decided to put them on my github repository so maybe others can help me improve them.
I named it powershell påsen. Påsen is swedish for the bag. So i spelled it powershell-pasen. Follow this link for the latest version: https://github.com/patriklindstrom/Powershell-pasen
Here is the first version.

```js
 <# 
.SYNOPSIS
Runs all sql script in a folder. Outputs an array of sqlscripts that failed
.DESCRIPTION
All files  ending with .sql will recursivly be run against localhost sqlserver or the sqlserver given in parameter $SQLServer. If a SQL file generates a
sql error its extension it can be changed from .sql to .failed this is so this file will not be run again on a rerun. 
The script outpus an Array of the files that failed.
.EXAMPLE
 runs .\run-sql.ps1 -SqlDir
.EXAMPLE
Pipe directory "T:\testSql\"|.\run-sql.ps1 -SqlDir
.EXAMPLE
Directory as parameter .\run-sql.ps1 -SqlDir "T:\testSql\"
.EXAMPLE
All parameters .\run-sql.ps1 -SqlDir "T:\testSql\" -SQLServer "BigSqlServer" -RenameFaultyScript 0 -OutputPath "t:\logoutputforScripts"
.EXAMPLE
exempel with alias run-sql -SqlDir[sql,sd,dir] "T:\testSql\" -SQLServer[server,s] "BigSqlServer" -RenameFaultyScript[ren] 1 -OutputPath [o] "t:\logoutputforScripts"
.EXAMPLE
Example with do not rename bad scripts copy them into a failed folder instead. Do this by setting the renameparameter to false (0) and pipe outcome to copy-item
"t:\testsql\"|.\run-sql.ps1 -ren 0|copy-Item -Destination "t:\failedscript\"
.PARAMETER SqlDir
The full path to the directory where all the sql script files are. Eg T:\goodstuff\sqltorun . Has alias: dir, sql, ds. Can also be piped into the script.
.PARAMETER SQLServer
The name of the sql server that the scripts should be run on. If you have an instance name just use "BigSqlServer\InstansName". Has alias server and s. 
Note that default is localhost. So if you forget to give this parameter but mean to run it on another server you could get suprised or very sad. 
.PARAMETER RenameFaultyScript
Any script that generates a SQL error gets its extension changed from .sql to .failed.Default is that it is true eg 1 or $TRUE. Alias is ren.
.PARAMETER OutputPath
This is where the output from the sql scripts get saved. If it does not exist it creates an output folder in the root of the SQLDir 
.PARAMETER OutPut
$FaultyFiles is an array of path to where the bad sql scripts are.
.LINK
latest version
http://github.com/patriklindstrom/Powershell-pasen
.LINK
About Author and script
https://www.lcube.se
.LINK
About powershell for SQL Server
http://msdn.microsoft.com/en-us/library/hh245198.aspx
.NOTES
    File Name  : run-sql.ps1 
    Author     : Patrik Lindström LCube
    Requires   : PowerShell V2 CTP3 
These snapins must have been installed before you can run this powershell. They should come with sqlserver 2008 or should be avaible from Microsoft.
 sqlserverprovidersnapin100
 sqlservercmdletsnapin100

#>
param  
(  
    [Parameter(
        Position=0, 
        Mandatory=$true, 
        ValueFromPipeline=$true,
        ValueFromPipelineByPropertyName=$true)
    ]
    [Alias('sql')] 
    [Alias('dir')] 
    [Alias('ds')] 
    [string]$SqlDir , 
    [Parameter(
        Position=1, 
        Mandatory=$false, 
        ValueFromPipeline=$false,
        ValueFromPipelineByPropertyName=$true)
    ]
    [Alias('server')] 
    [Alias('s')] 
    [string]$SQLServer="localhost" , 
        [Parameter(
        Position=2, 
        Mandatory=$false, 
        ValueFromPipeline=$false,
        ValueFromPipelineByPropertyName=$true)
    ]
    [Alias('ren')] 
    [boolean]$RenameFaultyScript=$TRUE , 
    [Parameter(
        Position=3, 
        Mandatory=$false, 
        ValueFromPipeline=$false,
        ValueFromPipelineByPropertyName=$true)
    ]
    [Alias('o')] 
    [string]$OutputPath
) 


    # Test for existence of SQL script directory path  
   if (!$SqlDir)  
   {  
        $(Throw 'Missing argument: SqlDir')    
   }  
  if (-not $SqlDir.EndsWith("\"))  
    { 
        $SqlDir += "\" 
    }     
    if (!(test-path $SqlDir))  
    { 
         $(Throw "The SqlDir: $SqlDir does not exist")    
    }

    #Test for the OutputPath
       if (!($OutputPath))  
    {
       $OutputPath =  join-path -path $SqlDir -childpath "Output" 
       New-Item $OutputPath -type directory -force
    }       
   if (!(test-path $OutputPath))  
    { 
    $OutputPath =  join-path -path $SqlDir -childpath "Output"
        Write-Verbose SQL script output directory  does not exists. Creates one here  $OutputPath                 
        New-Item $OutputPath -type directory -force      
    }
Add-PSSnapin -Name sqlserverprovidersnapin100 -ErrorAction SilentlyCOntinue -ErrorVariable errSnap1
if ($errSnap1){
    if($errSnap1[0].Exception.Message.Contains( 'because it is already added')){
        Write-Verbose "sqlserverprovidersnapin100 already added!" 
    $error.clear()
    }else{
        Write-Verbose "an error occurred:$($err[0])." 
        exit
    }
}else{
    Write-Verbose "sqlserverprovidersnapin100 Snapin installed"
}    
  Add-PSSnapin -Name sqlservercmdletsnapin100 -ErrorAction SilentlyCOntinue -ErrorVariable errSnap2
if ($errSnap2){
    if($errSnap2[0].Exception.Message.Contains( 'because it is already added')){
        Write-Verbose "sqlservercmdletsnapin100 already added!" 
    $error.clear()
    }else{
        Write-Verbose "an error occurred:$($err[0])." 
        exit
    }
}else{
    Write-Verbose "sqlservercmdletsnapin100 Snapin installed"
} 

# $sqlScriptTree = Get-ChildItem -path $SqlDir -recurse  -Filter *.sql | sort-object
$FaultyFiles = @()
$start = Get-Date
$i=0
write-host ***************
foreach ($f in Get-ChildItem -path $SqlDir -recurse  -Filter *.sql | sort-object ) 
{ 
            $out = join-path -path $OutputPath -childpath  $([System.IO.Path]::ChangeExtension($f.name, ".txt")) ; 
            $dt = Get-Date -Format s   
            write-host $f.fullname,$dt          
            invoke-sqlcmd -ServerInstance $SQLServer -OutputSqlErrors $TRUE -ErrorAction SilentlyContinue  -InputFile $f.fullname | format-table | out-file -filePath $out 
            if ($error){
                
               write-host   "SQL error in $($f.fullname)  " -foregroundcolor red 
               if ($RenameFaultyScript)

               { write-host "Changing extension for $($f.fullname) to $([System.IO.Path]::ChangeExtension($f.name, ".failed"))  " 
                   $FaultyFiles += join-path -path $($f.fullname|split-path) -childpath $([System.IO.Path]::ChangeExtension($f.name, ".failed"))
                   Rename-Item -Path $f.fullname -NewName $([System.IO.Path]::ChangeExtension($f.name, ".failed"))
                     
                }
                else
                {
                    $FaultyFiles +=$f            
                }
               
             $error.clear()
            }    
        ++$i
 }

$dt = Get-Date -Format s
$now= Get-Date
$ddiff = $now - $start
write-host ***************
write-host "Done running all $i scripts in $SqlDir on Sqlserver: $SQLServerPath at $dt it took $ddiff"  -ForegroundColor green

Write-Output  $FaultyFiles
```