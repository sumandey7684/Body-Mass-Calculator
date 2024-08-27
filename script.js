document.querySelector("#imperial").classList.add('add-border');

var metric = true;;

switchUnits(true);

document.querySelector("#metric").addEventListener('click', (event) => {
    document.querySelector("#metric").classList.remove('add-border');
    document.querySelector("#imperial").classList.remove('checked-2');
    document.querySelector("#metric").classList.add('checked');
    document.querySelector("#imperial").classList.add('add-border');
    metric = true;

    switchUnits(metric);

    document.getElementById("welcome").classList.remove("gone");
    document.getElementById("enter-wh-parag").classList.remove("gone");
    document.getElementById("result-2").classList.add("gone");
})

document.querySelector("#imperial").addEventListener('click', (event) => {
    metric = false;
    document.querySelector("#imperial").classList.remove('add-border');
    document.querySelector("#metric").classList.remove('checked');
    document.querySelector("#metric").classList.add('add-border');
    document.querySelector("#imperial").classList.add('checked-2');

    switchUnits(metric);

    document.getElementById("welcome").classList.remove("gone");
    document.getElementById("enter-wh-parag").classList.remove("gone");
    document.getElementById("result-2").classList.add("gone");
})


function switchUnits(metric) {
    document.getElementById("result-3").classList.add("gone");
    if (metric) {
        document.getElementById("cm-or-inch").innerHTML = "cm"
        document.getElementById("kg-or-pound").innerHTML = "kg"
    } else {
        document.getElementById("cm-or-inch").innerHTML = "inch"
        document.getElementById("kg-or-pound").innerHTML = "pound"
    }
}

document.getElementById("weight").addEventListener("keyup", function(event){
    if (event.code === "Enter") {
        calculate();
    }
});

function calculateBMI(weight, height) {
    return weight / (height * height);
}

function calculateImperialBMI(weight, height) {
    return (weight / (height * height)) * 703;
}

var calculatedBMI;
var heightInMetres;
var message;

document.getElementById("result").addEventListener('click', (event) => {
    calculate();
})

function calculate() {
    let heightVar = document.getElementById("height").value;
    let weightVar = document.getElementById("weight").value;

    if (heightVar == "" || weightVar == "") {
        document.getElementById("welcome").classList.add("gone");
        document.getElementById("enter-wh-parag").classList.add("gone");
        document.getElementById("result-3").classList.remove("gone")

        setTimeout(() => {
            document.getElementById("welcome").classList.remove("gone");
            document.getElementById("enter-wh-parag").classList.remove("gone");
            document.getElementById("result-3").classList.add("gone");
        }, 3000)
        return;
    }


    if (!metric) {
        calculatedBMI = calculateImperialBMI(weightVar, heightVar);
        calculatedBMI = Math.round(calculatedBMI * 10) / 10;
        heightInMetres = (heightVar * 2.54) * 0.01;
    } else {
        heightInMetres = heightVar * 0.01;
        calculatedBMI = calculateBMI(weightVar, heightInMetres);
        calculatedBMI = Math.round(calculatedBMI * 10) / 10;
    }

    document.getElementById("welcome").classList.add("gone");
    document.getElementById("enter-wh-parag").classList.add("gone");
    document.getElementById("result-2").classList.remove("gone");

    document.getElementById("calculated-num").innerHTML = calculatedBMI;

    const idealBMImin = 18.5;
    const idealBMImax = 25;

    const idealWeightMinInKgs = idealBMImin * (heightInMetres ** 2);
    const idealWeightMaxInKgs = idealBMImax * (heightInMetres ** 2);

    const idealWeightMinInLbs = idealWeightMinInKgs * 2.2;
    const idealWeightMaxInLbs = idealWeightMaxInKgs * 2.2;

    let underweight = "Your BMI suggests that you are underweight. ";
    let idealWeight = "Your BMI suggests that you are of ideal weight. ";
    let overvweight = "Your BMI suggests that you are overweight. ";

    if (!metric) {
        if (calculatedBMI > 18.5 && calculatedBMI < 25) {
            message = idealWeight + `Your ideal weight is between ${idealWeightMinInLbs.toFixed(2)} - ${idealWeightMaxInLbs.toFixed(2)} lbs.`
        } else if (calculatedBMI < 18.5) {
            message = underweight + `Your ideal weight is between ${idealWeightMinInLbs.toFixed(2)} - ${idealWeightMaxInLbs.toFixed(2)} lbs.`
        } else {
            message = overvweight + `Your ideal weight is between ${idealWeightMinInLbs.toFixed(2)} - ${idealWeightMaxInLbs.toFixed(2)} lbs.`
        }
    } else {
        if (calculatedBMI > 18.5 && calculatedBMI < 25) {
            message = idealWeight + `Your ideal weight is between ${idealWeightMinInKgs.toFixed(2)} - ${idealWeightMaxInKgs.toFixed(2)} kg.`
        } else if (calculatedBMI < 18.5) {
            message = underweight + `Your ideal weight is between ${idealWeightMinInKgs.toFixed(2)} - ${idealWeightMaxInKgs.toFixed(2)} kg.`
        } else {
            message = overvweight + `Your ideal weight is between ${idealWeightMinInKgs.toFixed(2)} - ${idealWeightMaxInKgs.toFixed(2)} kg.`
        }
    }

    document.getElementById("ideal-weight").innerHTML = message;
}




  