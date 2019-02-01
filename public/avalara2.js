// $(document).ready(function(e){
//     $('#taxForm').submit(function(){
//         event.preventDefault()
//         console.log($("#taxForm").serialize()) 
//         $.ajax({
//             type:'GET',
//             headers: {
//                 "Authorization": "Basic Z2xlbnJnQGdtYWlsLmNvbTp0b21ndXkwNEF2YWxhckA="
//             },
//             url:`https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?${("#taxForm").serialize()}`,
//             success: function(data){
//                 console.log('success');
//             }
//         })
//         taxForm.reset();
//     })
    
// })

$(document).ready(function(){
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
                $('#taxAmount').html(amount*(result.totalRate));
                $('#total').html(amount*(1+result.totalRate))
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
