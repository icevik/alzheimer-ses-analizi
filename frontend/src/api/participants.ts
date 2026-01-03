import client from './client'

export interface Participant {
  id: number
  name: string
  age: number
  gender: string
  group_type: 'alzheimer' | 'mci' | 'control'
  mmse_score: number | null
  has_consented: boolean
  consent_date: string | null
  created_at: string
}

export interface ParticipantCreate {
  name: string
  age: number
  gender: string
  group_type: 'alzheimer' | 'mci' | 'control'
  mmse_score?: number | null
  has_consented: boolean
}

export const getParticipants = async (): Promise<Participant[]> => {
  const response = await client.get('/api/participants/')
  return response.data
}

export const getParticipant = async (id: number): Promise<Participant> => {
  const response = await client.get(`/api/participants/${id}`)
  return response.data
}

export const createParticipant = async (
  data: ParticipantCreate
): Promise<Participant> => {
  const response = await client.post('/api/participants/', data)
  return response.data
}

