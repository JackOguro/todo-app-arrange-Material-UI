// 作成したモックサーバーとの通信にaxiosを利用する
import axios from "axios";

// 型TodoItemTypeをインポートする
import { TodoItemType }  from "../types"

// ローカルに準備したモックサーバーのURL
const dataUrl = "http://localhost:3100/todos";

/* 
##############################
サーバー上の全TODO取得処理
############################## 
*/
// axios.get()でGETリクエストを送信
// サーバー上の全てのTODO(todos)を取得する関数getAllTodosDataを宣言する
// 他ファイルでgetAllTodosData()を利用できるようにするためexportする
export const getAllTodosData = async () => {

    // 引数に指定したURL(http://localhost:3100/todos)へGETリクエストを送り、
    // 戻される値は全てresponseに保存される
    const response = await axios.get(dataUrl);

    // 通信後、response.dataでレスポンスデータを返す
    return response.data;
};

/* 
##############################
TODO追加処理
############################## 
*/
// axios.post()で新規TODOを追加する
// TODOを追加する関数addTodoDataを宣言する
// 他ファイルでaddTodoData()を利用できるようにするためexportする
export const addTodoData = async (todoItem: TodoItemType) => {

    // 第2引数に、送信したいデータを指定してPOST送信する
    // サーバーに転送することで新規にデータを追加する
    const response = await axios.post(dataUrl, todoItem);

    // 通信後、response.dataでレスポンスデータを返す
    return response.data
};

/* 
##############################
TODO削除処理
############################## 
*/
// axios.delete()で一致したidのTODOを削除する
// TODOを削除する関数deleteTodoDataを宣言する
// 他ファイルでdeleteTodoData()を利用できるようにするためexportする
export const deleteTodoData = async (id: string) => {

    await axios.delete(`${dataUrl}/${id}`);

    // 通信後、削除したTODOのidを返す
    return id;
};

/* 
##############################
TODO更新処理
############################## 
*/
// axios.put()で一致したidのTODOを更新する
// TODOを更新する関数updateTodoDataを宣言する
// 他ファイルでupdateTodoData()を利用できるようにするためexportする
export const updateTodoData = async (id: string, todoItem: TodoItemType) => {

    // 第2引数に更新したいデータを渡す
    const response = await axios.put(`${dataUrl}/${id}`, todoItem);

    // 通信後、response.dataでレスポンスデータを返す
    return response.data;
};
