//import
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useState, ChangeEvent,useRef } from "react";
import { sha256} from 'js-sha256';

import { ChakraProvider } from "@chakra-ui/react";

import { Spinner } from "@chakra-ui/react"
import { Button, ButtonGroup } from "@chakra-ui/react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { Divider } from "@chakra-ui/react"
import { Input } from "@chakra-ui/react"

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
    let [selectedDotw,setSelectedDotw] = useState("");
    const modeChange = (d) => {
      //week,deilyは相互切り替え
      if(mode==="week"){
        setMode("daily");
        console.log(d);
        setSelectedDotw(d);
        return;
      }
      if(mode==="daily"){
        setMode("week");
        return;
      }
      //設定画面時は週別画面へ戻る
      if(mode==="createEvent"||mode==="editMessage"||mode==="deleteEvent"){
        setMode("week");
        return;
      }
    }
    //editモードへのモードチェンジ。一度編集モードに入ってから追加画面と削除画面を切り替える
    const editModeStart = (d) =>{
      setMode("createEvent")
    }
    //追加・編集・削除の相互切り替え
    const editModeChange = (d) =>{
      if(mode==="createEvent"){
        setMode("editMessage");
        return;
      }
      if(mode==="editMessage"){
        setMode("deleteEvent");
        return;
      }
      if(mode==="deleteEvent"){
        setMode("createEvent");
        return;
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
      }else if(mode==="editMessage"){
        return(
          <EditMessageMainComp />
        )
      }else{
        return(
          <DeleteEventMainComp />
        )
      }
    }

    function CreateEventMainComp(props){
      //各変数セット
      const [title, setTitle] = React.useState("")
      const handleTitle = (event) => setTitle(event.target.value)
      const [about, setAbout] = React.useState("")
      const handleAbout = (event) => setAbout(event.target.value)
      const [dotw, setDotw] = React.useState("")
      const handleDotw = (event) => setDotw(event.target.value)
      const [start, setStart] = React.useState("")
      const handleStart = (event) => setStart(event.target.value)
      const [end, setEnd] = React.useState("")
      const handleEnd = (event) => setEnd(event.target.value)
      const [howToJoin, setHowToJoin] = React.useState("")
      const handleHowToJoin = (event) => setHowToJoin(event.target.value)
      const [other, setOther] = React.useState("")
      const handleOther = (event) => setOther(event.target.value)
      //const [link, setLink] = React.useState("")　そのうちの追加機能なのでコメントアウト
      //const handleLink = (event) => setLink(event.target.value)
      const [editableMessage, setEditableMessage] = React.useState("")
      const handleEditableMessage = (event) => setEditableMessage(event.target.value)
      const [password, setPassword] = React.useState("")
      const handlePassword = (event) => setPassword(event.target.value)

      //送信、sha256適用
      let [dbData,setDbData] = useState("");
      const submitEvent = () =>{
        if(title==="" || dotw==="" || start==="" || password ===""){
          console.log("brank");
          return;
        }
        let queryString = 
        'mutation {insert_events(objects: [{title: "' + title +
        '"about:"' + about +
        '"dotw:"' + dotw +
        '"start:"' + start +
        '"end:"' + end +
        '"howToJoin:"' + howToJoin + 
        '"other:"' + other +
        '"link:"temp"' +
        'editableMessage:"' + editableMessage +
        '"password:"' + sha256(password) + '"}]) {returning {id}}}';
        let query = { query: queryString };
        
        fetch('https://vrcdaysdreams-hc.hasura.app/v1/graphql', {
          method: 'POST',
          body: JSON.stringify(query),
          headers: {
            'x-hasura-admin-secret': "dd71b7b0ce49c75e1b17f0351616a244ef89fdf52d488c3b10d5de6560387b68"
          }
        }).then(response => {
          response.json().then(result => {
            setDbData(result.data.events);
            console.log(result.data)
          }).catch((error) => {
            console.error('Error:', error);
          });
        }).catch((error) => {
          console.error('Error:', error);
        });

        console.log(queryString);

        //全消去
        setTitle("");setAbout("");setDotw("");setStart("");setEnd("");
        setHowToJoin("");setOther("");setEditableMessage("");setPassword("");
      }

      return(
        <div class="mainContainer">

            {mode}
            <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
            <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
            <Button colorScheme="gray" onClick={editModeChange} size="xs">message</Button>

            <Grid templateColumns="repeat(1, 1fr)" gap={3} mx="15%" mb="7">
              <Input placeholder="イベントタイトル（必須）" size="sm" variant="flushed" value={title} onChange={handleTitle} />
              <Input placeholder="説明文" size="sm" variant="flushed" value={about} onChange={handleAbout} />
              <Input placeholder="曜日（月or火or水or木or金or土or日の一文字にて必須）" size="sm" variant="flushed" value={dotw} onChange={handleDotw} />
              <Input placeholder="開始時刻（00:00形式にて、必須）" size="sm" variant="flushed" value={start} onChange={handleStart} />
              <Input placeholder="終了時刻（00:00形式にて　省略可）" size="sm" variant="flushed" value={end} onChange={handleEnd} />
              <Input placeholder="参加方法" size="sm" variant="flushed" value={howToJoin} onChange={handleHowToJoin} />
              <Input placeholder="その他" size="sm" variant="flushed" value={other} onChange={handleOther} />
              <Input placeholder="伝言（編集可能な文章）の初期値" size="sm" variant="flushed" value={editableMessage} onChange={handleEditableMessage} />
              <Input placeholder="編集・削除パスワード（必須）" size="sm" variant="flushed" value={password} onChange={handlePassword} />
              <Button colorScheme="gray" size="xs" onClick={submitEvent}>create!</Button>
            </Grid>

        </div>
      )

    }

    function EditMessageMainComp(props){
      const [title, setTitle] = React.useState("");
      const handleTitle = (event) => setTitle(event.target.value);
      const [editableMessage, setEditableMessage] = React.useState("");
      const handleEditableMessage = (event) => setEditableMessage(event.target.value);
      const [password, setPassword] = React.useState("");
      const handlePassword = (event) => setPassword(event.target.value);

      //送信、sha256適用
      let [dbData,setDbData] = useState("");
      const submitMessage = () =>{
        let queryString = 
        'mutation update_events {update_events(' +
        'where: {password:{_eq:"' + sha256(password) + '"}},' +
        '_set: {editableMessage:"' + editableMessage + '"}) {affected_rows returning {id}}}'
        let query = { query: queryString };
        
        fetch('https://vrcdaysdreams-hc.hasura.app/v1/graphql', {
          method: 'POST',
          body: JSON.stringify(query),
          headers: {
            'x-hasura-admin-secret': "dd71b7b0ce49c75e1b17f0351616a244ef89fdf52d488c3b10d5de6560387b68"
          }
        }).then(response => {
          response.json().then(result => {
            setDbData(result.data.events);
            console.log(result.data)
          }).catch((error) => {
            console.error('Error:', error);
          });
        }).catch((error) => {
          console.error('Error:', error);
        });

        console.log(queryString);

        //全消去
        setTitle("");setEditableMessage("");setPassword("");
      }

      return(
        <div class="mainContainer">

          {mode}
          <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
          <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          <Button colorScheme="gray" onClick={editModeChange} size="xs">delete</Button>

          <Grid templateColumns="repeat(1, 1fr)" gap={3} mx="15%" mb="7">
            
            {/*今はないままでOK、人が増えすぎなければ困らない
            <Input placeholder="イベントタイトル" size="sm" variant="flushed" value={title} onChange={handleTitle} />*/}
            <Input placeholder="伝言" size="sm" variant="flushed" value={editableMessage} onChange={handleEditableMessage} />
            <Input placeholder="編集・削除パスワード" size="sm" variant="flushed" value={password} onChange={handlePassword} />
            <Button colorScheme="gray" size="xs" onClick={submitMessage}>message</Button>
            xyz
          </Grid>



        </div>


      )

    }

    function DeleteEventMainComp(props){
      const [title, setTitle] = React.useState("")
      const handleTitle = (event) => setTitle(event.target.value)
      const [password, setPassword] = React.useState("")
      const handlePassword = (event) => setPassword(event.target.value)

      //送信、sha256適用
      let [dbData,setDbData] = useState("");
      const submitDelete = () =>{
        let queryString = 
        'mutation {delete_events(where: {password: {_eq:"' + password + 
        '"}}) {affected_rows returning {id}}}'
        let query = { query: queryString };
        
        fetch('https://vrcdaysdreams-hc.hasura.app/v1/graphql', {
          method: 'POST',
          body: JSON.stringify(query),
          headers: {
            'x-hasura-admin-secret': "dd71b7b0ce49c75e1b17f0351616a244ef89fdf52d488c3b10d5de6560387b68"
          }
        }).then(response => {
          response.json().then(result => {
            setDbData(result.data.events);
            console.log(result.data)
          }).catch((error) => {
            console.error('Error:', error);
          });
        }).catch((error) => {
          console.error('Error:', error);
        });

        console.log(queryString);

        //全消去
        setPassword("");
      }


      return(
        <div class="mainContainer">

          {mode}
          <Button colorScheme="gray" onClick={modeChange} size="xs">Back</Button>
          <Button colorScheme="gray" onClick={toggleColorMode} size="xs">timePassing</Button>
          <Button colorScheme="gray" onClick={editModeChange} size="xs">create</Button>

          <Grid templateColumns="repeat(1, 1fr)" gap={3} mx="15%" mb="7">
            {/*予定変更の可能性あるも今は省略
            <Input placeholder="イベントタイトル" size="sm" variant="flushed" value={title} onChange={handleTitle} />*/}
            <Input placeholder="編集・削除パスワード" size="sm" variant="flushed" value={password} onChange={handlePassword} />
            <Button colorScheme="gray" size="xs" onClick={submitDelete}>delete...</Button>
          </Grid>
        </div>
      )

    }
    
    function DayMainComp(props){
      //各データ配列作成
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
      
      
        <Box w="100%" h="7" bg={bgc} position="fixed" bottom={0} textAlign="right">
        <p>V R C i r c l e D a y s D r e a m s . c　　　</p></Box>
      
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
