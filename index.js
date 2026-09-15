const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));

const PRIVATE_APP_ACCESS = 'pat-na2-242f036b-294b-4710-b11a-899ed6cdf818';

app.get('/homepage-video_games', async (req, res) => {
  const videoGamesEndpoint = 'https://api.hubspot.com/crm/v3/objects/0-970?properties=name,msrp_price,retail_value';
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
    'Content-Type': 'application/json'
  }
  const params = {
    properties: ['name', 'msrp_price', 'retail_value'] // Add the property names you want here
  }
  try {
    const response = await axios.get(videoGamesEndpoint, { headers, params });
    console.log('API Response:', JSON.stringify(response.data, null, 2));
    const videoGames = response.data.results;
    console.log('Video Game Data:', JSON.stringify(videoGames, null, 2));
    res.render('homepage', { videoGames: videoGames });
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


app.post('/update-video_games', async (req, res) => {
  const videoGamesEndpoint = 'https://api.hubspot.com/crm/v3/objects/0-970';
  const headers = {
    Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
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