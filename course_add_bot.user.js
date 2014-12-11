// ==UserScript==
// @name          Course Add bot
// @namespace     https://banweb.banner.vt.edu/ssb/prod/bwskfreg.P_AddDropCrse?term_in=201401
// @description   Adds courses (CRNs) for you
// @include       https://banweb.banner.vt.edu/ssb/prod/bwskfreg.P_AddDropCrse?term_in=201401
// @include       https://banweb.banner.vt.edu/ssb/prod/bwckcoms.P_Regs
// ==/UserScript==


function addCourses()
 {
	//Ensure this is the and all of the other URLs are up to date drop/add URLs
     if (document.URL == "https://banweb.banner.vt.edu/ssb/prod/bwskfreg.P_AddDropCrse?term_in=201401" || document.URL == "https://banweb.banner.vt.edu/ssb/prod/bwckcoms.P_Regs")
    {
        var ins = document.getElementsByTagName("input");
        var crnIn1 = 0;
        var crnIn2 = 0;
        var crnIn3 = 0;
        var crnIn4 = 0;
        var button = 0;
		
		//Loop through the website's HTML to find the CRN inputs and submit button
        for (var x = 0; x < ins.length; x++)
         {
            if (ins[x].id == "crn_id1") 
            {
                crnIn1 = x;
            }
            if (ins[x].id == "crn_id2") 
            {
                crnIn2 = x;
            }
            if (ins[x].id == "crn_id3") 
            {
                crnIn3 = x;
            }
            if (ins[x].id == "crn_id4") 
            {
                crnIn4 = x;
            }
            if (ins[x].value == "Submit Changes")
             {
                button = x;
            }
        }

		//Add up to 4 CRNs below. Delete any that are unused
        ins[crnIn1].value = "16734";
        ins[crnIn2].value = "16733";
        ins[crnIn3].value = "16735";
        ins[button].click();
    }
}

//Randomly click every 4-7 seconds
window.setInterval(function(){addCourses()}, 4000 + Math.floor(Math.random()*3000));
