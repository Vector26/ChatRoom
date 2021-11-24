const users=[];

function createUser(id,username,room){
    user={id,username,room};
    users.push(user);
    return user;
}

function getUser(id){
    return users.find(user=> user.id===id);
    
}

function printUsers(){
    console.log(users);
}

module.exports={createUser,getUser,printUsers};