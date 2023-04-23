// TodoTitleコンポーネントを作成する
// 親コンポーネント(App)から受け取ったprops(as)の値により使用するタグを変更
const TodoTitle = (props) => {

    // asがh1ならば、タイトルはh1タグを使用
    if (props.as === "h1") {
      return <h1>{props.title}</h1>
  
    // asがh2ならば、タイトルはh2タグを使用
    } else if (props.as === "h2") {
      return <h2>{props.title}</h2>
  
    // それ以外ならば、タイトルはpタグを使用
    } else {
      return <p>{props.title}</p>
    }
  }

export default TodoTitle;