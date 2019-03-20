'use strict';

var luck = {
    id: 4,
    say: function say() {
        setTimeout(function () {
            console.log('id', this.id);
        }, 50);
    },
    sayWithThis: function sayWithThis() {
        var that = this;
        setTimeout(function () {
            console.log('this id', that.id);
        }, 500);
    },
    sayWithArrow: function sayWithArrow() {
        var _this = this;

        setTimeout(function () {
            console.log('arrow id', _this.id);
        }, 1500);
    },
    sayWithGlobal: function sayWithGlobal() {
        //在这个时候就是箭头函数，作用域全局
        setTimeout(function () {
            console.log('global id', undefined.id);
        }, 2000);
    }
};
luck.say();
luck.sayWithThis();
luck.sayWithArrow();
luck.sayWithGlobal();
//# sourceMappingURL=arrow.js.map