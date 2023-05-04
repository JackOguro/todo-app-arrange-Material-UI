// TodoItemコンポーネントをインポートする
import TodoItem from "./TodoItem";

// ドラッグ＆ドロップのライブラリreact-beautiful-dndをインポートする
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// TODOリスト、チェックリストの型をインポートする
import { CheckListType, TodoListType } from "../types";

type TodoListProps = {
    todoList: TodoListType
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
    handleSetIsShowModal: (isShowModal: boolean) => void
    handleSetChangeFlg: (changeFlg: boolean) => void
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

const TodoList = (props: TodoListProps) => {

    /* 
    ##############################
    TODOリストの順番変更処理
    ############################## 
    */
    const onDragEnd = (result: any) => {

        // ドロップ先がない場合、そのまま処理を抜ける
        if (!result.destination) return;

        // 配列の順番を入れ替える
        const movedTodoItem = props.reorder(
        props.todoList,          // 順番を入れ替えたい配列
        result.source.index,      // 元の配列での位置
        result.destination.index  // 移動先の配列での位置
        );
    };

    /* 
    ##############################
    TODOリストのCSS
    ############################## 
    */
    const getListStyle = (isDraggingOver: boolean) => ({
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
    const getItemStyle = (draggableStyle: any) => ({
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
                        // Reactコンポーネント内でCSSを使用するとエラーが発生してしまうので as any をつける
                        style={getListStyle(snapshot.isDraggingOver) as any}
                    >
                        {/*　ドラッグできる要素　*/}
                        {props.todoList.map((todoItem, index) => (
                            <Draggable key={todoItem.id} draggableId={todoItem.id!} index={index}>
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
                                            id={props.id}
                                            title={props.title}
                                            memo={props.memo}
                                            checkList={props.checkList}
                                            priority={props.priority}
                                            difficulty={props.difficulty}
                                            deadLine={props.deadLine}
                                            isShowModal={props.isShowModal}
                                            changeFlg={props.changeFlg}
                                            composing={props.composing}
                                            handleSetId={props.handleSetId}
                                            handleSetTitle={props.handleSetTitle}
                                            handleSetMemo={props.handleSetMemo}
                                            handleSetCheckList={props.handleSetCheckList}
                                            handleSetDifficulty={props.handleSetDifficulty}
                                            handleSetPriority={props.handleSetPriority}
                                            handleSetDeadLine={props.handleSetDeadLine}
                                            handleSetIsShowModal={props.handleSetIsShowModal}
                                            handleSetChangeFlg={props.handleSetChangeFlg}
                                            addTodoItem={props.addTodoItem} 
                                            toggleTodoItemStatus={props.toggleTodoItemStatus} 
                                            changeTodoItem={props.changeTodoItem}
                                            deleteTodoItem={props.deleteTodoItem}
                                            closeModal={props.closeModal}
                                            startComposition={props.startComposition}
                                            endComposition={props.endComposition}
                                            reoreder={props.reorder}
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