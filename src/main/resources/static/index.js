$("#openImageChooser").click(function (e) {
    e.preventDefault();
    console.log("Image Chooser Opened")
    $("#imageChooser").trigger("click");
  });

  $("#imageChooser").on("change",(e)=> {
    let selectedFiles = e.target.files;
    if(selectedFiles.length>0)
    {
      console.log(selectedFiles);      
      previewSelectedImages(selectedFiles);
      $("#imagePreviewModal").modal();
    }
  });

  function previewSelectedImages(selectedFiles) {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const objectURL = window.URL.createObjectURL(file);

      $("<div/>").append([
          $("<img/>",{
          src : objectURL,
          class: "img-thumbnail"
        }),
        $("<p>").text(file.name)
      ]).appendTo("#imagePreviewModalBody");
    }
  }



//video chooser code
  $("#openVideoChooser").click(function (e) {
    e.preventDefault();
    console.log("Video Chooser Opened")
    $("#videoChooser").trigger("click");
  });


  $("#videoChooser").on("change",(e)=> {
    let selectedFiles = e.target.files;
    if(selectedFiles.length>0)
    {
        console.log(selectedFiles);      
        previewSelectedVideos(selectedFiles);
        $("#videoPreviewModal").modal();
    }
  });


  function previewSelectedVideos(selectedFiles) {
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const objectURL = window.URL.createObjectURL(file);

      $("<div/>").append([
          $("<video/>",{
          src : objectURL,
          height: "100%",
          width: "100%"
        }),
        $("<p>").text(file.name)
      ]).appendTo("#videoPreviewModalBody")
    }
  }


  $("#openLinksModal").click(function (e) {
    e.preventDefault();
    console.log("Links Modal opened")
    $("#modalForLinks").modal();
  });


  $("#previewLinkForm").on("submit",function (e){
    e.preventDefault();
    let URL = $("#URL").val();
    const platform = $("#exampleFormControlSelect2").val();
    if (URL.toString() !== '') {
        if (platform === 'youtube') {
           let url = $("<a/>",{
               href: URL
           });
           let search = url[0].search;
           if (search === '') {
                let videoid = url[0].pathname.toString().split("/").pop();
                URL = `https://www.youtube.com/embed/${videoid}`;
           }else {
                let videoid = url[0].search.toString().split("=").pop();
                URL = `https://www.youtube.com/embed/${videoid}`;
           }                 
        }
        console.log(URL);
        $('<iframe>', {
            src: URL,
            class: "embed-responsive-item",
            allowfullscreen: "allowfullscreen" 
        }).appendTo("#linkPreview");
    }else {
        alert("Please paste url");
    }
  });



$("#openGetOutModal").on("click", ()=> {
    $("#getOutModal").modal("toggle");
})

$("#getOutButton").on("click",()=> {
    let messageOptions = {
        id: id,
        user: username,
        action: "left"
    }
    websocket.send(JSON.stringify(messageOptions));
    websocket.close();
    $("#getOutModal").modal("toggle");
})