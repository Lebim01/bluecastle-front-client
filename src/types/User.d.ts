export interface User {
    id: string,
    email: string
    name: string
    whatsapp: string
    country: string
    position: string
    sponsor_id: string
    left: string
    right: string
    country: string
    state: string
    city: string
    is_trader: boolean
    membership: Memberships
    membership_cap_current: number
    membership_cap_limit: number
    username: string
}

export type Memberships = "p-100" | "p-300" | "p-500" | "p-1000" | null

export type Coins = 'USDT' | 'USD'

export type PaymentLink = {
    address: string
    amount: number
    membership_type: string
    status: string
    expires_at: string
    qrcode_url: string
}