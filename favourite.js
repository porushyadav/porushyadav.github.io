
var favourite ;
const notify=document.getElementsByClassName('notify')[0];

const div=document.getElementById('div');
console.log(favourite);

fetchData();
//fetch data from the website

function fetchData()
{
 
     favourite=JSON.parse(localStorage.getItem('id_array'));
for(let id in favourite)
{

//JSON request
    const request=new XMLHttpRequest();
    const url="https://www.superheroapi.com/api.php/1652946498186056/"+favourite[id];
    request.open('get',url,true);
    request.send();
    
    request.onload=function()
    {
    
    let jsonparse=JSON.parse(request.response);
    const img=jsonparse.image.url;
    const name=jsonparse.name;
    const powerstats=jsonparse.powerstats;
    setFavouriteItem(favourite[id],name,img,powerstats);
};
}
}
//set the li element or update the DOM
function setFavouriteItem(id,name,img,powerstats)
{


var ul=document.createElement('ul');
ul.innerHTML=`<li class="list-group-item colorli" >
<div><img src="${img}" alt="${name}" style="height:80px;width:80px"/>${  name}</div>
<div class="alignment"><button type="button" class="btn btn-danger" id="${id}">Delete</button>
</div></li>`;
div.appendChild(ul);

}

//deleting the particular item and store the updated data in local storage
div.addEventListener('click',function(e)
{
console.log(e.target.id);
let id=parseInt(e.target.id);
if(id>0)
{
favourite=favourite.filter(function(task)
{
return task!==id;
});
div.innerHTML='';
console.log(favourite);
localStorage.setItem("id_array",JSON.stringify(favourite));
notification("Deleted Successfully");
fetchData();

}

});

//show notification
function notification(message)
{
notify.innerText=message;
     console.log(message);
     notify.style.display = 'block';

     setTimeout(() => {
        notify.style.display = 'none';
      }, 1000)

}