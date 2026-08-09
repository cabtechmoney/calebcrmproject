export interface CreateClientDto {
    name: string;
    email: string;
    phone?: string;
    company?: string;
}
export interface Client extends CreateClientDto {
    id: string;
    createdAt: string;
    updatedAt: string;
}
export declare const ClientService: {
    getAll: () => Promise<Client[]>;
    create: (data: CreateClientDto) => Promise<Client>;
};
//# sourceMappingURL=client.services.d.ts.map