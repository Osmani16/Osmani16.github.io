// load elements
const NAME = document.querySelector('.name');
const LEFT_BTN = document.querySelector('#left_btn');
const RIGHT_BTN = document.querySelector('#right_btn');
const CONTAINER = document.querySelector('.contents');
const AGENT_IMG = document.querySelector('.agent_img');
const ABILITIES = document.querySelector('.abilities');
const BTNS = document.querySelectorAll('.btn');

let counter = 0;
let agent_count = 0;

const GET_AGENTS = async (count, op) => {
  // Get agent data from valorant API
  const FETCH_DATA = await fetch('https://valorant-api.com/v1/agents/');
  const AGENT_DATA = await FETCH_DATA.json();
  const AGENTS = AGENT_DATA.data;
  // reset the abilities for every new agent
  ABILITIES.innerText = '';
  // send the agents abilities to the DOM
  // get the agents colors from the api and use those to make a theme
  if (AGENTS[count].isPlayableCharacter) {
    NAME.innerText = AGENTS[count].displayName;
    NAME.style.backgroundColor = `#${AGENTS[count].backgroundGradientColors[0]}`;
    CONTAINER.style.backgroundColor = `#${AGENTS[count].backgroundGradientColors[1]}`;
    AGENT_IMG.src = AGENTS[count].fullPortrait;
    document.body.style.backgroundColor = `#${AGENTS[count].backgroundGradientColors[2]}`;
    ABILITIES.innerHTML += `
    <span>Role</span>: ${AGENTS[count].role.displayName}
    <br>
    <span>Ability 1:</span>${AGENTS[count].abilities[0].displayName}
    <br>
    <span>Ability2: </span>${AGENTS[count].abilities[1].displayName}
    <br>
    <span>Ability3: </span>${AGENTS[count].abilities[2].displayName}
    <br>
    <span>Ultimate: </span>${AGENTS[count].abilities[3].displayName}
    <br>
    <span>Description: </span>${AGENTS[count].description}
    
    `
    BTNS.forEach(btn => {
      btn.style.backgroundColor = `#${AGENTS[count].backgroundGradientColors[2]}`
    });
  }
  agent_count = AGENTS.length - 1;

  if (op) {
    let is_player = AGENTS[eval(`${count}${op}${1}`)].isPlayableCharacter;

    return is_player;
  }
}

// use the first agent in the list as the default
GET_AGENTS(counter);

// counters for the slider feature
LEFT_BTN.addEventListener('click', async () => {
  if (counter <= 0) {
    return;
  }
  // valorant api has 2 sova agents
  // this is to make sure the non playable character sova is skipped
  const is_playable = await GET_AGENTS(counter, '-');
  counter--;
  if (!(is_playable)) {
    counter--;
  }
  GET_AGENTS(counter, '-')
});

//
RIGHT_BTN.addEventListener('click', async () => {
  if (counter >= agent_count) {
    return;
  }

  const is_playable = await GET_AGENTS(counter, '+');

  //
  //
  counter++
  if (!(is_playable)) {
    counter++;
  }
  GET_AGENTS(counter, '+')
});
