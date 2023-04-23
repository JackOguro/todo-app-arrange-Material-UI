import { useState, useEffect } from "react";

import TodoAdd from "./TodoAdd";

const TodoItem = (props) => {

    // 期限までの時間を設定する変数deadLine
    // deadLineを更新する関数setDeadLineを定義する
    const [deadLine, setDeadLine] = useState("");

    /* 
    ##############################
    完了/未完了変更処理
    ############################## 
    */
    const handleToggleTodoItemStatus = () => {
        props.toggleTodoItemStatus(props.todoItem.id, props.todoItem.done);
    }

    /* 
    ##############################
    TODOリスト削除処理
    ############################## 
    */
    const handleDeleteTodoItem = () => {
        props.deleteTodoItem(props.todoItem.id);
    }

    /* 
    ##############################
    TODO追加モーダル表示処理
    ############################## 
    */
    const handleChangeTodo = () => {
        
        props.setIsShowModal(true);   // TODO追加モーダルを表示する
        props.setChangeFlg(true);     // 編集/作成を切り替える
        props.setInputId(props.todoItem.id);
        props.setInputTitle(props.todoItem.title);
        props.setInputMemo(props.todoItem.memo);
        props.setCheckList(props.todoItem.checkList);
        props.setPriority(props.todoItem.priority);
        props.setDifficulty(props.todoItem.difficulty);
        props.setInputDeadLine(new Date(props.todoItem.deadLine)); // DatePickerに日付をDate型にしてから渡す
    }

    /* 
    ##############################
    期限までの残り時間を表示する
    ############################## 
    */
    const handleCountDown = () => {

        const nowDate = new Date();                                     // 本日の日時を取得
        const deadLineDate = new Date(props.todoItem.deadLine);               // 期限の日時を取得
        const diffDate = deadLineDate.getTime() - nowDate.getTime();    // 期限までの残り時間を取得

        // 期限が過ぎていない場合
        if (diffDate > 0) {
            setDeadLine(`${Math.floor(diffDate / 1000 / 60 / 60 / 24)}日後`);
        // 期限が過ぎている場合
        } else {
            setDeadLine("期限切れ")
        }
    } 

    // 初回レンダリング時のみ実行
    useEffect(handleCountDown, []);

    /* 
    ##############################
    チェックボックス更新処理
    ############################## 
    */
    const handleChangeCheck = () => {

    };

    return (
        <div>
            <h3>{props.todoItem.title}</h3>
            <p>{props.todoItem.memo}</p>
            {/* チェックリストも同様にmap()を利用してcheckListの要素を1つひとつ取り出す */}
            {props.todoItem.checkList.map((checkItem) => (
                <label key={checkItem.id} style={{display: "block"}}>
                    <input type="checkbox" value={checkItem.chckItem} onChange={handleChangeCheck}/>
                    {checkItem.checkItem}
                </label>
            ))}
            <p>期限: 
                {/* 最初にタスクの完了/未完了を判定する、その後期限が過ぎていないか判定する */}
                {/* 上記の条件をクリアした場合、期限までの時間を表示する */}
                {props.todoItem.done ? "完了済み" : deadLine}
            </p>

            {/* ボタンをクリックすることで関数handleToggleTodoItemStatusを実行する */}
            {/* ボタンをクリックすることでTODOの状態(完了/未完了)を反転させる */}
            <button onClick={handleToggleTodoItemStatus}>
                {props.todoItem.done ? "未完了リストへ" : "完了リストへ"}
            </button>

            {/* ボタンをクリックすることで関数handleDeleteTodoItemを実行する */}
            {/* ボタンをクリックすることでTODOを削除する */}
            <button onClick={handleDeleteTodoItem}>削除</button>

            {/* ボタンをクリックすることで関数handleChangeTodoItemを実行する */}
            {/* ボタンをクリックすることでTODOを編集する */}
            <button onClick={handleChangeTodo}>編集</button>
            {props.isShowModal && <TodoAdd />}
        </div>
    );
}

export default TodoItem;