import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function generateInvoiceText(clientName: string, amount: number, items: string[]) {
  const prompt = `Generate a professional invoice summary for client ${clientName}, total amount ${amount}, items: ${items.join(', ')}. Keep it brief and professional.`;
  return generateAiContent(prompt);
}

export async function generateClientMessage(clientName: string, projectName: string) {
  const prompt = `Write a professional and friendly message to client ${clientName} about project ${projectName}. Keep it concise (2-3 sentences).`;
  return generateAiContent(prompt);
}

export async function generateProposal(projectScope: string, budget: number, timeline: string) {
  const prompt = `Generate a professional proposal for: Scope: ${projectScope}, Budget: $${budget}, Timeline: ${timeline}. Keep it under 150 words.`;
  return generateAiContent(prompt);
}

async function generateAiContent(prompt: string): Promise<string> {
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
      const error = await response.json() as { error?: { message?: string } };
      console.error('OpenAI error:', error);
      return `[Failed to generate. Error: ${error.error?.message}]`;
    }

    const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
    return data.choices?.[0]?.message?.content || '[No content generated]';
  } catch (error) {
    console.error('AI generation error:', error);
    return `[Error generating content]`;
  }
}
