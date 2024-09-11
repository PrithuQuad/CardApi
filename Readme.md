### Visiting Card recognition model

## Description
This is a simple server that uses the gemini's free tier 1.5 flash model to carry out the ocr task 
and utilizes the imgly-backgroung-remover to remove the unnecessary background from the image.

## Env information
**requires the following keys
-PORT: port number on which the server is running
-API_KEY_GEMINI: API key for the gemini api that you're using 

## Gemini Api Information
-Model Used: gemini-1.5-flash model
**Rate limits
-15 RPM (requests per minute)
-1 million TPM (tokens per minute)
-1,500 RPD (requests per day)
-Per request around 550-600 tokens are used

