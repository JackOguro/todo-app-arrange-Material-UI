// モーダル表示するためにreact-modalをインポートする
import Modal from "react-modal";

// 期限を入力するためのライブラリとしてDatePickerをインポートする
import DatePicker from "react-datepicker";

// DatePickerで使用するカレンダーのCSSをインポートする
import "react-datepicker/dist/react-datepicker.css"

// バリデーションを行うためのreact-hook-formをインポートする
// 現時点では使用しない
import { useForm } from 'react-hook-form';

// チェックリストの型をインポートする
import { CheckListType } from "../types"

import TodoAddCheckList from "./TodoAddCheckList";

// propsで渡される値の型定義を行う
type TodoAddProps = {
    id: string
    title: string
    memo: string
    checkList: CheckListType
    priority: string
    difficulty: string
    deadLine: Date
    isShowModal: boolean
    changeFlg: boolean
    composing: boolean
    handleSetId: (id: string) => void
    handleSetTitle: (title: string) => void
    handleSetMemo: (memo: string) => void 
    handleSetCheckList: (checkList: CheckListType) => void
    handleSetDifficulty: (difficulty: string) => void
    handleSetPriority: (priority: string) => void
    handleSetDeadLine: (deadLine: Date) => void
    addTodoItem: (
        title: string, 
        memo: string, 
        checkList: CheckListType, 
        priority: string, 
        difficulty: string, 
        deadLine: Date
    ) => void
    toggleTodoItemStatus: (id: string, done: boolean) => void
    changeTodoItem: (
        id: string, 
        title: string, 
        memo: string, 
        checkList: CheckListType, 
        priority: string, 
        difficulty: string, 
        deadLine: Date
    ) => void
    deleteTodoItem: (id: string) => void
    closeModal: () => void
    startComposition: () => void
    endComposition: () => void
    reorder: (list: Array<any>, startIndex: number, endIndex: number) => any[]
}

// 重要度用の配列priorityItemsを定義する
const priorityItems = [
    {id: 1, value: "低"},
    {id: 2, value: "高"}
  ]
  
// 難易度用の配列difficultyItemsを定義する
const diffcultyItems = [
    {id: 1, value: "易"},
    {id: 2, value: "普"},
    {id: 3, value: "難"}
] 

// モーダル画面のデザインを設定
const customStyles = {
    
    //モーダルの中身
    content: {
      width: "500px",
      height: "700px",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      margin: "auto",
      border: "none",
      padding: "30px 120px",
      background: "white",
    },

    //モーダルの外側の部分はoverlayを使用する
    overlay: {
      background: "rgba(62, 62, 62, 0.75)"
    }
};

// react-modalを使用するために宣言する必要あり
// 任意のアプリを設定する　create-react-appなら#root
Modal.setAppElement("#root");

const TodoAddModal = (props: TodoAddProps) => {

    // react-hook-formの初期設定(現状は使用しない)
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    /* 
    ##############################
    TODO編集処理
    ############################## 
    */
    const handleChangeTodoItem = () => {
        props.changeTodoItem(
            props.id,
            props.title,
            props.memo, 
            props.checkList, 
            props.priority, 
            props.difficulty, 
            props.deadLine
        );

        props.closeModal();
    }

    /* 
    ##############################
    TODO追加処理
    ############################## 
    */
    const handleAddTodoItem = () => {
        props.addTodoItem(
            props.title,
            props.memo, 
            props.checkList, 
            props.priority, 
            props.difficulty, 
            props.deadLine
        )

        props.closeModal();
    }

    return (
        <div>
            {/* モーダル表示したい部分をModalタグで囲む */}
            <Modal

                // モーダルをの表示処理isOpen
                // 表示/非表示はStateのisShowModalで管理する
                isOpen={props.isShowModal}

                // モーダルが表示された後の処理
                // モーダルが表示されている間、背景のスクロールを禁止する
                onAfterOpen={() => (document.getElementById("root") as HTMLElement).style.position = "fixed"}

                // モーダルが非表示になった後の処理
                // モーダルを閉じた後に画面スクロールできるようにする
                onAfterClose={() => (document.getElementById("root") as HTMLElement).style.position = "unset"}

                // ↓を記述するとモーダル画面の外側をクリックした際にモーダルが閉じる
                // onRequestClose={closeModal}
                
                // モーダルの中身/背景のデザインを設定する
                style={customStyles}
            >
                <div>
                    <div>
                        <p>タイトル*</p>
                        <input  
                            type="text" 
                            defaultValue={props.title} 
                            onChange={(e) => props.handleSetTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>メモ</p>
                        <textarea value={props.memo} onChange={(e) => props.handleSetMemo(e.target.value)}/>
                    </div>
                    <div>
                        <p>チェックリスト</p>
                            {/* チェックリストはコンポーネント化して別定義する */}
                            <TodoAddCheckList 
                                checkList={props.checkList} 
                                handleSetCheckList={props.handleSetCheckList}
                                reorder={props.reorder}
                                composing={props.composing}
                                startComposition={props.startComposition}
                                endComposition={props.endComposition}
                            />
                    </div>
                    <div>
                        <p>重要度</p>
                        {/* map()メソッドを使用して重要度用の配列priorityItemsから要素を取り出す */}
                        {priorityItems.map((priorityItem) => (
                            <label key={priorityItem.id}>
                                <input 
                                    type="radio" 
                                    value={priorityItem.value}
                                    onChange={(e) => props.handleSetPriority(e.target.value)}
                                    checked={props.priority === priorityItem.value}
                                />
                                {priorityItem.value}
                            </label>
                        ))}
                    </div>
                    <div>
                        <p>難易度</p>
                        {/* map()メソッドを使用して難易度用の配列difficultyItemsから要素を取り出す */}
                        <select defaultValue={props.difficulty} onChange={(e) => props.handleSetDifficulty(e.target.value)}>
                            {diffcultyItems.map((diffcultyItem) => (
                                <option key={diffcultyItem.id} value={diffcultyItem.value}>
                                    {diffcultyItem.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>期限</p>
                        {/* 期限はDatePickerを使用する */}
                        {/* slectedをで初期値を設定できる */}
                        {/* minDateを設定することで選択できる日付を制限できる */}
                        {/* minDate={new Date()}のように設定すると本日より前の日付は選択できないようになる */}
                        <DatePicker 
                            dateFormat="yyyy/MM/dd"
                            selected={props.deadLine}
                            onChange={(date) => props.handleSetDeadLine(date!)}
                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        {/* changeFlgの値により表示するボタンを変更する */}
                        {props.changeFlg ? 
                            <button type="submit" onClick={handleChangeTodoItem}>編集する</button> :
                            <button type="submit" onClick={handleAddTodoItem}>作成する</button>
                        }
                        <button onClick={props.closeModal}>キャンセル</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TodoAddModal;