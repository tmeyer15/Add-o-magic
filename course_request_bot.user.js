// ==UserScript==
// @name          Course Request bot
// @namespace     https://banweb.banner.vt.edu/ssb/prod/HZSKVTSC.P_DispRequest?term=01&year=2013
// @description   Requests courses for you
// @include       https://banweb.banner.vt.edu/ssb/prod/*
// ==/UserScript==


function checkCRNs()
{
    if (document.URL == TimetableURL)
    {
        document.getElementsByName("crn")[0].value = startCRN;
        document.getElementsByName("BTN_PRESSED")[0].click();
    }
    else if (document.URL == TimetableCRNURL)
    {
        var tables = document.getElementsByTagName("TABLE");
        var contentsOfCell = tables[9].rows[1].cells[5].innerHTML;
        if (contentsOfCell.search("Full") != -1)
        {
            var oldCRN = document.getElementsByName("crn")[0].value;
            document.getElementsByName("crn")[0].value = crns[oldCRN];
            document.getElementsByName("BTN_PRESSED")[0].click();
        }
        else
        {
            location.href = DropAddURL + "#" + document.getElementsByName("crn")[0].value;
        }
    }
    else if (document.URL.substring(0, document.URL.length - 6) == DropAddURL)
    {
        var addCRN = document.URL.substring(document.URL.length - 5, document.URL.length);
        var allRows = document.getElementsByTagName("tr");
        if (dropCRNs[addCRN] != "x")
        {
            for (var x = 0; x < allRows.length; x++)
            {
                var correctRow = "False";
                var elementsOfRow = allRows[x].cells;
                for (var y = 0; y < elementsOfRow.length; y++)
                {
                    if (elementsOfRow[y].innerHTML.search(dropCRNs[addCRN]) != -1)
                    {
                        //We found the right row
                        correctRow = "True";
                    }
                }
                if (correctRow == "True")
                {
                    //switch to drop the course
                    elementsOfRow[0].children[1].selectedIndex = 0;
                    break;
                }
            }
        }

        //Set the course we want to add and find the button
        var ins = document.getElementsByTagName("input");
        var crnIn1 = 0;
        var button = 0;
        for (var x = 0; x < ins.length; x++)
        {
            if (ins[x].id == "crn_id1")
            {
                crnIn1 = x;
            }
            if (ins[x].value == "Submit Changes")
            {
                button = x;
            }
        }

        ins[crnIn1].value = addCRN;
        ins[button].click();
    }
    else if (document.URL == DropAddCRNURL)
    {
        location.href = TimetableURL; 
    }
}

var currCRN = 0;
var crns = {};
//crns["14492"] = ["16734"];
//crns["16734"] = ["12109"];
//crns["12109"] = ["14492"]; //circular hash table
//startCRN = "14492";

crns["13254"] = "13254";
//crns["13254"] = ["13254"];
startCRN = "13254";
var dropCRNs = {};
//dropCRNs["13254"] = "13251";
dropCRNs["13254"] = "13251";
var TimetableURL = "https://banweb.banner.vt.edu/ssb/prod/HZSKVTSC.P_DispRequest?term=01&year=2013";
var TimetableCRNURL = "https://banweb.banner.vt.edu/ssb/prod/HZSKVTSC.P_ProcRequest";
var DropAddURL = "https://banweb.banner.vt.edu/ssb/prod/bwskfreg.P_AddDropCrse?term_in=201301";
var DropAddCRNURL = "https://banweb.banner.vt.edu/ssb/prod/bwckcoms.P_Regs";

window.setInterval(function(){checkCRNs()}, 2000 + Math.floor(Math.random()*1000));
