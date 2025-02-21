---
title: ClosedXML det enkla sättet att exportera till Excel
date: 2012-07-23
description: I flera projekt har jag använt ClosedXML för att spara i Excelformat. Kan verkligen rekommendera den. Den förenklar OpenXML formatet betydligt. För ett exempel. Gå till den här demositen och klicka på Excel så laddas data som man ser till Excel. Lagerhantering.
img: 
alt: 
---

I flera projekt har jag använt ClosedXML för att spara i Excelformat. Kan verkligen rekommendera den. Den förenklar OpenXML formatet betydligt. För ett exempel. Gå till den här demositen och klicka på Excel så laddas data som man ser till Excel. Lagerhantering.

ClosedXML finns att hämta ned via Nuget eller codeplex.
Det är bara att skriva: Install-Package ClosedXML i packet manager consolen så installeras det i Viual Studio projektet.
Nedan är ett exempel. Ett Proof of concept. Där jag ska exportera data (olika fonders statiska data) till Excel. Användaren väljer i websida att de vill ladda ned data i excel.
Kärnan i koden är

```js
// Som inparameter skickas en lista på objekt från databasen. 
// Dessutom skickas en url där man kan uppdatera data. Detta för att jag vill att det ska finnas
// en länk i Excelbladet för att kunna uppdatera data om man vill det.
  MemoryStream ms = CreateExcelFile(db.Funds.ToList(), urlStr);
// I privata metoden CreateExcelFile är den viktigaste koden:
// Create an Excel Workbook
                XLWorkbook wb = new XLWorkbook();
                // Add the  worksheet
                IXLWorksheet ws = wb.Worksheets.Add("New Worksheet");
               ws.Cell(++curRow, curCol).InsertTable(fundList.AsEnumerable());
```

Sedan är det en massa kod för att autojustera kolumnbredden. Skriva lite i cellerna högst upp i Excelbladet om när exporten gjordes och vem som
gjorde exporten vilken url man kan gå till för att uppdatera mm.

Här har jag ställt [en fråga på stackoverflow om hur man ska exportera data med ClosedXML](http://stackoverflow.com/questions/9293258/how-to-access-the-system-componentmodel-dataannotations-display-name-property-fo) och få med sig object annotations som display name. Det visade sig vara lättare än jag trodde.

```js
 private HaxitDB db = new HaxitDB();

        //
        // GET: /Api/

        [HttpGet]
      
        public ActionResult DownloadFundsAsExcel()
        {

            //See http://closedxml.codeplex.com/wikipage?title=How%20do%20I%20deliver%20an%20Excel%20file%20in%20ASP.NET%3f&amp;referringTitle=Documentation
            // see http://closedxml.codeplex.com/discussions/248214
            string host = "wsp1063c:8080/";
            string urlStr = "http://" + host + "Api/DownloadFundsAsExcel/";
            MemoryStream ms = CreateExcelFile(db.Funds.ToList(), urlStr);
            if (ms != null)
            {
                // return the filestream
                // Rewind the memory stream to the beginning
                ms.Seek(0, SeekOrigin.Begin);
                string filename = "OneFundStaticDataFundList" + ".xlsx";
                return File(ms, @"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml", filename);
            }
            // No Excel file, reshow the same view
            return null;
        }


        private MemoryStream CreateExcelFile(IList fundList, string urlStr)
        {
            try
            {
                // Create an Excel Workbook
                XLWorkbook wb = new XLWorkbook();
                // Add the  worksheet
                IXLWorksheet ws = wb.Worksheets.Add("New Worksheet");
                #region Add data to Excel
                int startCol = 1;
                int startRow = 1;
                int curCol = startCol;
                int curRow = startRow;

                curRow = curRow + 4;
               
                ws.Row(curRow).Style.Font.Bold = true;
                ws.Row(curRow).Style.Fill.BackgroundColor = XLColor.AliceBlue;
                #endregion
                // Dump all data
                ws.Cell(++curRow, curCol).InsertTable(fundList.AsEnumerable());
                // ws.Cell(++curRow, curCol).Value = dcArrToShow.AsEnumerable();
                // run autofit on all the columns
                ws.Columns().AdjustToContents();
                //Write something about the data export
                #region Excel header
                ws.Cell(startRow, startCol).SetValue("Data for static fund " + " data ");
                ws.Cell(startRow + 1, startCol).SetValue("Url to redownload");
                ws.Cell(startRow + 1, startCol + 1).SetValue(urlStr);
                ws.Cell(startRow + 1, startCol + 1).Hyperlink = new XLHyperlink(urlStr, "Click to redownload!");
                ws.Cell(startRow + 2, startCol).SetValue("Created by ");
                ws.Cell(startRow + 2, startCol + 1).SetValue(User.Identity.Name);
                ws.Cell(startRow + 2, startCol + 2).SetValue("2012-06-26");
                // All done
                #endregion
                MemoryStream ms = new MemoryStream();
                wb.SaveAs(ms);
                return ms;
            }
            catch (Exception e)
            {
                string errmsg = String.Format("Failed to create Excel file: {0}", e.Message);
                throw new Exception(errmsg, e);
            }
        }
```

### Kommentarer

#### Christer
Har du någon jämförelse då det gäller exekveringstider?
Eftersom det sker en mängd tidsödande anrop med den gängse metoden (Microsoft.Office.Interop.Excel), vore det kul att veta.

#### Patrik
Nej jag har inte jämfört med old style Interop.Excel.
Det vore en kul jämförelse. Har du någon ide om hur man skulle jämföra? Skapa 1000 Excelblad som innehåller ett autofilter och 20.000 rader med 100 kolumner? Jag tycker att ClosedXML borde vara snabbt. Det kallar ju inte på Excel alls utan skapar bara en fil i xml format. Det är Manuel De Leon som gjort ClosedXML som ligger ovanpå OpenXML. Jag ska fråga honom.

#### Manuel
ClosedXML is meant to be fast enough to use on most applications. It is so much faster than Interop that there’s really no comparison.

That said if you want the absolute fastest way to read/write Excel files then you have to go to SAX

#### Christer
We’ve made a small test consisting of 1000*10 cells. We stored exponentiated numbers and changed some properties (bold/italic/color) in a checkerboard pattern, and saved the file.

Results:
Microsoft.Office.Interop.Excel 54.7 secs.
ClosesXML 0.66 secs.

As the API also is neater we’ve decided to switch to CLosedXML.

#### Christer
We had to abandon ClosedXML as it was to memory hungry.
Reading a 1 MB text file producing a 1 MB xlsx file had a peak use of RAM at 100MB!

#### Patrik
Are you sure you did everything right? I read there was a memory leak in version prior to 0.62. Can you post some code? I have note read anything on the net that it should crave abnormally memory chunks.

#### mats
Har provat att exportera med det här och det funkar kanon. Men av någon anledning så vill den inte exportera åäö. Har snart provat med allt men får bara unicode i exporten

#### Patrik
Hej Mats. Jag har provat att skapa enkelt exempel med closedxml med åäö och det fungerar utmärkt för mig. Se kod här i Gist: https://gist.github.com/patriklindstrom/d2c3f10d6cb0a6994dc5 se skärmbild på resultat: ShowcaseÅÄÖ-Excel Har du någon enkel exempel kod där felet uppstår som du kan dela med dig av? Annars vet jag att Manuel Deleon som skrivit ClosedXML svarar snabbt på [StackOverflow](https://stackoverflow.com/questions/tagged/closedxml) . Finns även ett forum på codeplex.