import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

export async function generateContent(
  prompt: string,
  model: string = "gpt-4o"
): Promise<{
  content: string;
  model: string;
  processingTime: number;
}> {
  const startTime = performance.now();
  
  try {
    // Check if API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.warn("OpenAI API key not found. Using mock response.");
      // Simulate processing time for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        content: `This is simulated content because no OpenAI API key was found.\n\nPrompt: ${prompt}\nModel: ${model}`,
        model,
        processingTime: performance.now() - startTime
      };
    }
    
    const response = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant for a website management tool called WebsiteUpdater. Provide clear, concise, and professional responses."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });
    
    const content = response.choices[0].message.content || "";
    const endTime = performance.now();
    
    return {
      content,
      model: response.model,
      processingTime: endTime - startTime
    };
  } catch (error) {
    console.error("Error generating content with OpenAI:", error);
    throw new Error("Failed to generate content");
  }
}

export async function analyzeImage(base64Image: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OpenAI API key not found. Using mock response.");
    return "This is a simulated image analysis response because no OpenAI API key was found.";
  }
  
  try {
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image in detail and describe its key elements, context, and any notable aspects."
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`
              }
            }
          ],
        },
      ],
      max_tokens: 500,
    });

    return visionResponse.choices[0].message.content || "";
  } catch (error) {
    console.error("Error analyzing image with OpenAI:", error);
    throw new Error("Failed to analyze image");
  }
}

export async function moderateContent(text: string): Promise<{
  flagged: boolean;
  categories: Record<string, boolean>;
}> {
  if (!process.env.OPENAI_API_KEY) {
    return { flagged: false, categories: {} };
  }
  
  try {
    const response = await openai.moderations.create({
      input: text,
    });
    
    return {
      flagged: response.results[0].flagged,
      categories: response.results[0].categories
    };
  } catch (error) {
    console.error("Error moderating content with OpenAI:", error);
    return { flagged: false, categories: {} };
  }
}
