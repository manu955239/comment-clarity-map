
// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mock data for Instagram analysis
function generateMockInstagramAnalysis(reelUrl: string) {
  console.log(`Analyzing Instagram reel: ${reelUrl}`);
  
  // Generate a timestamp for comments to have proper dates
  const baseDate = new Date();
  
  return {
    title: "Instagram Reel Analysis",
    creator: "instagram_user_" + Math.floor(Math.random() * 1000),
    stats: {
      likes: Math.floor(Math.random() * 10000),
      views: Math.floor(Math.random() * 100000),
      shares: Math.floor(Math.random() * 1000),
      totalComments: 7,
      toxicComments: 3,
      nonToxicComments: 4,
      averageToxicity: 0.37
    },
    comments: [
      {
        id: '1',
        author: 'fan_person',
        text: 'Love your content! Always so helpful!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 3).toISOString(),
        toxicity: 0.01,
        isToxic: false
      },
      {
        id: '2',
        author: 'hater_account',
        text: 'You\'re just promoting this for money. So fake and dishonest!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 2).toISOString(),
        toxicity: 0.72,
        isToxic: true
      },
      {
        id: '3',
        author: 'neutral_viewer',
        text: 'Have you tried the other version of this product? I heard it\'s better.',
        timestamp: new Date(baseDate.getTime() - 3600000 * 24 * 1).toISOString(),
        toxicity: 0.05,
        isToxic: false
      },
      {
        id: '4',
        author: 'angry_customer',
        text: 'I bought this because of you and it was terrible! You\'re the worst influencer ever!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 12).toISOString(),
        toxicity: 0.85,
        isToxic: true
      },
      {
        id: '5',
        author: 'curious_follower',
        text: 'Does this work for sensitive skin too?',
        timestamp: new Date(baseDate.getTime() - 3600000 * 6).toISOString(),
        toxicity: 0.02,
        isToxic: false
      },
      {
        id: '6',
        author: 'trolling_user',
        text: 'Only idiots would buy this garbage. Get a real job instead of scamming people online!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 3).toISOString(),
        toxicity: 0.91,
        isToxic: true
      },
      {
        id: '7',
        author: 'genuine_fan',
        text: 'Just ordered it! Can\'t wait to try it out. Thanks for the recommendation!',
        timestamp: new Date(baseDate.getTime() - 3600000 * 1).toISOString(),
        toxicity: 0.01,
        isToxic: false
      }
    ],
    audioTranscript: "This is a sample audio transcript from the Instagram reel. I'm showing you how this product works and why I think it's amazing for everyday use. Let me know in the comments if you've tried it!",
    audioToxicity: 0.12,
    isAudioToxic: false,
  };
}

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
    const { reelUrl } = await req.json();
    
    if (!reelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing reelUrl parameter' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    // For now, we'll use mock data since we don't have actual Instagram API integration
    const analysisResults = generateMockInstagramAnalysis(reelUrl);
    
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
    console.error("Error analyzing Instagram reel:", error);
    
    return new Response(
      JSON.stringify({ error: 'Failed to analyze Instagram reel' }),
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
