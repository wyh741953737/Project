export function getRedirect(type,header){
    let path=''
    if(type==='boss'){
        path='/boss'
    }else{
        path='/employee'
    }
    if(!header){
        path+='Info'
    }
    return path
}