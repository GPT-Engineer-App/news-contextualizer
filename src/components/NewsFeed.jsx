import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Spinner, Link, HStack, IconButton } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import axios from 'axios';
import { scoreArticlesByRelevance } from '../utils/relevanceScoring';
import { summarizeArticle, fetchContextualLinks } from '../utils/metaContextual';

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: 'YOUR_NEWS_API_KEY'
          }
        });
        const scoredArticles = scoreArticlesByRelevance(response.data.articles, feedback);
        setArticles(scoredArticles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [feedback]);

  const handleFeedback = (index, type) => {
    const newFeedback = { ...feedback };
    if (!newFeedback[index]) {
      newFeedback[index] = { up: 0, down: 0 };
    }
    if (type === 'up') {
      newFeedback[index].up += 1;
    } else {
      newFeedback[index].down += 1;
    }
    setFeedback(newFeedback);
    localStorage.setItem('feedback', JSON.stringify(newFeedback));
  };

  useEffect(() => {
    const storedFeedback = localStorage.getItem('feedback');
    if (storedFeedback) {
      setFeedback(JSON.parse(storedFeedback));
    }
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
          <HStack mt={2}>
            <IconButton
              icon={<FaThumbsUp />}
              onClick={() => handleFeedback(index, 'up')}
              aria-label="Thumbs Up"
            />
            <IconButton
              icon={<FaThumbsDown />}
              onClick={() => handleFeedback(index, 'down')}
              aria-label="Thumbs Down"
            />
            <Text>{feedback[index] ? feedback[index].up : 0} Upvotes</Text>
            <Text>{feedback[index] ? feedback[index].down : 0} Downvotes</Text>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

export default NewsFeed;