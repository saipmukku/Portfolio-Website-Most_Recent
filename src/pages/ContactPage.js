import { 
    Button, 
    ClipboardRoot, 
    Container,
    Image, 
    VStack,
    Text,
    Heading,
    Box,
    SimpleGrid
} from "@chakra-ui/react";
import { MdEmail } from "react-icons/md";
import { ClipboardButton } from '../components/ui/clipboard.jsx';
import { RiMailLine } from "react-icons/ri"
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
    // 3D parallax effect for profile image
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const maxTilt = 20;
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
        <Container maxW="1400px" py="16">
            <VStack spacing="16" align="center">
                {/* Profile Image */}
                <Box>
                    <motion.div
                        ref={ref}
                        style={{
                            width: '100%',
                            maxWidth: 450,
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
                            src="/documents/leo.png" 
                            borderRadius="full" 
                            boxSize={{ base: "300px", md: "400px", lg: "450px" }}
                            objectFit="cover"
                            boxShadow="2xl"
                            border="6px solid"
                            borderColor="border.subtle"
                            alt="Profile picture"
                        />
                    </motion.div>
                </Box>

                {/* Header */}
                <VStack spacing="6" textAlign="center">
                    <Heading 
                        size={{ base: "2xl", md: "3xl", lg: "4xl" }}
                        fontFamily="heading"
                        fontWeight="bold"
                    >
                        Let's Connect
                    </Heading>
                    <Text 
                        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                        color="fg.muted"
                        maxW="3xl"
                        lineHeight="tall"
                    >
                        Feel free to reach out for freelancing consultations, collaborations, or just to say hello!
                    </Text>
                </VStack>

                {/* Contact Methods */}
                <SimpleGrid 
                    columns={{ base: 1, sm: 2, lg: 4 }}
                    spacing="10"
                    gap={6}
                    w="full"
                    maxW="1200px"
                >
                    {/* Email */}
                    <ContactCard 
                        type="email"
                        icon={MdEmail}
                        label="Email"
                        value="inquiry@neethmukku.com"
                        emailAddress="inquiry@neethmukku.com"
                        primaryAction="mailto:inquiry@neethmukku.com"
                        primaryActionLabel="Open Mail"
                        showClipboard={true}
                    />

                    {/* LinkedIn */}
                    <ContactCard 
                        type="link"
                        image="documents/linkedinlogo.png"
                        label="LinkedIn"
                        value="Connect with me"
                        primaryAction="https://www.linkedin.com/in/saipmukku"
                        primaryActionLabel="View Profile"
                    />

                    {/* GitHub */}
                    <ContactCard 
                        type="link"
                        image="documents/githublogowhite.png"
                        label="GitHub"
                        value="Check out my code"
                        primaryAction="https://www.github.com/saipmukku"
                        primaryActionLabel="View Repositories"
                    />

                    {/* Instagram */}
                    <ContactCard 
                        type="social"
                        image="documents/instagramlogo.png"
                        label="Instagram"
                        value="@neeth1234"
                        // displayOnly removed to enable hover effect
                    />
                </SimpleGrid>
            </VStack>
        </Container>
    );
}

function ContactCard({ 
    type, 
    icon: Icon, 
    image, 
    label, 
    value, 
    emailAddress,
    primaryAction, 
    primaryActionLabel, 
    showClipboard = false,
    displayOnly = false 
}) {
    return (
        <VStack 
            spacing="6" 
            p="8"
            borderWidth="2px"
            borderColor="border.subtle"
            borderRadius="2xl"
            bg="bg.surface"
            boxShadow="xl"
            _hover={{ 
                transform: displayOnly ? "none" : "translateY(-4px)",
                boxShadow: displayOnly ? "xl" : "2xl"
            }}
            transition="all 0.3s"
            cursor={displayOnly ? "default" : "pointer"}
            onClick={!displayOnly && !showClipboard && primaryAction ? () => window.open(primaryAction, '_blank', 'noopener,noreferrer') : undefined}
            minH="300px"
            justify="space-between"
        >
            {/* Icon/Image */}
            <Box 
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxSize="20"
                bg="bg.subtle"
                borderRadius="2xl"
                p="4"
                boxShadow="lg"
            >
                {Icon ? (
                    <Icon size="48px" color="var(--chakra-colors-colorPalette-500)" />
                ) : (
                    <Image 
                        src={image}
                        boxSize="16"
                        objectFit="contain"
                        alt={`${label} icon`}
                    />
                )}
            </Box>

            {/* Content */}
            <VStack spacing="3" flex="1" justify="center">
                <Heading 
                    size="lg" 
                    fontFamily="heading"
                    textAlign="center"
                    fontWeight="bold"
                >
                    {label}
                </Heading>

                <Text 
                    fontSize="md"
                    color="fg.muted"
                    textAlign="center"
                    wordBreak="break-word"
                    fontWeight="medium"
                >
                    {value}
                </Text>
            </VStack>

            {/* Actions */}
            {!displayOnly && (
                <VStack spacing="3" w="full">
                    {showClipboard && (
                        <ClipboardRoot value={emailAddress || value} w="full">
                            <ClipboardButton 
                                size="md" 
                                variant="outline"
                                w="full"
                                borderRadius="lg"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Copy Email
                            </ClipboardButton>
                    </ClipboardRoot>
                    )}
                    
                    {primaryAction && (
                        <Button 
                            size="md" 
                            variant="solid"
                            colorScheme="blue"
                            w="full"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(primaryAction, '_blank', 'noopener,noreferrer');
                            }}
                            borderRadius="lg"
                        >
                            <RiMailLine style={{ marginRight: "8px" }} />
                            {primaryActionLabel || "Open"}
                    </Button>
                    )}
                </VStack>
            )}
        </VStack>
    );
}

export default ContactPage;