import { useState, useEffect } from "react";

// TODOリスト、チェックリストの型をインポートする
import { TodoItemType, CheckListType } from "../types"

import TodoAddModal from "./TodoAddModal";

import TodoItemStyle from "../css/TodoItemStyle.module.css"

// Material UI
// Layout
import { Box } from "@mui/material";

// Inputs
import { IconButton, Menu, MenuItem, Tooltip, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

// Data Display
import { List, ListItemButton, ListItemText, Collapse } from "@mui/material"; 

// Material icons
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

type TodoItemProps = {
    todoItem: TodoItemType
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
    reoreder: (list: Array<any>, startIndex: number, endIndex: number) => any[]
}

const TodoItem = (props: TodoItemProps) => {

    // 期限までの時間を設定する変数deadLine、deadLineを更新する関数setDeadLine
    const [deadLine, setDeadLine] = useState("");

    // メニュー表示ボタンを表示する変数displayMenu、displayMuneを更新する関数setDisplayMenu
    const [displayMenu, setDisplayMenu] = useState<boolean>(false);

    // 現在のメニュー表示の状態変数anchorMenu、anchorElを更新する関数setAnchorMenu
    const [anchorMenu, setAnchorMenu] = useState<null>(null);

    // 現在のメニュー表示の状態変数anchorMenu、anchorElを更新する関数setAnchorMenu
    const [anchorList, setAnchorList] = useState<boolean>(false);

    // メニュー非表示処理
    const handleClose = () => setAnchorMenu(null);


    /* 
    ##############################
    期限までの残り時間を表示する
    ############################## 
    */
    const handleCountDown = () => {

        const nowDate = new Date();                                     // 本日の日時を取得
        const deadLineDate = new Date(props.todoItem.deadLine!);        // 期限の日時を取得
        const diffDate = deadLineDate.getTime() - nowDate.getTime();    // 期限までの残り時間を取得

        // 期限が過ぎていない場合
        if (diffDate > 0) {
            setDeadLine(`${Math.floor(diffDate / 1000 / 60 / 60 / 24)}日後`);
        // 期限が今日の場合
        } else if (diffDate === 0) {
            setDeadLine("今日");
        // 期限が過ぎている場合
        } else {
            setDeadLine("期限切れ")
        }
    } 

    // useEffectを使用してコンポーネントのマウント後に関数handleCountDownを実行する
    // useEffectの第2引数にprops.todoItem.deadLineを設定することでprops.todoItem.deadLineが
    // 更新される度に関数handleCountDownを実行する
    useEffect(handleCountDown, [props.todoItem.deadLine]);

    /* 
    ##############################
    完了/未完了変更処理
    ############################## 
    */
    const handletoggleTodo = () => {
        props.toggleTodoItemStatus(props.todoItem.id!, props.todoItem.done!);

        // メニューを非表示にする
        handleClose();
    }

    /* 
    ##############################
    TODO削除処理
    ############################## 
    */
    const handleDeleteTodo = () => {
        
        // 実行確認ダイアログを表示する
        const checkFlg = window.confirm("本当に削除してもよろしいですか");

        // 「はい」が押された場合、削除処理を実行する
        if (checkFlg) props.deleteTodoItem(props.todoItem.id!);

        // メニューを非表示にする
        handleClose();
    }

    /* 
    ##############################
    モーダル表示処理
    ############################## 
    */
    const handleChangeTodo = () => {

        props.handleSetId(props.todoItem.id!);                  // 対象のTODOからIDを取得する
        props.handleSetTitle(props.todoItem.title!);            // 対象のTODOからタイトルを取得する
        props.handleSetMemo(props.todoItem.memo!);              // 対象のTODOからメモを取得する
        props.handleSetCheckList(props.todoItem.checkList!);    // 対象のTODOからチェックリストを取得する
        props.handleSetDifficulty(props.todoItem.difficulty!);  // 対象のTODOから難易度を取得する
        props.handleSetPriority(props.todoItem.priority!);      // 対象のTODOから重要度を取得する
        props.handleSetDeadLine(props.todoItem.deadLine!);      // 対象のTODOから期限を取得する

        // 編集ボタンを表示するよう変更する
        props.handleSetChangeFlg(true);

        // モーダルを表示する
        props.handleSetIsShowModal(true);

        // メニューを非表示にする
        handleClose();
    }

    /* 
    ##############################
    チェックボックス更新処理
    ############################## 
    */
    // 現在時点で関数handleChangeCheckは機能していない
    const handleChangeCheck = () => {
        
    };

    return (
        // TODOアイテム
        <Box
            className={TodoItemStyle.TodoItem}
            onMouseEnter={() => setDisplayMenu(true)}
            onMouseLeave={() => setDisplayMenu(false)}
        >
            {/* TODOチェックボックス */}
            <Box className={TodoItemStyle.TodoItemLeft}>
                {/* チェックボックスをクリックすることで関数handleToggleTodoItemStatusを実行する */}
                {/* ボタンをクリックすることでTODOの状態(完了/未完了)を反転させる */}
                <Checkbox 
                    className={TodoItemStyle.checkbox}
                    onChange={handletoggleTodo} 
                />
            </Box>
            {/* TODOの内容 */}
            <Box className={TodoItemStyle.TodoItemRight}>
                <p className={TodoItemStyle.todoItemTitle}>{props.todoItem.title}</p>

                {displayMenu && 
                    <Box className={`fadeIn ${TodoItemStyle.menu}`}>
                        <IconButton onClick={(e: any) => setAnchorMenu(e.currentTarget)}>
                            <Tooltip title="オプション" placement="top">
                                <MoreVertRoundedIcon />
                            </Tooltip>
                        </IconButton>
                        <Menu
                            anchorEl={anchorMenu}
                            open={Boolean(anchorMenu)}
                            onClose={() =>setAnchorMenu(null)}
                            PaperProps={{ style: { width: '200px' }}}
                        >
                            {/* ボタンをクリックすることで関数handleDeleteTodoItemを実行する */}
                            {/* ボタンをクリックすることでTODOを削除する */}
                            <MenuItem onClick={handleDeleteTodo}>
                                <DeleteRoundedIcon />　
                                削除
                            </MenuItem>

                            {/* ボタンをクリックすることで関数handleChangeTodoItemを実行する */}
                            {/* 関数handleChangeTodoItemが実行されるとモーダル画面が表示される */}
                            <MenuItem onClick={handleChangeTodo}>
                                <EditRoundedIcon />　
                                編集
                            </MenuItem>
                        </Menu>
                    </Box>
                }

                <p className={TodoItemStyle.todoItemMemo}>{props.todoItem.memo}</p>

                <ListItemButton className={TodoItemStyle.list} onClick={() => setAnchorList(!anchorList)}>
                    <FormatListBulletedRoundedIcon className={TodoItemStyle.listIcon} />
                    <ListItemText className={TodoItemStyle.listText} primary="チェックリスト" />
                    {anchorList ? <ExpandMore className={TodoItemStyle.listToggleIcon} /> : <ExpandLess className={TodoItemStyle.listToggleIcon} />}
                </ListItemButton>
                <Collapse in={anchorList}>
                    <List>   
                        {/* map()を利用してcheckListの要素を1つひとつ取り出す */}
                        {/* map()メソッドを使用する対象の配列に「！ = undifined」を設定するとエラー */}
                        {props.todoItem.checkList?.map((checkItem) => (
                            <FormGroup key={checkItem.id} style={{display: "block"}}>
                                <FormControlLabel 
                                    className={TodoItemStyle.checkItem}
                                    control={
                                        <Checkbox 
                                            value={checkItem.checkItem} 
                                            onChange={handleChangeCheck}
                                        />
                                    } 
                                    label={checkItem.checkItem} 
                                />
                            </FormGroup>
                        ))}
                    </List>
                </Collapse>
                <p className={TodoItemStyle.deadLine}>期限: 
                    {/* 最初にタスクの完了/未完了を判定する、その後期限が過ぎていないか判定する */}
                    {/* 上記の条件をクリアした場合、期限までの時間を表示する */}
                    {props.todoItem.done ? "完了済み" : deadLine}
                </p>
            </Box>
                {props.isShowModal && 
                    <TodoAddModal 
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
                        addTodoItem={props.addTodoItem} 
                        toggleTodoItemStatus={props.toggleTodoItemStatus} 
                        changeTodoItem={props.changeTodoItem}
                        deleteTodoItem={props.deleteTodoItem}
                        closeModal={props.closeModal}
                        startComposition={props.startComposition}
                        endComposition={props.endComposition}
                        reorder={props.reoreder}
                    />
                }
        </Box>
    );
}

export default TodoItem;