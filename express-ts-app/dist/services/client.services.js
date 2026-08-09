"use strict";
// services/client.service.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const api_1 = require("../lib/api");
exports.ClientService = {
    getAll: () => (0, api_1.api)("/clients"),
    create: (data) => (0, api_1.api)("/clients", {
        method: "POST",
        body: JSON.stringify(data),
    }),
};
//# sourceMappingURL=client.services.js.map