
import { GoogleGenAI } from "@google/genai";
import { MenuItem } from "../types";

export const getGeminiRecommendation = async (userPrompt: string, currentMenu: MenuItem[]): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const menuContext = currentMenu.map(item => 
    `${item.name} (${item.category}): ${item.description} - R$ ${item.price.toFixed(2)}`
  ).join("\n");

  const systemInstruction = `
    Você é o concierge digital do Bar e Restaurante Bella Vista. 
    Seu objetivo é ser simpático, refinado e ajudar o cliente a escolher o prato ou bebida ideal com base no que ele pedir.
    
    Aqui está o nosso cardápio atual (sincronizado em tempo real):
    ${menuContext}
    
    Regras:
    1. Recomende APENAS itens que estão na lista acima.
    2. Explique por que você está recomendando aquele item.
    3. Seja breve e cordial.
    4. Se o usuário estiver indeciso, sugira uma combinação (entrada + prato ou prato + bebida).
    5. Responda em português.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "Desculpe, não consegui pensar em uma recomendação agora. Que tal nossa Carne de Sol com pirão de leite?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou com um pouco de dificuldade para me conectar aos nossos servidores, mas nossa Tripinha Crocante é sempre uma excelente escolha!";
  }
};
