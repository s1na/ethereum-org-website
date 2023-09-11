import React from "react"
import { Box, type BoxProps, Flex, Text, Grid, Divider } from "@chakra-ui/react"
import { MdArrowBack } from "react-icons/md"
import Button from "../Button"
import type {
  LabelHref,
  SimulatorExplanation,
  SimulatorPathSummary,
  SimulatorNavProps,
} from "./interfaces"
import type { PathId } from "./types"
import { MoreInfoPopover } from "./MoreInfoPopover"
import { PathButton } from "./PathButton"
import ButtonLink from "../ButtonLink"
import Link from "../Link"
import { motion } from "framer-motion"
import { shareOnTwitter } from "./utils"
import { FaTwitter } from "react-icons/fa"

interface ExplanationProps extends SimulatorNavProps {
  explanation: SimulatorExplanation
  nextPathSummary: SimulatorPathSummary | null
  nextPathId: PathId | null
  finalCtaLink: LabelHref
  openPath?: (pathId: PathId) => void
  logFinalCta?: () => void
}
export const Explanation: React.FC<ExplanationProps> = ({
  nav,
  explanation,
  nextPathSummary,
  nextPathId,
  finalCtaLink,
  openPath,
  logFinalCta,
}) => {
  const { regressStepper, step, totalSteps } = nav
  const { header, description } = explanation

  const Description: React.FC<BoxProps> = (props) => (
    <Box {...props}>{description}</Box>
  )
  const isLastStep = nav.step + 1 === totalSteps

  const backButtonVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  return (
    <Flex direction="column" flex={1} zIndex={1}>
      {/* Back button */}
      <Button
        as={motion.button}
        variant="ghost"
        leftIcon={<MdArrowBack size="18px" />}
        sx={{ paddingInlineStart: 0 }}
        mt={{ base: -6, md: 0 }}
        mb={{ base: 2, md: 8 }}
        onClick={regressStepper}
        pointerEvents={step === 0 ? "none" : "all"}
        variants={backButtonVariants}
        initial="hidden"
        animate={step === 0 ? "hidden" : "visible"}
        transitionDuration="10ms"
        w="fit-content"
      >
        Back
      </Button>
      <Flex direction={{ base: "row", md: "column" }} gap={{ base: 3, md: 2 }}>
        {/* Step counter */}
        <Grid
          placeItems="center"
          bg="body.light"
          borderRadius="lg"
          p={2}
          w={9}
          h={8}
          fontSize="xs"
        >
          <Text as="span" lineHeight={1} fontWeight="bold" m={0}>
            {step + 1}/{totalSteps}
          </Text>
        </Grid>
        {/* Header and description */}
        <Box>
          <Text
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            lineHeight={{ base: 8, md: 10 }}
            fontWeight="bold"
            mb={{ base: 4, md: 8 }}
          >
            {header}
          </Text>
          {description && (
            <Box display={{ base: "block", md: "none" }} position="relative">
              <MoreInfoPopover isFirstStep={nav.step === 0}>
                <Description />
              </MoreInfoPopover>
            </Box>
          )}
        </Box>
      </Flex>
      {description && <Description display={{ base: "none", md: "block" }} />}
      {/* Last step navigation buttons */}
      {isLastStep && (
        <Flex
          direction="column"
          gap={4}
          maxW="300px"
          w="full"
          mx={{ base: "auto", md: 0 }}
          mt={4}
          zIndex={-1}
        >
          {nextPathSummary && openPath && nextPathId && (
            <PathButton
              pathSummary={nextPathSummary}
              handleClick={() => openPath(nextPathId)}
            />
          )}
          {/* TODO: Decide on button/link approach and remove unused */}
          {/* <ButtonLink
            variant={finalCtaLink.isPrimary ? "solid" : "outline"}
            href={finalCtaLink.href}
            onClick={logFinalCta}
          >
            {finalCtaLink.label}
          </ButtonLink> */}
          <Flex alignItems="center" gap={6}>
            <Divider borderColor="body.medium" />
            <Text textTransform="uppercase" m={0} color="body.medium">
              or
            </Text>
            <Divider borderColor="body.medium" />
          </Flex>
          <Link href={finalCtaLink.href} isExternal onClick={logFinalCta}>
            {finalCtaLink.label}
          </Link>
          <Button
            variant="outline-color"
            leftIcon={<FaTwitter />}
            onClick={shareOnTwitter}
            w={{ base: "full", lg: "auto" }}
            mt={{ base: 2, lg: 0 }}
          >
            Share on Twitter
          </Button>
        </Flex>
      )}
    </Flex>
  )
}