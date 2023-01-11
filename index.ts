import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.get("/user", async (req, res) => {
    const users = await prisma.users.findMany()
    res.json(users)
})

app.post("/user", async (req, res) => {
    const { username, password } = req.body
    const user = await prisma.users.create({
        data: {
            username,
            password
        }
    })
    res.json(user)
})

app.put("/user/:id", async (req, res) => {
  const { id } = req.params
  const {username, password} = req.body
  const user = await prisma.users.update({
    where: {id: Number(id)},
    data: { username, password}
  })
  res.json(user)
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params
    const user = await prisma.users.delete({
      where: {
        id: Number(id)
      },
    })
    res.json(user)
  })

app.listen(3000, () => {
    console.log("running on port", 3000);
})