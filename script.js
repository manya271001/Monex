function signup(){
    let obj={
    receivedemail:document.querySelector("#email").value,
    receivedname:document.querySelector("#name").value,
    receivedpass:document.querySelector("#pass").value
}
localStorage.setItem("data",JSON.stringify(obj))
}
function login(){
    let d = JSON.parse(localStorage.getItem("data")) 
    let newemail = document.querySelector("#email1").value
    let newpass = document.querySelector("#pass1").value
    if(newemail==d.receivedemail && newpass==d.receivedpass){
      window.location.href="./dashboard.html"
    }
    else{
        window.alert("wrong password")
    }

    return false
}