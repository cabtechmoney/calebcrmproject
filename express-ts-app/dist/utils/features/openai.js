"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAiText = generateAiText;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
async function generateAiText(prompt) {
    if (!OPENAI_API_KEY) {
        return {
            success: false,
            message: 'OpenAI API key not configured',
            text: `Draft for: ${prompt}`,
        };
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
            }),
        });
        const result = (await response.json());
        const text = result.choices?.[0]?.message?.content ?? 'Unable to generate content.';
        return { success: true, text };
    }
    catch (error) {
        return { success: false, message: 'OpenAI request failed', text: `Draft for: ${prompt}` };
    }
}
//# sourceMappingURL=openai.js.map