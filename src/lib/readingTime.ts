// Calculate reading time based on word count
// Average adult reading speed is ~200-250 words per minute
const WORDS_PER_MINUTE = 200;

export const calculateReadingTime = (content: string[]): number => {
  const totalWords = content.reduce((acc, paragraph) => {
    return acc + paragraph.split(/\s+/).filter(Boolean).length;
  }, 0);
  
  const minutes = Math.ceil(totalWords / WORDS_PER_MINUTE);
  return Math.max(1, minutes); // Minimum 1 minute
};

export const formatReadingTime = (minutes: number): string => {
  return `${minutes} min read`;
};