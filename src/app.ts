const pElement = document.querySelector("#price1") as HTMLButtonElement;

interface ApiData {
  activity: string;
  accessibility: number;
  type: string;
  participants: number;
  price: number;
  error?: string;
}

const typeList = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]


async function getByType(search: string) {
  const response = await fetch(`https://www.boredapi.com/api/activity?type=${search}`);
  const data: ApiData = await response.json();
  if (data.error) {
    pElement.innerHTML = `${data.error}`;

  }
  else {
    const activity = document.querySelector('#activity') as HTMLElement;
    activity.textContent = data.activity;

    const type = document.querySelector('#type') as HTMLElement;
    type.textContent = `Type: ${data.type}`;

    const participants = document.querySelector('#participants') as HTMLElement;
    participants.textContent = `Number of Participants: ${data.participants}`;

    const price = document.querySelector('#price') as HTMLElement;
    price.textContent = `Price: ${data.price}`;
  }

}


async function getActivity(search?: string) {
  const query = search ? `?participants=${(search)}` : '/';
  const response = await fetch(`https://www.boredapi.com/api/activity${query}`);
  const data: ApiData = await response.json();


  if (!data) {
    const activity = document.querySelector('#activity') as HTMLElement;
    activity.textContent = "Not Found";
    return;
  }

  const activity = document.querySelector('#activity') as HTMLElement;
  activity.textContent = data.activity;

  const type = document.querySelector('#type') as HTMLElement;
  type.textContent = `Type: ${data.type}`;

  const participants = document.querySelector('#participants') as HTMLElement;
  participants.textContent = `Number of Participants: ${data.participants}`;

  const price = document.querySelector('#price') as HTMLElement;
  price.textContent = `Price: ${data.price}`;
}

const searchButton = document.querySelector('#search-button') as HTMLElement;
searchButton.addEventListener('click', () => {
  const searchInput = document.querySelector('#search-input') as HTMLInputElement;
  if (searchInput.value.trim().length > 0) {
    getActivity(searchInput.value);
  }
});

const fetchButton = document.querySelector('#fetch-button') as HTMLButtonElement;
fetchButton.addEventListener('click', () => {
  getActivity();
});



const typeButton = document.querySelector("#type-button") as HTMLButtonElement;
typeButton.addEventListener('click', async () => {
  const searchInput = document.querySelector('#search-input') as HTMLInputElement;
  if (searchInput.value.trim().length > 0) {
    getByType(searchInput.value);
  }
});


