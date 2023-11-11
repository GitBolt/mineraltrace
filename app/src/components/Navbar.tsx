import { Flex, LinkBox, Text } from "@chakra-ui/react"
import dynamic from "next/dynamic";
import Link from "next/link";
const Wallets = dynamic(() => import("../components/WalletButton"), { ssr: false });

export const Navbar = () => {
  return (
    <Flex zIndex="10" bg="gray.900" h="0.9rem" w="100%" justify="space-between" align="center" p="9">

      <Link href="/">
        <LinkBox fontSize="1.4rem" color="blue.200" fontWeight={600} borderRadius="1rem">MineralTrace</LinkBox>
      </Link>

      <Flex justify="center" align="center" gap="10px">
        <Text color="gray.200" fontSize="20px" fontWeight={600}>Project Built Under</Text>
        <img style={{filter:"brightness(1000%)"}} src="nyas.png" width="150px" />
      </Flex>
      {/* <Wallets /> */}
    </Flex>
  )
}