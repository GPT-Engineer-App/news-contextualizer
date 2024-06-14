/**
 * Summarizes an article content for quick insights.
 * @param {string} content - The content of the article to summarize.
 * @returns {string} The summarized content.
 */
export function summarizeArticle(content) {
  if (!content) return "No content available for summarization.";
  
  // Simple summarization logic (for demonstration purposes)
  const sentences = content.split('. ');
  const summary = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '...' : '');
  
  return summary;
}

/**
 * Fetches contextual links related to an article.
 * @param {Object} article - The article object to fetch contextual links for.
 * @returns {Array} An array of contextual links.
 */
export function fetchContextualLinks(article) {
  // Example contextual links (for demonstration purposes)
  return [
    { title: "Related Article 1", url: "https://example.com/related-article-1" },
    { title: "Historical Data", url: "https://example.com/historical-data" },
    { title: "Background Information", url: "https://example.com/background-information" }
  ];
}