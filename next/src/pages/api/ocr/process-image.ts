import type { NextApiRequest, NextApiResponse } from "next";
import vision from "@google-cloud/vision";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const image = req.body.image;

  if (!image) {
    return res.status(400).json({ error: "Missing image" });
  }

  const response = await processImage(image);

  return res.status(200).json(response);
};

const processImage = async (image: string) => {
  const client = new vision.ImageAnnotatorClient();
  const [result] = await client.annotateImage({
    image: {
      content: image,
    },
    features: [
      {
        type: "TEXT_DETECTION",
      },
    ],
  });

  const textAnnotations = result.textAnnotations;

  if (!textAnnotations) return null;

  const detectedText = textAnnotations.shift()?.description;

  if (!detectedText) return null;

  return {
    detectedText,
  };
};

export default handler;
