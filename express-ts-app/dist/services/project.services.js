"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectService = void 0;
const api_1 = require("../lib/api");
exports.ProjectService = {
    // Get all projects
    getAll: async () => {
        return (0, api_1.api)("/projects");
    },
    // Get single project
    getById: async (id) => {
        return (0, api_1.api)(`/projects/${id}`);
    },
    // Create project
    create: async (data) => {
        return (0, api_1.api)("/projects", {
            method: "POST",
            body: JSON.stringify(data),
        });
    },
    // Update project
    update: async (id, data) => {
        return (0, api_1.api)(`/projects/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
        });
    },
    // Delete project
    delete: async (id) => {
        return (0, api_1.api)(`/projects/${id}`, {
            method: "DELETE",
        });
    },
    // Search projects
    search: async (query) => {
        return (0, api_1.api)(`/search?q=${encodeURIComponent(query)}`);
    },
};
//# sourceMappingURL=project.services.js.map