import { useState } from 'react';
import { Container, Text, VStack, Input, Button, Box } from "@chakra-ui/react";
import { analyzeQuery } from '../utils/nlp';

// Example of using react-icons
// import { FaRocket } from "react-icons/fa";
// <IconButton aria-label="Add" icon={<FaRocket />} size="lg" />; // IconButton would also have to be imported from chakra

const Index = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleAnalyze = () => {
    const result = analyzeQuery(query);
    setAnalysis(result);
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
      </VStack>
    </Container>
  );
};

export default Index;
