
import { ApiResponse } from "../helpers/index.js";
import { getResultFromGemini } from "../services/aiService.js";
import removeBackground from "@imgly/background-removal-node";
class AiController {
   async getResultFromGeminiController(req,res){
        try {
            const result =await getResultFromGemini(req.files[0]);
            const imageBuffer = req.files[0].buffer;
            let config = {
                output: { format: "image/png" },
            };
            const blob = new Blob([imageBuffer], { type: "image/jpeg" });
        
            const removedBackground = await removeBackground(blob, config);
            console.log(removedBackground,'--------------------removed background--------------------')
            // const processImage=await sharp(imageBuffer).png().toBuffer();
// console.log(processImage.toString())
            //  const blob2 = await removeBackground(req.files[0].buffer);
    const croppedImageBuffer = Buffer.from(await removedBackground.arrayBuffer());
              const base64Image = croppedImageBuffer.toString('base64');

            if(typeof result !== undefined &&  typeof result !== null){
                res.status(200).json(ApiResponse.success('Data retrieved successfully', {result:result,image:`data:${req.files[0].mimetype};base64,${base64Image}` }));
            }
            else{
                res.status(500).json(ApiResponse.internalError('An error occurred while retrieving data'));
            }

        } catch (error) {
            console.error(error);
            return res.status(500).json(ApiResponse.internalError('An error occurred while retrieving data'));

            
        }
    }
}
export default new AiController();