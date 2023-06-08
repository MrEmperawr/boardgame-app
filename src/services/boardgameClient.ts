import axios from 'axios'
import { Game } from '../models'

const boardgameClient = axios.create({
    baseURL: 'http://localhost:3000',
    headers: { Accept: '*/*' }
})

export async function fetchGames(): Promise<Game[]> {
    const response = await boardgameClient.get<Game[]>('/api/boardgames')
    return response.data
}
