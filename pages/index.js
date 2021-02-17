import Link from 'next/link'
import Head from 'next/head'


export default function Circle() {
  return (
    <>
    {HeadInfo()}

    {MainComp()}

    {Footer()}

    </>
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
