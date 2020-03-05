import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import isHotkey from 'is-hotkey';
import { Editable, withReact, useSlate, ReactEditor, Slate } from 'slate-react';
import { Editor, Transforms, createEditor } from 'slate';
import { withHistory } from 'slate-history';
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

const WizyWrapper = styled.div`
  border: 1px solid var(--border-color);
  border-radius: var(--form-border-radius);
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
`;

interface ButtonInterface {
  active?: boolean;
  disabled?: boolean;
}
const Button = styled.div<ButtonInterface>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  width: 30px;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: ${({ disabled }) => (disabled ? 'cursor' : 'pointer')};
`;

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: '' }]
  }
];

const HOTKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code'
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

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

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
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
}
const RichTextExample = ({ onChange, placeholder = 'Enter Text' }: RichTextExampleInterface) => {
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
    <WizyWrapper>
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
        <Editable
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
      </Slate>
    </WizyWrapper>
  );
};

export default RichTextExample;
