import Link from 'next/link';
import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";


export default function Circle() {
  return (
    <ChakraProvider>
    
      <HeadInfo />

      <MainComp />

      <Footer />

    </ChakraProvider>
  )


  function MainComp(){
    return(
      <>
      <p>b</p>
      <p>{RightMenu()}</p>
      </>
    )

    function RightMenu(){
      return(
        "c"
      )
    }
  }

  function Footer(){
    return(
      "a"
    )
  }

  function HeadInfo() {
    return(
      <Head>
        <title>VRCircleDaysDreams.c</title>
      </Head>
    )
  }
}
