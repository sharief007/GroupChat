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
        let date =new Date();
        let messageTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let datePart = date.toLocaleDateString(undefined, {month: "short", day: "numeric"});
        messageOptions = {
            id: id,
            user: username,
            action: "message",
            type: "image",
            time: `${messageTime} | ${datePart}`,
            content: window.URL.createObjectURL(file)
        }
        websocket.send(JSON.stringify(messageOptions));
    }
    $("#imagePreviewModal").modal("toggle");
})



$("#sendVideoButton").on("click",async ()=> {
    file = $("#videoChooser").prop("files")[0];
    if (file) {
        let date =new Date();
        let messageTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        let datePart = date.toLocaleDateString(undefined, {month: "short", day: "numeric"});
        messageOptions = {
            id: id,
            user: username,
            action: "message",
            type: file.type,
            time: `${messageTime} | ${datePart}`,
            content: window.URL.createObjectURL(file)
        }
        await websocket.send(JSON.stringify(messageOptions));
    }
    $("#videoPreviewModal").modal("toggle");
})


$("#sendLinkButton").on("click",(event)=> {
    let URL = $("#URL").val();
    $("#URL").val(" ");
    const platform = $("#exampleFormControlSelect2").val();
    if (URL.toString() !== '') {
        if (platform === 'youtube') {
            let url = $("<a/>", {
                href: URL
            });
            let search = url[0].search;
            if (search === '') {
                let videoid = url[0].pathname.toString().split("/").pop();
                URL = `https://www.youtube.com/embed/${videoid}`;
            } else {
                let videoid = url[0].search.toString().split("=").pop();
                URL = `https://www.youtube.com/embed/${videoid}`;
            }
        }
        console.log(URL);
    }
    let date =new Date();
    let messageTime = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    let datePart = date.toLocaleDateString(undefined, {month: "short", day: "numeric"});
    messageOptions = {
        id:id,
        user:username,
        action:"message",
        type:"text/link",
        platform:platform,
        time: `${messageTime} | ${datePart}`,
        content: URL
    }
    websocket.send(JSON.stringify(messageOptions));
    $("#linkPreview").text(" ");
    $("#modalForLinks").modal("toggle");
})