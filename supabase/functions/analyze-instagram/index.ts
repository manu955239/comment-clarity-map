
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

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
    const { reelUrl } = await req.json()
    
    if (!reelUrl) {
      return new Response(
        JSON.stringify({ error: 'Reel URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log(`Analyzing Instagram reel: ${reelUrl}`)

    // For demonstration purposes, we'll simulate the Instagram analysis
    // since direct Instagram API access requires authentication and app review
    const response = simulateInstagramAnalysis(reelUrl)

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
  } catch (error) {
    console.error('Error analyzing Instagram reel:', error)
    
    return new Response(
      JSON.stringify({ error: error.message || 'Failed to analyze Instagram reel' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

// Function to simulate Instagram analysis (since real Instagram API would require authentication)
function simulateInstagramAnalysis(reelUrl: string) {
  // Extract username from URL (simplified)
  const usernameMatch = reelUrl.match(/instagram\.com\/([^\/]+)/)
  const username = usernameMatch ? usernameMatch[1] : 'user'
  
  // Generate random comments
  const comments = generateSimulatedComments(20)
  
  // Process comments for toxicity
  const processedComments = analyzeComments(comments)
  
  // Calculate statistics
  const stats = calculateStats(processedComments)
  
  // Generate random audio transcript and toxicity
  const audioTranscript = "This is a simulated transcript of the Instagram reel audio content. It would contain the spoken words from the video."
  const audioToxicity = Math.random() * 0.5 // Random toxicity score between 0 and 0.5
  const isAudioToxic = audioToxicity > 0.3
  
  return {
    creator: username,
    stats,
    comments: processedComments,
    audioTranscript,
    audioToxicity,
    isAudioToxic
  }
}

// Generate simulated comments for testing
function generateSimulatedComments(count: number) {
  const comments = []
  const authors = ['user1', 'insta_fan', 'social_butterfly', 'commenter123', 'viewer456']
  const commentTexts = [
    "Love this content! Keep it up!",
    "This is amazing, thanks for sharing!",
    "I don't like this at all, terrible content.",
    "This is stupid and a waste of time.",
    "Great video, very informative!",
    "You're so talented!",
    "This makes no sense, who would watch this garbage?",
    "I've seen better from amateur creators.",
    "Absolutely brilliant!",
    "This content is harmful and should be taken down."
  ]
  
  for (let i = 0; i < count; i++) {
    const randomDate = new Date()
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30)) // Random date in the last 30 days
    
    comments.push({
      id: `comment-${i}`,
      author: authors[Math.floor(Math.random() * authors.length)],
      text: commentTexts[Math.floor(Math.random() * commentTexts.length)],
      timestamp: randomDate.toISOString(),
      likeCount: Math.floor(Math.random() * 100)
    })
  }
  
  return comments
}

// Simple function to analyze comments for toxicity
function analyzeComments(comments: any[]) {
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
