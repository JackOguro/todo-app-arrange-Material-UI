// TodoItemコンポーネントをインポートする
import TodoItem from "./TodoItem";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TodoList = (props) => {

    /* 
    ##############################
    TODOリストの順番変更処理
    ############################## 
    */
    const onDragEnd = (result) => {

        // ドロップ先がない場合、そのまま処理を抜ける
        if (!result.destination) return;

        // 配列の順番を入れ替える
        let movedCheckItem = props.reorder(
        props.todoList,          // 順番を入れ替えたい配列
        result.source.index,      // 元の配列での位置
        result.destination.index  // 移動先の配列での位置
        );

        props.setTodoList(movedCheckItem);
    };

    /* 
    ##############################
    TODOリストのCSS
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
    TODOアイテムのCSS
    ############################## 
    */
    const getItemStyle = (draggableStyle) => ({
        marginBottom: '0.5rem',

        ...draggableStyle
    });

    return (
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
                        {/*　ドラッグできる要素　*/}
                        {props.todoList.map((todoItem, index) => (
                            <Draggable key={todoItem.id} draggableId={todoItem.id} index={index}>
                                {/* Draggaleタグでsnapshotは以下のプロパティを持っている */}
                                {/* snapshot.isDragging:アイテムがドラッグ中かどうか */}
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(provided.draggableProps.style)}
                                    >
                                        <TodoItem
                                            todoItem={todoItem}
                                            toggleTodoItemStatus={props.toggleTodoItemStatus}
                                            changeTodoItem={props.changeTodoItem}
                                            deleteTodoItem={props.deleteTodoItem}                    
                                            getSingleTodosData={props.getSingleTodosData}
                                            setInputId={props.setInputId}    
                                            setInputTitle={props.setInputTitle}
                                            setInputMemo={props.setInputMemo}
                                            setCheckList={props.setCheckList}
                                            setPriority={props.setPriority}
                                            setDifficulty={props.setDifficulty}
                                            setInputDeadLine={props.setInputDeadLine}
                                            isShowModal={props.isShowModal} 
                                            setIsShowModal={props.setIsShowModal}
                                            setChangeFlg={props.setChangeFlg}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {/* ここにドラッグ可能なアイテムを配置 */}
                        {provided.placeholder} 
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default TodoList;