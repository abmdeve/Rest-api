import crypto from 'crypto'

// Generate a random 16-byte secret key

const secretKey = 'Lawal-secret-key'

export const random = () => crypto.randomBytes(128).toString('base64')

//Authentification

export const authentification = (salt: string, password: string): string => {
    const hash = crypto.createHmac('sha256', salt).update(secretKey).digest('hex');
    return hash
}