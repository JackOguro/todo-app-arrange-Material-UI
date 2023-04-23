import Modal from "react-modal";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

import { useForm } from 'react-hook-form';

import TodoCheckList from "./TodoAddCheckList";

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

//任意のアプリを設定する　create-react-appなら#root
Modal.setAppElement("#root");

const TodoAdd = (props) => {

    console.log(props.title);

    // react-hook-formの初期設定(現状は使用しない)
    // const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (
        <div>
            {/* モーダル表示したい部分をModalタグで囲む */}
            <Modal
                isOpen={props.isShowModal}

                // モーダルが表示された後の処理
                onAfterOpen={() => document.getElementById("root").style.position = "fixed"}

                // モーダルが非表示になった後の処理
                onAfterClose={() => document.getElementById("root").style.position = "unset"}

                // ↓を記述するとモーダル画面の外側をクリックした際にモーダルが閉じる
                // onRequestClose={closeModal}
                style={customStyles}
            >
                <div>
                    <div>
                        <p>タイトル*</p>
                        <input  
                            type="text" 
                            value={props.title} 
                            onChange={(e) => props.setInputTitle(e.target.value)}
                        />
                    </div>
                    <p>メモ</p><textarea value={props.memo} onChange={(e) => props.setInputMemo(e.target.value)}/>
                    <p>チェックリスト</p>
                        <TodoCheckList 
                            checkList={props.checkList} 
                            setCheckList={props.setCheckList}
                            reorder={props.reorder}
                            composing={props.composing}
                            startComposition={props.startComposition}
                            endComposition={props.endComposition}
                        />
                    <div>
                        <p>重要度</p>
                        {priorityItems.map((priorityItem) => (
                            <label key={priorityItem.id}>
                                <input 
                                    type="radio" 
                                    value={priorityItem.value}
                                    onChange={(e) => props.setPriority(e.target.value)}
                                    checked={props.priority === priorityItem.value}
                                />
                                {priorityItem.value}
                            </label>
                        ))}
                    </div>
                    <div>
                        <p>難易度</p>
                        <select defaultValue={props.difficulty} onChange={(e) => props.setDifficulty(e.target.value)}>
                            {diffcultyItems.map((diffcultyItem) => (
                                <option key={diffcultyItem.id} value={diffcultyItem.value}>
                                    {diffcultyItem.value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>期限</p>
                        {/* minDateを設定することで選択できる日付を制限できる */}
                        <DatePicker 
                            selected={props.inputDeadLine}
                            onChange={(date) => props.setInputDeadLine(date)}
                            minDate={new Date()}
                        />
                    </div>
                    <div>
                        {props.changeFlg ? 
                            <button 
                                type="submit"
                                onClick={() => {
                                    props.handleChangeTodoItem();
                                    props.closeModal();
                                }}
                            >
                                編集する
                            </button> :
                            <button 
                                type="submit"
                                onClick={() => {
                                    props.handleAddTodoItem();
                                    props.closeModal();
                                }}
                            >
                                作成する
                            </button>
                        }
                        <button onClick={props.closeModal}>キャンセル</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TodoAdd;