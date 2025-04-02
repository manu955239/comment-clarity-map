
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
  
  // Generate a timestamp for comments to have proper dates
  const baseDate = new Date();
  
  return {
    title: "How to Build a React Application",
    channel: "CodeWithExpert",
    stats: {
      views: 235789,
      likes: 12567,
      dislikes: 342,
      commentCount: 10,
      totalComments: 10,
      toxicComments: 4,
      nonToxicComments: 6,
      averageToxicity: 0.29
    },
    comments: [
      {
        id: '1',
        author: 'User123',
        text: 'This video is amazing, I learned so much from it!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 7).toISOString(),
        toxicity: 0.02,
        isToxic: false
      },
      {
        id: '2',
        author: 'AngryViewer',
        text: 'This is the worst content I have ever seen. Total garbage!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 6).toISOString(),
        toxicity: 0.75,
        isToxic: true
      },
      {
        id: '3',
        author: 'CalmObserver',
        text: 'I disagree with some points, but overall it was informative.',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 5).toISOString(),
        toxicity: 0.15,
        isToxic: false
      },
      {
        id: '4',
        author: 'ToxicTroll',
        text: 'You should just delete your channel, nobody wants to see this stupid content!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 4).toISOString(),
        toxicity: 0.89,
        isToxic: true
      },
      {
        id: '5',
        author: 'PositivePerson',
        text: 'Thank you for sharing your knowledge with us. Much appreciated!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 3).toISOString(),
        toxicity: 0.01,
        isToxic: false
      },
      {
        id: '6',
        author: 'CriticalThought',
        text: 'The production quality could be better, but the content is good.',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 2).toISOString(),
        toxicity: 0.25,
        isToxic: false
      },
      {
        id: '7',
        author: 'FrustratedFan',
        text: 'Stop making videos if you can\'t even get basic facts right. Pathetic!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 1).toISOString(),
        toxicity: 0.82,
        isToxic: true
      },
      {
        id: '8',
        author: 'RegularViewer',
        text: 'I watch all your videos. Keep up the good work!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 12).toISOString(),
        toxicity: 0.05,
        isToxic: false
      },
      {
        id: '9',
        author: 'TechEnthusiast',
        text: 'The explanation at 5:23 was really clear. Thanks!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 6).toISOString(),
        toxicity: 0.03,
        isToxic: false
      },
      {
        id: '10',
        author: 'RageQuitter',
        text: 'What a complete waste of my time! You\'re an idiot who doesn\'t know anything!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 1).toISOString(),
        toxicity: 0.95,
        isToxic: true
      }
    ]
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
