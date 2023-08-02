// ----- API deploy progetto Attesa - ScorrCoda
let API= "https://script.google.com/macros/s/AKfycbw4p7dmUSMW_GnEc6NpY5juJCM_wEc7nA8T8uypE7AhCZbkuSdS3FRdTy2WU2QCyw/exec";
let user= getCookie("user");
let ufficio= getCookie("ufficio");
API=API+"?ufficio="+ufficio;

window.addEventListener("load", function (Event) {
//    setTimeout(() => {
//            location.reload();
//        },100000);
    if (user==""){
        let vista = document.getElementById("vista");
        vista.innerHTML="NON SEI AUTORIZZATO";
    }
    else{
        utentiCoda();
        }
});


async function utentiCoda(){
    await fetch(API,{
        method:"GET" // richiama il metodo doGet per conoscere gli utenti in coda
    }).then(function (response){
        return response.json();
    }).then(function (data){
        setTimeout(() => {
            let coda = document.getElementById("coda");
            coda.innerHTML=data;
            utentiCoda();
        },5000);
    });
}