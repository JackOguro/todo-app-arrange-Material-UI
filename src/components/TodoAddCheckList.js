import React, { useState } from 'react';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import TodoCheckItem from "./TodoAddCheckItem";

const TodoCheckList = (props) => {

  // チェックリストの現在の個数itemCount
  // itemCountを変更する関数setItemCountを定義する
  const [itemCount, setItemCount] = useState(0);

  // チェックリストを追加するinputの現在の状態変数inputValue
  // inputValueを更新する関数setInputValueを定義する
  const [inputValue, setInputValue] = useState("");

    /* 
    ##############################
    チェックリストのCSS
    ############################## 
    */
  const getListStyle = (isDraggingOver) => ({
    background: 'white',
    /* isDraggingOverの型は真偽値、true=ドラッグ中、false=ドラッグ中ではない  */
    /* border: isDraggingOver ? 'solid 5px lightgray' : 'solid 5px white', */
    textAlign: 'left',
  });

  /* 
  ##############################
  チェックアイテムのCSS
  ############################## 
  */
  const getItemStyle = (draggableStyle) => ({
    marginBottom: '0.5rem',

    ...draggableStyle
  });

  /* 
  ##############################
  チェックリスト追加処理(エンターキーによる操作)
  ############################## 
  */
  const onKeyDown = (e, key, number) => {

    switch (key) {
      // 変換中でない時にEnterキーでinputを増やす
      case "Enter":
        // input入力中にエンターを押すとデフォルトではsubmit(送信)になるため
        // e.preventDefault();で阻止する
        e.preventDefault();

        // 変換中ならそのまま何の処理も行わない
        if (props.composing) break;

        // 変換中でないなら、addCheckList()メソッドでチェックリストを追加
        if (number === 0) addCheckList();

        break;
      default:
        break;
    }
  }

  /* 
  ##############################
  チェックリストの順番変更処理
  ############################## 
  */
  const onDragEnd = (result) => {

    // ドロップ先がない場合、そのまま処理を抜ける
    if (!result.destination) return;

    // 配列の順番を入れ替える
    let movedCheckItem = props.reorder(
      props.checkList,          // 順番を入れ替えたい配列
      result.source.index,      // 元の配列での位置
      result.destination.index  // 移動先の配列での位置
    );

    props.setCheckList(movedCheckItem);
  };

  /* 
  ##############################
  チェックリスト追加処理
  ############################## 
  */
  const addCheckList = () => {

    // inputが空白ならそのまま何の処理も行わない
    if (inputValue === "") return;

    // 既存の配列に新たにチェックリストを加える
    props.setCheckList([...props.checkList, ...[{id: `item-${itemCount}`, checkItem: inputValue}]]);
    
    // チェックリストを加えたのでカウントアップ
    setItemCount(itemCount + 1);

    // チェックリストに追加した後、入力内容をクリアする
    setInputValue("");
  }

  /* 
  ##############################
  チェックリスト内容変更処理
  ############################## 
  */
  const updateCheckList = (index, e) => {
    const copyCheckList = props.checkList.slice();
    copyCheckList[index].checkItem = e.target.value;
    props.setCheckList(copyCheckList);
  }

  /* 
  ##############################
  チェックリスト削除処理
  ############################## 
  */
  const deleteCheckList = (index) => {
      
    // Array.from()メソッドは、反復可能オブジェクトや配列風オブジェクトから
    // シャローコピーされた、新しいArrayインスタンスを生成する
    const result = Array.from(props.checkList);

    // Array.splice()メソッドは、配列を操作するメソッド
    // 第2引数はオプション、第1引数に3、第2引数に2を指定した場合、3、4番目の要素を配列から取り出す
    result.splice(index, 1);
  
    props.setCheckList(result);
  }

  return (
    // onDragEnd={onDragEnd}→ドラッグ後のイベント処理、タスクの状態や順番を変更する
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {/* Droppableタグでsnapshotは以下のプロパティを持っている */}
        {/* snapshot.isDraggingOver:リスト上でアイテムがドラッグ中かどうか */}
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {props.checkList.map((checkItem, index) => (
              <Draggable key={checkItem.id} draggableId={checkItem.id} index={index}>
                {/* Draggaleタグでsnapshotは以下のプロパティを持っている */}
                {/* snapshot.isDragging:アイテムがドラッグ中かどうか */}
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(provided.draggableProps.style)}
                  >
                    <TodoCheckItem 
                      index={index}
                      checkItem={checkItem}
                      updateCheckList={updateCheckList}
                      deleteCheckList={deleteCheckList}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {/* ここにドラッグ可能なアイテムを配置 */}
            {provided.placeholder} 
            <button onClick={() => addCheckList()}>追加</button> 
            <input
              type="text" 
              value={inputValue}
              placeholder="新しいチェックリストを追加"
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => onKeyDown(e, e.key, 0)}
              onCompositionStart={props.startComposition}
              onCompositionEnd={props.endComposition}
            >
            </input>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoCheckList;

