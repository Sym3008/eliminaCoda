// ----- API deploy progetto Attesa - ScorrCoda
let API= "https://script.google.com/macros/s/AKfycbw4p7dmUSMW_GnEc6NpY5juJCM_wEc7nA8T8uypE7AhCZbkuSdS3FRdTy2WU2QCyw/exec";
let user= getCookie("user");
let ufficio= getCookie("ufficio");
window.addEventListener("load", function (Event) {
    if (user==""){
        let vista = document.getElementById("vista");
        vista.innerHTML="NON SEI AUTORIZZATO";
    }
    else{
            setInterval(() => {
                API=API+"?ufficio="+ufficio;
                fetch(API,{
                    method:"GET" // richiama il metodo doPost per prenotare un nuovo utente in coda con il Ticket
                }).then(function (response){
                    return response.json();
                }).then(function (data){
                    let coda = document.getElementById("coda");
                    coda.innerHTML=data;
                });

                i=0;
             },5000);
        }
})
