'use server'

import { serverClient } from "@/lib/streamServer"

export async function CreateToken(userId: string) {
    const token = serverClient.createToken(userId)
    return token
}