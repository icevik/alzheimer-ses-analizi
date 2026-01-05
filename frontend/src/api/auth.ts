import client from './client'

export interface LoginResponse {
    access_token: string
    token_type: string
}

export interface UserResponse {
    id: number
    email: string
    is_verified: boolean
    has_consented: boolean
    created_at: string
}

export interface MessageResponse {
    message: string
    remaining_attempts?: number
}

// Register
export const register = async (email: string, password: string, has_consented: boolean): Promise<MessageResponse> => {
    const response = await client.post('/api/auth/register', { email, password, has_consented }, { timeout: 15000 })
    return response.data
}

// Verify Register
export const verifyRegister = async (email: string, code: string): Promise<LoginResponse> => {
    const response = await client.post('/api/auth/verify-register', { email, code }, { timeout: 15000 })
    return response.data
}

// Login
export const login = async (email: string, password: string): Promise<MessageResponse> => {
    const response = await client.post('/api/auth/login', { email, password }, { timeout: 15000 })
    return response.data
}

// Verify Login
export const verifyLogin = async (email: string, code: string): Promise<LoginResponse> => {
    const response = await client.post('/api/auth/verify-login', { email, code }, { timeout: 15000 })
    return response.data
}

// Get current user
export const getCurrentUser = async (): Promise<UserResponse> => {
    const response = await client.get('/api/auth/me', { timeout: 10000 })
    return response.data
}

// Resend verification code
export const resendCode = async (email: string, password: string): Promise<MessageResponse> => {
    const response = await client.post('/api/auth/resend-code', { email, password }, { timeout: 15000 })
    return response.data
}
