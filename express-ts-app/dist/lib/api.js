"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = api;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
async function api(path, options) {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
}
//# sourceMappingURL=api.js.map