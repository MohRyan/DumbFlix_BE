declare module 'midtrans-client' {
    export class CoreApi {
        constructor(options: { serverKey: string, clientKey: string, isProduction: boolean });
        charge(param: object): Promise<object>;
        // Define other methods and types as needed
    }
}
