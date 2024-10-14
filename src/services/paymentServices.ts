import axios from "axios";
import db from "../lib/db";
import { snap } from "../middlewares/Config/midtrans_Client";
const midtransClient = require('midtrans-client');

export const paymentPremiumService = async (amount: number): Promise<{ redirect_url: string, Token: string }> => {
    const midtransServerKey = 'SB-Mid-server-yVqmNvdq2ES-DvioSw2dFBjk';

    const orderData = {
        items: [
            { id: 1, name: 'Kaos Polos Putih', price: 50000, quantity: 2 },
            { id: 2, nama: 'Celana Jeans Biru', price: 100000, quantity: 1 }
        ]
    };

    const response = await axios.post('https://app.sandbox.midtrans.com/snap/v1/transactions', {
        transaction_details: {
            order_id: `order-id-${Date.now()}`,
            gross_amount: amount,
        },
        customer_details: {
            first_name: 'Nama Depan',
            last_name: 'Nama Belakang',
            email: 'email@example.com',
            phone: '081234567890',
            baju: "clote",
            celana: "lepis"
        },
    }, {
        headers: {
            'Authorization': `Basic ${Buffer.from(midtransServerKey + ':').toString('base64')}`,
            'Content-Type': 'application/json',
        },
    });

    //simpen token midtrans ke database
    //misal user X sudah pernah membuat pembayaran = arahkan ke redirect url dengan token

    return response.data

};