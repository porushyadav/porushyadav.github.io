
const dropdown = document.getElementById('dropdown');
const button=document.querySelector('form button');
const heroImg=document.getElementById('hero-img');
const notify=document.getElementsByClassName('notify')[0];
var list=[];
//store data in local storage and checking if there is any data in local storage
var storedata=[];
if(localStorage.getItem('id_array'))
{
     storedata=JSON.parse(localStorage.getItem('id_array'));

}


fetchNamesDropdown();
//click on submit button
button.addEventListener('click',showImage);



//fetch names of all superheros and adding them in dropdown menu
function fetchNamesDropdown()
{
for(let i=1;i<=731;i++)
{
    //jason request
const request=new XMLHttpRequest();
const url='https://www.superheroapi.com/api.php/1652946498186056/'+i;
request.open('get',url,true);
request.send();
request.onload=function()
{
let js=JSON.parse(request.response);
let name=js.name;
let id=js.id;
const data={
    name,
    id
};
list.push(data);

let option=document.createElement('option');
option.text=name;
dropdown.add(option);

};
request.onerror=function()
{

    console.log('Not exist');
}

}
}


//fetch the image when someone click on button get image
function showImage(e)
{

e.preventDefault();
let name=dropdown.value;
let id=-1;
//search for id for the given name
console.log(name);
for(let i of list)
{
    if(i.name==name)
     {
         id=i.id;
         break;
     }
}
//checking id whether it is found or not
if(id>-1)
{

    fetchImage(id);

}
else{

    console.log("Not found");
    return;
}
}

//fetch image when it is found from api
function fetchImage(id)
{

    notification("Wait image is loading");
const url='https://www.superheroapi.com/api.php/1652946498186056/'+id+'/image';
const request=new XMLHttpRequest();
request.open('get',url,true);
request.send();
request.onload=function()
{
let js=JSON.parse(request.response);
let img=js.url;
let name=js.name;
localStorage.setItem("id", js.id);
//creating a card using bootstrap
const div=document.createElement('div');
div.innerHTML=(`<div class="card" style="width: 30rem; height:400px">
<img src="${img}" class="card-img-top" alt="..." style="width: 30rem; height:200px">
<div class="card-body">
  <h5 class="card-title">${name}</h5>
  <a href="#" id="${js.id}"class="btn btn-primary">Add Favorite</a>
  <a href="moredetails.html"  target="_blank" data-id="${js.id}" class="btn btn-primary">Know More</a>

</div>
</div>`)

heroImg.appendChild(div);

};}

//event listener for deleting and showing more details for favourite hero
heroImg.addEventListener('click',function(e)
{

    
    if(parseInt(e.target.dataset.id)!=NaN&&parseInt(e.target.dataset.id)>0)
    {
        localStorage.setItem("id", e.target.dataset.id);

    }
    if(parseInt(e.target.id)!=NaN&&parseInt(e.target.id)>0)
    {
                      if(checkExist(parseInt(e.target.id)))
                      {
                            notification('Already Exist in Favourite');
                            return;
                      }

              notification('added to Favourite');
            storedata.push(parseInt(e.target.id));
            //converting storedata array to string format
       localStorage.setItem("id_array",JSON.stringify(storedata));

    }

});

//to handle duplicate favorite item
function checkExist(id)
{
for(let i in storedata)
{
    if(storedata[i]===id)
      return true;
}
return false;

}
function notification(message)
{
notify.innerText=message;
     console.log(message);
     notify.style.display = 'block';

     setTimeout(() => {
        notify.style.display = 'none';
      }, 2000)

}