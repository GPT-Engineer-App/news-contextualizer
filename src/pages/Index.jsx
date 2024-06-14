import { useState } from 'react';
import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";
import { analyzeQuery, matchQueryToThemes } from '../utils/nlp';
import NewsFeed from '../components/NewsFeed';

const Index = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [matchedThemes, setMatchedThemes] = useState(null);

  const handleAnalyze = () => {
    const result = analyzeQuery(query);
    setAnalysis(result);
    const themes = matchQueryToThemes(query);
    setMatchedThemes(themes);
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Input 
          placeholder="Enter your query here..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <Button onClick={handleAnalyze}>Analyze Query</Button>
        {analysis && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg">Topics: {analysis.topics.join(', ')}</Text>
            <Text fontSize="lg">Themes: {analysis.themes.join(', ')}</Text>
          </Box>
        )}
        {matchedThemes && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
            <Text fontSize="lg">Matched Themes:</Text>
            <pre>{JSON.stringify(matchedThemes, null, 2)}</pre>
          </Box>
        )}
        <NewsFeed />
      </VStack>
    </Container>
  );
};

export default Index;