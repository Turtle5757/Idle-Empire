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

// Unlock logic
function updateBuildingVisibility(){
  // Start only with Hut
  if(era==="Caveman") document.getElementById("buildHut").classList.remove("hidden");
  if(res.food>=10) document.getElementById("buildFarm").classList.remove("hidden");
  if(res.stone>=10) document.getElementById("buildQuarry").classList.remove("hidden");
  if(res.tools>=10) document.getElementById("buildWorkshop").classList.remove("hidden");
  if(res.wood>=20) document.getElementById("buildLumberMill").classList.remove("hidden");
  if(res.knowledge>=15) document.getElementById("buildLibrary").classList.remove("hidden");
  if(res.food>=50 && res.gold>=20) document.getElementById("buildVillage").classList.remove("hidden");
  if(era==="Kingdom") {
    document.getElementById("buildCastle").classList.remove("hidden");
    document.getElementById("buildMarket").classList.remove("hidden");
  }
  if(era==="Empire") {
    document.getElementById("buildBarracks").classList.remove("hidden");
    document.getElementById("buildEnergyPlant").classList.remove("hidden");
  }
  if(era==="Space Era") document.getElementById("buildSpaceport").classList.remove("hidden");
}

function updateResearchVisibility(){
  if(res.knowledge>=10) document.getElementById("ecoResearch").classList.remove("hidden");
  if(buildings.library>0) document.getElementById("ecoResearch2").classList.remove("hidden");
  if(units.soldiers>=5) document.getElementById("milResearch").classList.remove("hidden");
  if(units.soldiers>=10) document.getElementById("milResearch2").classList.remove("hidden");
  if(res.knowledge>=50) document.getElementById("sciResearch").classList.remove("hidden");
  if(buildings.observatory>0) document.getElementById("sciResearch2").classList.remove("hidden");
  if(era==="Space Era") document.getElementById("spaceResearch").classList.remove("hidden");
  if(res.tech>=50) document.getElementById("spaceResearch2").classList.remove("hidden");
}

function updateUnitVisibility(){
  if(buildings.barracks>0) {
    document.getElementById("trainSoldier").classList.remove("hidden");
    document.getElementById("trainScout").classList.remove("hidden");
  }
  if(buildings.library>0) document.getElementById("trainScientist").classList.remove("hidden");
  if(buildings.spaceport>0) document.getElementById("launchStarship").classList.remove("hidden");
}

// Button actions
function setupButtons(){
  document.getElementById("gatherFood").addEventListener("click",()=>{
    res.food+=1*mul.food; updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("gatherWood").addEventListener("click",()=>{
    res.wood+=1*mul.wood; updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("gatherStone").addEventListener("click",()=>{
    res.stone+=1*mul.stone; updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("craftTools").addEventListener("click",()=>{
    if(res.wood>=5 && res.stone>=5){ res.wood-=5; res.stone-=5; res.tools+=1; addBuildingIcon("Workshop"); }
    updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("trainSoldier").addEventListener("click",()=>{
    units.soldiers+=1; addUnitIcon("Soldier"); updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("trainScout").addEventListener("click",()=>{
    units.scouts+=1; addUnitIcon("Scout"); updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("trainScientist").addEventListener("click",()=>{
    units.scientists+=1; addUnitIcon("Scientist"); updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
  document.getElementById("launchStarship").addEventListener("click",()=>{
    res.starships+=1; res.planets+=1; addUnitIcon("Starship"); updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  });
}

// Building buttons
function build(name,costs){
  let canBuild=true; for(let r in costs) if(res[r]<costs[r]) canBuild=false;
  if(canBuild){ for(let r in costs) res[r]-=costs[r]; buildings[name]+=1; addBuildingIcon(name); }
  updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
}
const buildingButtons=[
  ["buildHut",{stone:10}],["buildFarm",{wood:20}],["buildQuarry",{stone:15}],
  ["buildWorkshop",{tools:10}],["buildLumberMill",{wood:20}],["buildLibrary",{knowledge:15}],
  ["buildVillage",{food:50,gold:20}],["buildCastle",{stone:100,gold:50}],
  ["buildMarket",{wood:50,gold:30}],["buildBarracks",{stone:50,gold:20}],
  ["buildObservatory",{knowledge:50,gold:30}],["buildEnergyPlant",{stone:50,gold:50}],
  ["buildSpaceport",{gold:100,energy:50}]
];
buildingButtons.forEach(b=>document.getElementById(b[0]).addEventListener("click",()=>build(b[0].replace("build","").toLowerCase(),b[1])));

// Research
function unlockResearch(node){
  let btn=document.getElementById(node); if(!btn.classList.contains("unlocked")){btn.classList.add("unlocked"); achievements.push(node.replace("Research","")+" unlocked!"); updateUI();}
}
["ecoResearch","ecoResearch2","milResearch","milResearch2","sciResearch","sciResearch2","spaceResearch","spaceResearch2"].forEach(id=>document.getElementById(id).addEventListener("click",()=>unlockResearch(id)));

// Idle generation & era progression
setInterval(()=>{
  for(let r in res) res[r]+=0.2*mul[r];
  updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
  // Era progression
  if(res.food>=200 && era==="Caveman"){ era="Tribe"; achievements.push("Reached Tribe Era!"); }
  if(res.food>=500 && era==="Tribe"){ era="Kingdom"; achievements.push("Reached Kingdom Era!"); }
  if(res.food>=1000 && era==="Kingdom"){ era="Empire"; achievements.push("Reached Empire Era!"); }
  if(res.food>=2000 && era==="Empire"){ era="Space Era"; achievements.push("Reached Space Era!"); }
},1000);

// Prestige
document.getElementById("prestigeButton").addEventListener("click",()=>{
  for(let r in res) res[r]=0; for(let u in units) units[u]=0; for(let b in buildings) buildings[b]=0; era="Caveman"; achievements.push("Great Collapse!");
  updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
});

// Initialize
setupButtons();
updateUI(); updateBuildingVisibility(); updateResearchVisibility(); updateUnitVisibility();
