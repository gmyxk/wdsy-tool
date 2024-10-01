'use client';

import { cn } from '@/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Editor, EditorProps } from '@monaco-editor/react';
import {
  Button,
  ButtonProps,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Tooltip,
} from '@nextui-org/react';
import { useFullscreen } from 'ahooks';
import { useTheme } from 'next-themes';
import { useImperativeHandle, useRef } from 'react';

export type EditorInstance = Parameters<NonNullable<EditorProps['onMount']>>[0];

export type CodeEditorAction = {
  toggleFullscreen: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
  setValue: (value: string) => void;
  getValue: () => string;
};

interface CodeEditorProps {
  title: React.ReactNode;
  className?: string;
  classNames?: {
    card?: string;
    header?: string;
    body?: string;
    action?: string;
  };
  actionRender?: (action: CodeEditorAction) => React.ReactNode[];
  footerRender?: (action: CodeEditorAction) => React.ReactNode;
  editorProps?: EditorProps;
  actionRef?: React.MutableRefObject<CodeEditorAction | undefined>;
}

export const CodeEditorActionButton = (
  props: ButtonProps & {
    icon: string;
    tooltip?: string;
  }
) => {
  const { icon, tooltip, ...rest } = props;

  const renderButtonDom = () => {
    return (
      <Button isIconOnly variant="light" size="sm" {...rest}>
        <Icon icon={icon} width={20} />
      </Button>
    );
  };

  if (!tooltip) {
    return renderButtonDom();
  }

  return <Tooltip content={tooltip}>{renderButtonDom()}</Tooltip>;
};

export const CodeEditor = (props: CodeEditorProps) => {
  const {
    title,
    className,
    actionRender,
    footerRender,
    classNames,
    editorProps,
    actionRef,
  } = props;

  const { theme } = useTheme();

  const ref = useRef(null);

  const currentValue = useRef<string>();

  // const [isMounted, setMounted] = useState(false);

  const editorRef = useRef<EditorInstance>();

  const [isFullscreen, { toggleFullscreen, enterFullscreen, exitFullscreen }] =
    useFullscreen(ref);

  const actions: CodeEditorAction = {
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
    setValue: (value: string) => {
      currentValue.current = value;
      editorRef.current?.setValue(value);
    },
    getValue: () => {
      return editorRef.current?.getValue() || '';
    },
  };

  useImperativeHandle(actionRef, () => actions);

  const renderActions = () => {
    const inputActionDoms = actionRender?.(actions) || [];

    return [
      ...inputActionDoms,
      <CodeEditorActionButton
        icon={
          isFullscreen
            ? 'icon-park-outline:off-screen-one'
            : 'icon-park-outline:full-screen-one'
        }
        key="fs"
        tooltip="全屏"
        onClick={() => {
          toggleFullscreen();
        }}
      />,
    ];
  };

  return (
    <Card ref={ref} className={cn(className, classNames?.card)}>
      <CardHeader className={cn('flex justify-between', classNames?.header)}>
        <div>{title}</div>
        <div className={cn('flex gap-2', classNames?.action)}>
          {renderActions()}
        </div>
      </CardHeader>
      <CardBody className={cn('p-0', classNames?.body)}>
        <Editor
          height="100%"
          theme={theme === 'light' ? 'light' : 'vs-dark'}
          onMount={(editor) => {
            // setMounted(true);
            if (currentValue.current) {
              editor.setValue(currentValue.current);
            }
            editorRef.current = editor;
          }}
          {...editorProps}
        />
      </CardBody>
      <CardFooter className={cn(footerRender ? 'flex' : 'hidden')}>
        {footerRender?.(actions)}
      </CardFooter>
    </Card>
  );
};
