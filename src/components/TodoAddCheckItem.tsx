// propsで渡される値の型定義を行う
type TodoAddCheckItemProps = {
  updateCheckList: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void
  deleteCheckList: (index: number) => void
  checkItem : {
    checkItem: string
  }
  index: number
}

const TodoCheckItem = (props: TodoAddCheckItemProps) => {

  return (
    // チェックリストの各要素
    <>
      {/* 現在時点でチェックボックスは機能していない */}
      <input type="checkbox"></input>
      <input
        type="text"
        value={props.checkItem.checkItem}
        onChange={e => props.updateCheckList(props.index, e)}
      />
      <button onClick={() => props.deleteCheckList(props.index)}>削除</button>
    </>
  );
}

export default TodoCheckItem;