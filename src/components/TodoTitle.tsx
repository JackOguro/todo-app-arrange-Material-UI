// cssファイルをインポートする
import TodoTitleStyle from "../css/TodoTitleStyle.module.css"

// propsで渡される値の型定義を行う
type TodoTitleProps = {
  title: string
  as : string
}

const TodoTitle = (props: TodoTitleProps) => {

    // asがh1ならば、タイトルはh1タグを使用
    if (props.as === "h1") {
      return <h1 className={TodoTitleStyle.title}>{props.title}</h1>
  
    // asがh2ならば、タイトルはh2タグを使用
    } else if (props.as === "h2") {
      return <h2>{props.title}</h2>
  
    // それ以外ならば、タイトルはpタグを使用
    } else {
      return <p>{props.title}</p>
    }
  }

export default TodoTitle;