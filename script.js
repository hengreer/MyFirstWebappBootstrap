
//////////////form script details////////////
/////////////////////////////////////////////

const form = document.getElementById('contact_form');

if (form) {
    console.log("Form script is running");
    
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function(event){
        console.log("Submit event detected");

        event.preventDefault();

        let formName = document.forms["contact_form"]["name"].value;
        let formEmail = document.forms["contact_form"]["email"].value;
        let formMessage = document.forms["contact_form"]["message"].value;
        let formHoliday = document.forms["contact_form"]["holiday"].value;
        let formDesertTopping = document.forms["contact_form"]["Desert Topping"].value;
        let formTerms = document.forms["contact_form"]["terms"].checked;



        if (formName == "") {
            alert("Name must be filled out");
            return;
        }

        if (!emailPattern.test(formEmail)) {
            emailError.classList.remove('d-none');
            return;
        }

        emailError.classList.add('d-none');

        if (formDesertTopping == "custard"){
            alert("No one likes custard, try again.");
            return;
        }

        if (formHoliday == ""){
            alert("You must select a holiday location");
            return;
        }

        if (formTerms == false){        
            alert("You must agree to the terms");
            return;
        }

        if (formMessage == ""){
            alert("You must enter a message");
            return;
        }

        form.style.display = 'none';

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData
        });

        document.getElementById('thank-you-message').classList.remove('d-none');
    
    });

    const textarea = document.getElementById("message");
    textarea.addEventListener("input", function() {
        let total_length = this.value.length;
        document.getElementById("char-length").innerText = total_length;
    });

    form.addEventListener('reset', function(){
        document.getElementById("char-length").innerText = "0";
    });

}



//////////////Meal Get script details////////////
/////////////////////////////////////////////

        async function getMeal() {

            try {
            
            $(".mealId").html("");
            $(".meal-card").addClass('d-none');
            console.log("getMeal is running1");
            $("#mealError").addClass("d-none");

            const urlAddress =
                "https://api.freeapi.app/api/v1/public/meals/meal/random";

            const response = await fetch(urlAddress);

            if (!response.ok){
                throw new Error("Unable to fetch Meal")
            }

            const meal = await response.json();
            
            $(".meal-card").removeClass('d-none');

            console.log("getMeal is running");
            const array = Object.keys(meal.data);

            let j = 1;

            for (let i = 0; i < array.length; i++) {

                const key = array[i];
                const value = meal.data[key];
                //const displayKey = key.replace(/^str/, "");

                if (value !== null && value !== undefined && value !== "") {

                    if (key === "strMeal") {
                        document.getElementById("dish").innerHTML += value + "<br>";
                    }

                    else if (key === "strCategory") {
                        document.getElementById("category").innerHTML += value + "<br>";
                    }

                    else if (key === "strArea") {
                        document.getElementById("area").innerHTML += value + "<br>";
                    }

                    else if (key.includes("Ingredient")) {

                        const measureKey = key.replace("Ingredient", "Measure");

                        displayAnswer(
                            `${j} : ${value}: ${meal.data[measureKey]}`
                        );

                        j++;
                    }

                    else if (key === "strInstructions") {
                        document.getElementById("instructions").innerHTML += value + "<br>";
                    }

                    else if (key === "strSource") {
                        const link = document.createElement("a");

                    link.className = "text-light";
                    link.href = value;
                    link.textContent = value;
                    link.target = "_blank";
                    link.rel = "noopener noreferrer";

                    document.getElementById("source").appendChild(link);
                    }

                    else if (key === "strMealThumb") {
                        const image = document.createElement("img");
                        image.src = value;
                        image.alt = "Meal Image";
                        image.className = "img-fluid rounded d-block mx-auto";
                        document.getElementById("thumb").appendChild(image);
                    }

                    else if (key === "strYoutube") {
                        const link = document.createElement("a");

                        link.href = value;
                        link.textContent = "YouTube Receipe Link";
                        link.target = "_blank";
                        link.className ="btn btn-outline-dark";

                        document.getElementById("youtube").appendChild(link);
                    }

                    console.log(key);
                }
            }

            function displayAnswer(text) {
                document.getElementById("ingredients").innerHTML +=
                    "<br>" + text + "<br>";
            }
        }
        catch (error) {
            console.log(error);
            $("#mealError").removeClass("d-none");
        }

        }