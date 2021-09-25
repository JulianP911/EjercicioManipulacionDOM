// Constante con la url donde se encuentra la informacion
const url = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

// Obtener la informacion y mostrarla en las tablas
fetch(url).then(res => res.json()).then(res => { 
    // Obtener el elemento tbody-events
    let tbodyEvents = document.getElementById("tbody-events");
    // Eventos que pueden generar o no generar que se convierta en ardilla
    let eventsA = [];
    // Eventos con sus caracteristicas de la matriz
    let eventsD = [];

    for (let i = 0; i < res.length; i++) {

        // Creacion del elemento <tr></tr>
        let trTag = document.createElement("tr");

        // Creacion del elemento <th></th> y establecer los indices de las filas
        let thIndex = document.createElement("th");
        thIndex.textContent = i + 1;

        // Obtener los eventos de cada registro
        let events = "";
        res[i].events.forEach(element => {
            if (eventsA.indexOf(element) === -1) {
                eventsA.push(element)
            }
            events += element + ", ";
        });
        events = events.substring(0, events.length-2);

        // Creacion del elemento <th></th> y establecer los eventos de las filas
        let thEvents = document.createElement("td");
        thEvents.textContent = events;

         // Creacion del elemento <th></th> y establecer si se convirtio en ardilla o no de las filas
        let thSquirrel = document.createElement("td");
        thSquirrel.textContent = res[i].squirrel

        // Si se conviertio en ardilla se cambia el color de la fila
        if(res[i].squirrel == true)
        {
            trTag.style.backgroundColor = "rgba(255, 0, 0, 0.2)"
        }

        // Se adiciona al elemento trTag los elementos thIndex, thEvents y thSquirrel
        trTag.appendChild(thIndex);
        trTag.appendChild(thEvents);
        trTag.appendChild(thSquirrel);

        // Se adiciona al elemento tbody-events el elemento trTag
        tbodyEvents.appendChild(trTag)
    }

    // Obtener el elemento tbody-events
    let tbodyCorrelation = document.getElementById("tbody-correlations");

    // Calcular para cada evento la correlacion de mathewes
    eventsA.forEach(eventA => {
        let tp = 0;
        let tn = 0;
        let fp = 0;
        let fn = 0;

        // Creacion del objeto donde se almacenara el evneto y el coeficiente correlacion de matehews
        let eventI = {};
        eventI["event"] = eventA;

        // Contar ocurrencias de los cuatro casos posibles
        for (let i = 0; i < res.length; i++) {
            if(res[i].events.includes(eventA) && res[i].squirrel) {
                tp++;
            } else if (!res[i].events.includes(eventA) && res[i].squirrel) {
                fp++;
            } else if (!res[i].events.includes(eventA) && !res[i].squirrel) {
                tn++;
            } else if (res[i].events.includes(eventA) && !res[i].squirrel) {
                fn++;
            }
        }

        // Calcular para cada evento el coeficiente correlacion de matehews
        eventI["MCC"] = MCC(tp, tn,fp,fn);

        // Anadir a el arreglo de eventsD el objeto eventI
        eventsD.push(eventI);
    }); 

    // Ordenar los eventos por el coeficiente correlacion de matehews
    eventsD.sort((a, b) => b.MCC - a.MCC);

    // Index para manejar los indices en la tabla de correlaciones
    let i = 0;

    // Armar cada fila de la tabla de correlaciones utilizando el DOM
    eventsD.forEach(event => {
        // Creacion del elemento <tr></tr>
        let trTag = document.createElement("tr");

        // Creacion del elemento <th></th> y establecer los indices de las filas
        let thIndex = document.createElement("th");
        thIndex.textContent = i + 1;
        i++;

        // Creacion del elemento <th></th> y establecer los eventos de las filas
        let thEvent = document.createElement("td");
        thEvent.textContent = event.event;

        // Creacion del elemento <th></th> y establecer los eventos de las filas
        let thCorrelation = document.createElement("td");
        thCorrelation.textContent = event.MCC;

        // Se adiciona al elemento trTag los elementos thIndex, thEvent y thCorrelation
        trTag.appendChild(thIndex);
        trTag.appendChild(thEvent);
        trTag.appendChild(thCorrelation);

        // Se adiciona al elemento tbody-events el elemento trTag
        tbodyCorrelation.appendChild(trTag)
    })
});

// Funcion para hallar el coeficiente correlacion de matehews
function MCC (tp, tn, fp, fn) {
    return ((tp * tn) - (fp * fn)) / Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
};