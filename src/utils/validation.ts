
// Validate a YouTube URL
export const isValidYouTubeUrl = (url: string): boolean => {
  // Basic validation for common YouTube URL formats
  const ytRegExp = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return ytRegExp.test(url);
};

// Validate an Instagram URL
export const isValidInstagramUrl = (url: string): boolean => {
  // Basic validation for common Instagram reel URL formats
  const igRegExp = /^(https?:\/\/)?(www\.)?(instagram\.com)\/(reel|p)\/[^/]+\/?$/;
  return igRegExp.test(url);
};

// Format timestamp for display
export const formatTimestamp = (timestamp: string): string => {
  const date = new Date(timestamp);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Calculate toxicity color based on score
export const getToxicityColor = (toxicityScore: number): string => {
  // Returns tailwind class names based on toxicity level
  if (toxicityScore < 0.3) {
    return 'bg-nontoxic text-nontoxic-foreground';
  } else if (toxicityScore < 0.7) {
    return 'bg-amber-500 text-white';
  } else {
    return 'bg-toxic text-toxic-foreground';
  }
};

// Get text label for toxicity score
export const getToxicityLabel = (toxicityScore: number): string => {
  if (toxicityScore < 0.3) {
    return 'Non-Toxic';
  } else if (toxicityScore < 0.7) {
    return 'Moderately Toxic';
  } else {
    return 'Toxic';
  }
};
