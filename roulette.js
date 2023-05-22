"use strict";
let s_1;
let s_2;
let s_3;
let buy_1cost = 100;
let upg_1_bought = false;
let baseAutoRoll;
let baseAutoRoll2;
let baseAutoRoll3;
let upg_2_bought = false;
let upg_3_bought = false;
document.querySelector("#upg_3").hidden = true;
document.querySelector("#upg_2").hidden = true;
let Game = {
    points: 0,
    result: 0,
    digit_cap: 10,
    multiplier: 1,
    start: function(){
        this.load();
        this.initGenButton();
        this.buy1();
        this.initUpgrades();
        this.initTimer();
    },
    refresh: function(){
        document.querySelector("#points").innerHTML = Game.points;
        document.querySelector("#f_points").innerHTML = Game.result;
        document.querySelector("#slot_1").innerHTML = s_1;
        document.querySelector("#slot_2").innerHTML = s_2;
        document.querySelector("#slot_3").innerHTML = s_3;
        document.querySelector("#digit_l").innerHTML = Game.digit_cap - 1;
    },
    randomize: function() {
        s_1 = Math.floor(Math.random() * Game.digit_cap);
        s_2 = Math.floor(Math.random() * Game.digit_cap);
        s_3 = Math.floor(Math.random() * Game.digit_cap);
        Game.result += s_1;
        Game.result += s_2;
        Game.result += s_3;
    },
    initGenButton() {
        document.querySelector("#gen_b").addEventListener('click', function() {
            Game.points += 10000;
            Game.result = 0;
            Game.randomize();
            Game.result = Game.result * Game.multiplier;
            Game.points += Game.result;
            Game.refresh();
        })
    },
    initUpgrades() {
        document.querySelector("#upg_1").addEventListener('click', function(){
            if(Game.points >= 1000){
                baseAutoRoll = setInterval(function(){
                    Game.points += Game.result;
                    Game.refresh();
                }, 5000);
                upg_1_bought = true;
                Game.points -= 1000;
                document.querySelector("#upg_1").hidden = true;
                document.querySelector("#upg_2").hidden = false;
                document.querySelector("#upg_2").disabled = false;
                Game.refresh();
            }
        }),
        document.querySelector("#upg_2").addEventListener('click',function(){
            if(Game.points >= 5000){
                clearInterval(baseAutoRoll);
                baseAutoRoll2 = setInterval(function(){
                    Game.points += Game.result;
                    Game.refresh();
                }, 3000);
                Game.points -= 5000;
                upg_2_bought = true;
                document.querySelector("#upg_2").hidden = true;
                document.querySelector("#upg_3").hidden = false;
                Game.refresh();
            }
        }),
        document.querySelector("#upg_3").addEventListener('click', function(){
            if(Game.points >= 20000){
                clearInterval(baseAutoRoll2);
                baseAutoRoll3 = setInterval(function() {
                    Game.points += Game.result;
                    Game.refresh();
                }, 1000);
                Game.points -= 20000;
                document.querySelector("#upg_3").hidden = true;
                Game.refresh();
            }
        }),
        document.querySelector("#upg_4").addEventListener('click',function(){
            if(Game.points >= 10000){
                Game.multiplier * 2;
                Game.points -= 10000;
                document.querySelector("#upg_4").hidden = true;
            }
        })
    },
    buy1() {
        document.querySelector("#buy_1").addEventListener('click', function(){
            if(Game.points >= buy_1cost){
                buy1_bought += 1;
                Game.points -= buy_1cost;
                Game.digit_cap = buy1_bought + 10;
                buy_1cost = Math.floor(100 * 1.15 * buy1_bought);
                document.querySelector("#buy_1").innerHTML = "Increase Digit Limit - "+buy_1cost+" Points "+"("+buy1_bought+")";
                Game.refresh();
            }
        })
    },
    initTimer(){
        setInterval(function(){
            Game.save();
        },5000)
    },
    save: function() {
        localStorage.setItem('save', JSON.stringify({
            'points' : Game.points,
            'mult' : Game.multiplier,
            's1' : s_1,
            's2' : s_2,
            's3' : s_3,
            'b1' : buy1_bought,
            'b1cost' : buy_1cost,
            'b1html' : document.querySelector("#buy_1").innerHTML,
            'result' : Game.result,
            'digitcap' : Game.digit_cap,
            'upg1b' : upg_1_bought,
            'upg2b' : upg_2_bought,
            'upg3b' : upg_3_bought,
        }));
        console.log("saving");
    },
    load: function() {
        let save = localStorage.getItem('save');
        if(save !== null){
            save = JSON.parse(save);
            s_1 = save.s1;
            s_2 = save.s2;
            s_3 = save.s3;
            buy1_bought = save.b1;
            buy_1cost = save.b1cost;
            upg_1_bought = save.upg1b;
            upg_2_bought = save.upg2b;
            upg_3_bought = save.upg3b;
            Game.digit_cap = save.digitcap;
            Game.result = save.result;
            Game.points = save.points;
            Game.refresh();
            if(document.querySelector("#buy_1").innerHTML != undefined){
                document.querySelector("#buy_1").innerHTML = save.b1html;
            }
            else{
                document.querySelector("#buy_1").innerHTML = "Increase Digit Limit - "+buy_1cost+" Points "+"("+buy1_bought+")";
            }
            if(Game.multiplier == Number){
                Game.multiplier = save.mult;
                document.querySelector("#upg_4").hidden = true;
            }
        }
        else{
            buy1_bought = 0;
        }
        if(buy_1cost == undefined){
            buy_1cost = Math.floor(100 * 1.15 * buy1_bought);
        }
        document.querySelector("#hard_reset").addEventListener('click', function() {
            if(confirm("Are you sure you wanna reset the ENTIRE game?")){
                localStorage.removeItem('save');
                location.reload();
            }
        })
        if(upg_3_bought){
            baseAutoRoll3 = setInterval(function() {
                Game.points += Game.result;
                Game.refresh();
            }, 1000);
            document.querySelector("#upg_3").hidden = true;
            document.querySelector("#upg_2").hidden = true;
            document.querySelector("#upg_1").hidden = true;
            Game.refresh();
        }
        else if(upg_2_bought){
            baseAutoRoll2 = setInterval(function(){
                Game.points += Game.result;
                Game.refresh();
            }, 3000);
            document.querySelector("#upg_2").hidden = true;
            document.querySelector("#upg_1").hidden = true;
            Game.refresh();
        }
        else if(upg_1_bought){
            baseAutoRoll = setInterval(function(){
                Game.points += Game.result;
                Game.refresh();
            }, 5000);
            document.querySelector("#upg_1").hidden = true;
            document.querySelector("#upg_2").hidden = false;
            Game.refresh();
        }   
    },
};
Game.start();




// x2 points, ascension, 4th slot, 

