const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to your MongoDB database (replace <your_mongo_uri> below)
mongoose.connect('<your_mongo_uri>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define the Lead schema (structure of your lead data)
const leadSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  interest: String,
  createdAt: { type: Date, default: Date.now },
});

const Lead = mongoose.model('Lead', leadSchema);

// API endpoint that frontend calls to save lead
app.post('/api/leads', async (req, res) => {
  try {
    const lead = new Lead(req.body);
    await lead.save();
    res.status(201).send('Lead saved');
  } catch (error) {
    res.status(500).send('Error saving lead');
  }
});

// Start the backend server on port 5000
const PORT = 5000;
app.listen(PORT, () => {
  console.log(Server running on port ${PORT});
});
