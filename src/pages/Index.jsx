import { useState } from 'react';
import { Container, Text, VStack, Input, Button, Box, HStack, Select, Flex, Heading, Link } from "@chakra-ui/react";
import { analyzeQuery, matchQueryToThemes } from '../utils/nlp';
import NewsFeed from '../components/NewsFeed';

const Index = () => {
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [matchedThemes, setMatchedThemes] = useState(null);
  const [sortOption, setSortOption] = useState('relevance');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');

  const handleAnalyze = () => {
    const result = analyzeQuery(query);
    setAnalysis(result);
    const themes = matchQueryToThemes(query);
    setMatchedThemes(themes);
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="full">
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Input 
          placeholder="Enter your query here..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <Button onClick={handleAnalyze}>Analyze Query</Button>
        {analysis && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" width="full">
            <Text fontSize="lg">Topics: {analysis.topics.join(', ')}</Text>
            <Text fontSize="lg">Themes: {analysis.themes.join(', ')}</Text>
          </Box>
        )}
        {matchedThemes && (
          <Box mt={4} p={4} borderWidth="1px" borderRadius="lg" width="full">
            <Text fontSize="lg">Matched Themes:</Text>
            <pre>{JSON.stringify(matchedThemes, null, 2)}</pre>
          </Box>
        )}
        <HStack spacing={4} width="full" justifyContent="space-between">
          <Select placeholder="Sort by" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="date">Date</option>
            <option value="popularity">Popularity</option>
          </Select>
          <Select placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All</option>
            <option value="technology">Technology</option>
            <option value="health">Health</option>
            <option value="business">Business</option>
            <option value="entertainment">Entertainment</option>
            <option value="sports">Sports</option>
            <option value="science">Science</option>
            <option value="world">World</option>
          </Select>
          <Select placeholder="Source" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="all">All</option>
            <option value="bbc-news">BBC News</option>
            <option value="cnn">CNN</option>
            <option value="fox-news">Fox News</option>
            <option value="the-new-york-times">The New York Times</option>
            <option value="the-guardian-uk">The Guardian</option>
          </Select>
        </HStack>
        <Flex width="full" mt={4}>
          <Box width="20%" p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Heading size="md" mb={4}>Categories</Heading>
            <VStack align="start">
              <Link href="#">Technology</Link>
              <Link href="#">Health</Link>
              <Link href="#">Business</Link>
              <Link href="#">Entertainment</Link>
              <Link href="#">Sports</Link>
              <Link href="#">Science</Link>
              <Link href="#">World</Link>
              <Link href="#">Politics</Link>
              <Link href="#">Travel</Link>
              <Link href="#">Lifestyle</Link>
            </VStack>
            <Heading size="md" mt={8} mb={4}>Trending Tags</Heading>
            <VStack align="start">
              <Link href="#">#AI</Link>
              <Link href="#">#COVID19</Link>
              <Link href="#">#Elections</Link>
              <Link href="#">#ClimateChange</Link>
              <Link href="#">#Startups</Link>
              <Link href="#">#Space</Link>
              <Link href="#">#Technology</Link>
              <Link href="#">#HealthTech</Link>
              <Link href="#">#FinTech</Link>
              <Link href="#">#GreenEnergy</Link>
            </VStack>
          </Box>
          <Box width="60%" p={4}>
            <NewsFeed sortOption={sortOption} category={category} source={source} />
          </Box>
          <Box width="20%" p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
            <Heading size="md" mb={4}>Further Reading</Heading>
            <VStack align="start">
              <Link href="#">Contact Us</Link>
              <Link href="#">About Us</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
            </VStack>
          </Box>
        </Flex>
      </VStack>
    </Container>
  );
};

export default Index;