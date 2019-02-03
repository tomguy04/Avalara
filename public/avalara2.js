//Build an array containing States.
var states = [
    {StateId:"Alabama",Name:"Alabama"},
    {StateId:"Alaska",Name:"Alaska"},
    {StateId:"Arizona",Name:"Arizona"},
    {StateId:"Arkansas",Name:"Arkansas"},
    {StateId:"California",Name:"California"},
    {StateId:"Colorado",Name:"Colorado"},
    {StateId:"Connecticut",Name:"Connecticut"},
    {StateId:"Delaware",Name:"Delaware"},
    {StateId:"Florida",Name:"Florida"},
    {StateId:"Georgia",Name:"Georgia"},
    {StateId:"Hawaii",Name:"Hawaii"},
    {StateId:"Idaho",Name:"Idaho"},
    {StateId:"Illinois",Name:"Illinois"},
    {StateId:"Indiana ",Name:"Indiana "},
    {StateId:"Iowa",Name:"Iowa"},
    {StateId:"Kansas",Name:"Kansas"},
    {StateId:"Kentucky",Name:"Kentucky"},
    {StateId:"Louisiana",Name:"Louisiana"},
    {StateId:"Maine",Name:"Maine"},
    {StateId:"Maryland",Name:"Maryland"},
    {StateId:"Massachusetts",Name:"Massachusetts"},
    {StateId:"Michigan",Name:"Michigan"},
    {StateId:"Minnesota",Name:"Minnesota"},
    {StateId:"Mississippi",Name:"Mississippi"},
    {StateId:"Missouri",Name:"Missouri"},
    {StateId:"Montan",Name:"Montan"},
    {StateId:"Nebraska",Name:"Nebraska"},
    {StateId:"Nevada",Name:"Nevada"},
    {StateId:"New Hampshire",Name:"New Hampshire"},
    {StateId:"New Jersey",Name:"New Jersey"},
    {StateId:"New Mexico",Name:"New Mexico"},
    {StateId:"New York",Name:"New York"},
    {StateId:"North Carolina",Name:"North Carolina"},
    {StateId:"North Dakota",Name:"North Dakota"},
    {StateId:"Ohio",Name:"Ohio"},
    {StateId:"Oklahoma",Name:"Oklahoma"},
    {StateId:"Oregon",Name:"Oregon"},
    {StateId:"Pennsylvania",Name:"Pennsylvania"},
    {StateId:"RhodeIsland",Name:"RhodeIsland"},
    {StateId:"South Carolina",Name:"South Carolina"},
    {StateId:"SouthDakota",Name:"SouthDakota"},
    {StateId:"Tennessee",Name:"Tennessee"},
    {StateId:"Texas",Name:"Texas"},
    {StateId:"Utah",Name:"Utah"},
    {StateId:"Vermont",Name:"Vermont"},
    {StateId:"Virginia",Name:"Virginia"},
    {StateId:"Washington",Name:"Washington"},
    {StateId:"WestVirginia",Name:"WestVirginia"},
    {StateId:"Wisconsin",Name:"Wisconsin"},
    {StateId:"Wyoming",Name:"Wyoming"},
            
];

$(document).ready(function(){
    const ddlStates = document.getElementById("state");
    //Add the Options to the DropDownList.
    for (var i = 0; i < states.length; i++) {
        var option = document.createElement("OPTION");

        //Set Customer Name in Text part.
        option.innerHTML = states[i].Name;

        //Set CustomerId in Value part.
        option.value = states[i].StateId;

        //Add the Option element to DropDownList.
        ddlStates.options.add(option);
    }

    // click on button submit
    $('#taxForm').submit( function(){
        event.preventDefault()
        $('#errorMessages').html('');
        $('#tax').html('');
        $('#taxAmount').html('');
        $('#total').html('');
        // send ajax
        $.ajax  ({
            url: 'https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?', // url where to submit the request
            type : "GET", // type of action POST || GET
            headers: {
                "Authorization": "Basic Z2xlbnJnQGdtYWlsLmNvbTp0b21ndXkwNEF2YWxhckA="
            },
            dataType : 'json', // data type
            data : $("#taxForm").serialize(), // post data || get data
            success : function(result) {
                console.log(`success`)
                console.log(`total rate ${result.totalRate}`);
                console.log(`rates ${JSON.stringify(result.rates)}`);
                $('#tax').html(result.totalRate)
                data = $("#taxForm").serializeArray()
                amount = data[4].value
                console.log(amount);
                $('#taxAmount').html((amount*(result.totalRate)).toFixed(2));
                $('#total').html((amount*(1+result.totalRate)).toFixed(2));
                taxForm.reset();
            },
            error: function(xhr, resp, text) {
                console.log(`error1--->${JSON.stringify(xhr)}`) 
                console.log(`error1--->${JSON.stringify(xhr.responseJSON.error.details[0].description)}`) 
                let errorText = JSON.stringify(xhr.responseJSON.error.details[0].description);
                $('#errorMessages').html(errorText);
                // console.log(`error1--->${xhr.error}`) 
                console.log(`error2--->${JSON.stringify(resp)}`) 
                console.log(`error3--->${JSON.stringify(text)}`);
            }
        })
    });
    
});
