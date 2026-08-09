"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInvoiceText = generateInvoiceText;
exports.generateClientMessage = generateClientMessage;
exports.generateProposal = generateProposal;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
async function generateInvoiceText(clientName, amount, items) {
    const prompt = `Generate a professional invoice summary for client ${clientName}, total amount ${amount}, items: ${items.join(', ')}. Keep it brief and professional.`;
    return generateAiContent(prompt);
}
async function generateClientMessage(clientName, projectName) {
    const prompt = `Write a professional and friendly message to client ${clientName} about project ${projectName}. Keep it concise (2-3 sentences).`;
    return generateAiContent(prompt);
}
async function generateProposal(projectScope, budget, timeline) {
    const prompt = `Generate a professional proposal for: Scope: ${projectScope}, Budget: $${budget}, Timeline: ${timeline}. Keep it under 150 words.`;
    return generateAiContent(prompt);
}
async function generateAiContent(prompt) {
    if (!OPENAI_API_KEY) {
        return `[Draft for: ${prompt}]`;
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 500,
            }),
        });
        if (!response.ok) {
            const error = await response.json();
            console.error('OpenAI error:', error);
            return `[Failed to generate. Error: ${error.error?.message}]`;
        }
        const data = await response.json();
        return data.choices?.[0]?.message?.content || '[No content generated]';
    }
    catch (error) {
        console.error('AI generation error:', error);
        return `[Error generating content]`;
    }
}
//# sourceMappingURL=ai.js.map