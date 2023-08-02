// ----- API deploy progetto ListaUffici - PrenotaTicekt ____Rel 0.0
let APIlistUff = "https://script.google.com/macros/s/AKfycbwazXqR0h9T75eoQjZG0Hu7W4yk71Pyo7YwH9uobfkI9cM4YXqBBKnREGljLmVy8Vqy1A/exec";

window.addEventListener("load", function (Event) {
    setCookie("user", "SimoneC", 365) ;
    setCookie("ufficio", "Ufficio Anagrafe", 365) ;
    console.log(getCookie("user"));

    fetch(APIlistUff,{
        method:"GET",  //richiama il metodo doGet del deploy per caricare la lista degli uffici
//        mode: "no-cors",
//        headers:{
//            "Content-Type": "application/json",
//            "Access-Control-Allow-Origin": "*",
//        },

    }).then(function (response){
        return response.json();
    }).then(function (data){
        let uffici = document.getElementById("uffici");
        for(let i=0; i<data.data.length; i++){
            let bott = document.createElement("button");
            bott.onclick= function(){prenota(data.data[i]);};
            bott.value=data.data[i];
            bott.innerHTML=data.data[i];
            uffici.appendChild(bott);
        }
//        setTimeout(() => {
//        //        location.reload();
//            prenota("Ufficio Anagrafe");
//        },50000);
    })
});

function prenota(ufficio) {
    let APInewRec= APIlistUff+"?ufficio="+ufficio;
    let logo = document.getElementById("logo");
    logo.classList.add("rotate-center");
    let botts= document.querySelectorAll("button");
    for(let i=0; i<botts.length; i++){
        botts[i].disabled = true;
    }
    fetch(APInewRec,{
            method:"POST" // richiama il metodo doPost per prenotare un nuovo utente in coda con il Ticket
        }).then(function (response){
            return response.json();
        }).then(function (data){
            console.log(data);
            let today = new Date().toLocaleString("it-IT", {timeZone: "Europe/Rome"});
            let ticket = document.getElementById("uffici");
            ticket.innerHTML="";
            let d = document.createElement("div");
            d.classList.add("d-flex");
            d.classList.add("flex-row");
            let qr = document.createElement("img");
            qr.src="https://image-charts.com/chart?chs=250x250&cht=qr&choe=UTF-8&chl=?k='"+"https://www.google.com/search?q="+data+"'";
            let d1 = document.createElement("div");
            d1.classList.add("m-3");
            d1.innerHTML="Lei è il numero >> "+data+" << <br/> Prenotato per l'"+ufficio+" in data "+ today+"<br/<br/>Inquadi il QR-code per seguire la sua posizione in coda";
            d.appendChild(qr);
            d.appendChild(d1);
            ticket.appendChild(d);
            let b = document.createElement("button");
            b.onclick = function(){location.reload();};
            b.innerHTML = ">> Lista Uffici <<";
            //let f=document.getElementById("footer");
            //f.appendChild(b);

            setTimeout(() => {
//                window.print();
             }, 1500);

             setTimeout(() => {
                 location.reload();
              }, 3000);
            //window.print();
            // impostare un profilo crhome
            // nelle Proprietà dell'collegamento descktop in Destinazione aggiungere "--kiosk-printing"
            // così non richiede la conferma della stampa
        })
}
