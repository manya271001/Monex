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

    
// CRUD OPERATIONS

// TO READ DATA
async function fet(){
       let d= await fetch("http://localhost:3000/Transaction")
    let data =  await d.json()
    let finalData=data.map((t)=>`
         <tr width="200px" style="margin-top:20px">
            <td style="display:flex; gap:10px"><img src="${t.img}" alt="" height="20px" width="20px" style=" border-radius: 50%;"> ${t.recv}</td>
            <td>${t.date}</td>
            <td style="color:${getStatusColor(t.status)}">${t.status}</td>
            <td>${t.price}</td>
            <td>${t.type}</td>
            <td> <button onclick="mydelete('${t.id}')">DELETE</button>  <button onclick="updateData('${t.id}')">EDIT</button></td>

        </tr>
    `).join("")
    document.querySelector("#output").innerHTML=finalData

}
fet()
function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case 'completed':
            return 'green';
        case 'pending':
            return 'orange';
        case 'rejected':
            return 'red';
        case 'cancelled':
            return 'gray';
        default:
            return 'black'; 
    }
}

// TO DELETE DATA
async function mydelete(id){
     await fetch(`http://localhost:3000/Transaction/${id}`,{
        method:"DELETE",
        headers: {
        "Content-Type": "application/json"
    }

    })
     .then(res=>alert("delete sucessfull ....!!!"))
}

// UPDATE DATA
async function updateData(id){
    let data = await fetch(`http://localhost:3000/Transaction/${id}`)
    let newdata = await data.json()
    let selectedData=`
      <input type="text"  value="${newdata.id}" readonly> <br>
     <input type="text"  id="img1" value="${newdata.img}"> <br>  
       <input type="text"  id="rev1" value="${newdata.recv}"> <br>
     <input type="text"  id="date1" value="${newdata.date}"> <br>
     <input type="text"  id="status1" value="${newdata.status}"> <br>
     <input type="text"  id="price1" value="${newdata.price}"> <br>
     <input type="text"  id="type1" value="${newdata.type}"> <br>
     <input type="submit" onclick="finalUpDate('${newdata.id}')" id="btn"> <br>
     

      ` 
       const editableSection = document.querySelector("#editable");
    editableSection.innerHTML = selectedData;
    editableSection.style.display = "block";
     }

     function finalUpDate(id){
        let fdata={
            img:document.querySelector('#img1').value,
            recv:document.querySelector('#rev1').value,
            date:document.querySelector('#date1').value,
            status:document.querySelector('#status1').value,
            price:document.querySelector('#price1').value,
            type:document.querySelector('#type1').value,
        }
        fetch(`http://localhost:3000/Transaction/${id}`,{
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(fdata)
        })
        .then(r=>alert("updatedd....!!!!"))
     }

     // INSERT DATA

     function insertform(){
        document.querySelector("#insertData").style.display="block"
     }
     function submitData(){
        
        let obj={
            "img":document.querySelector("#image").value,
            "recv":document.querySelector("#rec").value ,
           "date":document.querySelector("#Date").value ,
           "status": document.querySelector("#Status2").value,
           "price": document.querySelector("#amt").value,
           "type":document.querySelector("#type2").value
        }
        fetch("http://localhost:3000/Transaction",{
        method:'POST',
        headers:{
           
            'content-type':'application/json'
        },
        
        body:JSON.stringify(obj)
    })
    .then(res=>alert("inserted...!!!!!!"))
}



  //   
function display(){
    let nav = document.querySelector("#navbar");
    nav.style.display="block"
}
function nodisplay(){
      let nav = document.querySelector("#navbar");
    nav.style.display="none"
}
document.addEventListener("click", function(event) {
    let nav = document.querySelector("#navbar");
    let hamburger = document.querySelector("#hamburger");
    if (!nav.contains(event.target) && !hamburger.contains(event.target)) {
        nav.style.display = "none";  
    }
});
  function hideEditableForm(event) {
        let editableForm = document.querySelector("#editable");
        
        if (!editableForm.contains(event.target) && editableForm.style.display === "block") {
            editableForm.style.display = "none";  
        }
    }
    document.onclick = hideEditableForm;
