// useRefを利用できるようインポートする
import React, { useState } from "react";

// useTodo()カスタムフックをインポートする
import { useTodo } from "../hooks/useTodo";

// TodoTitleコンポーネントをインポートする
import TodoTitle from "./TodoTitle";

// TodoListコンポーネントをインポートする
import TodoList from "./TodoList";

// TodoAddコンポーネントをインポートする
import TodoAdd from "./TodoAdd";

const App = () => {

  // useTodo()カスタムフックで作成したtodoList、addTodoItemを利用する
  const {todoList, setTodoList, addTodoItem, toggleTodoItemStatus, changeTodoItem, deleteTodoItem} = useTodo();

  // 選択されたTODOリストのinputId、idを更新する関数setInputId
  const [inputId, setInputId] = useState("");

  // 現在のタイトルの現在の状態変数inputTitle、inputTitleを更新する関数setInputTitle
  const [inputTitle, setInputTitle] = useState("");

  // 現在のメモの現在の状態変数inputMemo、inputTitleを更新する関数setInputMemo
  const [inputMemo, setInputMemo] = useState("");

  // 現在のチェックリストの状態変数todoList、todoListを変更する関数setTodoList
  const [checkList, setCheckList] = useState([]);

  // 現在の重要度の状態変数priority、priorityを更新する関数setPriority
  const [priority, setPriority] = useState("低");

  // 現在の難易度の状態変数difficulty、difficultyを更新する関数setDifficulty
  const [difficulty, setDifficulty] = useState("普");

  // 現在の期限の状態変数inputDeadLine、inputDeadLineを更新する関数setInputDeadLine
  const [inputDeadLine, setInputDeadLine] = useState(new Date());

  // モーダルの表示の有無を設定する変数isShowModal、sShowModalを更新する関数setIsShowModal
  const [isShowModal, setIsShowModal] = useState(false);

  // 追加と編集の変更を管理する変数changeFlg、changeFlgを更新する関数setChageFlg
  // False = 追加、True = 編集
  const [changeFlg, setChangeFlg] = useState(false);

  // 漢字変換・予測変換(サジェスト)選択中か否かの判定
  // 変換中か否かの判定を行い、変換を確定させるエンターに反応しないように振り分ける
  // true=変換中、false=変換中ではない
  const [composing, setComposition] = useState(false);

  // チェックリストの現在の個数itemCount、itemCountを変更する関数setItemCountを定義する
  const [itemCount, setItemCount] = useState(0);

  // チェックリストを追加するinputの現在の状態変数inputValue、inputValueを更新する関数setInputValueを定義する
  const [inputValue, setInputValue] = useState("");


  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  /* 
  ##############################
  未完了のTODOリストを表示する
  ############################## 
  */
  const imCompletedList = todoList.filter((todoItem) => {
    return !todoItem.done;
  });

  /* 
  ##############################
  完了済みのTODOリストを表示する
  ############################## 
  */
  const completedList = todoList.filter((todoItem) => {
    return todoItem.done;
  });

  /* 
  ##############################
  TODO追加処理
  ############################## 
  */
  const handleAddTodoItem = () => {

    // TODO入力フォームで入力された文字列を新しいTODOに登録する
    addTodoItem(
      inputTitle, 
      inputMemo, 
      checkList, 
      priority, 
      difficulty, 
      inputDeadLine
    );
    closeModal();
  }

  /* 
  ##############################
  TODO編集処理
  ############################## 
  */
  const handleChangeTodoItem = () => {
    
    // 変更されたTODOを登録する
    changeTodoItem(
        inputId,
        inputTitle,
        inputMemo, 
        checkList, 
        priority, 
        difficulty, 
        inputDeadLine
      );
  }

  /* 
  ##############################
  リセット処理
  ############################## 
  */
  const reset = () => {
    setInputTitle("");
    setInputMemo("");
    setCheckList([]);
    setPriority("低");
    setDifficulty("普");
    setInputDeadLine(new Date());
  }

  /* 
  ##############################
  TODOリストの順番変更処理(実処理)
  ############################## 
  */
  const reorder = (list, startIndex, endIndex) => {

    // Array.from()メソッドは、反復可能オブジェクトや配列風オブジェクトから
    // シャローコピーされた、新しいArrayインスタンスを生成する
    const result = Array.from(list);

    // Array.splice()メソッドは、配列を操作するメソッド
    // 第1引数には操作を開始する配列のインデックス、第1引数のみの場合、指定したインデックス以降を取り除く
    // 第2引数はオプション、第1引数に3、第2引数に1を指定した場合、3番目の要素を配列から取り出す
    // 第3引数はオブション、第3引数に設定した値が配列に追加される
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /* 
  ##############################
  モーダルを非表示処理
  ############################## 
  */
  const closeModal = () => {
      setIsShowModal(false);
      setChangeFlg(!changeFlg);
      reset();
  };

  /* 
  ##############################
  TODOリスト簡易追加処理(エンターキーによる操作)
  ############################## 
  */
  const onKeyDown = (e, key) => {

    switch (key) {
      // 変換中でない時にEnterキーでinputを増やす
      case "Enter":
        // input入力中にエンターを押すとデフォルトではsubmit(送信)になるため
        // e.preventDefault();で阻止する
        e.preventDefault();

        // 変換中ならそのまま何の処理も行わない
        if (composing) break;

        // 変換中でないなら、TODOを追加
        addTodoItem(
          inputTitle, 
          inputMemo, 
          checkList, 
          priority, 
          difficulty, 
          inputDeadLine
        );

        // 追加後にフォーカスを外す
        document.getElementById("simpleAddInput").blur();

        // 入力内容をクリアする
        setInputTitle("");
  
        break;
      default:
        break;
    }
  }

  return (
    <>
      {/* 現在は使わないのでコメントアウト中 */}
      {/* <button>新しいパケットの追加</button> */}

      <div>
        <TodoTitle title="TODO" as="h2" />
        <button 
          onClick={() => {
            setIsShowModal(true); 
            setChangeFlg(false);
          }}
        >
          TODOの作成
        </button>

        <div>
          <input 
            type="text"
            id="simpleAddInput" 
            placeholder="TODOの追加"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            onKeyDown={(e) => onKeyDown(e, e.key, 1)}
            onCompositionStart={startComposition}
            onCompositionEnd={endComposition}
          />
        </div>

        {/* TODOを追加するダイアログを表示する */}
        {!isShowModal ? "" :
          <TodoAdd 
            title={inputTitle}
            memo={inputMemo}
            checkList={checkList}
            deadLine={inputDeadLine}
            priority={priority}
            difficulty={difficulty}
            inputDeadLine={inputDeadLine}
            changeFlg={changeFlg}
            isShowModal={isShowModal}
            composing={composing}
            setInputTitle={setInputTitle}
            setInputMemo={setInputMemo}
            setCheckList={setCheckList}
            setPriority={setPriority}          
            setDifficulty={setDifficulty}
            setInputDeadLine={setInputDeadLine}
            handleAddTodoItem={handleAddTodoItem}
            handleChangeTodoItem={handleChangeTodoItem}
            setIsShowModal={setIsShowModal}
            closeModal={closeModal}
            reorder={reorder}
            startComposition={startComposition}
            endComposition={endComposition}
          />
        }
          <TodoList 
            todoList={imCompletedList}
            isShowModal={isShowModal} 
            toggleTodoItemStatus={toggleTodoItemStatus}
            changeTodoItem={changeTodoItem}
            deleteTodoItem={deleteTodoItem}
            setTodoList={setTodoList}
            setInputId={setInputId}   
            setInputTitle={setInputTitle}
            setInputMemo={setInputMemo}
            setCheckList={setCheckList}
            setPriority={setPriority}
            setDifficulty={setDifficulty}
            setInputDeadLine={setInputDeadLine}
            setIsShowModal={setIsShowModal}
            setChangeFlg={setChangeFlg}
            reorder={reorder}
          />
        </div>
    </>
  )
}

export default App;