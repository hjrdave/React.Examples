import { FileRejection, DropEvent, Accept } from "react-dropzone";

export interface Props {
  accept?: Accept;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  preventDropOnDocument?: boolean;
  noClick?: boolean;
  noKeyboard?: boolean;
  noDrag?: boolean;
  multiple?: boolean;
  noDragEventsBubbling?: boolean;
  disabled?: boolean;
  className?: string;
  noHover?: boolean;
  onClick?: () => void;
  onDrop?: (data: {
    acceptedFiles: File[];
    fileRejections: FileRejection[];
    event: DropEvent | null;
  }) => void;
  onDropAccepted?: <T extends File>(files: T[], event: DropEvent) => void;
  onDropRejected?: (fileRejections: FileRejection[], event: DropEvent) => void;
  onFileDialogCancel?: () => void;
  onFileDialogOpen?: () => void;
  onDragEnter?: React.DragEventHandler<HTMLElement>;
  onDragLeave?: React.DragEventHandler<HTMLElement>;
  onDragOver?: React.DragEventHandler<HTMLElement>;
  onError?: (msg: string) => void;
}

export interface IFile {
  path: string;
  lastModified: Date;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}
