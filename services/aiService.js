import { GoogleAIFileManager } from "@google/generative-ai/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ErrorHandler } from "../helpers/index.js";
import { HarmBlockThreshold, HarmCategory,HarmProbability } from "@google/generative-ai";
const getResultFromGemini = async (file) => {
  try {
    // Convert the file buffer to base64 if needed
    const fileBufferBase64 = file.buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.API_KEY_GEMINI);
    const safetySettings = [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category:HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
        {
            category:HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        }
       
      ];
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",safetySettings:safetySettings });

    const result = await model.generateContent([
      `recognize the data {name,number,companyName,Address,email} in json format if any thing is missing then mark it as an empty string give me the json output only if there are any multiple values u can use an array in that field`,
      {
        inlineData: {
          data: fileBufferBase64, // Use the base64-encoded file data
          mimeType: file.mimetype, // Use the correct mimeType from the file
        },
      },
    ]);
    let text = result.response.text();
    console.log(
      JSON.parse(text?.replaceAll("```json", "")?.replaceAll("```", ""))
    );

    const jsonString = text
      ?.replaceAll("```json", "")
      ?.replaceAll("```", "")
      .trim();

    // Parse the cleaned string into a JSON object
    const jsonObject = JSON.parse(jsonString);

    console.log(jsonObject);
    const ans={
        "phoneNumber": parsePhoneNumber(jsonObject.number),
        "email": jsonObject.email,
        "address": jsonObject.Address,
        "companyName": jsonObject.companyName,
        "name": jsonObject.name
      };
    
    // Handle the result
    console.log(result.response.text());
    return ans;
  } catch (error) {
    // console.log(error[0].safetyRatings[0]);
    let response = error.response;
    console.error('This is error block-->',response.candidates[0].safetyRatings);
    return new ErrorHandler(error.message, 500, true);
  }
};

function parsePhoneNumber(phone) {
    // Remove any spaces in the phone number string
    phone = phone.replace(/\s+/g, '');
  
    // Use a regular expression to match the country code and the rest of the number
    const match = phone.match(/^(\+\d+)(\d+)$/);
  
    if (match) {
      const countryCode = match[1];
      const phoneNumber = match[2];
  
      return {
        countryCode: countryCode,
        phoneNumber: phoneNumber
      };
    } else {
      return {
        error: 'Invalid phone number format'
      };
    }
  }
  
export { getResultFromGemini };
