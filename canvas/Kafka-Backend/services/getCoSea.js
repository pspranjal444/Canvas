
const Courses = require('../../backend/models/courses');


function handle_request(message, callback){
    const {category, categoryVal, selectVal} = message.query;
    var query;
    if(category === "cno_category"){
        if(categoryVal === ">"){
            var searchNo = selectVal[0];
            searchNo = parseInt(searchNo);
            searchNo = searchNo + 1;
            var searchString = '('+searchNo;
            for(var i=searchNo+1; i<=9; i++){
                searchString = searchString + '|' + i;
            }
            searchString = searchString + ')';
                var findQuery = '/'+searchString+'.{2}'+'/';
                console.log(searchNo);
                console.log(findQuery);
                query = {courseid: {$regex: eval(findQuery)}};
                executeSearch();
            
        }
        else if(categoryVal === "<"){
            var searchNo = selectVal[0];
            searchNo = parseInt(searchNo);
            searchNo = searchNo - 1;
            var searchString = '('+searchNo;
            for(var i=searchNo-1; i>=0; i--){
                searchString = searchString + '|' + i;
            }
            searchString = searchString + ')';
            var findQuery = '/'+searchString+'.{2}'+'/';
            query = {courseid: {$regex: eval(findQuery)}};
            executeSearch();
        }
        else if(categoryVal === "="){
            var searchNo = selectVal;
            var findQuery = '/'+searchNo+'/';
            query = {courseid: {$regex: eval(findQuery)}};
            executeSearch();
        }
    }

    else if(category === "cname_category"){
        if(categoryVal === "like"){
            var findQuery = '/'+selectVal+'/'+'i';
            query = {coursename: {$regex: eval(findQuery)}};
            executeSearch();
        }
        else if(categoryVal === "="){
            query = {coursename: selectVal};
            executeSearch();
        }
    }

    else if(category === "term"){
        if(categoryVal === "SP19"){
            query = {courseterm: categoryVal};
            executeSearch();
        }
        else if(categoryVal === "FA19"){
            query = {courseterm: categoryVal};
            executeSearch();
        }
    }


    function executeSearch(){
        Courses.find(query).exec().then(result=>{
            callback(null, result);
        }).catch(err=>{console.log(err); callback(err, null);});
    }
    
    // res.send(true);
}


exports.handle_request = handle_request;