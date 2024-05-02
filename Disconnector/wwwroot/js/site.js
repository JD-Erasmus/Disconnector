// wwwroot/js/site.js

// Function to initialize the jQuery UI dialog
function initDialogs() {
    // Offline Dialog
    $("#offlineDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
            }
        }
    });

    // Slow Network Dialog
    $("#slowNetworkDialog").dialog({
        autoOpen: false,
        modal: true,
        buttons: {
            "OK": function () {
                $(this).dialog("close");
            }
        }
    });
}
// Call the function to initialize the dialogs
initDialogs();



// Listen for the online event
window.addEventListener('online', function () {
    $("#offlineDialog").dialog("close");
});

// Listen for the offline event
window.addEventListener('offline', function () {
    $("#offlineDialog").dialog("open");
});

function checkNetworkSpeed() {
    var downspeed = navigator.connection.downlink;
    console.log(downspeed)
    if (downspeed < 0.5) { // Check if download speed is less than 0.5 Mbps, adjust as needed
        $("#slowNetworkDialog").dialog("open"); 
        
    }

}

// use beforeunload to check for slow network before navigating to next page
// idea is to notify user of slow network before page takes 10 million years to load
window.addEventListener('beforeunload', function (event) {
    checkNetworkSpeed()
});

//check for slow network on btn submit, to be used in submit forms or ajax request
$(document).ready(function () {
    $("#submitBtn").on("click", function (event) {
        checkNetworkSpeed();
    });
});