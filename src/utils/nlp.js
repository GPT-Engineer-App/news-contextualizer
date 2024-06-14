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

/**
 * Hierarchical structure for themes.
 */
const themeHierarchy = {
  "Technology": {
    "Software": ["Programming", "Web Development", "AI"],
    "Hardware": ["Computers", "Gadgets"]
  },
  "Health": {
    "Fitness": ["Exercise", "Nutrition"],
    "Medicine": ["Diseases", "Treatments"]
  }
};

/**
 * Matches user query with the most relevant themes and abstraction levels.
 * @param {string} query - The user query to analyze.
 * @returns {Object} An object containing the matched themes and their abstraction levels.
 */
export function matchQueryToThemes(query) {
  const { themes } = analyzeQuery(query);
  const matchedThemes = {};

  themes.forEach(theme => {
    for (const [mainTheme, subThemes] of Object.entries(themeHierarchy)) {
      if (theme === mainTheme) {
        matchedThemes[mainTheme] = subThemes;
      } else {
        for (const [subTheme, subSubThemes] of Object.entries(subThemes)) {
          if (theme === subTheme) {
            matchedThemes[mainTheme] = { [subTheme]: subSubThemes };
          } else if (subSubThemes.includes(theme)) {
            matchedThemes[mainTheme] = { [subTheme]: [theme] };
          }
        }
      }
    }
  });

  return matchedThemes;
}