'use server';

/**
 * @fileOverview Generates a professional AI-generated video for the homepage demonstrating how to use the app.
 *
 * - generateHomepageVideo - A function that generates the video.
 * - HomepageVideoOutput - The return type for the generateHomepageVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import * as fs from 'fs';
import {Readable} from 'stream';
import {MediaPart} from 'genkit';

const HomepageVideoOutputSchema = z.object({
  videoDataUri: z.string().describe('The generated video as a data URI.'),
});
export type HomepageVideoOutput = z.infer<typeof HomepageVideoOutputSchema>;

export async function generateHomepageVideo(): Promise<HomepageVideoOutput> {
  return homepageVideoGenerationFlow();
}

const homepageVideoGenerationFlow = ai.defineFlow(
  {
    name: 'homepageVideoGenerationFlow',
    outputSchema: HomepageVideoOutputSchema,
  },
  async () => {
    let {operation} = await ai.generate({
      model: ai.model('veo-2.0-generate-001'),
      prompt: 'A professional video demonstrating how to use the Tooth Fairy app for dental plan recommendations and cost comparisons. The video should be calm, informative, and visually appealing, showcasing the app\u2019s key features and benefits with a light blue and mint green color scheme.',
      config: {
        durationSeconds: 7,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes. Note that this may take some time, maybe even up to a minute. Design the UI accordingly.
    while (!operation.done) {
      operation = await ai.checkOperation(operation);
      // Sleep for 5 seconds before checking again.
      await new Promise(resolve => setTimeout(resolve, 5000));
    }

    if (operation.error) {
      throw new Error('failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find(p => !!p.media);
    if (!video) {
      throw new Error('Failed to find the generated video');
    }

    // Function to download the video (placeholder, implement as needed)
    async function downloadVideo(video: MediaPart): Promise<string> {
      const fetch = (await import('node-fetch')).default;
      // Add API key before fetching the video.
      const videoDownloadResponse = await fetch(
        `${video.media!.url}&key=${process.env.GEMINI_API_KEY}`
      );
      if (
        !videoDownloadResponse ||
        videoDownloadResponse.status !== 200 ||
        !videoDownloadResponse.body
      ) {
        throw new Error('Failed to fetch video');
      }
      const arrayBuffer = await videoDownloadResponse.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return `data:video/mp4;base64,${buffer.toString('base64')}`;
    }

    const videoDataUri = await downloadVideo(video);

    return {videoDataUri};
  }
);
