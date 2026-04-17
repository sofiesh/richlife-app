/**
 * @file Defines the main application.
 * @module server
 * @author Sofie Swagemakers Herou
 */

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'build' folder
app.use(express.static(path.join(__dirname, 'build')));

// Route all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Anslut till MongoDB
const dbURI = 'mongodb://localhost:27017/budgetapp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB ansluten...'))
  .catch(err => console.log(err));

// Skapa en Mongoose-schema och modell
const purchasePlanItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const PurchasePlanItem = mongoose.model('PurchasePlanItem', purchasePlanItemSchema);

// API-endpoints
app.post('/api/purchaseplan', async (req, res) => {
  try {
    const items = req.body.items;
    const savedItems = await PurchasePlanItem.insertMany(items);
    res.status(201).json(savedItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

