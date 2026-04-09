import * as React from 'react';
import { 
    Box,
    Card,
    Container,
    VStack,
    HStack,
    Text, 
    Heading,
    Image,
    Button
} from "@chakra-ui/react";

const projectsData = [
    {
        title: "Spaces",
        description: "A comprehensive habit tracking application that empowers users to build and maintain consistent routines across personalized spaces. Features intelligent progress tracking with visual feedback, daily check-ins, and adaptive rating systems that help users understand their improvement patterns and consistency levels.",
        image: "documents/spaces-logo.png",
        demoUrl: "#",
        technologies: ["Flutter", "Dart"],
        status: "In Development",
        imageSize: { maxH: { base: "90px", md: "120px" }, maxW: { base: "150px", md: "200px" } }
    },
    {
        title: "Personal Portfolio Website",
        description: "This very website! A modern, responsive portfolio built with React and Chakra UI, featuring a continuous scroll layout, keyboard navigation, and a high-quality component library. Designed and developed from scratch to showcase my projects, experience, and contact information in a seamless, interactive way.",
        image: "favicon.ico",
        demoUrl: "#",
        technologies: ["React", "Chakra UI", "JavaScript"],
        status: "Live",
        imageSize: { maxH: { base: "90px", md: "120px" }, maxW: { base: "90px", md: "120px" } }
    }
];

function ProjectsPage() {
    
    const handleDemoClick = (project) => {
        if (project.title === "Spaces") {
            // Open demo in new window/tab
            window.open('/#/spaces-demo', '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <Container maxW="1400px" py={{ base: "6", md: "12" }} px={{ base: "4", md: "6" }}>
            <VStack spacing={{ base: "12", md: "16" }}>
                <VStack spacing="6" textAlign="center">
                    <Heading 
                        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                    >
                        Projects
                    </Heading>
                    <Text 
                        fontSize={{ base: "lg", md: "xl" }}
                        color="fg.muted"
                        maxW="2xl"
                    >
                        Showcasing my personal and professional projects
                    </Text>
                </VStack>

                <Box 
                    display="flex" 
                    justifyContent="center" 
                    w="full"
                    flexWrap="wrap"
                    gap={{ base: 8, md: 12 }}
                    pb={{ base: "8", md: "0" }}
                >
                    {projectsData.map((project, index) => (
                        <ProjectCard 
                            key={project.title}
                            project={project}
                            onDemoClick={project.title === "Spaces" ? () => handleDemoClick(project) : undefined}
                        />
                    ))}
                </Box>
            </VStack>
        </Container>
    );
}

function ProjectCard({ project, onDemoClick }) {
    const { title, description, image, status, technologies, imageSize } = project;
    const defaultImageSize = { maxH: { base: "90px", md: "120px" }, maxW: { base: "90px", md: "120px" } };

    return (
        <Card.Root 
            maxW={{ base: "350px", md: "500px" }}
            w={{ base: "350px", md: "500px" }}
            boxShadow="xl"
            borderWidth="2px"
            borderColor="border.subtle"
            borderRadius="2xl"
            overflow="hidden"
            bg="bg.surface"
            transition="all 0.3s"
            _hover={{ 
                transform: "translateY(-4px)",
                boxShadow: "2xl"
            }}
            m={{ base: 2, md: 4 }}
        >
            <Card.Header p="0">
                <Box 
                    h={{ base: "200px", md: "240px" }}
                    w="full"
                    bg="gradient-to-br from-blue.400 to-purple.600"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    position="relative"
                    overflow="hidden"
                    pt="8"
                    px={{ base: 4, md: 8 }}
                >
                    <Box
                        p={{ base: 3, md: 4 }}
                        bg="transparent"
                        borderRadius="2xl"
                        boxShadow="md"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image 
                            src={image}
                            {...(imageSize || defaultImageSize)}
                            objectFit="contain"
                            alt={`${title} logo`}
                        />
                    </Box>
                    <Box
                        position="absolute"
                        top="4"
                        right="4"
                        bg="rgba(255,255,255,0.9)"
                        px="3"
                        py="1"
                        borderRadius="full"
                        fontSize="sm"
                        fontWeight="semibold"
                        color="gray.700"
                    >
                        {status}
                    </Box>
                </Box>
            </Card.Header>

            <Card.Body p={{ base: "4", md: "6" }}>
                <VStack align="start" spacing="4">
                    <Heading 
                        size={{ base: "lg", md: "xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                        color="fg.default"
                        textAlign="center"
                        w="full"
                    >
                        {title}
                    </Heading>
                    
                    <Text 
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="tall"
                        color="fg.muted"
                        noOfLines={{ base: 3, md: 4 }}
                    >
                        {description}
                    </Text>

                    <HStack spacing="2" flexWrap="wrap" justify="center" w="full" pt="4">
                        {technologies.map((tech) => (
                            <Box
                                key={tech}
                                px="3"
                                py="1"
                                bg="colorPalette.100"
                                color="colorPalette.700"
                                borderRadius="full"
                                fontSize={{ base: "xs", md: "sm" }}
                                fontWeight="medium"
                            >
                                {tech}
                            </Box>
                        ))}
                    </HStack>
                </VStack>
            </Card.Body>
            {onDemoClick && (
                <Card.Footer p={{ base: "4", md: "6" }} pt="0">
                    <Button 
                        onClick={onDemoClick}
                        colorScheme="blue"
                        size={{ base: "md", md: "lg" }}
                        w="full"
                        borderRadius="xl"
                        fontWeight="semibold"
                        _hover={{
                            transform: "scale(1.02)"
                        }}
                        transition="all 0.2s"
                    >
                        View Demo
                    </Button>
                </Card.Footer>
            )}
        </Card.Root>
    );
}

export default ProjectsPage; 