import {useState, useEffect} from "react";

// 一意なidを生成するulidをインポートする
import {ulid} from "ulid";

// TODOリスト、チェックリストの型をインポートする
import { TodoListType, CheckListType } from "../types"

// src/apis/todos.js内で宣言してexportした関数をimportする
// getAllTodosData, addTodoData, deleteTodoData, updateTodoDataを
// todoDataオブジェクトとしてまとめてimportする
import * as todoData from "../apis/todos";

// useTodo()カスタムフックを外部で使用できるようexportする
export const useTodo = () => {

    // todoListは現在のTODOリストの状態、setTodoListは現在のtodoListの状態を更新する関数
    const [todoList, setTodoList] = useState<TodoListType>([]);

    /* 
    ##############################
    TODO取得処理
    ############################## 
    */
    // データの取得処理はuseEffectを利用してコンポーネントのマウント後に実装する
    // useEffect()の第2引数には空の依存配列[]を設定しているため、コンポーネントの初回レンダリング時のみ実行
    useEffect(()=> {
        
        // モックサーバーからTODOデータを取得するgetAllTodosData()を実行する
        // モックサーバーからレスポンスデータの取得に成功した場合、then()以降の処理を実行する
        // 引数todoにはモックサーバーから送り返されたresponse.dataが設定される
        todoData.getAllTodosData().then((todoList) => {
            
            // モックサーバーからTODOデータを取得後、取得したTODOデータを反転させ、上から順に表示
            // todoListの状態(state)を更新する
            setTodoList([...todoList].reverse());
        });
    }, []);

    /* 
    ##############################
    完了/未完了変更処理
    ############################## 
    */
    const toggleTodoItemStatus = (id: string, done: boolean) => {

        // find()メソッドを利用し一致するTODOを取得する
        // done(完了/未完了)の状態を反転させたいTODOをTODOリストから見つける
        const changeTodoItem = todoList.find((todoItem) => todoItem.id === id);

        // 対象のTODOの完了/未完了を反転させる
        const newTodoItem = {...changeTodoItem, done: !done };

        // updataTodoData()を利用して対象のidを持つTODOを更新したら、todoListの状態を更新する
        // モックサーバーからレスポンスデータの取得に成功した場合、then()以降の処理を実行する
        // 引数updatedTodoItemにはモックサーバーから送り返された対象のidを持つTODOが設定される
        todoData.updateTodoData(id, newTodoItem).then((updatedTodoItem) => {

            // TODOリストからTODOをmap()メソッドを利用してひとつ１つ処理する
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
    const changeTodoItem = (
        id: string, 
        title: string, 
        memo: string, 
        checkList: CheckListType, 
        priority: string, 
        difficulty: string, 
        deadLine: Date
        ) => {

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

        // updataTodoData()を利用して対象のidを持つTODOを更新する
        todoData.updateTodoData(id, newTodoItem).then((updatedTodoItem) => {

            // idが異なる場合、todoListから取り出したtodoItemをそのまま返す
            // idが同じ場合、TODOの内容を更新したupdatedTodoItemを返し、
            // 新しい配列newTodoListを作成する
            const newTodoList = todoList.map((todoItem) => 
                todoItem.id !== updatedTodoItem.id ? todoItem : updatedTodoItem
            );

            // 最新のtodoListに内容を更新する
            setTodoList(newTodoList);
        });
    }

    /* 
    ##############################
    新規TODO追加処理
    ############################## 
    */
    // 簡易入力ではtitle以外入力しないためundifinedを許容するために?をつける
    const addTodoItem = (        
        title: string, 
        memo: string, 
        checkList: CheckListType, 
        priority: string, 
        difficulty: string, 
        deadLine: Date
        ) => {

        const newTodoItem = {
            id: ulid(),             // idにulidで生成された一意な値をセット
            title: title,           // titleにタイトルをセット
            memo: memo,             // memoにメモをセット
            checkList: checkList,   // checkListにチェックリストをセット
            packet: "todo",         // packetにtodoをセット(現状はtodo固定にしておく)
            done: false,            // doneに完了/未完了をセット（初期値は未完了(false)）
            priority: priority,     // priotiryに重要度をセット
            difficulty: difficulty, // difficultyに難易度をセット
            deadLine: deadLine,     // deadLineに期限をセット
            createDate: new Date()  // createDateに作成日時をセット
        };

        // addTodoData()を利用して新規TODOを追加する
        // 引数addTodoItemにはモックサーバーから送り返された追加されたTODOが設定される
        todoData.addTodoData(newTodoItem).then((addTodoItem) => {

            // todoListにaddTodoItemが追加された状態に更新する
            setTodoList([addTodoItem, ...todoList]);
        });
    };

    /* 
    ##############################
    TODO削除処理
    ############################## 
    */
    const deleteTodoItem = (id: string) => {

        // deleteTodoData()を利用して指定されたidのTODOを削除する
        // deleteTodoData()は一致したidのTODOを削除する関数
        todoData.deleteTodoData(id).then((deleteItemId) => {

            // 削除したTODOとidが一致しないTODOのみの新しいリストを返す
            const newTodoList = todoList.filter((todoItem) => 
                todoItem.id !== deleteItemId
            );

            // todoListの状態を更新する
            setTodoList(newTodoList);
        });
    };

    // 作成した関数と、現在のTODOリストの状態変数todoListを返す
    return {todoList, setTodoList, toggleTodoItemStatus, changeTodoItem, addTodoItem, deleteTodoItem};
};