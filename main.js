const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

fetch(url).then(res => res.json()).then(res => { 
    const row = document.getElementById("row");
    let trTag;
    let thIndex;
    let thEvents;
    let thSquirrel;
    for (let i = 0; i < res.length; i++) {
        trTag = document.createElement("tr");
        thIndex = document.createElement("th");
        thIndex.textContent = i + 1;
        let events = "";
        for (let j = 0; j < res[i].events.length; j++) {
            events += res[i].events[j] + ", ";
        };
        events = events.substring(0, events.length-2);
        thEvents = document.createElement("td");
        thEvents.textContent = events;
        thSquirrel = document.createElement("td");
        thSquirrel.textContent = res[i].squirrel
        // res[i].squirrel is true change the color row
        if(res[i].squirrel == true)
        {
            trTag.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }
        // trIndex, trEvents, trSquirrel append trTag
        trTag.appendChild(thIndex);
        trTag.appendChild(thEvents);
        trTag.appendChild(thSquirrel);
        // trTag append row
        row.appendChild(trTag)
    }
})
