const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = 'pat-na2-4a160481-c449-480d-9fa6-762a936536d9';

app.get('/homepage-video_games', async (req, res) => {
  const petsEndpoint = 'https://api.hubspot.com/crm/v3/objects/video_games?properties=name,msrp_price,retail_value';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['name', 'msrp_price', 'retail_value'] // Add the property names you want here
  }
  try {
    const response = await axios.get(petsEndpoint, { headers, params });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    const pets = response.data.results;
    console.log('Video Game Data:', JSON.stringify(pets, null, 2));
    res.render('homepage', { pets: pets });
  } catch (error) {
    console.error(error);
  }
})

app.get('/update-video_games', (req, res) => {
  try {
    res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' }); // Render the updates.pug template
  } catch (error) {
    console.error(error);
  }
});


app.post('/update-pets', async (req, res) => {
  const videoGamesEndpoint = 'https://api.hubspot.com/crm/v3/objects/video_games';
  const headers = {
    Authorization: `Bearer ${private_app_token}`,
    'Content-Type': 'application/json'
  }
  const data = {
    properties: {
      name: req.body.name,
      msrp_price: req.body.msrp_price,
      retail_value: req.body.retail_value
    }
  }
  try {
    const response = await axios.post(videoGamesEndpoint, data, { headers });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    res.redirect('/homepage-video_games'); // Redirects to video game home page
  } catch (error) {
    console.error(error);
  }
});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));