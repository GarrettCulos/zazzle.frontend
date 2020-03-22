import React, { useCallback, useEffect, useMemo, useState } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, ReactEditor, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { HOTKEYS, LIST_TYPES } from './constants';
import { WizyWrapper, WizyInputWrapper, Toolbar, Button } from './styled-components';
import { Element, Leaf } from './slate-functions';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdCode,
  MdLooksOne,
  MdLooksTwo,
  MdFormatQuote,
  MdFormatListNumbered,
  MdFormatListBulleted
} from 'react-icons/md';

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
];

const isBlockActive = (editor, format) => {
  const res: any = Editor.nodes(editor, {
    match: n => n.type === format
  });

  return Boolean(res[0]);
};

const getIcon = iconName => {
  switch (iconName) {
    case 'format_bold':
      return <MdFormatBold />;
    case 'format_italic':
      return <MdFormatItalic />;
    case 'format_underlined':
      return <MdFormatUnderlined />;
    case 'code':
      return <MdCode />;
    case 'looks_one':
      return <MdLooksOne />;
    case 'looks_two':
      return <MdLooksTwo />;
    case 'format_quote':
      return <MdFormatQuote />;
    case 'format_list_numbered':
      return <MdFormatListNumbered />;
    case 'format_list_bulleted':
      return <MdFormatListBulleted />;
    default:
      return;
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor: ReactEditor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  const active = useMemo(() => isBlockActive(editor, format), [editor, format]);
  return (
    <Button
      active={active}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {getIcon(icon)}
    </Button>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {getIcon(icon)}
    </Button>
  );
};

interface RichTextExampleInterface {
  onChange?: Function;
  placeholder?: string;
  integrated?: boolean;
  minHeight?: string;
}
const RichTextExample = ({ onChange, minHeight, integrated, placeholder = 'Enter Text' }: RichTextExampleInterface) => {
  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  useEffect(() => {
    if (onChange) {
      onChange(value);
    }
  }, [onChange, value]);

  return (
    <WizyWrapper integrated={integrated}>
      <Slate editor={editor} value={value} onChange={(value: any) => setValue(value)}>
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <WizyInputWrapper>
          <Editable
            style={{ minHeight }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            spellCheck
            autoFocus
            onKeyDown={(event: any) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </WizyInputWrapper>
      </Slate>
    </WizyWrapper>
  );
};

export default RichTextExample;
