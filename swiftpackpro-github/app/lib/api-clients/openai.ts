// app/lib/api-clients/openai.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface AIServiceOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

/**
 * Generate AI-powered booking quote
 */
export async function generateBookingQuote(
  serviceType: string,
  details: string,
  options: AIServiceOptions = {}
) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.7,
      max_tokens: options.maxTokens || 500,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional cleaning and logistics service assistant. Provide accurate quotes based on service details.',
        },
        {
          role: 'user',
          content: `Service Type: ${serviceType}\nDetails: ${details}\n\nProvide a professional quote with estimated price range and timeline.`,
        },
      ],
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating quote:', error);
    throw error;
  }
}

/**
 * Analyze job application
 */
export async function analyzeJobApplication(
  jobDescription: string,
  applicationText: string,
  options: AIServiceOptions = {}
) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.5,
      max_tokens: options.maxTokens || 300,
      messages: [
        {
          role: 'system',
          content:
            'You are an HR specialist. Analyze job applications and provide a match score (0-100) and brief assessment.',
        },
        {
          role: 'user',
          content: `Job Description: ${jobDescription}\n\nApplication: ${applicationText}\n\nProvide a match score and key observations.`,
        },
      ],
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error analyzing application:', error);
    throw error;
  }
}

/**
 * Generate cleaning checklist
 */
export async function generateCleaningChecklist(
  serviceType: string,
  propertyType: string,
  options: AIServiceOptions = {}
) {
  try {
    const response = await openai.chat.completions.create({
      model: options.model || 'gpt-3.5-turbo',
      temperature: options.temperature || 0.6,
      max_tokens: options.maxTokens || 500,
      messages: [
        {
          role: 'system',
          content:
            'You are a professional cleaning service consultant. Generate detailed checklists for cleaning tasks.',
        },
        {
          role: 'user',
          content: `Service Type: ${serviceType}\nProperty Type: ${propertyType}\n\nCreate a detailed, numbered cleaning checklist.`,
        },
      ],
    });

    return response.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('Error generating checklist:', error);
    throw error;
  }
}

export default openai;
