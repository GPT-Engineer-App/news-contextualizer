import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import axios from 'axios';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: 'YOUR_NEWS_API_KEY'
          }
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <VStack spacing={4} align="stretch">
      {articles.map((article, index) => (
        <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
          <Heading size="md">{article.title}</Heading>
          <Text mt={2}>{article.description}</Text>
          <Text mt={2} fontSize="sm" color="gray.500">{article.source.name}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default NewsFeed;