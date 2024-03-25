    // variables
    let xp = 0;
    let hp = 100;
    let gold = 50;
    let currWeap = 0;
    let fight = 0;
    let monsterHp = 0;
    let inventory = ["Quarterstaff"];
    // id
    const button1 = document.querySelector("#button1");
    const button2 = document.querySelector("#button2");
    const button3 = document.querySelector("#button3");
    const text = document.querySelector("#text");
    const xpText = document.querySelector("#xpText");
    const healthText = document.querySelector("#healthText");
    const goldText = document.querySelector("#goldText");
    const monsterStats = document.querySelector("#monsterStats");
    const monsterNameText = document.querySelector("#monsterName");
    const monsterHealth = document.querySelector("#monsterHealth");
    
            //initializing buttons

            button1.onclick = goStore;
            button2.onclick = goCave;
            button3.onclick = goFight;

    const weapons = [
        {
            name: "Quarterstaff",
            power: 5
        },
        {
            name: "Falchion",
            power: 30
        },
        {
            name: "Glaive",
            power: 50
        },
        {
            name: "Arbalest",
            power: 100
        },
    ];


    const locations = [
        {
            name: "town square",
            "button text": ["STORE", "CAVE", "FIGHT"],
            "button functions": [goStore, goCave, goFight],
            text:"You are in the town square. You can check the \"Store\"."
        },
        {   
            name: "store",
            "button text": ["10 HP ($10)", "Weapon ($30)", "Go to town"],
            "button functions": [buyHealth, buyWeapon, goTown],
            text:"You entered the Store."
        },
        {
            name: "cave",
            "button text": ["GOBLIN", "BEAST", "DRAGON"],
            "button functions": [fightGoblin, fightBeast, fightDragon],
            text:"You entered the \"CAVE\" choose a \"MONSTER\" to fight!"
        },
        {
            name: "fight",
            "button text":["ATTACK", "DODGE", "RUN"],
            "button functions":[attack, dodge, goTown],
            text:"You are facing a \"MONSTER\"."
        },
        {
            name: "kill monster",
            "button text":["TOWN", "TOWN", "TOWN"],
            "button functions":[goTown, goTown, goTown],
            text:"You defeated the \"MONSTER\". You gain \"XP\" and \"GOLD\"."   
        },
        {
            name: "lose",
            "button text":["REPLAY?", "RESTART?", "RETRY?"],
            "button functions":[restart, restart, restart],
            text:"YOU LOSE!"   
        },
        {
            name: "win",
            "button text":["REPLAY?", "RESTART?", "RETRY?"],
            "button functions":[restart, restart, restart],
            text:"YOU WON THE GAME!"   
        }
        
    ];

    const monsters = [
        {
            name: "GOBLIN",
            level: 2,
            health: 15
        },
        {
            name: "BEAST",
            level: 8,
            health: 60
        },
        {
            name: "DRAGON",
            level: 20,
            health: 300
        }
    ];
        
    function update(location){
        monsterStats.style.visibility = "hidden";
        button1.innerText = location["button text"][0];
        button2.innerText = location["button text"][1];
        button3.innerText = location["button text"][2];
        button1.onclick = location["button functions"][0];
        button2.onclick = location["button functions"][1];
        button3.onclick = location["button functions"][2]; 

        text.innerText = location.text; 
    }

    function goTown(){
        update(locations[0]);
    }

    function goStore(){
        update(locations[1]);
    }

    function goCave(){
        update(locations[2]);
    }

    function buyHealth(){
        if(gold >= 10){
            gold -= 10;
            hp += 10;
            goldText.innerText = gold;
            healthText.innerText = hp;
        }
        else{
            text.innerText = "You don't have enough \"GOLD\" to buy \"HEALTH\".";
        }
    }

    function buyWeapon(){
        if(currWeap < weapons.length-1){
            if(gold >= 30){
                gold -= 30;
                currWeap++;
                goldText.innerText = gold;
                let newWeap = weapons[currWeap].name;
                text.innerText = "You now have a new "+newWeap.name+".";
                inventory.push(newWeap);
                text.innerText += "Your inventory have "+inventory+".";
            }
            else{
                text.innerText = "You don't have enough \"GOLD\" to buy a \"WEAPON\"."
            }
        }else{
            text.innerText = "You already have the powerful \"WEAPON\"."
            button2.innerText = "SELL FOR $15";
            button1.onclick = sellWeapon;
        }
    }

    function sellWeapon(){
        if(inventory.length>1){
            gold += 15;
            goldText.innerText = gold;
            let currWeap = inventory.shift();
            text.innerText = "You sold a "+currWeap+".";
            text.innerText += "In you inventory you have: "+ inventory;
        }
        else{
            text.innerText = "Don't sell your only \"WEAPON!\".";
        }
    }

    function fightGoblin(){
        fight = 0;
        goFight();
    }

    function fightBeast(){
        fight = 1;
        goFight();
    }

    function fightDragon(){
        fight = 2;
        goFight();
    }

    function goFight(){
        update(locations[3]);
        monsterHp = monsters[fight].monsterHealth;
        monsterStats.style.visibility = "visible";
        monsterNameText.innerText = monsters[fight].name;
        monsterHealth.innerText = monsters[fight].health;
    }

    function attack(){
        text.innerText = "The" + monsters[fight].name + "attacks."
        text.innerText = "You attack it with your "+ weapons[currWeap].name+".";
        hp -= monsters[fight].level;
        monsterHp -= weapons[currWeap].power + Math.floor(Math.random()*xp)+1;
        healthText.innerText = hp;
        monsterHealth.innerText = monsterHp;
        if(hp<=0){
            lose();
        }
        else if(monsterHp <=0){
            if(fight === 2){
                win();
            }else{
            defeatMonster();
            }
        }
    }

    function dodge(){
        text.innerText = "You dodge the attack from the "+monsters[fight].name +".";
    }

    function defeatMonster(){
        gold += Math.floor(monsters[fight].level*6.7);
        xp += monsters[fighting].level;
        goldText.innerText = gold;
        xpText.innerText = xp;
        update(locations[4]);
    }

    function lose(){
        update(locations[5]);
    }
    function win(){
        update(locations[6]);
    }

    function restart(){
    let xp = 0;
    let hp = 100;
    let gold = 50;
    let currWeap = 0;
    let fight = 0;
    let monsterHp = 0;
    let inventory = ["Quarterstaff"];
    goTown();
    }