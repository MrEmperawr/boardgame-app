// src/services/api.ts
import axios from 'axios'

export const boardgameClient = axios.create({
    baseURL: 'http://case.senarion.com/swagger',
    headers: { 'Authorization': process.env.API_KEY }
})
