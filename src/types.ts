// チェックアイテムの型定義
export type CheckItemType = {
    id: string,
    checkItem: string,
    done: boolean   
}
// チェックリストの型定義
export type CheckListType = CheckItemType[]

// TODOアイテムの型定義
export type TodoItemType = {
    id?: string,
    title?: string,
    memo?: string,
    checkList?: CheckItemType[],
    packet?: string,
    done?: boolean,
    priority?: string,
    difficulty?: string,
    deadLine?: Date,
    createDate?: Date
}

// TODOリストの型定義
export type TodoListType = TodoItemType[]