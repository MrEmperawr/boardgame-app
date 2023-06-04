import axios from 'axios'
import { Game } from '../models'

const boardgameClient = axios.create({
    baseURL: 'http://case.senarion.com/swagger',
    headers: { 'Authorization': 'boardgames123' }
})

export async function fetchGames(): Promise<Game[]> {
    const response = await boardgameClient.get<Game[]>('/games')
    return response.data
}
