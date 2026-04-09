import { 
    Box, 
    Container,
    Image, 
    VStack,
    Text, 
    Heading
} from "@chakra-ui/react";

function ResumePage() {
    const handleResumeClick = () => {
        window.open('/documents/Resume.pdf', '_blank', 'noopener,noreferrer');
    };

    return (
        <Container maxW="1400px" py="8">
            <VStack spacing="8" align="center">
                {/* Header */}
                <VStack spacing="4" textAlign="center">
                    <Heading 
                        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                    >
                        Resume
                    </Heading>
                    <Text 
                        fontSize={{ base: "lg", md: "xl" }}
                        color="fg.muted"
                        maxW="2xl"
                    >
                        Click on the resume to open the full PDF in a new tab
                    </Text>
                </VStack>

                <VStack spacing="16" align="center" w="full">
                    <Box 
                        cursor="pointer"
                        onClick={handleResumeClick}
                        transition="all 0.3s"
                        _hover={{ 
                            transform: "scale(1.02)",
                            boxShadow: "2xl"
                        }}
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="xl"
                        border="3px solid"
                        borderColor="border.subtle"
                        w="full"
                        maxW="900px"
                        display="flex"
                        justifyContent="center"
                    >
                        <Image 
                            src="/documents/resume.jpeg" 
                            alt="Resume preview"
                            w="full"
                            h="auto"
                            objectFit="contain"
                        />
                    </Box>
                </VStack>
            </VStack>
        </Container>
    );
}

export default ResumePage;