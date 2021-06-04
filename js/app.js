function getData() {

    const ul = document.getElementById('authors');
    const url = 'https://a7c4hzn0s4.execute-api.us-east-1.amazonaws.com/v1/';
    
    const palabra = document.getElementById('txtpalabra');

    if(palabra.value == ''){
        alert('ingrese palabra a buscar');
        return;
    }

    let req = {
        word: palabra.value
    }


    // request options
    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(req),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
    
    });
 

    let loader = `<div class="boxLoading">cargando...</div>`;
    document.getElementById('content').innerHTML = loader;

    fetch(request)
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(data);
            let dataTwitter = data.body;
            document.getElementById('content').innerHTML="";
            document.getElementById("content").appendChild(buildTable(dataTwitter));
            
        })
        .catch(function (error) {
            console.log(error);
        });


}

function postData() {

    const url = 'https://randomuser.me/api';

    let data = {
        name: 'Sara'
    }

    var request = new Request(url, {
        method: 'POST',
        body: data,
        headers: new Headers()
    });

    fetch(request)
        .then(function () {
            // Handle response we get from the API
        })

}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

// https://programacion.net/articulo/como_exportar_una_tabla_html_a_csv_mediante_javascript_1742
function descagar(){
    alert('descargando...');
}

function buildTable(data) {
    var table = document.createElement("table");
    table.className="gridtable";
    var thead = document.createElement("thead");
    var tbody = document.createElement("tbody");
    var headRow = document.createElement("tr");
    ["item","Texto","FechaCreacion","Tweet","Favoritos","ReTweet","Localizacion"].forEach(function(el) {
      var th=document.createElement("th");
      th.appendChild(document.createTextNode(el));
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);
    table.appendChild(thead); 

    var cont=1;
    data.forEach(function(el) {
        // console.log('el',el);
        // console.log('location::', el.location);

      var tr = document.createElement("tr");
      
      var td = document.createElement("td");
      td.appendChild(document.createTextNode(cont))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.word))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.created_at))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.tweet))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.favorite_count))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.retweet_count))
      tr.appendChild(td);

      var td = document.createElement("td");
      td.appendChild(document.createTextNode(el.location))
      tr.appendChild(td);
      

    //   for (var o in el) {  
    //     var td = document.createElement("td");
    //     td.appendChild(document.createTextNode(el[o]))
    //     tr.appendChild(td);
    //   }

      tbody.appendChild(tr);  
      cont++;
    });
    table.appendChild(tbody);             
    return table;
}


function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}


function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(";"));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}
