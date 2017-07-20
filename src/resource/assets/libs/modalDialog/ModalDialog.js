

var ModalDialog = function (params) {
    var dialog = this;
    var DIALOG_FULL = 1;
    var DIALOG_MESSAGE = 2;
    var defaults = {
        type: DIALOG_FULL,
        title: "Message Title",
        contentMessage: "",
        isCloseShow: true,
        cancel: "Đóng",
        // agree: "Đồng ý",
        parentNote: "",
        contentHTML: ""

    }
    var params = params || defaults;

    dialog.showDialog = function () {

        var modal = document.getElementById('myModalDialog');
        if (modal != undefined) {
            modal.style.display = 'block';
        } else {
            logInfo("Dialog not create!","ModalDialog:26");
        }


    }
    dialog.showDialogFull = function (params) {
        var modal;
        var bgDialog;
        if(urlSourceHTML == 'FIX-DEFAULT'){
            modal= document.getElementById('myModalFullDialog-second');
            bgDialog = document.getElementById('dialogFullBackground-second');
        }else{
            modal= document.getElementById('myModalFullDialog');
            bgDialog = document.getElementById('dialogFullBackground');
        }


        if (modal != undefined) {

            var divID = document.getElementById("tabHost");
            var h = divID.offsetHeight;
            var w = divID.offsetWidth;
           
            modal.style.width = w+"px";
            modal.style.height = h+"px";
            modal.style.display = 'block';
            var img = document.getElementById('user-background-image'), style = img.currentStyle || window.getComputedStyle(img, false), imgResource = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            bgDialog.style.backgroundImage = "url('" + imgResource + "')";
        } else {
            
             logInfo("Dialog not create!","ModalDialog:56");
        }

    }
    dialog.setContentMessage = function (params) {
        params.contentMessage = params;
    }

    var urlSourceHTML = "";
    var isHaveJS = false;
    dialog.setUrlSourceHTML = function (url,isJS) {
        urlSourceHTML = url;
        isHaveJS = isJS;
    }

    dialog.setTitle = function (params) {
        params.title = params;

    }
    dialog.isCloseShow = function (params) {
        if (params) {
            params.isCloseShow = true;
        }
        else {
            params.isCloseShow = false;
        }
    }
    dialog.setCancelTitle = function (params) {

        params.cancel = params;

    }
    dialog.setAgreeTitle = function (params) {
        params.agree = params;
    }
    dialog.setTypeDialog = function (params) {
        params.agree = params;
    }
    dialog.setParentShow = function (parentNote) {
        params.parentNote = parentNote;
    }
    dialog.onCreateDialog = function () {
        var title = params.title;
        var message = params.contentMessage;
        var typeDialog = params.type;
        var cancel = params.cancel;
        var agree = params.agree;
        var parentNote = params.parentNote;

        var divID = document.getElementById("tabHost");
        var currentClientHeight = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
         var currentClientWidth = window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;
        var h = divID.offsetHeight;
        var w = divID.offsetWidth;
        var marginTopNone = (currentClientHeight- h)/2;
        var marginLeftNone = (currentClientWidth - w)/2;
        if (message == undefined) {
            message = "";
        }

        if (typeDialog != undefined && typeDialog == DIALOG_MESSAGE) {
            var addebModelContent = gIsLogin?"":" none-ebModalContent";
           dialog.removeDialog();
            if(urlSourceHTML == 'TWO-BUTTON'){
                var content = "<div id='myModalDialog' class='modaldialogContent'><div class='eb-modal-content"+addebModelContent+"'><div class='eb-modal-header'><span id ='eb_modal_close' class='eb-modal-close'>&times</span><h4>" + title + "</h4></div>" +
                                "<div class='eb-modal-body'><p>" + message + "</p></div>" +
                                "<div class='divider-modal-dialog'></div><div class='eb-modal-footer'><button id='eb_dialog_agree'>" + agree + "</button><button id='eb_dialog_cancel'>" + cancel + "</button></div></div></div>";

            }else{
                var content = "<div id='myModalDialog' class='modaldialogContent'><div class='eb-modal-content"+addebModelContent+"'><div class='eb-modal-header'><span id ='eb_modal_close' class='eb-modal-close'>&times</span><h4>" + title + "</h4></div>" +
                                "<div class='eb-modal-body'><p>" + message + "</p></div>" +
                                "<div class='divider-modal-dialog'></div><div class='eb-modal-footer'><button id='eb_dialog_cancel'>" + cancel + "</button></div></div></div>";
            }
            if (parentNote) {
                var holder = document.createElement('div');
                        holder.innerHTML = content;
                 var el = holder.firstChild;
                document.getElementById(parentNote).appendChild(el);
                        changeLanguageInView();
                // document.getElementById(parentNote).innerHTML += content;
                var modal = document.getElementById('myModalDialog');
                var bgDesktop = document.getElementById('user-background-imageDesktop');
                window.onclick = function(event) {
                    if (event.target == modal || event.target == bgDesktop) {
                        modal.style.display = "none";
                        document.dispatchEvent(evt);
                    }
                }
                var agree = document.getElementById('eb_dialog_agree');
                var close = document.getElementById('eb_dialog_cancel');
                var spanClose = document.getElementById("eb_modal_close");
                spanClose.addEventListener('click', function (params) {
                    modal.style.display = "none";
                    dialog.callback("");

                });
                if(urlSourceHTML == "TWO-BUTTON"){
                    agree.addEventListener('click',function (params){
                        modal.style.display = "none";
                       dialog.callback(1);
                    });
                    close.addEventListener('click', function (params) {
                        modal.style.display = "none";
                        dialog.callback(2);
                    });
                }else{
                close.addEventListener('click', function (params) {
                    modal.style.display = "none";
                    dialog.callback();
                });
                }
            } else {
                console.log("you must set parentNote for dialog onSetParentShow");
            }



        } else if (typeDialog != undefined && typeDialog == DIALOG_FULL) {

            var htmlContent = "";
            if (urlSourceHTML != undefined && urlSourceHTML.length > 0) {
                var xhr;
                if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Msxml2.XMLHTTP"); //("Microsoft.XMLHTTP");//
                }
                else if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                }

                var pathFullOfFile = './pages/' + urlSourceHTML + '.xsl';
                var tmpString = getCurrentTime();
                if(urlSourceHTML == 'FIX-DEFAULT'){
                    dialog.removeDialogFull('myModalFullDialog-second');
                    var classModelNoneContent = gIsLogin?"":" none-modalfulldialogContent";
                    var classEbNoneContent = gIsLogin?"":" none-eb-modalfull-content";
                    var styleMarrgin = gIsLogin?"":(" style='left:" + marginLeftNone +"px !important;top:" + marginTopNone + "px !important;'");
                     var styleMarrginContent = gIsLogin?(" style='max-width:"+ w +"px; max-height: " + h +"px;'"):(" style='max-width:"+ w +"px; max-height: " + h +"px;" +"left:" + marginLeftNone +"px !important;top:" + marginTopNone + "px !important;'");
                    console.log(styleMarrgin +"--------------");
                    var content = "<div id='myModalFullDialog-second' class='modalfulldialogContent"+classModelNoneContent+"' " + styleMarrgin +"><div id='dialogFullBackground-second'></div><div id='id-eb-modalfull-content' class='eb-modalfull-content"+classEbNoneContent +"'"+ styleMarrginContent +"><div class='eb-modalfull-header'><span id ='eb_modalfull_close-second' class='eb-modalfull-close'>&times</span><h4>" + title + "</h4></div>" +
                    "<div class='divider-modal-dialog'></div><div class='eb-modalfull-body'>" + params.contentMessage + "</div>" +
                    "</div></div>";
                    if (parentNote) {
                        var holder = document.createElement('div');
                        holder.innerHTML = content;
                        var el = holder.firstChild;
                        document.getElementById(parentNote).appendChild(el);
                        changeLanguageInView();
                        //document.getElementById(parentNote).innerHTML += content;
                        var parentNoteDialog = document.getElementById("myModalFullDialog-second");

                        loadJSfile(parentNoteDialog,urlSourceHTML,isHaveJS,function () {
                            var timePageEvent = setTimeout(function (e) {

                            if (typeof(window['viewDialogLoadSuccess']) == 'function') {
                            window['viewDialogLoadSuccess']();
                            setTimeout(function () {
                            window['viewDialogLoadSuccess'] = null;
                            }, 10);
                            }
                            }, 10);
                            },function () {
                            logInfo("Page: " + pathFullOfFile + " not found!!!");

                        });

                        dialog.callbackXslSuccess();
                        var modaFull = document.getElementById('myModalFullDialog-second');
                        var spanClose = document.getElementById("eb_modalfull_close-second");
                        // window.onpopstate = function(event) {
                        //     modaFull.style.display = "none";
                        //     dialog.callback("N");
                        // };
                        spanClose.addEventListener('click', function (params) {
                            modaFull.style.display = "none";
                            dialog.callback("N");
                        });

                    } else {
                        console.log("you must set parentNote for dialog onSetParentShow");
                    }

                }else{
                    dialog.removeDialogFull('myModalFullDialog');
                xhr.open("GET", pathFullOfFile); //assuming kgr.bss is plaintext
                xhr.onreadystatechange = function () {
                   
                    if ((xhr.readyState == 4) && ((xhr.status == 200) || (xhr.status == 0))) {
                        var inXsl = xhr.responseXML;
                        var inXml = createXMLDoc();
                        if (!window.ActiveXObject) {
                            createXMLNode('root', '', inXml);
                        }
                        if (window.ActiveXObject || "ActiveXObject" in window) {
                            // Load XML
                            var xml = new ActiveXObject("Microsoft.XMLDOM");
                            xml.async = false;
                            xml.load(inXml);

                            // Load the XSL
                            var xsl = new ActiveXObject("Microsoft.XMLDOM");
                            xsl.async = false;
                            xsl.load(inXsl);
                            var ex = xml.transformNode(xsl);
                            htmlContent = ex;
                          

                        } else if (document.implementation && document.implementation.createDocument) {
                            var xsltProcessor = new XSLTProcessor();
                            xsltProcessor.importStylesheet(inXsl);
                            var resultDocument = xsltProcessor.transformToFragment(inXml, document);
                            if (resultDocument != undefined) {
                                var xmlAsString = new XMLSerializer().serializeToString(resultDocument);
                                htmlContent = xmlAsString;
                                
                            }

                        }
                       if(checkScreenisMobilePX()){
                           var height= (window.innerHeight || document.documentElement.clientHeight);
                           var contentHeight = height-44;
                          htmlContent = htmlContent.replace('"main-layout-subview"',"'main-layout-subview-child' style='height:"+contentHeight +"px;'");
                       }else{
                           htmlContent = htmlContent.replace("main-layout-subview","main-layout-subview-child");
                       }
                        var classModelNoneContent = gIsLogin?"":" none-modalfulldialogContent";
                        var classEbNoneContent = gIsLogin?"":" none-eb-modalfull-content";
                         var styleMarrgin = gIsLogin?"":(" style='left:" + marginLeftNone +"px !important;top:" + marginTopNone + "px !important;'");
                     var styleMarrginContent = gIsLogin?(" style='max-width:"+ w +"px; max-height: " + h +"px;'"):(" style='max-width:"+ w +"px; max-height: " + h +"px;" +"left:" + marginLeftNone +"px !important;top:" + marginTopNone + "px !important;'");
                    // var content = "<div id='myModalFullDialog-second' class='modalfulldialogContent"+classModelNoneContent+"' " + styleMarrgin +"><div id='dialogFullBackground-second'></div><div class='eb-modalfull-content"+classEbNoneContent +"'"+ styleMarrginContent +"><div 
                        var content = "<div id='myModalFullDialog' class='modalfulldialogContent"+classModelNoneContent+"' " + styleMarrgin +"><div id='dialogFullBackground'></div><div id='id-eb-modalfull-content' class='eb-modalfull-content"+classEbNoneContent +"'"+ styleMarrginContent +"><div class='eb-modalfull-header'><span id ='eb_modalfull_close' class='eb-modalfull-close'>&times</span><h4>" + title + "</h4></div>" +
                            "<div class='divider-modal-dialog'></div><div class='eb-modalfull-body'>" + htmlContent + "</div>" +
                            "</div></div>";
                       

                        if (parentNote) {
                            // var tmpCellLabel = document.createElement('div');
                            // var attlb = document.createAttribute("id");       // Create a "class" attribute
                            // attlb.value = "myModalFullDialog";
                            // var attlb = document.createAttribute("id");       // Create a "class" attribute
                            // attlb.value = "myModalFullDialog";
                            // tmpCellLabel.setAttributeNode(attlb);
                            var holder = document.createElement('div');
                            holder.innerHTML = content;
                            var el = holder.firstChild;
                            document.getElementById(parentNote).appendChild(el);
                            changeLanguageInView();
                            //document.getElementById(parentNote).innerHTML += content;
                            var parentNoteDialog = document.getElementById("myModalFullDialog");

                            loadJSfile(parentNoteDialog,urlSourceHTML,isHaveJS,function () {
                                var timePageEvent = setTimeout(function (e) {

                                    if (typeof(window['viewDialogLoadSuccess']) == 'function') {
                                        window['viewDialogLoadSuccess']();
                                        setTimeout(function () {
                                            window['viewDialogLoadSuccess'] = null;
                                        }, 10);
                                    }
                                }, 10);
                            },function () {
                                logInfo("Page: " + pathFullOfFile + " not found!!!");

                            });

                            dialog.callbackXslSuccess();
                            var modaFull = document.getElementById('myModalFullDialog');
                            var spanClose = document.getElementById("eb_modalfull_close");
                            // window.onpopstate = function(event) {
                            //     modaFull.style.display = "none";
                            //     dialog.callback("N");
                            // };
                            spanClose.addEventListener('click', function (params) {
                                modaFull.style.display = "none";
                                dialog.callback("N");
                            });
                            // window.onclick = function (event) {

                            //     if (event.target == modaFull) {
                            //         modaFull.style.display = "none";
                            //         dialog.callback("N");
                            //     }
                            // }
                        } else {
                            console.log("you must set parentNote for dialog onSetParentShow");
                        }

                    } else {
                        console.log("status not accept");
                    }

                };

                //no-cache
                xhr.setRequestHeader("Cache-Control", "no-cache,max-age=0");
                xhr.setRequestHeader("Pragma", "no-cache");
                xhr.send("");
            }
            } else {
                console.log("you must push directory page");
            }

        }


    }
    dialog.removeDialog = function () {
        var item = document.getElementById("myModalDialog");
        var parent = document.getElementById(params.parentNote);
        var parentMain =document.getElementById("mainview");
        if (item != undefined && parent != undefined) {
            if(isDescendant(parent,item)){
                 try{
                      parent.removeChild(item);
                 }catch(err){
                     
                     //item.innerHTML="";
                        var childNodesToRemove = parent.getElementsByClassName('modaldialogContent');
                        for(var i=childNodesToRemove.length-1;i >= 0;i--){
                            var childNode = childNodesToRemove[i];
                             try{
                                 parent.removeChild(childNode);
                            }catch(er){
                                
                            }
                        }
                     
                 }
            }
           
           
        }
        if(item != undefined && parentMain != undefined){
            if(isDescendant(parentMain,item)){
                try{
                      parentMain.removeChild(item);
                 }catch(err){
                     
                    //item.innerHTML="";
                    var childNodesToRemove = parentMain.getElementsByClassName('modaldialogContent');
                        for(var i=childNodesToRemove.length-1;i >= 0;i--){
                            var childNode = childNodesToRemove[i];
                            try{
                                 parentMain.removeChild(childNode);
                            }catch(er){
                            }
                           
                        }
                     return;
                 }
            }
        }

    }
    dialog.removeDialogFull = function (dialogId) {
        var item = document.getElementById(dialogId);
        var parent;
        if(item != null){
            parent = item.parentNode;
        }else{
            parent = document.getElementById(params.parentNote);
        }
        if (item != undefined && parent != undefined) {
            if(isDescendant(parent,item)){
                try{
                     parent.removeChild(item);
                }catch(err){
                   
                    //item.innerHTML="";
                    return;
                }
            }
           
        }
    }
    dialog.hideDialog = function () {
        var modal = document.getElementById('myModalDialog');
        if (modal != undefined) {
            modal.style.display = "none";
        } else {
            console.log("Dialog not create!");
        }


    }
    dialog.hideDialogFull = function () {
        var modalFull;
        if(urlSourceHTML == 'FIX-DEFAULT'){
            modalFull = document.getElementById('myModalFullDialog-second');
        }else{
            modalFull = document.getElementById('myModalFullDialog');
        }
        if (modalFull != undefined) {
            modalFull.style.display = "none";
        } else {
            console.log("Dialog not create!");
        }

    }
    var functionCallback;
    dialog.setCallback = function (callback) {
        functionCallback = callback;
    }

    dialog.callback = function (param) {
        
        functionCallback(param);
    }
    var functionFireCallback;
    dialog.setFireCallback = function (fireCallback) {
        functionFireCallback = fireCallback;
    }
    dialog.fireCallBack =function(param){
        
        functionFireCallback(param);
    }
    
     var onloadXslSuccess;
    dialog.onloadPageXslSuccess = function (callback) {
        onloadXslSuccess = callback;
    }

    dialog.callbackXslSuccess = function () {
        
        if(onloadXslSuccess != undefined)
             onloadXslSuccess();
    }


    function createXMLDoc() {
        if (window.ActiveXObject || "ActiveXObject" in window) {
            return new window.ActiveXObject("Microsoft.XMLDOM");
        }
        else if (document.implementation && document.implementation.createDocument) {

            return document.implementation.createDocument(null, "", null);
        }
        else {
            logInfo('browser not support create XML');
        }
    }
    function createXMLNode(nodeKey, nodeValue, inDocXml, nodeParent) {

        if (typeof (nodeKey) != 'string') return;
        var returnNode;
        if (nodeParent == undefined || nodeParent == null) {
            returnNode = inDocXml.createElement(nodeKey);
            inDocXml.appendChild(returnNode);
        }
        else {
            returnNode = inDocXml.createElement(nodeKey);
            nodeParent.appendChild(returnNode);
        }
        if (nodeValue != undefined && nodeValue != null) {
            setNodeText(returnNode, nodeValue);
        }
        return returnNode;
    }
    function loadJSfile(parent,page, haveJsFile, successCallback, failCallback) {
        if (haveJsFile == undefined) haveJsFile = true;
        if (haveJsFile) {
              
           
                var xhr;
                if (window.XMLHttpRequest) {
                    xhr = new XMLHttpRequest();
                } else if (window.ActiveXObject) {
                    xhr = new ActiveXObject("Microsoft.XMLHTTP");
                }
                var pathFullOfFile = './pages/' + page + '.js';
                xhr.open("GET", pathFullOfFile); //assuming kgr.bss is plaintext
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && ((xhr.status == 200) || (xhr.status == 0))) {
                        var script = document.createElement("script");
                        script.setAttribute("id", "myDialogScript");
                        script.type = 'text/javascript';
                        script.innerHTML = xhr.responseText;
                        parent.appendChild(script);
                        if (successCallback && (typeof (successCallback) == 'function')) {
                            successCallback();
                        }
                    }
                    else if (isLoadPageFailStatus(xhr.status)) {
                        if (failCallback && (typeof (failCallback) == 'function')) {
                            failCallback();
                        }
                    }
                    else {
                        logInfo("XHR status: " + xhr.status + "readyState: " + xhr.readyState + " pape javascript: " + page + " not ready!");
                    }
                };
               
                xhr.setRequestHeader("Cache-Control", "no-cache");
                xhr.send();
            }
        
    }
};
function isDescendant(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}