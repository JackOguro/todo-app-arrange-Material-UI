// useRefを利用できるようインポートする
import { useState } from "react";

// useTodo()カスタムフックをインポートする
import { useTodo } from "../hooks/useTodo";

// チェックリストの型をインポートする
import { CheckListType } from "../types"

// TodoTitleコンポーネントをインポートする
import TodoTitle from "./TodoTitle";

// TodoListコンポーネントをインポートする
import TodoList from "./TodoList";

// TodoAddコンポーネントをインポートする
import TodoAdd from "./TodoAddModal";

const App = () => {

  // useTodo()カスタムフックで作成したのを利用する
  // カスタムフックで定義したコンポーネントはApp.tsxで定義し、propsを用いて下の階層に渡す
  // 下の階層で定義すると親コンポーネント(App.tsx)がレンダリングされず処理は実行されているが画面は更新されない
  const {todoList, addTodoItem, toggleTodoItemStatus, changeTodoItem, deleteTodoItem} = useTodo();

  // 選択されたTODOリストのinputId、idを更新する関数setInputId
  const [id, setId] = useState<string>("");

  // 現在のタイトルの現在の状態変数inputTitle、inputTitleを更新する関数setInputTitle
  const [title, setTitle] = useState<string>("");

  // 現在のメモの現在の状態変数inputMemo、inputTitleを更新する関数setInputMemo
  const [memo, setMemo] = useState<string>("");

  // 現在のチェックリストの状態変数todoList、todoListを変更する関数setTodoList
  const [checkList, setCheckList] = useState<CheckListType>([]);

  // 現在の重要度の状態変数priority、priorityを更新する関数setPriority
  const [priority, setPriority] = useState<string>("低");

  // 現在の難易度の状態変数difficulty、difficultyを更新する関数setDifficulty
  const [difficulty, setDifficulty] = useState<string>("普");

  // 現在の期限の状態変数inputDeadLine、inputDeadLineを更新する関数setInputDeadLine
  const [deadLine, setDeadLine] = useState<Date>(new Date());

  // モーダルの表示の有無を設定する変数isShowModal、sShowModalを更新する関数setIsShowModal
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  // 追加ボタンと編集ボタンの変更を管理する変数changeFlg、changeFlgを更新する関数setChageFlg
  // False = 追加ボタン、True = 編集ボタン
  const [changeFlg, setChangeFlg] = useState<boolean>(false);

  // 漢字変換・予測変換(サジェスト)選択中か否かの判定
  // 変換中か否かの判定を行い、変換を確定させるエンターに反応しないように振り分ける
  // true=変換中、false=変換中ではない
  const [composing, setComposition] = useState<boolean>(false);

  /* 
  ##############################
  各State更新用の関数
  ############################## 
  */
  // id確認用の関数handleSetId
  const handleSetId = (id: string) => setId(id);

  // タイトル更新用の関数handleSetTitle
  const handleSetTitle = (title: string) => setTitle(title);

  // メモ更新用の関数handleSetMemo
  const handleSetMemo = (memo: string) => setMemo(memo);

  // チェックリスト更新用の関数handleSetCheckList
  const handleSetCheckList = (checkList: CheckListType) => setCheckList(checkList);

  // 重要度更新用の関数handleSetDifficulty
  const handleSetDifficulty = (difficulty: string) => setDifficulty(difficulty);

  // 難易度更新用の関数handleSetPriority
  const handleSetPriority = (priority: string) => setPriority(priority);

  // 期限更新用の関数handleSetDeadLine
  const handleSetDeadLine = (deadLine: Date) => setDeadLine(new Date(deadLine));

  // モーダル表示更新用の関数handleSetIsShowModal
  const handleSetIsShowModal = (isShowModal: boolean) => setIsShowModal(isShowModal);

  // 作成/編集更新用の関数handleSetChangeFlg
  const handleSetChangeFlg = (changeFlg: boolean) => setChangeFlg(changeFlg);

  // 変換開始
  const startComposition = () => setComposition(true);
  
  // 変換終了
  const endComposition = () => setComposition(false);
    
  /* 
  ##############################
  未完了のTODOリストを表示する
  ############################## 
  */
  // filter()メソッドを使用してTODOリスト内のdoneがfalseのTODOを取得する
  const inCompletedList = todoList.filter((todoItem) => {
    return !todoItem.done;
  });

  /* 
  ##############################
  完了済みのTODOリストを表示する
  ############################## 
  */
  // filter()メソッドを使用してTODOリスト内のdoneがfalseのTODOを取得する
  // 現在は使用していない 
  const completedList = todoList.filter((todoItem) => {
    return todoItem.done;
  });

  /* 
  ##############################
  リセット処理
  ############################## 
  */
  const reset = () => {
    setTitle("");
    setMemo("");
    setCheckList([]);
    setDifficulty("普");
    setPriority("低");
    setDeadLine(new Date());
  }

  /* 
  ##############################
  TODOリストの順番変更処理
  ############################## 
  */
  const reorder = (
    list: Array<any>, 
    startIndex: number, 
    endIndex: number) => {

    // Array.from()メソッドは、反復可能オブジェクトや配列風オブジェクトから
    // シャローコピーされた、新しいArrayインスタンスを生成する
    const result = Array.from(list);

    // Array.splice()メソッドは、配列を操作するメソッド
    // 第1引数には操作を開始する配列のインデックス、第1引数のみの場合、指定したインデックス以降を取り除く
    // 第2引数はオプション、第1引数に3、第2引数に1を指定した場合、3番目の要素を配列から取り出す
    const [removed] = result.splice(startIndex, 1);

    // 第3引数はオブション、第3引数に設定した値が配列に追加される
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

    // 入力された内容をリセットする
    reset();
  };

  /* 
  ##############################
  TODOリスト簡易追加処理(エンターキーによる操作)
  ############################## 
  */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, key: string) => {

    switch (key) {
    // エンターキーが押された際に以下の処理を実行する
    case "Enter":
        // input入力中にエンターを押すとデフォルトではsubmit(送信)になるため
        // e.preventDefault();で阻止する
        e.preventDefault();

        // 変換中ならそのまま何の処理も行わない
        if (composing) break;

        // 変換中でないなら、TODOを追加
        addTodoItem(
          title,
          memo,
          checkList,
          difficulty,
          priority,
          deadLine
        );

        // 追加後に入力フォームからフォーカスを外す
        (document.getElementById("simpleAddInput") as HTMLElement).blur();

        // 入力内容をクリアする
        setTitle("");

        break;
    default:
        break;
      }
  }

  return (
    <>
      <div>
        {/* TODOを作成するためのモーダルを表示する */}
        <button 
          onClick={() => {
          setIsShowModal(true); 
          setChangeFlg(false);
        }}
        >
          TODOの作成
        </button>
      </div>

      {/* onKeyDownでキーが押された際に処理を実行する */}
      {/* onCompositionStart/onCompositionEndで入力が確定しているかどうかを判断する */}
      <div>
        <input 
          type="text"
          id="simpleAddInput" 
          placeholder="TODOの追加"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => onKeyDown(e, e.key)}
          onCompositionStart={startComposition}
          onCompositionEnd={endComposition}
        />
      </div>

      {/* 現在は使わないのでコメントアウト中 */}
      {/* <button>新しいパケットの追加</button> */}

      <div>
        <TodoTitle title="TODO" as="h2" />

        {/* TODOを追加するモーダルを表示する */}
        <TodoAdd 
          id={id}
          title={title}
          memo={memo}
          checkList={checkList}
          priority={priority}
          difficulty={difficulty}
          deadLine={deadLine}
          isShowModal={isShowModal}
          changeFlg={changeFlg}
          composing={composing}
          handleSetId={handleSetId}
          handleSetTitle={handleSetTitle}
          handleSetMemo={handleSetMemo}
          handleSetCheckList={handleSetCheckList}
          handleSetDifficulty={handleSetDifficulty}
          handleSetPriority={handleSetPriority}
          handleSetDeadLine={handleSetDeadLine}
          addTodoItem={addTodoItem} 
          toggleTodoItemStatus={toggleTodoItemStatus}
          changeTodoItem={changeTodoItem}
          deleteTodoItem={deleteTodoItem}
          closeModal={closeModal}
          startComposition={startComposition}
          endComposition={endComposition}
          reorder={reorder}
        />

        {/* 登録されたTODOリストを表示する */}
        <TodoList 
          todoList={inCompletedList}
          id={id}
          title={title}
          memo={memo}
          checkList={checkList}
          priority={priority}
          difficulty={difficulty}
          deadLine={deadLine}
          isShowModal={isShowModal}
          changeFlg={changeFlg}
          composing={composing}
          handleSetId={handleSetId}
          handleSetTitle={handleSetTitle}
          handleSetMemo={handleSetMemo}
          handleSetCheckList={handleSetCheckList}
          handleSetDifficulty={handleSetDifficulty}
          handleSetPriority={handleSetPriority}
          handleSetDeadLine={handleSetDeadLine}
          handleSetIsShowModal={handleSetIsShowModal}
          handleSetChangeFlg={handleSetChangeFlg}
          addTodoItem={addTodoItem} 
          toggleTodoItemStatus={toggleTodoItemStatus} 
          changeTodoItem={changeTodoItem}
          deleteTodoItem={deleteTodoItem}
          closeModal={closeModal}
          startComposition={startComposition}
          endComposition={endComposition}
          reorder={reorder}
        />
      </div>
    </>
  )
}

export default App;