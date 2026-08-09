"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let cachedClient = null;
const getSupabase = () => {
    if (!cachedClient) {
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
            console.error('Missing Supabase credentials. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env');
            return null;
        }
        try {
            const { createClient } = require('@supabase/supabase-js');
            cachedClient = createClient(supabaseUrl, supabaseAnonKey, {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                },
            });
        }
        catch (error) {
            console.error('Failed to load Supabase SDK:', error.message);
            return null;
        }
    }
    return cachedClient;
};
exports.getSupabase = getSupabase;
exports.default = exports.getSupabase;
//# sourceMappingURL=supabase.js.map