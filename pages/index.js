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

import { ColorModeScript } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
const colorConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
}
import { useColorMode,useColorModeValue } from "@chakra-ui/react";



//サンプルデータ　後に削除
let dbSample = [
  {title: "動作テスト：ここだけ全員雛見沢症候群L5",about:"ひぐらしファンの集いです" ,
  dotw: "月",start:"20:00",end:"21:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:"やりますよ",
  password: "l5pass"},
      
  {title: "バー無言",about:"全員マイクを切らなくてはいけないバーです。ペンがあるのでみんなでお絵描きする事も" ,
  dotw: "火",start:"23:30",end:"28:00",howto:"",other:"",
  link:"",
  editableMessage:"",
  password: "silentpass"},
      
  {title: "絶対に笑ってはいけないVRChat1時",about:"交代でコント役をやり、笑った人間の絵を皆で一枚書くイベントです" ,
  dotw: "土",start:"23:00",end:"00:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:"すいません今週コント役のxxxです、誰か代わってくれませんか、尻が痛くて動けません",
  password: "24pass"},
      
  {title: "お前を殺す",about:"ﾃﾞﾃﾞﾝ！　ﾃﾞﾃﾞｯﾃﾞ！（ﾁｬｶﾎﾟｺｷﾗﾘﾝ）　ﾃﾞﾃﾞﾝ！　ﾃﾞﾃﾞｯﾃﾞ！！！" ,
  dotw: "土",start:"22:00",end:"24:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:"",
  password: "killingpass"},
      
  {title: "こしぶつけっこ",about:"すごーい！　なにこれなにこれー！　あははー！　動けー！！！！" ,
  dotw: "土",start:"04:30",end:"7:00",howto:"こしぶつけっこォ",other:"",
  link:"",
  editableMessage:"不知火舞がアウトでホムラ・ヒカリがセーフな理由→ hogehoge.fm",
  password: "kosibutukekkopass"},
      
  {title: "衛宮切嗣のモノマネイベント",about:"皆で集まって衛宮切嗣のモノマネをやる回です" ,
  dotw: "日",start:"22:00",end:"24:00",howto:"アヴァロン…",other:"ふざけるな！　ふざけるな！　バカヤロー！！",
  link:"",
  editableMessage:"時計塔卒業できました！　聖杯作ったので、今なら本当に衛宮切嗣のモノマネができす！ｗ",
  password: "timealterpass"},
      
  {title: "Toheartの来栖川先輩は魔女っ子可愛い",about:"Toheartの来栖川先輩は魔女っ子可愛い" ,
  dotw: "水",start:"22:00",end:"24:00",howto:"来栖川先輩にjoin",other:"Toheartの来栖川先輩は魔女っ子可愛い",
  link:"",
  editableMessage:"Toheartの来栖川先輩は魔女っ子可愛い",
  password: "toheartpass"},
]


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

    //データ取得（テスト分）
    let [dbData,setDbData] = useState("");
    let query = { query: "query MyQuery { events { title dotw } }" }


    const fetchJSON = (q=query) => {
      fetch('https://vrcdaysdreams-hc.hasura.app/v1/graphql', {
        method: 'POST',
        body: JSON.stringify(q)
      }).then(response => {
        response.json().then(result => {
          setDbData(result.data.events);
          console.log(result.data)
        })
      })
    }



    //モード管理　増やすこともできる
    let [mode,setMode] = useState("week");
    const modeChange = (props) => {
      console.log("modochange")
      //！　propsを使って曜日指定できるようにする
      if(mode==="week"){
        setMode("daily")
      }
      if(mode==="daily"){
        setMode("week")
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
      }else{
        return(
          <>
          <p>{mode}
          <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
          <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          {/*<Button colorScheme="gray" onClick={fetchJSON} size="xs">hasuraTest</Button>*/}
          </p>
          </>
        )
      }
    }
    

    //週の時のメインコンポーネントの中身
    function WeekMainComp(props){
      return(
        <>
        <div class="mainContainer">
          <p>
            {mode}
            <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          </p>

          <Grid templateColumns="repeat(7, 1fr)" gap={3} mx="3em" mb="7">

          {/*weekdays　本当はここも共通化したらスマートになるが、あえて共通化しない方が可読性が高いと判断*/}
          <Box w="100%" border="1px" onClick={()=>modeChange("Mo")} _hover={{ bg: "gray.500" }} >
            月
            <EventBoxInWeek eventInfo={dbData[0]}/>
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("Tu")} _hover={{ bg: "gray.500" }} >
            火
            <EventBoxInWeek eventInfo={dbData[1]}/>

          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("We")} _hover={{ bg: "gray.500" }} >
            水
            <EventBoxInWeek eventInfo={dbData[6]}/>

          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("Th")} _hover={{ bg: "gray.500" }} >
            木
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("Fr")} _hover={{ bg: "gray.500" }} >
            金
          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("Sa")} _hover={{ bg: "gray.500" }} >
            土
            <EventBoxInWeek eventInfo={dbData[2]}/>
            <EventBoxInWeek eventInfo={dbData[3]}/>
            <EventBoxInWeek eventInfo={dbData[4]}/>

          </Box> 
          <Box w="100%" border="1px" onClick={()=>modeChange("Su")} _hover={{ bg: "gray.500" }} >
            日
            <EventBoxInWeek eventInfo={dbData[5]}/>

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
          event title：<br />
          {props.eventInfo.title}<br />
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
