const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

fetch(url).then(res => res.json()).then(res => { 
    let trTag;
    for (let i = 0; i < res.length; i++) {
        trTag = document.createElement("tr");
        thIndex = document.createElement("th");
        thIndex.textContent = i;
        let events = "";
        for (let j = 0; j < res[i].events.length; j++) {
            events += res[i].events[j];
        }
        console.log(events);
    }
})
