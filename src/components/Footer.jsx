import { Box, Text, Link, HStack, VStack, Icon } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={10} mt={10}>
      <VStack spacing={4}>
        <HStack spacing={8}>
          <Link href="https://www.facebook.com" isExternal>
            <Icon as={FaFacebook} boxSize={6} />
          </Link>
          <Link href="https://www.twitter.com" isExternal>
            <Icon as={FaTwitter} boxSize={6} />
          </Link>
          <Link href="https://www.instagram.com" isExternal>
            <Icon as={FaInstagram} boxSize={6} />
          </Link>
          <Link href="https://www.linkedin.com" isExternal>
            <Icon as={FaLinkedin} boxSize={6} />
          </Link>
        </HStack>
        <HStack spacing={8}>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Terms of Service</Link>
          <Link href="#">Contact Us</Link>
        </HStack>
        <Text>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</Text>
      </VStack>
    </Box>
  );
};

export default Footer;