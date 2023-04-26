const TodoCheckItem = (props) => {

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