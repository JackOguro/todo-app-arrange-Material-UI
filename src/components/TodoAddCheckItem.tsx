import { useState } from "react";

import TodoAddCheckItemStyle from "../css/TodoAddCheckItemStyle.module.css";

// Material UI
// Inputs 
import { IconButton, InputAdornment, FormControl, Input, Checkbox } from "@mui/material";

// Layout
import { Box } from "@mui/material";

// Material icons
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

// propsで渡される値の型定義を行う
type TodoAddCheckItemProps = {
  updateCheckList: (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  deleteCheckList: (index: number) => void
  checkItem : {
    checkItem: string
  }
  index: number
}

const TodoCheckItem = (props: TodoAddCheckItemProps) => {

  // メニュー表示ボタンを表示する変数displayMenu、displayMuneを更新する関数setDisplayMenu
  const [displayBtn, setDisplayBtn] = useState<boolean>(false);

  return (
    // チェックリストの各要素
    <FormControl fullWidth>
      {/* 現在時点でチェックボックスは機能していない */}
      <Input
        className={TodoAddCheckItemStyle.input}
        type="text"
        value={props.checkItem.checkItem}
        onChange={e => props.updateCheckList(props.index, e)}
        onMouseEnter={() => setDisplayBtn(true)}
        onMouseLeave={() => setDisplayBtn(false)}
        startAdornment={
          <InputAdornment position="start">
            <Box className={TodoAddCheckItemStyle.icon}>
              { displayBtn && <DragIndicatorRoundedIcon /> }
            </Box>
            <Checkbox />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => props.deleteCheckList(props.index)}>
              { displayBtn && <DeleteRoundedIcon/> }
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export default TodoCheckItem;