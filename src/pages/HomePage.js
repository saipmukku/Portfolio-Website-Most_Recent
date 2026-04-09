import { 
    Box,
    Container,
    Heading,
    Image,
    Separator,
    VStack,
    Stack
} from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import React from 'react';

const aboutText = "This website is an interactive portfolio, click through the tabs to view my resume, experience, and to contact me with inquiries.";

// Gradient about text with no animation
function GradientWaveText({ text }) {
  const gradientStyle = {
    background: 'linear-gradient(90deg, #87CEEB, #4F8EF7, #87CEEB)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    fontWeight: 'semibold',
    fontSize: '2.5rem',
    lineHeight: 1.3,
    textAlign: 'center',
    maxWidth: '100%',
  };
  return (
    <motion.span
      style={gradientStyle}
      initial={{ backgroundPosition: '200% center', opacity: 0 }}
      animate={{ backgroundPosition: ['200% center', '0% center'], opacity: 1 }}
      transition={{ backgroundPosition: { duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }, opacity: { duration: 0.8 } }}
    >
      {text}
    </motion.span>
  );
}

// Typewriter Heading for Hero Section
function TypewriterHeading({ text, onDone, speed = 24, ...props }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  React.useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) {
        clearInterval(interval);
        setDone(true);
        if (onDone) onDone();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24, duration: 0.4 }}
    >
      <Heading {...props}>{displayed}</Heading>
    </motion.div>
  );
}

// Gradient sheen text for 'Neeth'
function GradientSheenText({ children, fontSize }) {
  const gradientStyle = {
    background: 'linear-gradient(90deg, #4F8EF7, #1565C0, #87CEEB)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    display: 'inline-block',
    fontWeight: 'bold',
    fontSize: fontSize || 'inherit',
    lineHeight: 1.2,
    textAlign: 'center',
    maxWidth: '100%',
  };
  return (
    <motion.span
      style={gradientStyle}
      initial={{ backgroundPosition: '200% center', opacity: 0 }}
      animate={{ backgroundPosition: ['200% center', '0% center'], opacity: 1 }}
      transition={{ backgroundPosition: { duration: 2.2, repeat: Infinity, repeatType: 'loop', ease: 'linear' }, opacity: { duration: 0.8 } }}
    >
      {children}
    </motion.span>
  );
}

// Custom heading for 'but they call me Neeth' with gradient sheen on Neeth after typewriter
function TypewriterNeethHeading() {
  const [done, setDone] = useState(false);
  const fullText = 'but they call me Neeth';
  const staticPart = 'but they call me ';
  const neethPart = 'Neeth';
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 48);
    return () => clearInterval(interval);
  }, []);
  if (!done) {
    return (
      <Heading
        size={{ base: "2xl", md: "3xl", lg: "5xl" }}
        color="fg.muted"
        fontWeight="medium"
        fontFamily="heading"
        as="h2"
      >
        {displayed}
      </Heading>
    );
  }
  return (
    <Heading
      size={{ base: "2xl", md: "3xl", lg: "5xl" }}
      color="fg.muted"
      fontWeight="medium"
      fontFamily="heading"
      as="h2"
    >
      {staticPart}
      <GradientSheenText fontSize="inherit">{neethPart}</GradientSheenText>
    </Heading>
  );
}

function HomePage() {
    const [firstDone, setFirstDone] = useState(false);
    // 3D parallax effect using React state
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const maxTilt = 40;
    const ref = useRef(null);
    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const dx = x - centerX;
        const dy = y - centerY;
        const nx = dx / (rect.width / 2);
        const ny = dy / (rect.height / 2);
        setTilt({ x: -ny * maxTilt, y: nx * maxTilt });
    };
    const handleMouseLeave = () => setTilt({ x: 0, y: 0 });
    return (
        <Container maxW="1400px" p="0">
            {/* Hero Section */}
            <Stack
                direction={{ base: "column", lg: "row" }}
                minH="85vh"
                spacing="12"
                p="8"
                align="center"
                justify="center"
            >
                <Box 
                    flex="1" 
                    display="flex" 
                    justifyContent="center"
                    maxW={{ base: "400px", md: "500px", lg: "600px" }}
                >
                    <motion.div
                        ref={ref}
                        style={{
                            width: '100%',
                            maxWidth: 650,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Image 
                            src="/documents/portrait.jpeg" 
                            borderRadius="full" 
                            objectFit="cover"
                            aspectRatio="1"
                            boxShadow="2xl"
                            border="6px solid"
                            borderColor="border.subtle"
                            w="full"
                            maxW="650px"
                            h="auto"
                            draggable={false}
                        />
                    </motion.div>
                </Box>
                
                <VStack 
                    flex="1.2" 
                    spacing="8" 
                    textAlign="center"
                    justify="center"
                    fontFamily="body"
                    maxW="700px"
                >
                    <TypewriterHeading
                        key="saipraneeth"
                        text="My name is Saipraneeth,"
                        size={{ base: "6xl", md: "7xl", lg: "8xl" }}
                        fontFamily="heading"
                        lineHeight="shorter"
                        fontWeight="bold"
                        color="inherit"
                        speed={64} // fast
                        onDone={() => setFirstDone(true)}
                    />
                    {firstDone && (
                      <TypewriterNeethHeading />
                    )}
                    <Box py="6">
                        <motion.div
                            initial={{ y: 48 }}
                            animate={{ y: [48, 0, 48] }}
                            transition={{ duration: 1.4, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
                            style={{ display: 'inline-block' }}
                        >
                            <FaArrowDown style={{ fontSize: '3rem', color: '#4F8EF7' }} />
                        </motion.div>
                    </Box>
                </VStack>
            </Stack>

            <Separator my="12" />

            {/* About Section */}
            <Container maxW="1200px" py="16">
                <VStack spacing="10" textAlign="center">
                    <GradientWaveText text={aboutText} />
                </VStack>
            </Container>
        </Container>
    );
}

export default HomePage;