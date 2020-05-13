function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var email_ =  profile.getEmail()

    var element = document.querySelector('#user')
    element.innerHTML= "<strong>" + email_ + "</strong>"
    // document.getElementById("signin").style.visibility = "hidden";
    $("#signin").hide()
    $("#signout").show()
    $("#user").show()

    // set on load for testing
    localStorage.setItem('usrEm', JSON.stringify(email_));
    var emCount = localStorage.getItem("usrCount");

    if (emCount == "" || emCount == null){
        emCount = 3
        localStorage.setItem('usrCount', emCount);
    } 

    // SignOut right away to avoid additional permission for youtube search
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    //console.log('User signed out.');
    });

    // Activate button if subscribed               
    checkX(email_,emCount)
}

function signOut() {
    // var auth2 = gapi.auth2.getAuthInstance();
    // auth2.signOut().then(function () {
    // console.log('User signed out.');
    // });
    $("#signin").show()
    $("#signout").hide()
    $("#user").hide()
    var element = document.querySelector('#user')
    element.innerHTML= ""
    // set on load for testing
    localStorage.setItem('usrEm', "");
    document.getElementById('btn-split').disabled = true;
    document.getElementById('btn-split').innerHTML = 'Subscribe to enable';
}

function checkX(email_,cred){
    var CSV_data_path = "https://docs.google.com/spreadsheets/d/1Wp3S-nU4EE5cZQ6aofOdcowvl8MdRj351Iq6QQdPLds/export?format=csv&gid=0";
    //console.log(CSV_data_path);
    activeStatus(CSV_data_path,email_,cred);
}

function activeStatus(file,str,cred)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, true);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    console.log(allText)
                    //search for text
                    if (allText.indexOf(str) > -1){
                        document.getElementById('btn-split').disabled = false;
                        document.getElementById('btn-split').innerHTML = 'Execute';
                        document.getElementById('sub').innerHTML = 'Subscribed';
                        // alert("Activated!")
                    }else{
                        if (cred < 1){
                            alert("You have " + cred + " credit left.\nPlease subscribe to unlock unlimited access."); 
                            document.getElementById('btn-split').innerHTML = 'Subscribe to enable';                                   
                        }else{
                            alert("You have " + cred + " credit(s) left");
                            document.getElementById('btn-split').disabled = false;
                            document.getElementById('btn-split').innerHTML = 'Execute';
                        }
                        
                    }
                        
                }
            }
        }
        rawFile.send(null);
    }


// Send data to form
var em = localStorage.getItem("usrEm");
var cred = localStorage.getItem("usrCount");

$(document).ready(function(){
    $("#chk-hf").prop('checked', true)
    if (em != "" && em != null){
        em = em.replace(/"/g,'')
        var element = document.querySelector('#user')
        element.innerHTML= "<strong>" + em + "</strong>"
        // document.getElementById("signin").style.visibility = "hidden";
        $("#signin").hide()
        $("#signout").show()
        $("#user").show()
        checkX(em,cred)
    }
});