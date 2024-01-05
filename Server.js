const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  // Add more initial items if needed
];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);
  res.json(newItem);
});

app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;

  items = items.map(item => (item.id === itemId ? updatedItem : item));

  res.json(updatedItem);
});

app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.json({ message: 'Item deleted successfully' });
});

app.listen(port, () => {
  console.log(Server is running at http://localhost:${port});
});