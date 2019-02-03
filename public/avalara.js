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
    {StateId:"WestVirginia",Name:"West Virginia"},
    {StateId:"Wisconsin",Name:"Wisconsin"},
    {StateId:"Wyoming",Name:"Wyoming"},
            
];

$(document).ready(function(){
    const ddlStates = document.getElementById("state");
    //Add the Options to the DropDownList.
    for (var i = 0; i < states.length; i++) {
        var option = document.createElement("OPTION");

        //Set State in Text part.
        option.innerHTML = states[i].Name;

        //Set StateId in Value part.
        option.value = states[i].StateId;

        //Add the Option element to DropDownList.
        ddlStates.options.add(option);
    }

    // click on button submit
    $('#taxForm').submit( function(){
        event.preventDefault()
        //clear out old calculations and error messages
        $('#errorMessages').html('');
        $('#tax').html('');
        $('#taxAmount').html('');
        $('#total').html('');
        // send ajax
        $.ajax  ({
            url: 'https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?', 
            type : "GET", 
            headers: {
                "Authorization": "Basic Z2xlbnJnQGdtYWlsLmNvbTp0b21ndXkwNEF2YWxhckA="
            },
            dataType : 'json', 
            data : $("#taxForm").serialize(), 
            //if the api call succeeds...
            success : function(result) {
                //some status and raw api return data in the console
                console.log(`success`)
                console.log(`total rate ${result.totalRate}`);
                console.log(`rates ${JSON.stringify(result.rates)}`);
                //show the tax rate
                $('#tax').html(result.totalRate)
                //get the amount in order to apply the tax rate
                data = $("#taxForm").serializeArray()
                amount = data[4].value
                //show the amount of tax to be applied
                //show the grand total, tax plus amount entered
                $('#taxAmount').html((amount*(result.totalRate)).toFixed(2));
                $('#total').html((amount*(1+result.totalRate)).toFixed(2));
                taxForm.reset();
            },
            //handle and show errors from the api, in this case only invalid 5 digit postal codes were not handled on the front end, so they are captured by the api on the back end and the appropriate error is shown.
            error: function(xhr, resp, text) {
                //show entire error in the console
                console.log(`error1--->${JSON.stringify(xhr)}`) 
                let errorText = JSON.stringify(xhr.responseJSON.error.details[0].description);
                //show the error to the user.
                $('#errorMessages').html(errorText);
            }
        })
    });
    
});
