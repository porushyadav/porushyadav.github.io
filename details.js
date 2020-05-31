
const img=document.getElementById('img');
const powerstats=document.getElementById('powerstats');
const appear=document.getElementById('appearance');
const graphy=document.getElementById('biography');
const work=document.getElementById('work');
const id=localStorage.getItem('id');

console.log(id);
//getting the image
getJason();
function getJason()
{
const request=new XMLHttpRequest();
console.log(id);
const url="https://www.superheroapi.com/api.php/1652946498186056/"+id;
request.open('get',url,true);
request.send();
request.onload=function()
{

let jsonparse=JSON.parse(request.response);
const img=jsonparse.image.url;
const name=jsonparse.name;
settingImage(img,name);
const stats=jsonparse.powerstats;
//updating power stats
powerStats(stats);

//updating appearance
const appearance=jsonparse.appearance;
apperanceLook(appearance);

//updating the biography
const biography=jsonparse.biography;
bioGraphy(biography);

working(jsonparse.work);
};
}

//set dynamic figure for img

function settingImage(i,name)
{
let div=document.createElement('div');
div.innerHTML=`<h2>${name}</h2><img src="${i}" class="figure-img img-fluid rounded" alt="${name}" style="height:500px;width:500px;"></img>`

img.append(div);

}


//set power stats
function powerStats(stats)
{
let ul=document.createElement('ul');
ul.innerHTML=`<li>intelligence: ${stats.intelligence}</li><li>strength: ${stats.strength}</li>
<li>speed:${stats.speed}</li><li>durability: ${stats.durability}</li><li>power: ${stats.power}</li>
<li>combat: ${stats.combat}</li>`;
powerstats.append(ul);



}

//set apperaence
 function apperanceLook(stats)
 {

   let ul=document.createElement('ul');
   ul.innerHTML=`<li>gender: ${stats.gender}</li><li>race: ${stats.race}</li>
   <li>height:${stats.height[0]}</li><li>weight: ${stats.weight[0]}</li>`;
   appear.append(ul);


 }
 
 //set biography

 function bioGraphy(stats)
 {

    console.log(stats['full-name']);
    for(var i in stats)
    {
          console.log(i);
         

    }
    let ul=document.createElement('ul');
   ul.innerHTML=`<li>full-name: ${stats['full-name']}</li><li>first-appearance ${stats['first-appearance']}</li>
   <li>place-of-birth:${stats['place-of-birth']}</li><li>publisher: ${stats['publisher']}</li>`;
   appear.append(ul);
   graphy.append(ul);


 }


 //set apperaence
 function working(stats)
 {

   let ul=document.createElement('ul');
   ul.innerHTML=`<li>occupation: ${stats.occupation}</li>`;
   work.append(ul);


 }