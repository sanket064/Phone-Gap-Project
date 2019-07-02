
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

            $("#saveEditContact").bind( "tap", editHandler );
         
            function tapHandler( event ){
                insertRow();
                $("body").pagecontainer("change", "#home");
            }

            function editHandler( event ){
                // Update the local storage contact by ID.
            }

            function loadEditContact( event ){
                // Get the contact and email of the list view item I have tapped on
                // Load this data into the two input boxes
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
                    list.append(`<li><a href="#editcontact">${results[i].contactName}</li>`);
                    console.log(results[i].contactName);
                }
        
                $("#contactListLi").listview("refresh");
                
            }
        }); 
            var options = new ContactFindOptions();
            options.filter="";          // empty search string returns all contacts
            options.multiple=true;      // return multiple results
            filter = ["displayName"];   // return contact.displayName field

            // find contacts
            navigator.contacts.find(filter, onSuccess, onError, options);

            var names = [];

            // onSuccess: Get a snapshot of the current contacts
            //
            function onSuccess(contacts) {
                for (var i=0; i<contacts.length; i++) {
                    if (contacts[i].displayName) {  // many contacts don't have displayName
                        names.push(contacts[i].displayName);
                    }
                }
                alert('contacts loaded');
                console.log(names);
            }

            function onError(err){
                console.log(err);
            }      
    }
};
