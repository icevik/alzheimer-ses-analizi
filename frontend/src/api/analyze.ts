import client from './client'

export interface AnalysisResult {
  id: number
  participant_id: number
  transcript: string
  acoustic_features: {
    duration: number
    energy: { mean: number; max: number }
    pitch: { mean: number; std: number }
    mfcc: { mean: number[]; std: number[] }
    spectral: {
      centroid: number
      rolloff: number
      zero_crossing_rate: number
    }
    tempo: number
  }
  emotion_analysis: {
    tone: string
    intensity: number
    emotions: string[]
  }
  content_analysis: {
    word_count: number
    unique_words: number
    fluency_score: number
    coherence_score: number
  }
  created_at: string
}

export const analyzeAudio = async (
  participantId: number,
  file: File
): Promise<AnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('participant_id', participantId.toString())
  
  const response = await client.post(
    '/api/analyze/',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

export const getAnalysisResult = async (
  analysisId: number
): Promise<AnalysisResult> => {
  const response = await client.get(`/api/results/${analysisId}`)
  return response.data
}

export interface AnalysisListItem {
  id: number
  participant_id: number
  transcript: string
  emotion_analysis: {
    tone: string
    intensity: number
    emotions: string[]
  }
  content_analysis: {
    word_count: number
    unique_words: number
    fluency_score: number
    coherence_score: number
  }
  created_at: string
}

export interface AnalysesListResponse {
  total: number
  items: AnalysisListItem[]
}

export const getAllAnalyses = async (
  limit: number = 100,
  offset: number = 0
): Promise<AnalysesListResponse> => {
  const response = await client.get(`/api/results/?limit=${limit}&offset=${offset}`)
  return response.data
}

