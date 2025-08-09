import * as React from "react";
import Editor from "@monaco-editor/react";

type SqlEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

function SqlEditor({ value, onChange }: SqlEditorProps): React.ReactElement {
  return (
    <div className="h-[calc(100vh-450px)]">
      <Editor
        theme="light"
        defaultLanguage="sql"
        defaultValue=""
        onChange={(val) => onChange(val || "")}
        value={value}
      />
    </div>
  );
}

export default SqlEditor;
