import * as React from 'react';
import { useState } from 'react';
import { 
    Box,
    Card, 
    Container,
    Flex, 
    IconButton,
    Image, 
    HStack, 
    VStack,
    Text, 
    Heading,
    Badge,
    SimpleGrid,
    Collapsible
} from "@chakra-ui/react";
import { BsArrowDownUp } from "react-icons/bs";

const experienceData = [
    {
        company: "Amazon Web Services",
        role: "Software Development Engineer Intern",
        period: "May 2024 - August 2024",
        logo: "documents/awslogo.png",
        logoHeight: "20vh",
        content: "I worked as a software engineer intern at AWS where I was responsible for a project that updates user permissions for AWS's Identity and Access Management department. I used AWS Lambda for calling validation functions for the permission updates, and AWS API Gateway to call the lambda when a CLI call was made. Business logic was coded in Java/Kotlin, and AWS infrastructure was developed in TypeScript.",
        skills: ["TypeScript", "Java", "AWS Lambda", "AWS API Gateway", "AWS CLI", "Kotlin"],
        techLogos: ["documents/ts.png", "documents/java.svg", "documents/awslambda.png", "documents/apigw.png", "documents/cli.png", "documents/kotlin.png"]
    },
    {
        company: "UnitedHealth Group",
        role: "Software Development Engineer Intern", 
        period: "June 2023 - August 2023",
        logo: "documents/uhglogo.png",
        logoHeight: "3vh",
        content: "I worked as a software engineer intern at UnitedHealth Group where I worked on a project in an intern team for managing help desk ticket as they came in across the enterprise on a dashboard. The dashboard was a website, and my intern team used Vite as the React framework for the frontend, and MaterialUI components for building the website layout. Our team also used a proprietary database for grabbing help desk ticket data, and we used Django and PostgreSQL to manage this database. Finally, the application was deployed using Kubernetes.",
        skills: ["Vite", "React", "Python", "Django", "PostgreSQL", "Kubernetes"],
        techLogos: ["documents/vite.png", "documents/react.png", "documents/python.png", "documents/django.png", "documents/postgresql.png", "documents/kubernetes.png"]
    },
    {
        company: "Army Research Laboratory",
        role: "Research Intern",
        period: "June 2022 - August 2022", 
        logo: "documents/arllogo.png",
        logoHeight: "12vh",
        content: "This was a research role where a team of undergraduate interns of various STEM majors worked on an engineering problem under a mentor. The problem was to have a drone prototype survive a fall from terminal velocity and then collect data once it reaches the ground. The drone prototype was equipped with a Raspberry Pi, and we used Python and the various sensors on the prototype to locate and store data on an ArUco marker.",
        skills: ["Python", "Raspberry Pi", "Research"],
        techLogos: ["documents/python.png"]
    }
];

function ExperiencePage() {
    const [openIndexes, setOpenIndexes] = useState(experienceData.map((_, i) => i));
    const allIndexes = experienceData.map((_, i) => i);
    const collapseAll = openIndexes.length === allIndexes.length;
    const handleToggleAll = () => {
        if (collapseAll) {
            setOpenIndexes([]);
        } else {
            setOpenIndexes(allIndexes);
        }
    };
    const handleToggle = (idx) => {
        setOpenIndexes((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    };
    return (
        <Container maxW="1400px" py="12">
            <VStack spacing="12">
                {/* Header with collapse */}
                <VStack spacing="6" textAlign="center">
                    <Heading 
                        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                    >
                        Experience
                    </Heading>
                    <Text 
                        fontSize={{ base: "lg", md: "xl" }}
                        color="fg.muted"
                        maxW="2xl"
                    >
                        My timeline through various roles
                    </Text>
                    <HStack spacing="4" align="center">
                        <IconButton 
                            onClick={handleToggleAll}
                            variant="outline"
                            size="md"
                            aria-label={collapseAll ? "Collapse all" : "Expand all"}
                            borderRadius="full"
                        >
                            <BsArrowDownUp />
                        </IconButton>
                        <Text 
                            fontSize="md" 
                            color="fg.muted"
                            fontWeight="medium"
                        >
                            {collapseAll ? "Collapse all experiences" : "Expand all experiences"}
                        </Text>
                    </HStack>
                </VStack>
                {/* Experience items */}
                <VStack w="full" align="center">
                    <VStack w="full" align="center" spacing={10}>
                        {experienceData.map((exp, index) => (
                            <Collapsible.Root
                                key={exp.company}
                                open={openIndexes.includes(index)}
                                onOpenChange={() => handleToggle(index)}
                                w="full"
                                maxW="1200px"
                            >
                                <Card.Root
                                    w="full"
                                    maxW="1200px"
                                    boxShadow="xl"
                                    borderWidth="2px"
                                    borderColor="border.subtle"
                                    borderRadius="2xl"
                                    overflow="hidden"
                                    bg="bg.surface"
                                    transition="all 0.3s"
                                    _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
                                >
                                    <Collapsible.Trigger asChild>
                                        <Card.Header
                                            cursor="pointer"
                                            _hover={{ bg: "bg.subtle" }}
                                            transition="all 0.2s"
                                            p="10"
                                            bg="bg.canvas"
                                        >
                                            <Flex 
                                                direction={{ base: "column", md: "row" }}
                                                align="center"
                                                gap="8"
                                            >
                                                <Box 
                                                    flexShrink="0"
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    h="32"
                                                    w="32"
                                                    bg="bg.subtle"
                                                    borderRadius="2xl"
                                                    p="4"
                                                    boxShadow="lg"
                                                >
                                                    <Image 
                                                        src={exp.logo}
                                                        maxH="full"
                                                        maxW="full"
                                                        objectFit="contain"
                                                        alt={`${exp.company} logo`}
                                                    />
                                                </Box>
                                                <VStack 
                                                    flex="1"
                                                    align={{ base: "center", md: "start" }}
                                                    spacing="4"
                                                    textAlign={{ base: "center", md: "left" }}
                                                >
                                                    <Heading 
                                                        size={{ base: "xl", md: "2xl" }}
                                                        fontFamily="heading"
                                                        fontWeight="bold"
                                                        color="fg.default"
                                                        px="2"
                                                    >
                                                        {exp.company}
                                                    </Heading>
                                                    <Text 
                                                        fontSize={{ base: "lg", md: "xl" }}
                                                        fontWeight="semibold"
                                                        color="colorPalette.600"
                                                        px="2"
                                                    >
                                                        {exp.role}
                                                    </Text>
                                                    <Text 
                                                        fontSize={{ base: "md", md: "lg" }}
                                                        color="fg.muted"
                                                        fontWeight="medium"
                                                        px="2"
                                                    >
                                                        {exp.period}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        </Card.Header>
                                    </Collapsible.Trigger>
                                    <Collapsible.Content>
                                        <Card.Body pt="0" px="10" pb="10">
                                            <VStack spacing="10" align="stretch">
                                                <Box 
                                                    p="8"
                                                    bg="bg.subtle"
                                                    borderRadius="xl"
                                                    borderWidth="1px"
                                                    borderColor="gray.50"
                                                    boxShadow="sm"
                                                    mb="4"
                                                >
                                                    <Text 
                                                        fontSize={{ base: "md", md: "lg" }}
                                                        lineHeight="tall"
                                                        color="fg.default"
                                                        px="2"
                                                    >
                                                        {exp.content}
                                                    </Text>
                                                </Box>
                                                {exp.skills.length > 0 && (
                                                    <Box px="2">
                                                        <Heading 
                                                            size="xl" 
                                                            mb="4"
                                                            fontFamily="heading"
                                                            fontWeight="bold"
                                                            px="2"
                                                            textAlign="center"
                                                        >
                                                            Skills & Technologies
                                                        </Heading>
                                                        <Flex flexWrap="wrap" gap="3" px="2" justify="center">
                                                            {exp.skills.map((skill) => (
                                                                <Badge 
                                                                    key={skill}
                                                                    colorScheme="blue"
                                                                    variant="surface"
                                                                    px="4"
                                                                    py="2"
                                                                    borderRadius="full"
                                                                    fontSize="sm"
                                                                    fontWeight="semibold"
                                                                    boxShadow="sm"
                                                                >
                                                                    {skill}
                                                                </Badge>
                                                            ))}
                                                        </Flex>
                                                    </Box>
                                                )}
                                                {exp.techLogos.length > 0 && (
                                                    <Box px="2" pt="6" display="flex" justifyContent="center">
                                                        <SimpleGrid 
                                                            columns={exp.techLogos.length < 3 ? exp.techLogos.length : { base: 3, md: 4, lg: 6 }}
                                                            spacing="6"
                                                            justifyItems="center"
                                                            px="2"
                                                            style={{ margin: '0 auto' }}
                                                        >
                                                            {exp.techLogos.map((logo, index) => (
                                                                <Box 
                                                                    key={index}
                                                                    p="4"
                                                                    borderRadius="xl"
                                                                    bg="bg.canvas"
                                                                    display="flex"
                                                                    alignItems="center"
                                                                    justifyContent="center"
                                                                    h="20"
                                                                    w="20"
                                                                    boxShadow="md"
                                                                    border="2px solid"
                                                                    borderColor="border.subtle"
                                                                    transition="all 0.2s"
                                                                    _hover={{
                                                                        transform: "scale(1.05)",
                                                                        boxShadow: "lg"
                                                                    }}
                                                                >
                                                                    <Image 
                                                                        src={logo}
                                                                        maxH="12"
                                                                        maxW="12"
                                                                        objectFit="contain"
                                                                        alt="Technology logo"
                                                                    />
                                                                </Box>
                                                            ))}
                                                        </SimpleGrid>
                                                    </Box>
                                                )}
                                            </VStack>
                                        </Card.Body>
                                    </Collapsible.Content>
                                </Card.Root>
                            </Collapsible.Root>
                        ))}
                    </VStack>
                </VStack>
                {/* Education Section */}
                <VStack spacing="6" w="full" align="center" pt="8">
                    <Heading 
                        size={{ base: "xl", md: "2xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                        color="fg.default"
                        textAlign="center"
                    >
                        Education
                    </Heading>
                    <Box
                        w="full"
                        maxW="800px"
                        boxShadow="xl"
                        borderWidth="2px"
                        borderColor="border.subtle"
                        borderRadius="2xl"
                        bg="bg.surface"
                        p="8"
                        display="flex"
                        flexDirection={{ base: "column", md: "row" }}
                        alignItems="center"
                        gap="8"
                        transition="all 0.3s"
                        _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                    >
                        <Image 
                            src="documents/umd-logo.png" 
                            alt="UMD Logo" 
                            boxSize="24" 
                            objectFit="contain" 
                            mr={{ md: 8 }} 
                            mb={{ base: 4, md: 0 }}
                        />
                        <VStack align="start" spacing="2">
                            <Text fontSize="xl" fontWeight="bold" color="fg.default">
                                University of Maryland, College Park
                            </Text>
                            <Text fontSize="md" color="fg.muted">
                                Bachelor of Science in Computer Science
                            </Text>
                            <Text fontSize="md" color="fg.muted">
                                Minor in General Business
                            </Text>
                            <Text fontSize="md" color="fg.muted">
                                College Park Scholars: Business, Society, and Entrepreneurship Citation
                            </Text>
                            <Text fontSize="md" color="fg.muted">
                                Graduated: May 2025
                            </Text>
                        </VStack>
                    </Box>
                </VStack>
            </VStack>
        </Container>
    );
}

export default ExperiencePage;