import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Spinner, Link } from "@chakra-ui/react";
import axios from 'axios';
import { scoreArticlesByRelevance } from '../utils/relevanceScoring';
import { summarizeArticle, fetchContextualLinks } from '../utils/metaContextual';

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
        const scoredArticles = scoreArticlesByRelevance(response.data.articles);
        setArticles(scoredArticles);
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
          <Text mt={2}>{summarizeArticle(article.content)}</Text>
          <Text mt={2} fontSize="sm" color="gray.500">{article.source.name}</Text>
          <VStack mt={2} align="start">
            {fetchContextualLinks(article).map((link, linkIndex) => (
              <Link key={linkIndex} href={link.url} isExternal color="teal.500">
                {link.title}
              </Link>
            ))}
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

export default NewsFeed;