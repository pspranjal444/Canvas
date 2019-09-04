const FacultyDet = require('../../backend/models/faculty_details');


function handle_request(message, callback){
    const {email, name, password, phone, about, city, country, company, school, hometown, languages, gender} = message.body;
    console.log('Email',email);
    var query='';
    if(password === ''){
        query = {$set: {name: name, phone: phone, about: about, city: city, country: country, company: company, school: school, hometown: hometown, languages: languages, gender: gender}};
        
        syncOne();
    }
    else{
        query = {$set: {name: name, password: password, phone: phone, about: about, city: city, country: country, company: company, school: school, hometown: hometown, languages: languages, gender: gender}};
        
        syncOne();
    }

    function syncOne(){
        FacultyDet.update({email: email}, query).exec().then(result=>{
            console.log(result);
        }).catch(err=>{console.log(err); callback(err, null);});
        callback(null, true);
    }

    
} 

exports.handle_request = handle_request;