module.exports = {
    returnGroup,
    returnGroupWithRandomPosition
}

function returnGroupWithRandomPosition(userContext, events, done){
    const x = Math.floor(Math.random() * 1000) + 1;
    const y = Math.floor(Math.random() * 1000) + 1;
    const group = {"id" : 1593603297094.0,"title" : "title","location" : {"x" : x,"y" : y},"cards" : [ {"type" : "Question","id" : "1594366688148","title" : "Jaaaaaaaaaaa"}, {"id" : "1594197743191","_id" : "5e30215695d55b4b3c79a897","color" : "#817DAF","deck" : "ICT","picture" : "http://ictresearchmethods.nl/images/thumb/5/5b/A_B_testing.png/250px-A_B_testing.png","shortDescription" : "A minor change in a design may alter user behaviour in ways that are hard to detect in a usability test. An A/B test allows you to compare real-world user behaviour across different versions of a product.","title" : "A/B Testing","type" : "Lab","location" : {"x" : 288,"y" : 335}}],"selected" : false}
    userContext.vars.group = group;
    return done();
}

function returnGroup(userContext, events, done){
    const group = {"id" : 1593603297094.0,"title" : "title","location" : {"x" : 400,"y" : 400},"cards" : [ {"type" : "Question","id" : "1594366688148","title" : "Jaaaaaaaaaaa"}, {"id" : "1594197743191","_id" : "5e30215695d55b4b3c79a897","color" : "#817DAF","deck" : "ICT","picture" : "http://ictresearchmethods.nl/images/thumb/5/5b/A_B_testing.png/250px-A_B_testing.png","shortDescription" : "A minor change in a design may alter user behaviour in ways that are hard to detect in a usability test. An A/B test allows you to compare real-world user behaviour across different versions of a product.","title" : "A/B Testing","type" : "Lab","location" : {"x" : 288,"y" : 335}}],"selected" : false}
    userContext.vars.group = group;
    return done();
}