import nlp from 'compromise';

/**
 * Analyzes a user query to extract key themes and topics.
 * @param {string} query - The user query to analyze.
 * @returns {Object} An object containing the extracted themes and topics.
 */
export function analyzeQuery(query) {
  const doc = nlp(query);
  const topics = doc.topics().out('array');
  const themes = doc.nouns().out('array');
  
  return {
    topics,
    themes
  };
}