import * as React from 'react';
import { Box } from "@chakra-ui/react";

function SpacesDemo() {
    return (
        <Box 
            h="100vh" 
            w="100vw" 
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="bg.canvas"
        >
            <Box
                h={{ base: "85vh", md: "100vh" }}
                w={{ base: "95vw", md: "100vw" }}
                maxW={{ base: "400px", md: "none" }}
                borderRadius={{ base: "xl", md: "0" }}
                overflow="hidden"
                boxShadow={{ base: "xl", md: "none" }}
                bg="bg.canvas"
            >
                <iframe
                    src="/flutter-build/index.html"
                    width="100%"
                    height="100%"
                    style={{
                        border: 'none',
                        display: 'block',
                        overflow: 'hidden'
                    }}
                    title="Spaces Flutter Demo"
                    scrolling="no"
                    onError={(e) => {
                        console.error('Flutter iframe failed to load:', e);
                    }}
                />
            </Box>
        </Box>
    );
}

export default SpacesDemo; 