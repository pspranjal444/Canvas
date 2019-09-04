const FacultyDet = require('../../backend/models/faculty_details');

function handle_request(message, callback){
    const {email} = message.query;
    // var query = "SELECT name, phone, about, city, country, company, school, hometown, languages, gender, imglink FROM faculty_details WHERE email='"+email+"'";
    var query = {email: email}
    // connection.query(query, (err, result) => {
    //     if(err) throw err;
    //     res.json(result);
    // });
    FacultyDet.find(query).exec().then(result=>{
        callback(null, result);
    })
    .catch(err=>{console.log(err); callback(err, null);});
}

exports.handle_request = handle_request;