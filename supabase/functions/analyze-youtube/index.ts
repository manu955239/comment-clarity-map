
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Extract YouTube video ID from URL
function extractVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}

// Mock data for YouTube analysis
function generateMockYouTubeAnalysis(videoUrl: string) {
  const videoId = extractVideoId(videoUrl);
  console.log(`Analyzing YouTube video: ${videoUrl} (ID: ${videoId})`);
  
  return {
    title: "YouTube Video Title " + Math.floor(Math.random() * 100),
    channel: "YouTube Channel " + Math.floor(Math.random() * 100),
    stats: {
      views: Math.floor(Math.random() * 1000000),
      likes: Math.floor(Math.random() * 50000),
      dislikes: Math.floor(Math.random() * 5000),
      commentCount: Math.floor(Math.random() * 2000),
    },
    comments: [
      {
        username: "viewer1",
        text: "Great content, really enjoyed it!",
        toxicity: 0.03,
        isToxic: false,
      },
      {
        username: "viewer2",
        text: "This video is absolutely terrible, the creator should be ashamed",
        toxicity: 0.78,
        isToxic: true,
      },
      {
        username: "viewer3",
        text: "I learned so much, thanks for sharing",
        toxicity: 0.01,
        isToxic: false,
      },
    ],
  };
}

// YouTube API Key
const YOUTUBE_API_KEY = "AIzaSyA2IZJWCC4lwe2gFXzmBJEcrMw22E1ij5k";

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Get request body
    const { videoUrl } = await req.json();
    
    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing videoUrl parameter' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    console.log(`Using YouTube API Key: ${YOUTUBE_API_KEY}`);
    
    // For now, we'll use mock data since implementing the full YouTube API would be extensive
    const analysisResults = generateMockYouTubeAnalysis(videoUrl);
    
    // Return analysis results
    return new Response(
      JSON.stringify(analysisResults),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("Error analyzing YouTube video:", error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to analyze YouTube video' }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
})
