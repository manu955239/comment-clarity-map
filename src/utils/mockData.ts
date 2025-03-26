
// Mock data for YouTube comments
export const mockYouTubeComments = [
  {
    id: '1',
    author: 'User123',
    text: 'This video is amazing, I learned so much from it!',
    timestamp: '2023-10-15T14:30:00Z',
    toxicity: 0.02, // Low toxicity
    isToxic: false
  },
  {
    id: '2',
    author: 'AngryViewer',
    text: 'This is the worst content I have ever seen. Total garbage!',
    timestamp: '2023-10-15T15:20:00Z',
    toxicity: 0.75, // High toxicity
    isToxic: true
  },
  {
    id: '3',
    author: 'CalmObserver',
    text: 'I disagree with some points, but overall it was informative.',
    timestamp: '2023-10-16T09:15:00Z',
    toxicity: 0.15, // Low toxicity
    isToxic: false
  },
  {
    id: '4',
    author: 'ToxicTroll',
    text: 'You should just delete your channel, nobody wants to see this stupid content!',
    timestamp: '2023-10-16T11:45:00Z',
    toxicity: 0.89, // High toxicity
    isToxic: true
  },
  {
    id: '5',
    author: 'PositivePerson',
    text: 'Thank you for sharing your knowledge with us. Much appreciated!',
    timestamp: '2023-10-17T08:30:00Z',
    toxicity: 0.01, // Very low toxicity
    isToxic: false
  },
  {
    id: '6',
    author: 'CriticalThought',
    text: 'The production quality could be better, but the content is good.',
    timestamp: '2023-10-17T14:20:00Z',
    toxicity: 0.25, // Low-medium toxicity
    isToxic: false
  },
  {
    id: '7',
    author: 'FrustratedFan',
    text: 'Stop making videos if you can\'t even get basic facts right. Pathetic!',
    timestamp: '2023-10-18T10:10:00Z',
    toxicity: 0.82, // High toxicity
    isToxic: true
  },
  {
    id: '8',
    author: 'RegularViewer',
    text: 'I watch all your videos. Keep up the good work!',
    timestamp: '2023-10-19T16:05:00Z',
    toxicity: 0.05, // Very low toxicity
    isToxic: false
  },
  {
    id: '9',
    author: 'TechEnthusiast',
    text: 'The explanation at 5:23 was really clear. Thanks!',
    timestamp: '2023-10-20T12:45:00Z',
    toxicity: 0.03, // Very low toxicity
    isToxic: false
  },
  {
    id: '10',
    author: 'RageQuitter',
    text: 'What a complete waste of my time! You're an idiot who doesn\'t know anything!',
    timestamp: '2023-10-21T09:30:00Z',
    toxicity: 0.95, // Very high toxicity
    isToxic: true
  }
];

// Mock data for Instagram reels
export const mockInstagramReel = {
  id: 'reel123',
  creator: 'influencer_account',
  audioTranscript: 'Hey everyone! Today I'm going to show you my favorite products that I use every day. Some people might not like them, but I think they're amazing and worth trying out!',
  audioToxicity: 0.08, // Very low toxicity
  isAudioToxic: false,
  comments: [
    {
      id: 'ic1',
      author: 'fan_person',
      text: 'Love your content! Always so helpful!',
      timestamp: '2023-11-01T13:20:00Z',
      toxicity: 0.01, // Very low toxicity
      isToxic: false
    },
    {
      id: 'ic2',
      author: 'hater_account',
      text: 'You're just promoting this for money. So fake and dishonest!',
      timestamp: '2023-11-01T14:05:00Z',
      toxicity: 0.72, // High toxicity
      isToxic: true
    },
    {
      id: 'ic3',
      author: 'neutral_viewer',
      text: 'Have you tried the other version of this product? I heard it's better.',
      timestamp: '2023-11-01T15:30:00Z',
      toxicity: 0.05, // Very low toxicity
      isToxic: false
    },
    {
      id: 'ic4',
      author: 'angry_customer',
      text: 'I bought this because of you and it was terrible! You're the worst influencer ever!',
      timestamp: '2023-11-02T09:45:00Z',
      toxicity: 0.85, // High toxicity
      isToxic: true
    },
    {
      id: 'ic5',
      author: 'curious_follower',
      text: 'Does this work for sensitive skin too?',
      timestamp: '2023-11-02T11:15:00Z',
      toxicity: 0.02, // Very low toxicity
      isToxic: false
    },
    {
      id: 'ic6',
      author: 'trolling_user',
      text: 'Only idiots would buy this garbage. Get a real job instead of scamming people online!',
      timestamp: '2023-11-03T08:20:00Z',
      toxicity: 0.91, // Very high toxicity
      isToxic: true
    },
    {
      id: 'ic7',
      author: 'genuine_fan',
      text: 'Just ordered it! Can't wait to try it out. Thanks for the recommendation!',
      timestamp: '2023-11-03T16:40:00Z',
      toxicity: 0.01, // Very low toxicity
      isToxic: false
    }
  ]
};

// Function to simulate API call for YouTube analysis
export const analyzeYouTubeVideo = async (url: string) => {
  // Simulate loading time
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // For demo, return the mock data regardless of URL
  // In a real app, this would call an actual API with the URL
  return {
    videoId: 'demo123',
    title: 'Demo YouTube Video',
    channel: 'Demo Channel',
    comments: mockYouTubeComments,
    stats: {
      totalComments: mockYouTubeComments.length,
      toxicComments: mockYouTubeComments.filter(c => c.isToxic).length,
      nonToxicComments: mockYouTubeComments.filter(c => !c.isToxic).length,
      averageToxicity: mockYouTubeComments.reduce((acc, c) => acc + c.toxicity, 0) / mockYouTubeComments.length
    }
  };
};

// Function to simulate API call for Instagram analysis
export const analyzeInstagramReel = async (url: string) => {
  // Simulate loading time
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // For demo, return the mock data regardless of URL
  // In a real app, this would call an actual API with the URL
  const reel = mockInstagramReel;
  return {
    reelId: reel.id,
    creator: reel.creator,
    audioTranscript: reel.audioTranscript,
    audioToxicity: reel.audioToxicity,
    isAudioToxic: reel.isAudioToxic,
    comments: reel.comments,
    stats: {
      totalComments: reel.comments.length,
      toxicComments: reel.comments.filter(c => c.isToxic).length,
      nonToxicComments: reel.comments.filter(c => !c.isToxic).length,
      averageToxicity: reel.comments.reduce((acc, c) => acc + c.toxicity, 0) / reel.comments.length,
      audioVsCommentsDistance: Math.abs(
        reel.audioToxicity - 
        (reel.comments.reduce((acc, c) => acc + c.toxicity, 0) / reel.comments.length)
      )
    }
  };
};
