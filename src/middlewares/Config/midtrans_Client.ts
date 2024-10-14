import dotenv from 'dotenv';
import midtransClient from 'midtrans-client';


dotenv.config();

// Buat instance Snap Midtrans
export let snap = new midtransClient.Snap({
    isProduction: false, // Ubah ke true jika di production
    serverKey: process.env.MIDTRANS_SERVER_KEY!,
});