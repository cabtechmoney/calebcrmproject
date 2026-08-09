import { Client } from "./client.services";
export interface CreateProjectDto {
    title: string;
    description?: string;
    budget: number;
    status: string;
    deadline?: string;
    clientId: string;
}
export interface Project extends CreateProjectDto {
    id: string;
    createdAt: string;
    updatedAt: string;
    client?: Client;
}
export declare const ProjectService: {
    getAll: () => Promise<Project[]>;
    getById: (id: string) => Promise<Project>;
    create: (data: CreateProjectDto) => Promise<Project>;
    update: (id: string, data: Partial<CreateProjectDto>) => Promise<Project>;
    delete: (id: string) => Promise<{
        message: string;
    }>;
    search: (query: string) => Promise<Project[]>;
};
//# sourceMappingURL=project.services.d.ts.map