import { Server } from 'socket.io'

const io = new Server(9000, {
  allowEIO3: true,
  cors: {
    origin: true,
    credentials: true,
  },
})

const rooms = {}

io.on('connection', socket => {
  socket.on('join room', roomId => {
    console.log(`Room ${roomId} joined`)

    if (rooms[roomId]) rooms[roomId].push(socket.id)
    else rooms[roomId] = [socket.id]

    const otherUser = rooms[roomId].find(id => id !== socket.id)
    if (otherUser) {
      socket.emit('other user', otherUser)
      socket.to(otherUser).emit('user joined', socket.id)
    }
  })

  socket.on('ice-candidate', payload => {
    console.log(`ice-candidate`)

    io.to(payload.target).emit('ice-candidate', payload.candidate)
  })

  socket.on('offer', payload => {
    console.log(`Offer {target: ${payload.target}, caller: ${payload.caller}}`)

    io.to(payload.target).emit('offer', payload)
  })

  socket.on('answer', payload => {
    console.log(`Answer {target: ${payload.target}, caller: ${payload.caller}}`)

    io.to(payload.target).emit('answer', payload)
  })
})
