declare module 'midtrans-client' {
    // Tambahkan definisi tipe sementara di sini
    export class Snap {
        constructor(options: { isProduction: boolean; serverKey: string });
        createTransaction(parameter: any): Promise<any>;
    }

    export class CoreApi {
        constructor(options: { isProduction: boolean; serverKey: string; clientKey: string });
        charge(parameter: any): Promise<any>;
        transaction: {
            status(orderId: string): Promise<any>;
            approve(orderId: string): Promise<any>;
            cancel(orderId: string): Promise<any>;
            expire(orderId: string): Promise<any>;
        };
    }
}
