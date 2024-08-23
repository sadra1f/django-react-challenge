import Quill from "quill";
import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, defaultValue, onTextChange, onSelectionChange }: { [key: string]: any }, ref) => {
    const containerRef = useRef(null);
    const defaultValueRef = useRef(defaultValue);
    const onTextChangeRef = useRef(onTextChange);
    const onSelectionChangeRef = useRef(onSelectionChange);

    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    useEffect(() => {
      (ref as any).current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container: any = containerRef.current;
      const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));
      const quill = new Quill(editorContainer, {
        theme: "snow",
      });

      (ref as any).current = quill;

      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      quill.on(Quill.events.TEXT_CHANGE, (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on(Quill.events.SELECTION_CHANGE, (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        (ref as any).current = null;
        container.innerHTML = "";
      };
    }, [ref]);

    return (
      <div
        ref={containerRef}
        className="rounded-2xl bg-base-200 [&_*]:!border-0 [&_.ql-editor]:min-h-80"
      ></div>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
