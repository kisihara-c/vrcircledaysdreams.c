//import
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useState, ChangeEvent,useRef } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"

import { ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const colorConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
import { useColorMode,useColorModeValue } from "@chakra-ui/react";



export default function Circle() {
  return (
    <ChakraProvider>

      <HeadInfo />

      <ColorModeScript initialColorMode={colorConfig.initialColorMode} />

      <MainComp />

      <Footer />

    </ChakraProvider>
  )


  //メインコンポーネント
  function MainComp(){

    //データ取得（全部）
    let [dbData,setDbData] = useState("");
    let query = 
      { query: 
        "query MyQuery { events(order_by: {start: asc}) { title about dotw start end howToJoin other link editableMessage password } }" }

    const fetchJSON = (q=query) => {
      fetch('https://vrcdaysdreams-hc.hasura.app/v1/graphql', {
        method: 'POST',
        body: JSON.stringify(q),
        headers: {
          'x-hasura-admin-secret': "dd71b7b0ce49c75e1b17f0351616a244ef89fdf52d488c3b10d5de6560387b68"
        }
      }).then(response => {
        response.json().then(result => {
          setDbData(result.data.events);
          console.log(result.data)
        })
      })
    }

    //モード管理　増やすこともできる
    let [mode,setMode] = useState("week");
    let [selectedDotw,setSelectedDotw] = useState("week");
    const modeChange = (d) => {
      if(mode==="week"){
        setMode("daily");
        console.log(d);
        setSelectedDotw(d);
      }
      if(mode==="daily"){
        setMode("week");
      }
      if(mode==="createEvent"||"deleteEvent"){
        setMode("week");
      }
    }
    //editモードへのモードチェンジ。一度編集モードに入ってから追加画面と削除画面を切り替える
    const editModeStart = (d) =>{
      setMode("createEvent")
    }
    const editModeChange = (d) =>{
      setMode("createEvent")
      if(mode==="createEvent"){
        setMode("deleteEvent");
      }
      if(mode==="deleteEvent"){
        setMode("createEvent");
      }
    }

    //カラーモード
    const { colorMode, toggleColorMode } = useColorMode()


    //メイン画面
    //データがない時はスピナー、その後各モードの判定・表示
    if(!dbData){
      fetchJSON();
      return(<Spinner color="gray.500" />);
    }else{
      //各曜日の配列作成

      //各モード判定・表示
      if(mode==="week"){
        return(
          <WeekMainComp />
        );
      }else if(mode==="daily"){
        return(
          <DayMainComp />
        )
      }else if(mode==="createEvent"){
        return(
          <CreateEventMainComp />
        )
      }else{
        return(
          <DeleteEventMainComp />
        )
      }
    }

    function CreateEventMainComp(props){
      return(
        <div class="mainContainer">

            {mode}
            <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
            <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
            <Button colorScheme="gray" onClick={editModeChange} size="xs">delete</Button>

        </div>
      )

    }

    function DeleteEventMainComp(props){
      return(
        <div class="mainContainer">

          {mode}
          <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
          <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          <Button colorScheme="gray" onClick={editModeChange} size="xs">create</Button>
        </div>
      )

    }
    
    function DayMainComp(props){
      let moData = dbData.filter(function(value,index,array){return value.dotw==="月"})
      let tuData = dbData.filter(function(value,index,array){return value.dotw==="火"})
      let weData = dbData.filter(function(value,index,array){return value.dotw==="水"})
      let thData = dbData.filter(function(value,index,array){return value.dotw==="木"})
      let frData = dbData.filter(function(value,index,array){return value.dotw==="金"})
      let saData = dbData.filter(function(value,index,array){return value.dotw==="土"})
      let suData = dbData.filter(function(value,index,array){return value.dotw==="日"})
      let moBoxes = [];
      for(let d of moData){moBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let tuBoxes = [];
      for(let d of tuData){tuBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let weBoxes = [];
      for(let d of weData){weBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let thBoxes = [];
      for(let d of thData){thBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let frBoxes = [];
      for(let d of frData){frBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let saBoxes = [];
      for(let d of saData){saBoxes.push(<EventBoxInDay eventInfo={d}/>)}
      let suBoxes = [];
      for(let d of suData){suBoxes.push(<EventBoxInDay eventInfo={d}/>)}

      const callingTable = (d)=>{
        switch(d){
          case "月":
            return moBoxes;
          case "火":
            return tuBoxes;
          case "水":
            return weBoxes;
          case "木":
            return thBoxes;
          case "土":
            return saBoxes;
          case "日":
            return suBoxes;
        }
      }

      return(
        < >
        <div class="mainContainer">
          <p>
            {mode}
            <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
            <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          </p>
          <Grid templateColumns="repeat(1, 1fr)" gap={3} mx="12%" mb="7">
            <Box w="100%" border="1px">
              {selectedDotw}
              {callingTable(selectedDotw)}
          </Box> 
          </Grid>
        </div>
        </>
        )
    }

    //週の時のメインコンポーネントの中身　配列にした後forof文を使いJSXのままループ
    function WeekMainComp(props){
      let moData = dbData.filter(function(value,index,array){return value.dotw==="月"})
      let tuData = dbData.filter(function(value,index,array){return value.dotw==="火"})
      let weData = dbData.filter(function(value,index,array){return value.dotw==="水"})
      let thData = dbData.filter(function(value,index,array){return value.dotw==="木"})
      let frData = dbData.filter(function(value,index,array){return value.dotw==="金"})
      let saData = dbData.filter(function(value,index,array){return value.dotw==="土"})
      let suData = dbData.filter(function(value,index,array){return value.dotw==="日"})
      let moBoxes = [];
      for(let d of moData){moBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let tuBoxes = [];
      for(let d of tuData){tuBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let weBoxes = [];
      for(let d of weData){weBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let thBoxes = [];
      for(let d of thData){thBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let frBoxes = [];
      for(let d of frData){frBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let saBoxes = [];
      for(let d of saData){saBoxes.push(<EventBoxInWeek eventInfo={d}/>)}
      let suBoxes = [];
      for(let d of suData){suBoxes.push(<EventBoxInWeek eventInfo={d}/>)}


      return(
        <>
        <div class="mainContainer">
          <p>
            {mode}
            <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
            <Button colorScheme="gray" onClick={editModeStart} size="xs">edit</Button>
          </p>

          <Grid templateColumns="repeat(7, 1fr)" gap={3} mx="3em" mb="7">

          {/*weekdays　共通化しない方が可読性が高いと判断*/}
          <Box w="100%" border="1px" onClick={()=>modeChange("月")} _hover={{ bg: "gray.500" }} >
            月
            {moBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("火")} _hover={{ bg: "gray.500" }} >
            火
            {tuBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("水")} _hover={{ bg: "gray.500" }} >
            水
            {weBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("木")} _hover={{ bg: "gray.500" }} >
            木
            {thBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("金")} _hover={{ bg: "gray.500" }} >
            金
            {frBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("土")} _hover={{ bg: "gray.500" }} >
            土
            {saBoxes}
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("日")} _hover={{ bg: "gray.500" }} >
            日
            {suBoxes}
          </Box> 

        </Grid>
      </div>
      </>

      )
    }

    //各曜日の中の箱
    function EventBoxInWeek(props){
      return(
        <Box my="1em">
          <Divider marginBottom="0.5em"/>

          {props.eventInfo.start} ～ {props.eventInfo.end}<br />
          <Text fontSize="0.9em">{props.eventInfo.title}</Text>
          <Text fontSize="0.6em" textAlign="right">{props.eventInfo.about}</Text>
          <Text fontSize="0.8em">伝言：<br />{props.eventInfo.editableMessage}</Text>

        </Box>
      )
    }

    function EventBoxInDay(props){
      return(
        <Box my="1em" mx="0.5em">
          <Divider marginBottom="0.5em"/>

          {props.eventInfo.start} ～ {props.eventInfo.end}<br />
          <Text fontSize="1.2em">{props.eventInfo.title}</Text>
          <Text fontSize="0.9em" textAlign="right">{props.eventInfo.about}</Text>
          <Text fontSize="0.7em">参加方法：{props.eventInfo.howToJoin}</Text>
          <Text fontSize="0.7em" marginBottom="0.5em">その他：{props.eventInfo.other}</Text>
          <Text fontSize="1.0em">伝言：<br />{props.eventInfo.editableMessage}</Text>
        </Box>
      )
    }

    
    
    
  }


  function Footer(){
    const bgc = useColorModeValue("white", "black")
    return(
        <Box w="100%" h="7" bg={bgc} position="fixed" bottom={0} textAlign="right">V R C i r c l e D a y s D r e a m s . c　　　</Box>

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
