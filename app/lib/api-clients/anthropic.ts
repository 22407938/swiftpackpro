// app/lib/api-clients/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface AIServiceOptions {
  model?: string;
  maxTokens?: number;
}

/**
 * Generate customer support response using Claude
 */
export async function generateSupportResponse(
  customerMessage: string,
  options: AIServiceOptions = {}
) {
  try {
    const response = await anthropic.messages.create({
      model: options.model || 'claude-3-haiku-20240307',
      max_tokens: options.maxTokens || 300,
      messages: [
        {
          role: 'user',
          content: `You are a helpful customer support representative for SwiftPack Pro. Respond professionally and helpfully.\n\nCustomer: ${customerMessage}`,
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === 'text');
    return textContent && textContent.type === 'text' ? textContent.text : '';
  } catch (error) {
    console.error('Error generating support response:', error);
    throw error;
  }
}

/**
 * Analyze customer feedback
 */
export async function analyzeFeedback(
  feedback: string,
  options: AIServiceOptions = {}
) {
  try {
    const response = await anthropic.messages.create({
      model: options.model || 'claude-3-haiku-20240307',
      max_tokens: options.maxTokens || 200,
      messages: [
        {
          role: 'user',
          content: `Analyze this customer feedback and identify sentiment (positive/negative/neutral), main concerns, and recommendations:\n\n"${feedback}"`,
        },
      ],
    });

    const textContent = response.content.find((block) => block.type === 'text');
    return textContent && textContent.type === 'text' ? textContent.text : '';
  } catch (error) {
    console.error('Error analyzing feedback:', error);
    throw error;
  }
}

export default anthropic;
