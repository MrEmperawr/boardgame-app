import axios from 'axios'
import { Game } from '../models'

const boardgameClient = axios.create({
    baseURL: 'http://case.senarion.com',
    headers: { 'X-API-Key': 'boardgames123', Accept: '*/*' }
})

export async function fetchGames(): Promise<Game[]> {
    const response = await boardgameClient.get<Game[]>('/boardgames')
    return response.data
}
