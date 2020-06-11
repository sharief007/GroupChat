
var username,websocket;


$("document").ready(()=> {
    $("#page-content").hide();
    $("#getInModal").modal({
      backdrop: false
    });
  });

  $("#getInForm").on("submit",(e)=> {
    e.preventDefault();

    username = $("#inputUsername").val();
    console.log(`Loged in as ${username}`);

    websocket = new WebSocket("ws://")
    
    $("#getInModal").modal("toggle");
    $("#page-content").show();
  });



