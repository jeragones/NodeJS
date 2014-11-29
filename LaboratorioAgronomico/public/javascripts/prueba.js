$(function() {
    /*$( "#searchForm" ).submit(function( event ) {
 
  // Stop form from submitting normally
  event.preventDefault();
 
  // Get some values from elements on the page:
  var $form = $( this ),
    term = $form.find( "input[name='s']" ).val(),
    url = $form.attr( "action" );
 
  // Send the data using post
  var posting = $.post( url, { s: term } );
 
  // Put the results in a div
  posting.done(function( data ) {
    var content = $( data ).find( "#content" );
    $( "#result" ).empty().append( content );
  });
});*/



    //$("#btnAction").on("click", function (){
    $("#btnAction").click(function(event) {
        event.preventDefault();

        var data = {};
        data.nombre = "Jorge";
        data.query = "SELECT nombre FROM persona";

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'http://localhost:3000/prueba'
        }).success(function(data) {
            alert(JSON.stringify(data));
        }).error(function() {
            alert("ERROR");
        });
    });    
});

