$("#messageForm").on("submit",(event)=> {
    event.preventDefault();

    let content = $("#textbox").val().toString();
    $("#textbox").val('');

    let date =new Date();
    let messageTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let datePart = date.toLocaleDateString(undefined, {month: "short", day: "numeric"});

    messageOptions = {
        id: id,
        user: username,
        action: "message",
        type: "text/plain",
        time: `${messageTime} | ${datePart}`,
        content: content
    };
    websocket.send(JSON.stringify(messageOptions));
})


$("#sendImageButton").on("click",()=>{
    file = $("#imageChooser").prop("files")[0];
    if (file) {
        websocket.send(file);
    }
})