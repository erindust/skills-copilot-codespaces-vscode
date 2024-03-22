// Create a web server
// Create a form to submit a comment
// Create a POST route to handle the form submission
// Create a GET route to display the comments
// Use a template engine to display the comments
// Use a file to store the comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  fs.appendFile('comments.txt', comment + '\n', () => {
    res.redirect('/comments');
  });
});

app.get('/comments', (req, res) => {
  fs.readFile('comments.txt', 'utf8', (err, data) => {
    if (err) {
      return res.send('No comments yet');
    }
    const comments = data.split('\n').filter(Boolean);
    res.send(`
      <h1>Comments</h1>
      <ul>
        ${comments.map(comment => `<li>${comment}</li>`).join('')}
      </ul>
    `);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});