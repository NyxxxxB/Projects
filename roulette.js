let slot_1 = document.getElementById("slot_1");
let slot_2 = document.getElementById("slot_2");
let slot_3 = document.getElementById("slot_3");
let points = 0;
let point_talk = "Points: ";
let point_r;
let result;
let slot_1_rng;
let slot_2_rng;
let slot_3_rng;
let roll_b = document.getElementById("autoRoll");
let roll_b2 = document.getElementById("autoRoll2")
roll_b2.hidden = true;
const figures = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 5,
    5: 6,
    6: 7,
    7: "X",
    8: "Zé da Manga!"
}

let results = [];

function Generate(){
    results = [];

    slot_1_rng = figures[Math.floor(Math.random() * 9)];
    slot_2_rng = figures[Math.floor(Math.random() * 9)];
    slot_3_rng = figures[Math.floor(Math.random() * 9)];

    slot_1.innerHTML = slot_1_rng;
    slot_2.innerHTML = slot_2_rng;
    slot_3.innerHTML = slot_3_rng;

    slot_1_value = slot_1_rng;
    slot_2_value = slot_2_rng;
    slot_3_value = slot_3_rng;

    if(slot_1_value == "Zé da Manga!"){
        slot_1_value = 20;
    }
    else if(slot_1_value == "X"){
    slot_1_value = 10;
    }

    if(slot_2_value == "Zé da Manga!"){
        slot_2_value = 20;
    }
    if(slot_2_value == "X"){
    slot_2_value = 10;
    }

    if(slot_3_value == "Zé da Manga!"){
        slot_3_value = 20;
    }
    else if(slot_3_value == "X"){
    slot_3_value = 10;
    }

    results.push(Number(slot_1_value));
    results.push(Number(slot_2_value));
    results.push(Number(slot_3_value));

    result = results[0] += results[1] += results[2];

    points += result;
    Update();
    
}

function Update(){
    point_r = point_talk + points.toString();
    document.getElementById("points").innerHTML = (point_r);
}

function Reset(){
    points = 0;
    Update();
    
}

function autoRoll(){
    if(points >= 100){
        points -= 100;
        roll_b.disabled = true;
        p_roll = setInterval(Roll, 5000);
        Update();
        roll_b.hidden = true;
        roll_b2.hidden = false;
    }
    else{
        roll_b.innerHTML = "You Need 100 Points!";
        setTimeout(function() {
            roll_b.innerHTML = "Buy Generator 1(5s) - 100 Points";
        }, 3000);
    }
}

function autoRoll2(){
    if(points >= 1000){
        points -= 1000;
        roll_b2.disabled = true;
        p_roll2 = setInterval(Roll, 3000);
        clearInterval(p_roll);
        Update();
        roll_b2.hidden = true;
        //roll_b2.hidden = false;
    }
    else{
        roll_b2.innerHTML = "You Need 1000 Points!";
        setTimeout(function() {
            roll_b2.innerHTML = "Upgrade Generator(3s) - 1000 Points";
        }, 3000);
    }
}

function Roll(){
    points += result;
    Update();
}


// x2 points, more figures, ascension, 4th slot, 