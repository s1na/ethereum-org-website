import { Grid, Flex, Icon, Text, Spinner } from "@chakra-ui/react"
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { PiCheckThin } from "react-icons/pi"
import { WalletHome } from "../../WalletHome"
import type { TokenBalance } from "../../WalletHome/interfaces"

const ICON_SIZE = "4.5rem" as const

interface IProps {
  tokenBalances: Array<TokenBalance>
}
export const Success: React.FC<IProps> = ({ tokenBalances }) => {
  const [txPending, setTxPending] = useState(true)
  const [showWallet, setShowWallet] = useState(false)

  // Show spinner for defined number of milliseconds, switching "loading" state to false when complete
  const SPINNER_DURATION = 1000
  useEffect(() => {
    const timeout = setTimeout(() => {
      setTxPending(false)
    }, SPINNER_DURATION)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  const WALLET_FADE_IN_DELAY = 2000
  useEffect(() => {
    if (txPending) return
    const timeout = setTimeout(() => {
      setShowWallet(true)
    }, WALLET_FADE_IN_DELAY)
    return () => {
      clearTimeout(timeout)
    }
  }, [txPending])

  return (
    <AnimatePresence>
      {showWallet ? (
        <motion.div animate={{ opacity: [0, 1] }} key="wallet-home">
          <WalletHome tokenBalances={tokenBalances} />
        </motion.div>
      ) : (
        <Grid
          animate={{ opacity: [0, 1] }}
          exit={{ opacity: 0 }}
          key="success-fade-out"
          as={motion.div}
          placeItems="center"
          h="full"
          bg="background.highlight"
        >
          <Flex direction="column" alignItems="center" pt={8} gap={4}>
            {txPending ? (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Spinner w={ICON_SIZE} h={ICON_SIZE} />
              </motion.div>
            ) : (
              <motion.div
                key="checkmark"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.25 }}
              >
                <Icon
                  as={PiCheckThin}
                  w={ICON_SIZE}
                  h={ICON_SIZE}
                  transform="rotate(-10deg)"
                />
              </motion.div>
            )}
            <Text textAlign="center" px={{ base: 4, md: 8 }}>
              {txPending
                ? "Sending transaction"
                : "Transaction successfully sent"}
            </Text>
          </Flex>
        </Grid>
      )}
    </AnimatePresence>
  )
}