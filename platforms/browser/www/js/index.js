
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var db;
        $(document).ready(function(){
             
            $("#saveNewContact").bind( "tap", tapHandler );
         
            function tapHandler( event ){
                insertRow();
                $("body").pagecontainer("change", "#home");
            }
        
            function insertRow(){
                let lsContacts = localStorage.getItem('contacts');
                if(lsContacts!== null){
                
                    lsContacts = JSON.parse(lsContacts);
                }else{
                    lsContacts = new Array();
                }

                let newRecord = {
                    "contactName": $("#contactName").val(),
                    "contactEmail": $("#contactEmail").val()
                }
                lsContacts.push(newRecord);
                $("#contactName").val("");
                $("#contactEmail").val("");

                localStorage.setItem('contacts', JSON.stringify(lsContacts));
            }
        
            $(document).on( 'pagebeforeshow' , '#home' ,function(event){
                let lsContacts = localStorage.getItem('contacts');
                lsContacts = JSON.parse(lsContacts);
                displayContacts(lsContacts);
            });
        
            function displayContacts(results){
                var list = $("#contactListLi");
                list.empty();
        
                console.log(results);
                var len = results.length, i;
                for (i = 0; i < len; i++) {
                    // list.append("<li><a href=\"#\">" + results[i].contactName + "</li>");
                    list.append(`<li><a href="#"> ${results[i].contactName} </li>`);
                    console.log(results[i].contactName);
                }
        
                $("#contactListLi").listview("refresh");
                
            }
        });      
    }
};
