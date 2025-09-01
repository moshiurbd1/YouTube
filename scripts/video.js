const loadCategories=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res=>res.json())
    .then(data=>display(data.categories))
    .catch(error=>console.log(error));
}
const loadCategoriesVideos=(id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res=>res.json())
    .then(data=>displayVideos(data.category))
    .catch(error=>console.log(error));
}

const loadVideos=()=>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res=>res.json())
    .then(data=>displayVideos(data.videos))
    .catch(error=>console.log(error));
}
function getTimeString(time){
const hour = parseInt(time / 3600);
let remainingsecond = time % 3600;
const minute = parseInt(remainingsecond / 60);
remainingsecond = remainingsecond % 60;
return `${hour} hour ${minute} minute ${remainingsecond} second ago`;
}
const videosContainer=document.getElementById('videos');
// console.log(videos);

const displayVideos=(videos)=>{
    videosContainer.innerHTML="";
    if(videos.length==0){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML=`
        <div class="flex flex-col items-center w-full justify-center">
        <img src="assets/Icon.png" />
        <h2>No content found</h2>
        </div>
        `;
        return;
    }else{
        videosContainer.classList.add('grid');
    }
    videos.forEach(video=>{
        // console.log(video);
       const card=document.createElement('div');
       card.classList="card";
       card.innerHTML=`
    <figure class="h-[200px] relative">
    <img
      class="h-full w-full object-cover"
      src=${video.thumbnail} />
      ${video.others.posted_date?.length==0 ? '':
        `
              <span class="absolute text-sm text-white right-2 bottom-2">${getTimeString(video.others.posted_date)}</span>
        `
      }

  </figure>
  <div class="py-3 flex gap-2">
        <div>
        <img 
        class="w-10 h-10 rounded-full object-cover"
        src=${video.authors[0].profile_picture}
        />
        </div>
        <div>
        <h2 class="font-bold">${video.title}</h2>
        <div class="flex gap-2 items-center">
        <p>${video.authors[0].profile_name}</p>
        ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>`:""}
        </div>
        </div>
  </div>`;

  videosContainer.append(card);


    });
}

const button=document.getElementById('button');
const display=(categories)=>{
categories.forEach(category => {
    // console.log(category)
    const buttonContainer=document.createElement('div');
    buttonContainer.innerHTML=`
    <button class="btn" onclick="loadCategoriesVideos(${category.category_id})">${category.category}</button>
    `;
    button.append(buttonContainer);

});
}
loadCategories();
loadVideos();
