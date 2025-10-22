import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { InlineBannerScreen } from './app/add/screens/ads';

import { getChain } from './app/functions/getChain';

const { width } = Dimensions.get('window');

const fontSizeAdaptive = () => {
  let size;
  if (width < 335) {
    size = 20;
  } else {
    size = 24;
  }
  return size;
};

const WIDTH = () => {
  return width > 500 ? 500 : width;
};

const Draft = ({ numArr }) => {
  const arr = numArr.split('');

  return (
    <View userSelect="none">
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          justifyContent: 'center',
          flexDirection: 'row',
          columnGap: ((WIDTH() - 9) / 9 - 5) / 4,
          borderWidth: 0,
          alignContent: 'center',
          height: WIDTH() / 9,
          width: WIDTH() / 9,
        }}>
        {arr.map((data, index) => (
          <Text
            key={index}
            selectable={false}
            style={styles.cellTextDraft}
            >
            {data == '-' ? '  ' : data}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default function App() {
  
  useEffect(() => {
      (async () => {await MobileAds.initialize()})();
  });
  
  const mod = ['Easy', 'Medium', 'Hard', 'Expert'];
  const [modIndex, setModtIndex] = useState(0);

  const setMode = () => {
    setModtIndex((prevIndex) => (prevIndex + 1) % mod.length);
  };
  const setPrevMode = () => {
    if (modIndex != 0) {
      setModtIndex((prevIndex) => (prevIndex - 1) % mod.length);
    } else {
      setModtIndex((prevIndex) => (prevIndex + 2) % mod.length);
    }
  };

  const [lang, setLang] = useState('Ру');
  const [test, setTest] = useState({ cells: [] });
  const [newValue, setNewValue] = useState();
  const [key, setKey] = useState(0);
  const [draftMode, setDraftMode] = useState(false);
  const [modal, setModal] = useState(true);
  const [modalMessage, setModalMessage] = useState(
    lang == 'En' ? 'Welcome to Sudoku Game.' + '\n\n' + "Let's start!" 
    : 'Добро пожаловать в игру Судоку.' + '\n\n' + "Начните игру!"
  );
  const [reset, setReset] = useState(false);
  const [levelBtn, setLevelBtn] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);

  const [solved, setSolved] = useState(false);

  const [numStatus, setNumStatus] = useState({
    1:'',
    2:'',
    3:'',
    4:'',
    5:'',
    6:'',
    7:'',
    8:'',
    9:'',
  })

  const forceRerender = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const cellsNumbers = async () => {
    let e = [];
    let blockNum = 0;
    let countX = 0;
    let countY = 1;
    const coordinates = () => {
      countX++;
      if (countX > 9) {
        countX = 1;
        countY++;
      }
      return { countX, countY };
    };
    let j = 0;
    for (let i = 0; i < 81; i++, j += 9) {
      if (i == 9 || i == 18) blockNum = 0;
      if (i == 27 || i == 36 || i == 45) blockNum = 3;
      if (i == 54 || i == 63 || i == 72) blockNum = 6;
      if (i % 3 == 0) {
        blockNum++;
      }
      let { countX, countY } = coordinates();
      e.push({
        key: i + 1,
        block: blockNum,
        x: countX,
        y: countY,
        value: '',
        isHightlight: false,
        isSameNumHightlight: false,
        color: '',
        status: '',
        line_error: 0,
        block_error: 0,
        protect: 0,
        draft: '---------',
      });
    }
    let p = (prev) => ({
      ...prev,
      cells: e,
    });

    setTest(p);
  };

  function highlightXY(key) {

    test.cells.map((data) => {
      data.status = '';
      //highlight && setHighlight(!highlight);
      if (data.x == key.x || data.y == key.y) {
        data.isHightlight = true;
        //setHighlight('true');
      } else {
        data.isHightlight = false;
      }
      if (data.x == key.x && data.y == key.y) {
        data.status = 'active';
      } else {
        data.status = '';
      }
      //Highlight the same numbers
      if (key.value != '' && key.value == data.value) {
        data.isSameNumHightlight = true;
      } else {
        data.isSameNumHightlight = false;
      }
    });
  }

  function checkError(activeCell) {

    checkGameStatus()
    // CHECK ERRORS FOR LINES (x and y)
    function removeUniqueNumbers(obj) {
      const values = Object.values(obj);

      const countMap = values.reduce((acc, num) => {
        acc[num] = (acc[num] || 0) + 1;
        return acc;
      }, {});

      return Object.fromEntries(
        Object.entries(obj).filter(([_, num]) => countMap[num] > 1)
      );
    }

    let valuesX = new Object();
    let valuesY = new Object();

    test.cells.map((data, index) => {
      if (data.y == activeCell.y) {
        if (data.value != '') valuesX = { ...valuesX, [data.key]: data.value };
        data.line_error = 0; //Reset all previous errors
      }
      if (data.x == activeCell.x) {
        if (data.value != '') valuesY = { ...valuesY, [data.key]: data.value };
        data.line_error = 0; //Reset all previous errors
      }
    });

    if (Object.values(valuesX).length > 1) {
      //set errors if it be
      for (const [key, value] of Object.entries(removeUniqueNumbers(valuesX))) {
        test.cells[`${key}` - 1].line_error = 1;
      }
    }
    if (Object.values(valuesY).length > 1) {
      //set errors if it be
      for (const [key, value] of Object.entries(removeUniqueNumbers(valuesY))) {
        test.cells[`${key}` - 1].line_error = 1;
      }
    }

    // CHECK ERRORS FOR BLOKS 3x3
    let block = [];
    test.cells.filter((data) => {
      if (data.block == activeCell.block) {
        if (data.value != '') {
          block.push(data.value);
        }
      }
    });
    test.cells.filter((data) => {
      if (data.block == activeCell.block) {
        data.block_error = 0; //reset previous errors
        for (
          let i = 0;
          i < Object.keys(removeUniqueNumbers(block)).length;
          i++
        ) {
          if (Object.values(removeUniqueNumbers(block))[i] == data.value) {
            data.block_error = 1;
            break;
          }
        }
      }
    });
  }

  function setDraftValue(key) {
    function replaceAt(str, index, replacement) {
      return str.substring(0, index) + replacement + str.substring(index + 1);
    }
    test.cells.map((data) => {
      if (data.status == 'active' && !data.value) {
        let initialDraftValues = data.draft;
        let ii = 0;
        for (let i = 0; i < initialDraftValues.length; i++) {
          if (data.draft[i] == key) {
            data.draft = replaceAt(initialDraftValues, key - 1, '-');
            forceRerender();
            ii++;
          }
        }
        if (ii == 0) {
          data.draft = replaceAt(initialDraftValues, key - 1, key);
          forceRerender();
        }
      }
    });
  }

  function setValue(key) {

    test.cells.map((data) => {
      if (data.status == 'active' && data.protect !== 1) {
        data.value = key;
        data.draft = '---------';
        checkError(data);
        //setNewValue(key)
      }
      if (data.status == 'active' && key == newValue && data.protect !== 1) {
        forceRerender();
      }
      //Hilight the same values after input
      if (key != '' && key == data.value) {
        data.isSameNumHightlight = true;
      } else {
        data.isSameNumHightlight = false;
      }
    });
    setNewValue(key);
  }

  function cleanGame(mode) {
    setSolved(false)
    if (!mode) {
      test.cells.map((data) => {
        data.value = ''
        data.draft = '---------';
        data.line_error = 0;
        data.block_error = 0;
        data.protect = 0;
        data.status = '';
        data.isHightlight = false;
        data.isSameNumHightlight = false;
      });
    }
    if (mode == 'draft') {
      test.cells.map((data) => {
        data.draft = '---------';
        data.status = '';
        data.isHightlight = false;
        data.isSameNumHightlight = false;
      });
    }
    if (mode == 'all') {
      test.cells.map((data) => {
        if (data.protect == 0) data.value = '';
        data.draft = '---------';
        data.line_error = 0;
        data.block_error = 0;
        data.status = '';
        data.isHightlight = false;
        data.isSameNumHightlight = false;
      });
    }
  }

  function startGame() {

    cleanGame();
    let chain = getChain(mod[modIndex]);
    test.cells.map((data, index) => {
      if (chain[index] !== 0) {
        data.value = chain[index];
      }

      //protect from changing for  cells with default values
      chain[index] != '' ? data.protect = 1 : data.protect = 0;
    });
    checkGameStatus();
    setTimeout(()=> setReset(false), 400);
  }

  function checkGameStatus() {
    let result = [];
    test.cells.filter(data => {
      if (data.value != '') {
        result.push(data.value)
      }
    })
    if (result.length == 81) {
      solvedEffect();
    }

    //Set and check status for each num buttons
    let count = 0;
    let e = {};
    for (let i = 1; i < 10; i++) {
      count = 0
      result.filter(num => {

        if (num == i) count++
      })
      e = ({...e, [i]: count})
      setNumStatus(e)
    }

  }

  const countRef = useRef(null);
  let count = 1;
  function solvedEffect() {

    countRef.current = setInterval(() => {
      if (count >= 9) {

        clearInterval(countRef.current); // stops the loop
        countRef.current = null;

        setTimeout(()=> {
          setSolved(true);
          if (lang == 'En') {
            setModalMessage('Great!' + '\n\n' + "Game is solved. Let\'s try the next level.");
          } else {
            setModalMessage('Олично!' + '\n\n' + 'Попробуйте следующий уровень.');
          }

          setModal(true);
          console.log('Game complete')
        },450)
      }
      test.cells.map((data) => {
        if (count == data.y) {
          data.status = ''
          data.isSameNumHightlight = false;
          data.isHightlight = true;
        }
      });
      forceRerender()
      count++;
    }, 120);
  }

  useEffect(() => {
    cellsNumbers();
  }, []);

  const [lastPress, setLastPress] = useState(0);
  const tapHandler = () => {
    try {
      const currentTime = new Date().getTime();
      const delta = currentTime - lastPress;
      // 300ms threshold for double tap
      if (delta < 300) {
        console.log('Double tap detected!');
        setValue('');
      }
      setLastPress(currentTime);

    } catch (err) {
      console.log({err})
    }
  };

  return (
    <View>
      <View style={{height: 60}}>
        <InlineBannerScreen/>
      </View>
      <View
        style={{
          marginTop: 5,
          height: 30,
          justifyContent: 'center',
          flexDirection: 'row',
          columnGap: 60,
          borderWidth: 0,
        }}>
        <Pressable
          onPress={() => {
            if (lang == 'En') {
              setModalMessage('This game will be reseted.' + '\n' + 'Start new game?')
            } else {
              setModalMessage('Игра будет сброшена.' + '\n' + 'Начать новую игру?')              
            }
            setMode();
            setModal(true);
            setLevelBtn(true)
          }}
          >
          <View style={{ borderWidth: 0, width: 120, flexDirection: 'row' }}>
            <View>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                {lang == 'En' ? 'LEVEL: ' : 'УРОВЕНЬ: '}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: 'bold' }}>{
                lang == 'En' ?
                  mod[modIndex]
                 :
                  [
                    mod[modIndex] == 'Easy' && 'Лёгкий',
                    mod[modIndex] == 'Medium' && 'Средний',
                    mod[modIndex] == 'Hard' && 'Тяжёлый',
                    mod[modIndex] == 'Expert' && 'Эксперт'
                  ]
              }</Text>
            </View>
          </View>
        </Pressable>

        <View >
          <Pressable
            onPress={() => {
              lang == 'En' ? setLang('Ру') : setLang('En')
            }}
            >
            <View style={{flexDirection: 'row', width: 60}}>
              <View>
                <Image
                  style={{marginLeft:20, marginRight: 3, height: 20, width:20, padding:1}}
                  source={require('./app/assets/lang.png')}
                  />
              </View>
              <View>
                <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>{lang}</Text>
              </View>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.appContainer} key={key}>
        <View style={styles.borderContainer}>
          {test.cells.map((data, index) => (
            <View
              key={index}
              style={{ flexDirection: 'row' }}
              >
              {index < 9 && (
                <View
                  style={styles.border}
                  key={index}
                  >
                  <Text>
                    {'                                                  '}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.cellContainer}>
          {test.cells.map((data, index) => (
            <Pressable
              key={index}
              onPress={() => {
                highlightXY(data);
                tapHandler();
              }}>
              <View userSelect="none" key={index}>
                <View
                  style={[
                    styles.cells,
                    data.line_error == 1 && styles.rowError,
                    data.block_error == 1 && styles.rowError,
                    data.isHightlight == true && styles.highlightCells,
                    data.isSameNumHightlight == true && styles.highlightCellsSameNum,
                    data.status == 'active' && styles.cellActive,
                  ]}>
                  <Text style={styles.cellText} selectable={false}>
                    {data.value}
                  </Text>

                  <Draft numArr={data.draft} />
                </View>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.numButtonsRow}>
          {test.cells                                         //Num Buttons row
            .filter((data) => data.key < 10)
            .map((data, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.numButton,
                  numStatus[data.key] == 9 && {backgroundColor:'#f1f1f2'},
                ]}
                onPress={() => {
                  if (numStatus[data.key] != 9) {
                    draftMode == false
                      ? setValue(data.key)
                      : setDraftValue(data.key);
                  }
                }}>
                <Text style={[
                  styles.numButtonText,
                  numStatus[data.key] == 9 && {color:'#9c9c9c'},
                  ]}>
                  {data.key}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <View style={styles.commandButtonsRow}>

          <Pressable
            style={styles.commandButton}
            onPress={() => setValue('')}>
            <Image
              style={{height: 20, width:20, padding:1, alignSelf:'center'}}
              source={require('./app/assets/erase.png')}
              />
          </Pressable>


          <Pressable
            style={[
              styles.commandButton,
              draftMode && {
                backgroundColor: 'lightgray',
                borderColor: '#bababa',
              },
            ]}
            onPress={() => {
               setDraftMode((e) => {
                 return e == false ? true : false;
               });
            }}>
            <Image
              style={{height: 20, width:20, padding:1, alignSelf:'center'}}
              source={require('./app/assets/pencil.png')}
              />
          </Pressable>
          
          <Pressable
            style={[
              styles.commandButton,
              reset && {
                backgroundColor: 'lightgray',
                borderColor: '#bababa',
              },
            ]}            onPress={() => {
              setReset(true);
              setModal(true);
              setLevelBtn(false)
            }}>
            <Image
              style={{height: 20, width:20, padding:1, alignSelf:'center'}}
              source={require('./app/assets/reset.png')}
              />
          </Pressable>
          
        </View>
        <Modal animationType="fade" transparent={true} visible={modal}>
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: 'rgba(191, 191, 191, 0.502)' },
            ]}>
            <View style={styles.welcomeContent}>
              <View style={{flex:1, borderWidth:0, justifyContent:'center'}}>
                {reset == false ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      marginBottom: 1,

                    }}>
                    {modalMessage}
                  </Text>
                ) :
                (<Text
                    style={{
                      textAlign: 'center',
                      fontSize: 20,
                      marginBottom: 80,
                    }}>
                    {/*
                      lang == 'En' ? 'This game will be reseted.' + '\n\n' +
                      'Start new game?'
                      :
                      'Текущий результат будет сброшен.' + '\n\n' +
                      'Начать новую игру?'
                    */}
                  </Text>)
                }
              </View>

              <View
                style={{
                  alignContent: 'center',
                  margin: 10,
                  marginBottom:20,
                  flexDirection: 'column',
                  rowGap:10
                }}>
                <TouchableOpacity
                  style={styles.commandButton}
                  onPress={() => {
                    startGame();
                    setModal(false);
                  }}>
                  {
                    <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                      {
                        lang == 'En' ? 'START NEW GAME' : 'НОВАЯ ИГРА'
                      }
                    </Text>
                  }
                </TouchableOpacity>
                {levelBtn == true &&
                    <TouchableOpacity                                       //Resume button
                      style={styles.commandButton}
                      onPress={() => {
                        setModal(false);
                        levelBtn == true && setPrevMode();
                        setTimeout(()=> setReset(false), 400);
                      }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {lang == 'En' ? 'RESUME' : 'НАЗАД'}
                      </Text>
                    </TouchableOpacity>
                }

                {reset == true && (
                  <View style={{rowGap:10}}>
                    <TouchableOpacity                                       //Reset current game
                      style={styles.commandButton}
                      onPress={() => {
                        cleanGame('all');
                        setModal(false);
                        setTimeout(()=> setReset(false), 400);
                      }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {lang == 'En' ? 'RESET GAME' : 'НАЧАТЬ ЗАНОВО'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity                                       //Reset draft
                      style={styles.commandButton}
                      onPress={() => {
                        cleanGame('draft');
                        setModal(false);
                        setTimeout(()=> setReset(false), 400);
                      }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {lang == 'En' ? 'RESET DRAFT' : 'СБРОСИТЬ ЗАМЕТКИ'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity                                       //Resume button
                      style={styles.commandButton}
                      onPress={() => {
                        setModal(false);
                        levelBtn == true && setPrevMode();
                        setTimeout(()=> setReset(false), 400);
                      }}>
                      <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        {lang == 'En' ? 'RESUME' : 'НАЗАД'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  welcomeContent: {
    height: WIDTH() - width * 0.1,
    width: WIDTH() - width * 0.1,
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding:20
  },
  appContainer: {
    flex: 1,
  },
  borderContainer: {
    height: WIDTH() - 10,
    width: WIDTH() - 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    backgroundColor: 'rgba(231, 231, 231, 0.5)',
    alignSelf: 'center',
  },
  cellContainer: {
    position: 'absolute',
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: WIDTH() - 9,
    width: WIDTH() - 9,
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  border: {
    justifyContent: 'center',
    borderWidth: 1,
    height: (WIDTH() - 10) / 3,
    maxWidth: (WIDTH() - 10) / 3,
    padding: 5,
  },
  cells: {
    borderWidth: 1,
    borderColor: 'rgba(142, 142, 142, 0.5)',
    height: (WIDTH() - 11) / 9,
    width: (WIDTH() - 11) / 9,
    justifyContent: 'center',
    margin: 0,
    padding: 2,
    alignItems: 'center',
  },
  cellActive: {
    borderColor: 'rgba(120, 120, 120, 0.6)',
    backgroundColor: 'rgba(108, 150, 220, 0.5)',//'rgba(110, 207, 117, 0.502)',
  },
  cellText: {
    fontSize: fontSizeAdaptive(),
    textAlign: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },
  cellTextDraft: {
    fontSize: 10,
  },
  highlightCells: {
    backgroundColor: 'rgba(168, 212, 171, 0.5)',
  },
  highlightCellsSameNum: {
    backgroundColor: 'rgba(108, 150, 220, 0.5)',
  },
  rowError: {
    backgroundColor: 'rgba(255, 150, 150, 0.5)',
  },
  commandButton: {
    minWidth: 80,
    height: 40,
    borderWidth: 1,
    borderRadius: 2,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 3,
    padding: 5,
  },
  numButtonsRow: {
    flexDirection: 'row',
    margin: 0,
    padding: 5,
    height: 60,
    borderRadius: 5,
    alignSelf: 'center',
    borderWidth: 0,
  },
  commandButtonsRow: {
    flexDirection: 'row',
    height: 50,
    padding: 5,
    alignSelf: 'center',
    columnGap: 20,
    borderWidth: 0,
  },
  numButton: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(107, 107, 107, 0.7)',
    backgroundColor: '#dde0eb',
    margin: 2,
    paddingLeft: 8,
    paddingRight: 8,
    minWidth: 35,
    height: 45,
    justifyContent: 'center',
    elevation: 2,
  },
  numButtonText: {
    textAlign: 'center',
    verticalAlign: 'center',
    fontSize: 24,
    color: '##3B3B3B',
  },
});
