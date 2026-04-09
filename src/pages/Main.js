import { Box, Menu, IconButton, Container, HStack, VStack, Text, Link, Image } from "@chakra-ui/react";
import { useRef, useState, useEffect, useCallback } from 'react';
import { BsList } from "react-icons/bs";
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import HomePage from './HomePage.js';
import ResumePage from './ResumePage.js';
import ExperiencePage from './ExperiencePage.js';
import ProjectsPage from './ProjectsPage.js';
import ContactPage from './ContactPage.js';

function Main() {
    // Create refs for each section at the top level
    const homeRef = useRef(null);
    const resumeRef = useRef(null);
    const experienceRef = useRef(null);
    const projectsRef = useRef(null);
    const contactRef = useRef(null);

    const sections = [
        { value: "home", label: "Home", ref: homeRef },
        { value: "resume", label: "Resume", ref: resumeRef },
        { value: "experience", label: "Experience", ref: experienceRef },
        { value: "projects", label: "Projects", ref: projectsRef },
        { value: "contact", label: "Contact", ref: contactRef }
    ];

    const [activeSection, setActiveSection] = useState("home");

    // Memoized scrollToSection that does NOT set activeSection
    const scrollToSection = useCallback((value) => {
        const section = sections.find(s => s.value === value);
        if (section && section.ref.current) {
            const nav = document.querySelector('[data-sticky-nav]');
            const navHeight = nav ? nav.offsetHeight : 80; // fallback to 80px
            const rect = section.ref.current.getBoundingClientRect();
            const scrollTop = window.pageYOffset + rect.top - navHeight - 8; // 8px extra spacing
            window.scrollTo({ top: scrollTop, behavior: 'smooth' });
        }
    }, [sections]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) {
                e.preventDefault();
                const idx = sections.findIndex(s => s.value === activeSection);
                if ((e.key === 'ArrowDown' || e.key === 'ArrowRight') && idx < sections.length - 1) {
                    scrollToSection(sections[idx + 1].value);
                } else if ((e.key === 'ArrowUp' || e.key === 'ArrowLeft') && idx > 0) {
                    scrollToSection(sections[idx - 1].value);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeSection, scrollToSection, sections]);

    // Update active section on scroll
    useEffect(() => {
        let scrollTimeout = null;
        const buffer = 12; // px buffer zone for hysteresis
        const handleScroll = () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                const nav = document.querySelector('[data-sticky-nav]');
                const navHeight = nav ? nav.offsetHeight : 80;
                const offset = navHeight + 8;
                const scrollY = window.scrollY;
                let activeIdx = 0;
                for (let i = 0; i < sections.length; i++) {
                    const ref = sections[i].ref.current;
                    const nextRef = i + 1 < sections.length ? sections[i + 1].ref.current : null;
                    if (ref) {
                        const sectionTop = ref.offsetTop - offset - buffer;
                        const nextSectionTop = nextRef ? nextRef.offsetTop - offset - buffer : Infinity;
                        if (scrollY >= sectionTop && scrollY < nextSectionTop) {
                            activeIdx = i;
                            break;
                        }
                    }
                }
                setActiveSection(sections[activeIdx].value);
            }, 30); // debounce for 30ms
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // initialize
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) clearTimeout(scrollTimeout);
        };
    }, [sections]);

    // Optimized scroll progress bar using Framer Motion's useMotionValue
    const scrollProgress = useMotionValue(0);
    useEffect(() => {
        let ticking = false;
        const updateScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            scrollProgress.set(progress);
            ticking = false;
        };
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateScroll);
                ticking = true;
            }
        };
        window.addEventListener('scroll', handleScroll);
        updateScroll(); // initialize
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollProgress]);

    return (
        <Box minH="100vh" bg="bg.canvas">
            {/* Sticky Navigation Bar */}
            <Box 
                position="sticky" 
                top="0" 
                zIndex="sticky"
                bg="black"
                opacity="1"
                borderBottomWidth="1px"
                borderBottomColor="rgba(255,255,255,0.1)"
                data-sticky-nav
            >
                <Container maxW="1400px" px="4">
                    {/* Mobile Navigation */}
                    <Box display={{ base: "block", md: "none" }} py="4">
                        <HStack justify="space-between" align="center">
                            <Box 
                                fontSize="xl" 
                                fontWeight="bold" 
                                color="white"
                                fontFamily="heading"
                            >
                                {sections.find(tab => tab.value === activeSection)?.label || "Portfolio"}
                            </Box>
                            <Menu.Root>
                                <Menu.Trigger asChild>
                                    <IconButton
                                        variant="ghost"
                                        size="lg"
                                        color="white"
                                        _hover={{ color: "#87CEEB", bg: "rgba(255,255,255,0.1)" }}
                                        aria-label="Navigation menu"
                                    >
                                        <BsList size="24" />
                                    </IconButton>
                                </Menu.Trigger>
                                <Menu.Content 
                                    bg="black" 
                                    borderColor="rgba(255,255,255,0.2)"
                                    boxShadow="xl"
                                >
                                    {sections.map((tab) => (
                                        <Menu.Item
                                            key={tab.value}
                                            onClick={() => { setActiveSection(tab.value); scrollToSection(tab.value); }}
                                            bg={activeSection === tab.value ? "rgba(135,206,235,0.2)" : "transparent"}
                                            color="white"
                                            _hover={{ 
                                                bg: "rgba(135,206,235,0.3)",
                                                color: "#87CEEB"
                                            }}
                                            fontFamily="heading"
                                            fontWeight="semibold"
                                            fontSize="lg"
                                            py="3"
                                        >
                                            {tab.label}
                                        </Menu.Item>
                                    ))}
                                </Menu.Content>
                            </Menu.Root>
                        </HStack>
                    </Box>
                    {/* Desktop Navigation */}
                    <HStack
                        as="nav"
                        spacing="0"
                        bg="black"
                        opacity="1"
                        borderRadius="0"
                        p="0"
                        mx="auto"
                        maxW="fit-content"
                        py="6"
                        display={{ base: "none", md: "flex" }}
                        position="relative"
                    >
                        {sections.map(tab => (
                            <motion.button
                                key={tab.value}
                                type="button"
                                style={{
                                    position: "relative",
                                    background: "none",
                                    border: "none",
                                    outline: "none",
                                    zIndex: 1,
                                    overflow: "visible",
                                    padding: 0,
                                    margin: 0,
                                    width: 'auto',
                                }}
                                onClick={() => { setActiveSection(tab.value); scrollToSection(tab.value); }}
                            >
                                <Box
                                    as="span"
                                    position="relative"
                                    fontFamily="heading"
                                    fontWeight="semibold"
                                    px="8"
                                    py="4"
                                    fontSize="lg"
                                    color={activeSection === tab.value ? "black" : "white"}
                                    transition="all 0.2s"
                                    _hover={{ color: "#87CEEB" }}
                                    display="inline-block"
                                >
                                    {activeSection === tab.value && (
                                        <motion.div
                                            layoutId="tabHighlight"
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                width: "100%",
                                                height: "100%",
                                                borderRadius: 999,
                                                background: "#1565C0",
                                                zIndex: -1,
                                            }}
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    )}
                                    {tab.label}
                                </Box>
                            </motion.button>
                        ))}
                    </HStack>
                </Container>
                {/* Scroll Progress Bar */}
                <motion.div
                    style={{
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        width: '100%',
                        height: '3px',
                        background: 'linear-gradient(90deg, #4A90E2 0%, #1565C0 100%)',
                        transformOrigin: '0% 50%',
                        scaleX: scrollProgress,
                        zIndex: 999,
                        pointerEvents: 'none',
                    }}
                />
            </Box>
            {/* All Sections Stacked Vertically */}
            <VStack align="stretch" spacing={0}>
                <Box ref={homeRef} id="home"><HomePage /></Box>
                <Box ref={resumeRef} id="resume"><ResumePage /></Box>
                <Box ref={experienceRef} id="experience"><ExperiencePage /></Box>
                <Box ref={projectsRef} id="projects"><ProjectsPage /></Box>
                <Box ref={contactRef} id="contact"><ContactPage /></Box>
            </VStack>
            {/* Made with section at the very bottom */}
            <HStack 
                spacing="6" 
                justify="center"
                flexWrap="wrap"
                pt="12"
                pb="16"
            >
                <Text 
                    fontSize={{ base: "lg", md: "xl" }}
                    color="fg.muted"
                    fontWeight="semibold"
                >
                    Made with
                </Text>
                <HStack spacing="8">
                    <Link 
                        href="https://www.chakra-ui.com" 
                        target="_blank"
                        _hover={{ transform: "scale(1.1)" }}
                        transition="transform 0.2s"
                    >
                        <Image 
                            src="./documents/chakra-ui-logo.png" 
                            boxSize={{ base: "12", md: "16" }}
                            alt="Chakra UI"
                            objectFit="contain"
                        />
                    </Link>
                </HStack>
            </HStack>
        </Box>
    );
}

export default Main;