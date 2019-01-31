//line1=123%20Main%20Street&city=Irvine&region=CA&postalCode=92615&country=US
 
$(document).ready(function(){
    // $('#taxForm').submit(function(){
    // $.get(`https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?
    // line1=123%20Main%20Street
    // &city=Irvine
    // &region=CA
    // &postalCode=92615
    // &country=US`, 
    // taxInfo,'json');
    // return false;})})

    $('#taxForm').submit(function(){
        alert('js is here!');
        // as soon as the AJAX request returns, taxInfo is invoked and passed data!
        $.ajax
        ({
          type: "GET",
          url: "https://sandbox-rest.avatax.com/api/v2/taxrates/byaddress?",
          dataType: 'json',
          headers:{
            "Authorization": "Basic " + btoa('glenrg@gmail.com' + ":" + 'tomguy04Avalar@')

          },
          data: `line1=123%20Main%20Street
          &city=Irvine
          &region=CA
          &postalCode=92615
          &country=US`,
          success: function (){
            alert('Thanks for your comment!'); 
          }
        });
    })
    // function taxInfo(data){
    //     console.log(data);
    //     // if (data){
    //     //   $('body').append("<p>"+data.login+"</p>");
    //     // }
    //   }
    }
)
