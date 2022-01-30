import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// import App from '../components/App'
import { useEffect, useState } from 'react'
import SAM from '/components/rotations/SAM'
import PLD from '/components/rotations/PLD'

let count = 0;
const Home = () => {
  const [logList, setLogList] = useState([])
  const [rotation, setRotation] = useState([])


  const resetRotation = async () => {
    let rotationCopy = JSON.parse(JSON.stringify(rotation))
    rotationCopy.map(item => {
      delete item.fail
      delete item.success
    })
    count = 0
    setLogList([])
    setRotation([...rotationCopy])
    document.removeEventListener("onLogLine", e => { })
  }

  const myLoader = ({ url, src, width, quality }) => {
    // return `${src}?w=${width}&q=${quality || 75}`
    // return `${src}?w=${width}`
    return `${src}`
  }

  useEffect(() => {
    document.addEventListener("onOverlayStateUpdate", (e) => {
      // if (!e.detail.isLocked) {
      //   displayResizeHandle();
      // } else {
      //   hideResizeHandle();
      // }
    });

    // addOverlayListener("CombatData", (e) => update(e));
    // startOverlayEvents();
    const listener = async e => {
      let detail = JSON.parse(e.detail);

      console.log()
      if (detail[0] === '21' && detail[5] !== "attack" && detail[3] === "Jorge Perez") {
        console.log(rotation)
        // const data = await ( await fetch(`https://xivapi.com/Action/${parseInt(detail[4], 16)}?columns=Icon,Name,ActionCategoryTargetID`, {
        //   mode: "cors"
        // })).json()
        const skill = parseInt(detail[4], 16)
        const data = await (await fetch(`https://xivapi.com/Action/${skill}?columns=Icon,Name&private_key=01b8717a652b4c4cb40e9dd7fac3efe644552ce827ea4c94b3b68db663d620e0`, {
          mode: "cors"
        })).json()

        // logList.push(data)
        // console.log(logList)
        // return;
        let rotationCopy = rotation
        if (data.Name === rotationCopy[count].Name)
          rotationCopy[count].success = true;
        else
          rotationCopy[count].fail = true;
        count = count + 1
        // setLogList([...logList, data])

        setRotation([...rotationCopy])
        // setLogList([...logList])

        console.log(logList)
      } else if (detail[0] === '00' && detail[4].indexOf("You change to") !== -1) {
        console.log(detail)

        switch (detail[4]) {
          case 'You change to paladin.':
            setLogList([])
            setRotation(PLD)
            break;
          case 'You change to red mage.':
            // setRotation(PLD)
            break;
          case 'You change to samurai.':
            setLogList([])
            setRotation(SAM)
            break;

          default:
            break;
        }

      }
    }

    document.addEventListener("onLogLine", listener)

    return () => {
      console.log("Remove listener")
      document.removeEventListener("onLogLine", listener)
    }


    // document.removeEventListener("onLogLine", e => { })
    // addNewEventListener()
  }, [rotation])

  const addNewEventListener = () => {

  }


  const displayResizeHandle = () => {
    document.documentElement.classList.add("resizeHandle");
  }

  const hideResizeHandle = () => {
    document.documentElement.classList.remove("resizeHandle");
  }

  // document.addEventListener("onLogLine", 	e => {
  //   console.log(e.detail)
  //   console.log(e.detail)

  //   callback(...e.detail)
  // })

  // const update = (data) => {
  //   debugger
  //   console.log('data')
  //   console.log(data.Combatant)
  //   updateEncounter(data);
  //   if (document.getElementById("combatantTableHeader") == null) {
  //     updateCombatantListHeader();
  //   }
  //   updateCombatantList(data);
  // }

  // const updateEncounter = (data) => {
  //   // 要素取得
  //   var encounterElem = document.getElementById('encounter');

  //   // テキスト取得
  //   var elementText;
  //   if (typeof encounterDefine === 'function') {
  //     elementText = encounterDefine(data.Encounter);
  //     if (typeof elementText !== 'string') {
  //       console.log("updateEncounter: 'encounterDefine' is declared as function but not returns a value as string.");
  //       return;
  //     }
  //   } else if (typeof encounterDefine === 'string') {
  //     elementText = parseActFormat(encounterDefine, data.Encounter);
  //   } else {
  //     console.log("updateEncounter: 'encounterDefine' should be string or function that returns string.");
  //     return;
  //   }

  //   // テキスト設定
  //   if (!useHTMLEncounterDefine) {
  //     encounterElem.innerText = parseActFormat(elementText, data.Encounter);
  //   } else {
  //     encounterElem.innerHTML = parseActFormat(elementText, data.Encounter);
  //   }
  // }

  // const updateCombatantListHeader = (data) => {
  //   var table = document.getElementById('combatantTable');
  //   var tableHeader = document.createElement("thead");
  //   tableHeader.id = "combatantTableHeader";
  //   var headerRow = tableHeader.insertRow();

  //   for (var i = 0; i < headerDefine.length; i++) {
  //     var cell = document.createElement("th");
  //     // テキスト設定
  //     if (typeof headerDefine[i].text !== 'undefined') {
  //       cell.innerText = headerDefine[i].text;
  //     } else if (typeof headerDefine[i].html !== 'undefined') {
  //       cell.innerHTML = headerDefine[i].html;
  //     }
  //     // 幅設定
  //     cell.style.width = headerDefine[i].width;
  //     cell.style.maxWidth = headerDefine[i].width;
  //     // 横結合数設定
  //     if (typeof headerDefine[i].span !== 'undefined') {
  //       cell.colSpan = headerDefine[i].span;
  //     }
  //     // 行揃え設定
  //     if (typeof headerDefine[i].align !== 'undefined') {
  //       cell.style["textAlign"] = headerDefine[i].align;
  //     }
  //     headerRow.appendChild(cell);
  //   }

  //   table.tHead = tableHeader;
  // }

  // const parseActFormat = (str, dictionary) => {
  //   var result = "";

  //   var currentIndex = 0;
  //   do {
  //     var openBraceIndex = str.indexOf('{', currentIndex);
  //     if (openBraceIndex < 0) {
  //       result += str.slice(currentIndex);
  //       break;
  //     }
  //     else {
  //       result += str.slice(currentIndex, openBraceIndex);
  //       var closeBraceIndex = str.indexOf('}', openBraceIndex);
  //       if (closeBraceIndex < 0) {
  //         // parse error!
  //         console.log("parseActFormat: Parse error: missing close-brace for " + openBraceIndex.toString() + ".");
  //         return "ERROR";
  //       }
  //       else {
  //         var tag = str.slice(openBraceIndex + 1, closeBraceIndex);
  //         if (typeof dictionary[tag] !== 'undefined') {
  //           result += dictionary[tag];
  //         } else {
  //           console.log("parseActFormat: Unknown tag: " + tag);
  //           result += "ERROR";
  //         }
  //         currentIndex = closeBraceIndex + 1;
  //       }
  //     }
  //   } while (currentIndex < str.length);

  //   return result;
  // }


  // const updateCombatantList = (data) => {
  //   var table = document.getElementById('combatantTable');
  //   var oldTableBody = table.tBodies.namedItem('combatantTableBody');
  //   var newTableBody = document.createElement("tbody");
  //   newTableBody.id = "combatantTableBody";

  //   // tbody の内容を作成
  //   var combatantIndex = 0;
  //   for (var combatantName in data.Combatant) {
  //     var combatant = data.Combatant[combatantName];
  //     console.log('combatant')
  //     console.log(combatant)
  //     var tableRow = newTableBody.insertRow(newTableBody.rows.length);
  //     for (var i = 0; i < bodyDefine.length; i++) {
  //       var cell = tableRow.insertCell(i);
  //       // テキスト設定
  //       if (typeof bodyDefine[i].text !== 'undefined') {
  //         var cellText;
  //         if (typeof bodyDefine[i].text === 'function') {
  //           cellText = bodyDefine[i].text(combatant, combatantIndex);
  //         } else {
  //           cellText = parseActFormat(bodyDefine[i].text, combatant);
  //         }
  //         cell.innerText = cellText;
  //       } else if (typeof bodyDefine[i].html !== 'undefined') {
  //         var cellHTML;
  //         if (typeof bodyDefine[i].html === 'function') {
  //           cellHTML = bodyDefine[i].html(combatant, combatantIndex);
  //         } else {
  //           cellHTML = parseActFormat(bodyDefine[i].html, combatant);
  //         }
  //         cell.innerHTML = cellHTML;
  //       }
  //       // 幅設定
  //       cell.style.width = bodyDefine[i].width;
  //       cell.style.maxWidth = bodyDefine[i].width;
  //       // 行構え設定
  //       if (typeof (bodyDefine[i].align) !== 'undefined') {
  //         cell.style.textAlign = bodyDefine[i].align;
  //       }
  //       // エフェクト実行
  //       if (typeof bodyDefine[i].effect === 'function') {
  //         bodyDefine[i].effect(cell, combatant, combatantIndex);
  //       }
  //     }
  //     combatantIndex++;
  //   }

  //   // tbody が既に存在していたら置換、そうでないならテーブルに追加
  //   if (oldTableBody != void (0)) {
  //     table.replaceChild(newTableBody, oldTableBody);
  //   }
  //   else {
  //     table.appendChild(newTableBody);
  //   }
  // }

  return (
    <div className={styles.container}>
      <button onClick={resetRotation}> Reset Rotation </button>
      <div className={styles.main}>
        {rotation.map((item, index) => {
          return (
            <div  key={index} className={`${index === count ? 'image-size animate__animated animate__pulse animate__infinite animate__slower  ' + styles.active : ''} ${styles.action} ${item.fail ? styles.fail : ''} ${item.success ? styles.success : ''}`}>
              <Image
                myLoader={myLoader}
                width={50}
                height={50}
                src={`https://xivapi.com/${item.Icon}?private_key=01b8717a652b4c4cb40e9dd7fac3efe644552ce827ea4c94b3b68db663d620e0`}
                alt={item.Name || ""}
              />
            </div>
            )})}
      </div>
      {/* aaa
        <App></App>
        aa 
        <div id="encounter">
          No data to show.
        </div>

        <table id="combatantTable">
        </table>*/}


      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div >
  )
}


export default Home