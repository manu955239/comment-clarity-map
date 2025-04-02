
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.33.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle CORS preflight requests
function handleCors(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    })
  }
}

serve(async (req) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get API key from environment variable
    const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY')
    if (!YOUTUBE_API_KEY) {
      throw new Error('YouTube API key not found')
    }

    const { videoUrl } = await req.json()
    
    if (!videoUrl) {
      return new Response(
        JSON.stringify({ error: 'Video URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Extract video ID from URL
    const videoId = extractYoutubeVideoId(videoUrl)
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: 'Invalid YouTube URL' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Analyzing YouTube video: ${videoId}`)

    // Get video details from YouTube API
    const videoDetails = await fetchVideoDetails(videoId, YOUTUBE_API_KEY)
    
    // Get video comments from YouTube API
    const comments = await fetchVideoComments(videoId, YOUTUBE_API_KEY)
    
    // Process comments for toxicity (simplified analysis)
    const processedComments = await analyzeComments(comments)
    
    // Calculate statistics
    const stats = calculateStats(processedComments)
    
    // Create response
    const response = {
      title: videoDetails.title,
      channel: videoDetails.channelTitle,
      stats,
      comments: processedComments
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error analyzing YouTube video:', error)
    
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to analyze YouTube video' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Helper function to extract YouTube video ID from URL
function extractYoutubeVideoId(url: string): string | null {
  const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regExp)
  return match ? match[1] : null
}

// Function to fetch video details from YouTube API
async function fetchVideoDetails(videoId: string, apiKey: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`
  )
  
  const data = await response.json()
  
  if (!data.items || data.items.length === 0) {
    throw new Error('Video not found')
  }
  
  return {
    title: data.items[0].snippet.title,
    channelTitle: data.items[0].snippet.channelTitle,
    description: data.items[0].snippet.description
  }
}

// Function to fetch video comments from YouTube API
async function fetchVideoComments(videoId: string, apiKey: string) {
  const response = await fetch(
    `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&key=${apiKey}&part=snippet&maxResults=100`
  )
  
  const data = await response.json()
  
  if (!data.items) {
    return []
  }
  
  return data.items.map((item: any) => ({
    id: item.id,
    author: item.snippet.topLevelComment.snippet.authorDisplayName,
    text: item.snippet.topLevelComment.snippet.textDisplay,
    timestamp: item.snippet.topLevelComment.snippet.publishedAt,
    likeCount: item.snippet.topLevelComment.snippet.likeCount
  }))
}

// Simple function to analyze comments for toxicity (in a real app, you'd use an AI service)
async function analyzeComments(comments: any[]) {
  // This is a simplified toxicity analysis using keyword matching
  // In a real application, you would use a proper sentiment analysis or toxicity detection service
  const toxicWords = [
    'hate', 'stupid', 'idiot', 'dumb', 'moron', 'terrible', 'awful', 
    'worst', 'garbage', 'trash', 'kill', 'die', 'useless', 'pathetic'
  ]
  
  return comments.map(comment => {
    const text = comment.text.toLowerCase()
    let toxicityScore = 0
    
    // Calculate toxicity based on toxic word matches
    for (const word of toxicWords) {
      if (text.includes(word)) {
        toxicityScore += 0.2 // Increase toxicity score for each toxic word found
      }
    }
    
    // Cap the toxicity score at 1.0
    toxicityScore = Math.min(toxicityScore, 1.0)
    
    // Determine if comment is toxic based on threshold
    const isToxic = toxicityScore >= 0.3
    
    return {
      ...comment,
      toxicity: toxicityScore,
      isToxic
    }
  })
}

// Calculate statistics from processed comments
function calculateStats(comments: any[]) {
  const totalComments = comments.length
  const toxicComments = comments.filter(c => c.isToxic).length
  const nonToxicComments = totalComments - toxicComments
  
  // Calculate average toxicity
  const totalToxicity = comments.reduce((sum, comment) => sum + comment.toxicity, 0)
  const averageToxicity = totalComments > 0 ? totalToxicity / totalComments : 0
  
  return {
    totalComments,
    toxicComments,
    nonToxicComments,
    averageToxicity
  }
}
