/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const entryPoint = document.querySelector('.cards');
axios.get('https://api.github.com/users/jlong5795')
  .then(response => {
    const newGitCard = GitHubCard(response);
    entryPoint.appendChild(newGitCard);
  })

  axios.get('https://api.github.com/users/jlong5795/followers')
    .then(resp => {
      resp.data.forEach(item => {
        axios.get(`https://api.github.com/users/${item.login}`)
          .then(thisResponse => {
            const newFollowerCard = GitHubCard(thisResponse);
            entryPoint.appendChild(newFollowerCard);
          })
      })
    })
    .catch(err => {
      console.log(err);
    })


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/




/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  'aalvinlin',
  'maggieprice',
  'anamonteiro430',
  'nicbongo',
  'PHONGdotTech',
  'ashraf-heleka',
  'alexandercsierra',
  'Judson00'
];

followersArray.forEach(currentValue => {
  axios.get(`https://api.github.com/users/${currentValue}`)
  .then(response => {
    const newGitCard = GitHubCard(response);
    entryPoint.appendChild(newGitCard);
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function GitHubCard(singleObject) {
  const 
    newCard = document.createElement('div'),
    newImage = document.createElement('img'),
    newCardInfo = document.createElement('div'),
    newName = document.createElement('h3'),
    newUserName = document.createElement('p'),
    newLocation = document.createElement('p'),
    newProfile = document.createElement('p'),
    newUrl = document.createElement('a'),
    newFollowers = document.createElement('p'),
    newFollowing = document.createElement('p'),
    newBio = document.createElement('p');

    newCard.classList.add('card');
    newCardInfo.classList.add('card-info');
    newName.classList.add('name');
    newUserName.classList.add('username');

    newImage.src = singleObject.data.avatar_url;
    newName.textContent = `${singleObject.data.name}`;
    newUserName.textContent = `${singleObject.data.login}`;
    newLocation.textContent = `Location: ${singleObject.data.location}`;
    newUrl.textContent = singleObject.data.html_url;
    newUrl.href = singleObject.data.html_url;
    newProfile.textContent = `Profile: `;
    newFollowers.textContent = `Followers: ${singleObject.data.followers}`;
    newFollowing.textContent = `Following: ${singleObject.data.following}`;
    newBio.textContent = `Bio: ${singleObject.data.bio}`;

    newCard.append(newImage, newCardInfo);
    newCardInfo.append(newName, newUserName, newLocation, newProfile, newFollowers, newFollowing, newBio);
    newProfile.appendChild(newUrl);

    return newCard;
}


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
