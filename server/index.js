const express = require('express')
const cors = require('cors')
const fs = require('fs').promises
const path = require('path')

const app = express()
app.use(cors())
app.use(express.json())

const file = path.join(__dirname, 'db.json')

async function readDB(){
  try{
    const raw = await fs.readFile(file, 'utf8')
    return JSON.parse(raw)
  }catch(e){
    return { carts: {} }
  }
}

async function writeDB(data){
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8')
}

app.get('/api/cart/:user', async (req, res)=>{
  const user = req.params.user
  const db = await readDB()
  const cart = db.carts[user] || { items: [] }
  res.json(cart)
})

app.post('/api/cart/:user', async (req, res)=>{
  const user = req.params.user
  const payload = req.body || { items: [] }
  const db = await readDB()
  db.carts = db.carts || {}
  db.carts[user] = payload
  await writeDB(db)
  res.json({ ok: true })
})

const port = process.env.PORT || 5174
app.listen(port, ()=> console.log('Sync server listening on', port))
