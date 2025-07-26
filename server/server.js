const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const itineraryRoutes = require('./routes/itineraries');
const db = require('./config/db');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: 'http://localhost:3000' } });

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/itineraries', itineraryRoutes);

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

db.connect();

server.listen(5001, () => {
  console.log('Server running on port 5000');
});