const TodoCheckItem = (props) => {

  return (
    <>
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