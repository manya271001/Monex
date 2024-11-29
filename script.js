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
async function fet(){
       let d= await fetch("http://localhost:3000/Transaction")
    let data =  await d.json()
    let finalData=data.map((t)=>`
         <tr width="200px">
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