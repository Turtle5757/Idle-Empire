// Resources, Units, Buildings
let res={food:0,wood:0,stone:0,tools:0,knowledge:0,gold:0,energy:0,tech:0,planets:0,starships:0};
let units={soldiers:0,scouts:0,scientists:0};
let buildings={hut:0,farm:0,quarry:0,workshop:0,lumber:0,library:0,village:0,castle:0,market:0,barracks:0,observatory:0,energyPlant:0,spaceport:0};
let mul={food:1,wood:1,stone:1,tools:1,knowledge:1,gold:0,energy:0,tech:0,planets:0,starships:0};
let era="Caveman";
let achievements=[];

// Update UI
function updateUI(){
  for(let key in res){
    document.querySelector(`#res-${key} span`).textContent=Math.floor(res[key]);
    let fill=document.querySelector(`#res-${key} .fill`);
    fill.style.width=Math.min(100,res[key]/200*100)+"%";
    fill.style.backgroundColor=eraColor();
  }
  document.getElementById("era-banner").textContent="Era: "+era;
  document.getElementById("era-banner").style.backgroundColor=eraColor();
  let ul=document.getElementById("achievementList"); ul.innerHTML="";
  achievements.forEach(a=>{let li=document.createElement("li"); li.textContent=a; ul.appendChild(li);});
}

// Era Colors
function eraColor(){
  if(era==="Caveman") return "#a0522d";
  if(era==="Tribe") return "#228B22";
  if(era==="Kingdom") return "#4169e1";
  if(era==="Empire") return "#8B0000";
  if(era==="Space Era") return "#4B0082";
  return "#ccc";
}

// Add building/unit icons
function addBuildingIcon(name){let d=document.createElement("div"); d.classList.add("building-icon","new"); d.title=name; d.style.background="#ffcc00"; document.getElementById("building-display").appendChild(d); setTimeout(()=>d.classList.remove("new"),500);}
function addUnitIcon(name){let d=document.createElement("div"); d.classList.add("unit-icon","new"); d.title=name; d.style.background="#00ccff"; document.getElementById("unit-display").appendChild(d); setTimeout(()=>d.classList.remove("new"),500);}

// Button actions
document.getElementById("gatherFood").addEventListener("click",()=>{res.food+=1*mul.food;updateUI();});
document.getElementById("gatherWood").addEventListener("click",()=>{res.wood+=1*mul.wood;updateUI();});
document.getElementById("gatherStone").addEventListener("click",()=>{res.stone+=1*mul.stone;updateUI();});
document.getElementById("craftTools").addEventListener("click",()=>{if(res.wood>=5 && res.stone>=5){res.wood-=5;res.stone-=5;res.tools+=1; addBuildingIcon("Workshop");} updateUI();});
document.getElementById("trainSoldier").addEventListener("click",()=>{units.soldiers+=1; addUnitIcon("Soldier"); updateUI();});
document.getElementById("trainScout").addEventListener("click",()=>{units.scouts+=1; addUnitIcon("Scout"); updateUI();});
document.getElementById("trainScientist").addEventListener("click",()=>{units.scientists+=1; addUnitIcon("Scientist"); updateUI();});
document.getElementById("launchStarship").addEventListener("click",()=>{res.starships+=1;res.planets+=1; addUnitIcon("Starship"); updateUI();});

// Buildings buttons
function build(name,costs){
  let canBuild=true; for(let r in costs) if(res[r]<costs[r]) canBuild=false;
  if(canBuild){for(let r in costs) res[r]-=costs[r]; buildings[name]+=1; addBuildingIcon(name); updateUI();}
}
document.getElementById("buildHut").addEventListener("click",()=>build("hut",{stone:10}));
document.getElementById("buildFarm").addEventListener("click",()=>build("farm",{wood:20}));
document.getElementById("buildQuarry").addEventListener("click",()=>build("quarry",{stone:15}));
document.getElementById("buildWorkshop").addEventListener("click",()=>build("workshop",{tools:10}));
document.getElementById("buildLumberMill").addEventListener("click",()=>build("lumber",{wood:20}));
document.getElementById("buildLibrary").addEventListener("click",()=>build("library",{knowledge:15}));
document.getElementById("buildVillage").addEventListener("click",()=>build("village",{food:50,gold:20}));
document.getElementById("buildCastle").addEventListener("click",()=>build("castle",{stone:100,gold:50}));
document.getElementById("buildMarket").addEventListener("click",()=>build("market",{wood:50,gold:30}));
document.getElementById("buildBarracks").addEventListener("click",()=>build("barracks",{stone:50,gold:20}));
document.getElementById("buildObservatory").addEventListener("click",()=>build("observatory",{knowledge:50,gold:30}));
document.getElementById("buildEnergyPlant").addEventListener("click",()=>build("energyPlant",{stone:50,gold:50}));
document.getElementById("buildSpaceport").addEventListener("click",()=>build("spaceport",{gold:100,energy:50}));

// Research tree
function unlockResearch(node){let btn=document.getElementById(node); if(!btn.classList.contains("unlocked")){btn.classList.add("unlocked"); achievements.push(node.replace("Research","")+" unlocked!"); updateUI();}}
["ecoResearch","ecoResearch2","milResearch","milResearch2","sciResearch","sciResearch2","spaceResearch","spaceResearch2"].forEach(id=>document.getElementById(id).addEventListener("click",()=>unlockResearch(id)));

// Idle generation & era progression
setInterval(()=>{
  for(let r in res) res[r]+=0.2*mul[r];
  updateUI();
  if(res.food>=200 && era==="Caveman"){ era="Tribe"; achievements.push("Reached Tribe Era!"); updateUI();}
  if(res.food>=500 && era==="Tribe"){ era="Kingdom"; achievements.push("Reached Kingdom Era!"); updateUI();}
  if(res.food>=1000 && era==="Kingdom"){ era="Empire"; achievements.push("Reached Empire Era!"); updateUI();}
  if(res.food>=2000 && era==="Empire"){ era="Space Era"; achievements.push("Reached Space Era!"); updateUI();}
},1000);

// Prestige
document.getElementById("prestigeButton").addEventListener("click",()=>{for(let r in res) res[r]=0; for(let u in units) units[u]=0; era="Caveman"; achievements.push("Great Collapse!"); updateUI();});

// Initial UI
updateUI();
