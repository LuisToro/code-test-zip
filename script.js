document.querySelector('#zipcode-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const zipcode = document.getElementById('zipcode').value;
  if (zipcode !== "") getInfo(zipcode);
});

const API_URL = 'https://api.zippopotam.us';

let infoCode = {
  'post code': '',
  'country': '',
  'country abbreviation': '',
  'places': []
};

function getInfo(zipcode) {
  fetch(`${API_URL}/us/${zipcode}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      return null;
    })
    .then((data) => {
      if (data !== null) {
        console.log(data);
        document.getElementById('search').style.display = 'none';
        document.getElementById('result-info').style.display = 'block';
        drawInfo(data);
       
      } else {
        alert('No encontrado');
      }
    });
}

function drawInfo(data) {
  document.getElementById('entered').innerHTML = data['post code'];
  document.getElementById('country').innerHTML = data['country'];
  document.getElementById('abbreviation').innerHTML = data['country abbreviation'];
  document.getElementById('place-name').innerHTML = data['places'][0]['place name'];
  document.getElementById('state').innerHTML = data['places'][0]['state'];
  document.getElementById('state-abbreviation').innerHTML = data['places'][0]['state abbreviation'];
  document.getElementById('latitude').innerHTML = data['places'][0]['latitude'];
  document.getElementById('longitude').innerHTML = data['places'][0]['longitude'];
}

function again() {
  document.getElementById('zipcode').value = "";
  document.getElementById('search').style.display = "block";
  document.getElementById('result-info').style.display = 'none';
}