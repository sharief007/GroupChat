
var username,websocket,id;


$("document").ready(()=> {
  $("#page-content").hide();
  $("#getInModal").modal({
    backdrop: false
  });
});

$("#getInForm").on("submit",async (e)=> {
  e.preventDefault();

    username = $("#inputUsername").val();
    console.log(`Loged in as ${username}`);

    websocket = new WebSocket("ws://localhost:1111/websocket");
    console.log(websocket);


    websocket.onopen = ()=>{
      websocket.send(JSON.stringify({
        user: username,
        action: "joined"
      }));
    }

    websocket.onmessage = (event) => {
      try {
        let data = JSON.parse(event.data);
        switch (data.action) {
          case "message":
            handleMessage(data);
            break;
          case "joined":
            showJoinedUser(data);
            break;
          case "left":
            showLeftedUser(data);
            break;
          case "connection":
            id = data.id;
            console.log(id);
            break;
          default:
            console.log(data);
            break;
        }
      }catch (err) {
        console.log(event.data);
        handleBlobContent(event.data);
      }
    }

    websocket.onclose = (ev)=> {
      console.log('connection closed');
    }

    $("#getInModal").modal("toggle");
    $("#page-content").show();
});

function showJoinedUser(data)
{
  $("<div/>",{
    class: "alert alert-success text-center",
  }).text(`${data.user} joined the group`)
  .appendTo("#chatBody");

  //add user in grouplist
    $("<a/>",{
        class: "list-group-item list-group-item-action",
        href: "#"
    }).text(data.user).appendTo("#groupMembers")
}

function showLeftedUser(data) {
  $("<div/>",{
    class: "alert alert-danger text-center",
  }).text(`${data.user} left the group `)
      .appendTo("#chatBody");
}

function handleMessage(jsonData) {
  if (jsonData.type==="text/plain") {
    addTextMessage(jsonData);
  } else {
    
  }
}

function addTextMessage(jsonObject) {
  let sent = (jsonObject.id === this.id);
  if(sent)
  {
    $("<div/>",{
      class: 'msg-div sent'
    }).append($("<div/>",{
      class: 'message-text bg-primary text-light'
    }).text(jsonObject.content)
    ).appendTo("#chatBody");
  } else {
    let metadata = $("<div/>").append($("<small>").text(jsonObject.user+"\t"),$("<small>").text(jsonObject.time));
    $("<div/>",{
      class: 'msg-div receive'
    }).append(metadata, $("<div/>",{
      class: 'message-text bg-light'
    }).text(jsonObject.content)).appendTo("#chatBody");
  }
}

function handleBlobContent(file) {
  let url = window.URL.createObjectURL(file);
  console.log(url);
  //if (file.type.toString().includes("image")){
    $("<img/>",{
      src: url
    }).appendTo("#chatBody");
    console.log("image inserted");
  //}
  //console.log("not inserted")
}