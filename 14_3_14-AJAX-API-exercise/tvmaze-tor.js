/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.

    try {
        const showResponse = await axios.get (`http://api.tvmaze.com/search/shows?q=${query}`);
        let image;
        if (!!showResponse.data[0].show.image.original) {
            image = showResponse.data[0].show.image.original;
        } else {
            image = "https://tinyurl.com/tv-missing";
        };
        return {
                id: showResponse.data[0].show.id,
                name: showResponse.data[0].show.name,
                summary: showResponse.data[0].show.summary,
                image
            };
    } catch (err) {
        displayShowError(err);
        return `error ${err}`;
    }


//   return [
//     {
//       id: 1767,
//       name: "The Bletchley Circle",
//       summary: "<p><b>The Bletchley Circle</b> follows the journey of four ordinary women with extraordinary skills that helped to end World War II.</p><p>Set in 1952, Susan, Millie, Lucy and Jean have returned to their normal lives, modestly setting aside the part they played in producing crucial intelligence, which helped the Allies to victory and shortened the war. When Susan discovers a hidden code behind an unsolved murder she is met by skepticism from the police. She quickly realises she can only begin to crack the murders and bring the culprit to justice with her former friends.</p>",
//       image: "http://static.tvmaze.com/uploads/images/medium_portrait/147/369403.jpg"
//     }
//   ]
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();
  episodeButtons.splice(0, episodeButtons.length);

  for (let show of shows) {
    const episodesId = `${show.id}-episodes-area`;
    const episodesListId = `${show.id}-episodes-list`;
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
           <div class="card-body">
           <img class="card-img-top" src=${show.image} alt="Card image cap">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
             <button class="cart-text btn btn-block btn-secondary episode-buttons" id="${show.id}">see episode list</button>
             <section style="display: none" id="${episodesId}">
             <h2>Episodes</h2> 
             <ul id="${episodesListId}">
             </ul>
           </section>  
       

           </div>
         </div>
       </div>
      `);
    $showsList.append($item);
    episodeButtons.unshift(document.getElementById(show.id));
  }
}

function displayShowError(err) {
  console.log('displaying error ', err)
    let $item = $(
        `<div class="col-md-6 col-lg-3 Show" data-show-id="">
           <div class="card" data-show-id="">
             <div class="card-body">
               <h5 class="card-title">Error</h5>
                // TODO: might want to make more user-friendly error message(s)
               <p class="card-text">${err}</p>
             </div>
           </div>
         </div>
        `);
}

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

//  $("#search-form").on("submit", async function handleSearch (evt) {
//   evt.preventDefault();

//   let query = $("#search-query").val();
//   if (!query) return;

//   $("#episodes-area").hide();

//   let shows = await searchShows(query);

//   populateShows(shows);
// });

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

 async function getEpisodes(id) {
  try {
    const episodesResponse = await axios.get (`http://api.tvmaze.com/shows/${id}/episodes`);
    return {
            id: showResponse.data[0].show.id,
            name: showResponse.data[0].show.name,
            summary: showResponse.data[0].show.summary,
            image
        };
} catch (err) {
    displayShowError(err);
    return `error ${err}`;
}
// TODO: get episodes from tvmaze
//       you can get this by making GET request to
//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

// TODO: return array-of-episode-info, as described in docstring above
}

function displayEpisodes(episodes) {

}

const shows = [];
const episodeButtons = [];

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

// TODO: error messages still aren't working, but at least I've got it to display the show and not hide everything when there's an error
  shows.unshift(await searchShows(query));
  if (typeof shows[0] === "string" && shows[0].startsWith("error")) {
    shows.splice(0, 1);
    return;
  } else (populateShows(shows));

  if (episodeButtons.length > 0) {
    for (let button of episodeButtons) {
      button.on('click', async function handleEpisodes(evt) {
        evt.preventDefault();
        const episodes = [];
        episodes.unshift(await getEpisodes(button.id));
        if (typeof episodes[0] === "string" && episodes[0].startsWith("error")) {

        } else (displayEpisodes(episodes[0]))
      });
    };
  };
});
