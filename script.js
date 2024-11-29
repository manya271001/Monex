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

    const ctx = document.getElementById('workingHoursChart').getContext('2d');
    const workingHoursChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Salary', 'Expenditure', 'Saving'],
            datasets: [{
                data: [2, 5, 3], // Replace with dynamic values if needed
                backgroundColor: ['#cccccc', '#88c0d0', '#5e81ac'], // Colors matching the legend
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            cutout: '55%' // Adjust to control the inner radius
        }
    });

    // Add a central text in the middle of the doughnut chart
    Chart.register({
        id: 'textCenter',
        beforeDraw(chart) {
            const { width } = chart;
            const { ctx } = chart;
            ctx.save();
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            const text = '$32,440.90';
            ctx.fillText(text, width / 2, chart.chartArea.top + (chart.chartArea.bottom - chart.chartArea.top) / 2);
        }
    });

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

// 
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
     <input type="submit" onclick="finalUpDate('${newdata.id}')" style="background-color: black;
            color: rgb(53, 156, 200); padding: 20px 70px; border-radius:12px" margin-left:"30px "> <br>
     

      `  
      document.querySelector("#editable").innerHTML=selectedData
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



