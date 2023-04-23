import {useState, useEffect} from "react";

// 一意なidを生成するulidをインポートする
import {ulid} from "ulid";

// src/apis/todos.js内で宣言してexportした関数をimportする
// getAllTodosData, addTodoData, deleteTodoData, updateTodoDataを
// todoDataオブジェクトとしてまとめてimportする
import * as todoData from "../apis/todos";

// useTodo()カスタムフックを外部で使用できるようexportする
export const useTodo = () => {

    // todoListは現在のTODOの状態
    // setTodoListは現在のtodoListの状態を更新する関数
    // todoListの初期値に空の配列をセット
    const [todoList, setTodoList] = useState([]);

    // useEffect()を利用することでコンポーネントのマウント後、またはアンマウント後に処理を実行する
    // useEffect()の第2引数には空の依存配列[]を設定しているため、コンポーネントの初回レンダリング時のみ
    // 副作用関数が実行される
    useEffect(()=> {
        
        // モックサーバーからTODOデータを取得するgetAllTodoData()を実行する
        // モックサーバーからレスポンスデータの取得に成功した場合、then()以降の処理を実行する
        // 引数todoにはモックサーバーから送り返されたresponse.dataが設定される
        todoData.getAllTodosData().then((todo) => {
            
            // モックサーバーからTODOデータを取得後、取得したTODOデータを反転させ、上から順に表示
            // todoListの状態(state)を更新する
            setTodoList([...todo].reverse());
        });
    }, []);

    /* 
    ##############################
    完了/未完了変更処理
    ############################## 
    */
    const toggleTodoItemStatus = (id, done) => {

        // find()は配列から条件に合う値を見つけて最初にtrueになった
        // 要素の値を返し、要素を見つけた時点で処理を停止する
        // done(完了/未完了)の状態を反転させたいTODOをリストから見つける
        const changeTodoItem = todoList.find((todoItem) => todoItem.id === id);

        // 対象のTODOの完了/未完了を反転させる
        const newTodoItem = {...changeTodoItem, done: !done };

        // updataTodoData()を利用して指定されたidのTODOを更新したら、todoListの状態を更新する
        // モックサーバーからレスポンスデータの取得に成功した場合、then()以降の処理を実行する
        // 引数updatedTodoItemにはモックサーバーから送り返された対象のidを持つTODOが設定される
        todoData.updateTodoData(id, newTodoItem).then((updatedTodoItem) => {

            // done(完了/未完了)を変更したTODOに対して、map()を用いて１つひとつ処理を行う
            const newTodoList = todoList.map((todoItem) => 

                // idが異なる場合、todoListから取り出したtodoItemをそのまま返す
                // idが同じ場合、done(完了/未完了)の状態を反転させたupdatedTodoを返し、
                // 新しい配列newTodoListを作成する
                todoItem.id !== updatedTodoItem.id ? todoItem : updatedTodoItem
            );

            // todoListの現在の状態(state)をnewTodoListの内容に更新
            setTodoList(newTodoList);
        }); 
    }

    /* 
    ##############################
    TODO編集処理
    ############################## 
    */
    const changeTodoItem = (id, title, memo, checkList, priority, difficulty, deadLine) => {

        // 編集するTODOをidを用いてTODOリストから検索する
        const changeTodoItem = todoList.find((todoItem) => todoItem.id === id);
        
        // 対象のTODOの内容を変更する
        const newTodoItem = {...changeTodoItem, 
            title: title,           // titleにタイトルをセット
            memo: memo,             // memoにメモをセット
            checkList: checkList,   // checkListにチェックリストをセット
            priority: priority,     // priotiryに重要度をセット
            difficulty: difficulty, // difficultyに難易度をセット
            deadLine: deadLine,     // deadLineに期限をセット
            createDate: new Date()  // createDateに作成日時をセット
        };

        // 対象のTODOでリストを更新する
        todoData.updateTodoData(id, newTodoItem).then((updatedTodoItem) => {

            const newTodoList = todoList.map((todoItem) => 
                todoItem.id !== updatedTodoItem.id ? todoItem : updatedTodoItem
            );

            // 最新のtodoListに内容を更新する
            setTodoList(newTodoList);
        });
    }

    /* 
    ##############################
    TODO取得処理(idが一致したTODOリストを取得)
    ############################## 
    */
    const getSingleTodosData = (id) => {
        const singleTodoItem = todoList.find((todoItem) => todoItem.id === id);
        return singleTodoItem;
    }

    /* 
    ##############################
    新規TODO取得処理
    ############################## 
    */
    const addTodoItem = (title, memo, checkList, priority, difficulty, deadLine) => {
        const newTodoItem = {
            id: ulid(),             // idにulidで生成された一意な値をセット
            title: title,           // titleにタイトルをセット
            memo: memo,             // memoにメモをセット
            checkList: checkList,   // checkListにチェックリストをセット
            done: false,            // doneに完了/未完了をセット
            priority: priority,     // priotiryに重要度をセット
            difficulty: difficulty, // difficultyに難易度をセット
            deadLine: deadLine,     // deadLineに期限をセット
            createDate: new Date()  // createDateに作成日時をセット
        };

        // addTodoData()を利用してTODOを更新したら、続いてtodoListの状態も更新
        // addTodoData()は新規TODOを追加する関数
        // 引数newTodoItemにはモックサーバーから送り返された追加されたTODOが設定される
        todoData.addTodoData(newTodoItem).then((addTodo) => {

            // todoListの状態(state)をaddTodoが追加された状態に更新する
            setTodoList([addTodo, ...todoList]);
        });
    };

    /* 
    ##############################
    TODO削除処理
    ############################## 
    */
    const deleteTodoItem = (id) => {

        // deleteTodoData()を利用して指定されたidのTODOを削除する
        // deleteTodoData()は一致したidのTODOを削除する関数
        todoData.deleteTodoData(id).then((deleteItemId) => {

            // 削除したTODOとidが一致しないTODOのみの新しいリストを返す
            const newTodoList = todoList.filter((todoItem) => 
                todoItem.id !== deleteItemId
            );

            // todoListの状態(state)を更新
            setTodoList(newTodoList);
        });
    };

    // 作成した関数と、現在のTODOリストの状態変数todoListを返す
    return {todoList, setTodoList, getSingleTodosData, toggleTodoItemStatus, changeTodoItem, addTodoItem, deleteTodoItem};
};