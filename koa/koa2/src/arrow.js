const luck={
    id:4,
    say:function(){
        setTimeout(function() {
            console.log('id',this.id)
        }, 50);
    },
    sayWithThis:function(){
        let that=this
        setTimeout(function() {
            console.log('this id',that.id)
        }, 500);
    },
    sayWithArrow:function(){
        setTimeout(() => {
            console.log('arrow id',this.id)
        }, 1500);
    },
    sayWithGlobal:()=>{//在这个时候就是箭头函数，作用域全局
        setTimeout(() => {
            console.log('global id',this.id)
        }, 2000);
    }
}
luck.say()
luck.sayWithThis()
luck.sayWithArrow()
luck.sayWithGlobal()