import { Avatar, Badge, Box, Button, Center, Divider, Flex, HStack, Input, Spacer, Text, VStack, useDisclosure, useModal, useToast } from '@chakra-ui/react'
import { Navbar } from '@/components/Navbar'
import { useRouter } from 'next/router'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import NodeWallet from '@coral-xyz/anchor/dist/cjs/nodewallet'
import { useEffect, useState } from 'react'
import { fetchChatrooms } from '@/util/program/fetchChatRooms'
import { formatTime } from '@/util/helper'
import { fetchChatUserAccount } from '@/util/program/fetchChatUserAccount'
import { CreateUserModal } from '@/components/CreateUserModal'
import { createChatroom } from '@/util/program/createChatroom'
import { joinRoom } from '@/util/program/joinRoom'


export default function Home() {


  const router = useRouter()
  const wallet = useAnchorWallet()
  const toast = useToast()
  const [chatRooms, setChatrooms] = useState<any>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChatrooms(wallet as NodeWallet)
      if (data && !data.error) {
        console.log(data.accounts)
        setChatrooms(data.accounts)
      }
    }

    fetchData()
  }, [])


  const handleView = async (id: number) => {
    router.push(`/chat/${id}`)
  }

  const handleCreateRoom = async () => {
    const chatAccount = await fetchChatUserAccount(wallet as NodeWallet)
    if (chatAccount.error || chatAccount.accounts.length == 0) {
      onOpen()
      return
    }
    const id = Math.round(Number(Math.random() * 1000))

    const res = await createChatroom(wallet as NodeWallet, id, chatAccount.accounts[0].id)
    console.log(res)
    if (res.error) {
      toast({
        status: "error",
        title: res.error.toString()
      })
      return
    }

    toast({
      status: "success",
      title: "Created a new chat room!",
    })

    router.push(`/chat/${id}`)
  }
  return (
    <>

      <Navbar />
      <CreateUserModal isOpen={isOpen} onClose={onClose} />
      <Flex flexFlow="column" gap="1rem" bg="#101114" align="center" minH="92.5vh" h="100%" p="0 10rem">

        <Flex justify="center" align="center" marginTop="2rem">
          <Box>
            <Text fontSize="3.5rem" color="white" fontWeight={800}>Transforming Mineral Supply Chain with Blockchain Transparency and AI Integrity</Text>
            <Text fontSize="1.8rem" color="gray.400" fontWeight={500}>Basic prototype working demo on using blockchain to power the mineral supply chain for transparency</Text>

          </Box>
          <img className="heroImg" src="/hero.png" style={{width:"600px", height:"450px"}} />
        </Flex>

        <Button colorScheme="green" height="70px" width="30rem" fontSize="3rem" borderRadius="10px">Under Progress</Button>

        <Text fontSize="50px" color="white" fontWeight={800} marginTop="70px">Why On Blockchain?</Text>

        <Flex flexFlow="row" flexWrap="wrap" w="70vw" align="center" justify="center" gap="50px" mt="50px" mb="100px">

          <Flex flexFlow="column" align="start" justify="center" w="520px">
            <Flex w="100%" gap="1rem" align="center">
              <img src="/globe.png" style={{width:"70px", height:"70px"}} />
              <Text fontSize="30px" color="white" fontWeight={600}>Global Access</Text>
            </Flex>
            <Text fontSize="20px" color="#DCF2FF" fontWeight={400} maxWidth="80%">Blockchain offers worldwide accessibility for easy data verification and information sharing</Text>

          </Flex>



          <Flex flexFlow="column" align="start" justify="center" w="520px">
            <Flex w="100%" gap="1rem">
              <img src="/dec.png" />
              <Text fontSize="30px" color="white" fontWeight={600}>Decentralization</Text>
            </Flex>
            <Text fontSize="20px" color="#DCF2FF" fontWeight={400} maxWidth="80%">Blockchain eliminates the need for a single certifying body, reducing fraud risk.</Text>

          </Flex>



          <Flex flexFlow="column" align="start" justify="center" w="520px">

            <Flex w="100%" gap="1rem">
              <img src="/transparent.png" />
              <Text fontSize="30px" color="white" fontWeight={600}>Transparency</Text>
            </Flex>
            <Text fontSize="20px" color="#DCF2FF" fontWeight={400} maxWidth="80%">Enabling transparent verification and authenticity of actions and verification certificates (NFTS)</Text>

          </Flex>




          <Flex flexFlow="column" align="start" justify="center" w="520px">

            <Flex w="100%" gap="1rem">
              <img src="/audit.png" />
              <Text fontSize="30px" color="white" fontWeight={600}>Audit Trail</Text>
            </Flex>
            <Text fontSize="20px" color="#DCF2FF" fontWeight={400} maxWidth="80%">Blockchain creates a reliable audit trail for easy tracking and verification of entire supply chain</Text>

          </Flex>

        </Flex>
      </Flex>


    </>
  )
}
