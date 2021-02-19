//import
import Link from 'next/link';
import Head from 'next/head';
import { useState, ChangeEvent,useRef } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Container } from "@chakra-ui/react"


//サンプルデータ　後に削除
let dbSample = [
  {title: "ここだけ全員雛見沢症候群L5",about:"ひぐらしファンの集いです" ,
  dotw: "月",start:"20:00",end:"21:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:"やりますよ"},
      
  {title: "バー無言",about:"全員マイクを切らなくてはいけないバーです。ペンがあるのでみんなでお絵描きする事も" ,
  dotw: "火",start:"23:30",end:"28:00",howto:"",other:"",
  link:"",
  editableMessage:""},
      
  {title: "絶対に笑ってはいけないVRChat1時",about:"交代でコント役をやり、笑った人間の絵を皆で一枚書くイベントです" ,
  dotw: "土",start:"23:00",end:"00:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:"すいません今週コント役のxxxです、誰か代わってくれませんか、尻が痛くて動けません"},
      
  {title: "お前を殺す",about:"ﾃﾞﾃﾞﾝ！　ﾃﾞﾃﾞｯﾃﾞ！（ﾁｬｶﾎﾟｺｷﾗﾘﾝ）　ﾃﾞﾃﾞﾝ！　ﾃﾞﾃﾞｯﾃﾞ！！！" ,
  dotw: "土",start:"22:00",end:"24:00",howto:"主催にjoin",other:"",
  link:"",
  editableMessage:""},
      
  {title: "こしぶつけっこ",about:"すごーい！　なにこれなにこれー！　あははー！　動けー！！！！" ,
  dotw: "土",start:"04:30",end:"7:00",howto:"こしぶつけっこォ",other:"",
  link:"",
  editableMessage:"不知火舞がアウトでホムラ・ヒカリがセーフな理由→ hogehoge.fm"},
      
  {title: "衛宮切嗣のモノマネイベント",about:"皆で集まって衛宮切嗣のモノマネをやる回です" ,
  dotw: "日",start:"22:00",end:"24:00",howto:"アヴァロン…",other:"ふざけるな！　ふざけるな！　バカヤロー！！",
  link:"",
  editableMessage:"時計塔卒業できました！　聖杯作ったので、今なら本当に衛宮切嗣のモノマネができす！ｗ"},
      
  {title: "Toheartの来栖川先輩は魔女っ子可愛い",about:"Toheartの来栖川先輩は魔女っ子可愛い" ,
  dotw: "水",start:"22:00",end:"24:00",howto:"来栖川先輩にjoin",other:"Toheartの来栖川先輩は魔女っ子可愛い",
  link:"",
  editableMessage:"Toheartの来栖川先輩は魔女っ子可愛い"},
]


export default function Circle() {
  return (
    <ChakraProvider>

      <HeadInfo />

      <MainComp />

      <Footer />

    </ChakraProvider>
  )


  //メインコンポーネント
  function MainComp(){

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

    //メイン画面
    if(mode==="week"){
      return(
        <WeekMainComp />
      );
    }else{
      return(
        <>
        <p>{mode}
        <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button></p>
        </>
      )
    }

    //週の時のメインコンポーネントの中身
    function WeekMainComp(props){
      return(
        <>
        <div class="mainContainer">
          <p>{mode}</p>

          <Grid templateColumns="repeat(7, 1fr)" gap={3} mx="3em" mb="7">

          {/*weekdays*/}
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Mo")}>
            月
            <EventBoxInWeek eventInfo={dbSample[0]}/>
          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Tu")}>
            火
            <EventBoxInWeek eventInfo={dbSample[1]}/>

          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("We")}>
            水
            <EventBoxInWeek eventInfo={dbSample[6]}/>

          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Th")}>
            木
          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Fr")}>
            金
          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Sa")}>
            土
            <EventBoxInWeek eventInfo={dbSample[2]}/>
            <EventBoxInWeek eventInfo={dbSample[3]}/>
            <EventBoxInWeek eventInfo={dbSample[4]}/>

          </Box> 
          <Box w="100%" bg="white" border="1px" onClick={()=>modeChange("Su")}>
            日
            <EventBoxInWeek eventInfo={dbSample[5]}/>

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
          message：<br />
          {props.eventInfo.editableMessage}
        </Box>
      )
    }
    
    
    
  }




  function Footer(){
    return(
        <Grid templateColumns="repeat(1, 1fr)" gap={6} mx="3em" textAlign="right">
          <Box w="100%" h="7" bg="white" right={30} position="fixed" bottom={0}>V R C i r c l e D a y s D r e a m s . c </Box>
        </Grid>
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
