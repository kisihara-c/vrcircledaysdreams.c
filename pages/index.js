//import
import Link from 'next/link';
import Head from 'next/head';
import { ChakraProvider } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react"
import { useState, ChangeEvent,useRef } from "react";

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
    const modeChange = () => {if(mode==="week"){setMode("daily")}if(mode==="daily"){setMode("week")}}

    //メイン画面
    if(mode==="week"){
      return(
        <>
        <p>{mode}</p>
        <Button colorScheme="blue" onClick={modeChange}>Button</Button>
        </>
      );
    }else{
      return(
        <>
        <p>{mode}</p>
        <Button colorScheme="red" onClick={modeChange}>Button</Button>
        </>
      )
    }
    

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
