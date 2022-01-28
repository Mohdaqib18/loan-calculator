//listen for submit

document.getElementById("loan-form").addEventListener("submit", function(e){
 e.preventDefault();

 //hide result

 document.querySelector("#results").style.display = "none"

 //show loading
 document.querySelector("#loading").style.display = "block"

 setTimeout(calculateResults, 2000)


});


//calculate results

function calculateResults(){


    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment= document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatePayments = parseFloat(years.value) * 12;


    //calculate monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatePayments);

    const monthly = (principal * x * calculatedInterest)/ (x-1);


    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatePayments).toFixed(2); 
        totalInterest.value = ((monthly * calculatePayments) - principal).toFixed(2);

        document.querySelector("#results").style.display = "block"
        document.querySelector("#loading").style.display = "none"
    }

    else{
      showError("Please put the right numbers");
    }


}


function showError(error){
  

  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  const errorDiv = document.createElement("div");

  errorDiv.className = "alert alert-danger";

  
  errorDiv.appendChild(document.createTextNode(error));

  
  card.insertBefore(errorDiv, heading)

  setTimeout(errorGone, 3000);

}

function errorGone(){
  document.querySelector(".alert").remove();
}