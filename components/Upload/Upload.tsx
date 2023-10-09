/**
 * This component uses React Dropzone
 * Docs for this library are located https://react-dropzone.js.org/#section-components
 */
import React from "react";
import { Card, Button } from "react-bootstrap";
import { FileRejection, DropEvent, Accept, useDropzone } from "react-dropzone";
import { Props } from "./Upload.interface";
import useNonInitialEffect from "../../hooks/useNonInitialEffect/useNonInitialEffect";
import styles from "./Upload.module.scss";

export default function Upload({
  multiple,
  accept,
  maxFiles: _maxFiles,
  minSize: _minSize,
  maxSize: _maxSize,
  preventDropOnDocument,
  noClick,
  noKeyboard,
  noDrag,
  noDragEventsBubbling,
  disabled: _disabled,
  className,
  noHover,
  onDrop: _onDrop,
  onDropAccepted,
  onDropRejected,
  onFileDialogCancel,
  onFileDialogOpen,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onClick,
  onError,
}: Props) {
  const [maxFiles] = React.useState(
    multiple ? (_maxFiles !== undefined ? _maxFiles : 10) : 1
  );
  const [minSize] = React.useState(_minSize !== undefined ? _minSize : 0);
  const [maxSize] = React.useState(
    _maxSize !== undefined ? _maxSize : 10000000
  );
  const [event, setEvent] = React.useState<DropEvent | null>(null);
  const [acceptedFiles, setAcceptedFiles] = React.useState<File[]>([]);
  const [fileRejections, setFileRejections] = React.useState<FileRejection[]>(
    []
  );
  const disabled = _disabled ? true : false;

  //updates state when files are uploaded
  const onDrop = (
    acceptedFiles: any[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => {
    setAcceptedFiles(acceptedFiles);
    setFileRejections(fileRejections);
    setEvent(event);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: accept,
    multiple: multiple ? true : false,
    maxFiles: maxFiles,
    minSize: minSize,
    maxSize: maxSize,
    preventDropOnDocument: preventDropOnDocument,
    noClick: noClick,
    noKeyboard: noKeyboard,
    noDrag: noDrag,
    noDragEventsBubbling: noDragEventsBubbling,
    disabled: disabled,
    onDrop: onDrop,
    onDropAccepted: onDropAccepted,
    onDropRejected: onDropRejected,
    onFileDialogCancel: onFileDialogCancel,
    onFileDialogOpen: onFileDialogOpen,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
  });

  //onDrop file data
  useNonInitialEffect(() => {
    if (_onDrop) {
      _onDrop({
        acceptedFiles: acceptedFiles,
        fileRejections: fileRejections,
        event: event,
      });
    }
  }, [acceptedFiles]);

  //handles file rejections
  React.useEffect(() => {
    if (fileRejections?.length > 0) {
      if (fileRejections?.length > maxFiles) {
        onError?.(`Selection exceeds the max files allowed of ${maxFiles}.`);
      } else {
        const invalidTypeMsg = `When importing, you must choose a file with ${
          accept ? Object.values(accept).flat() : ""
        } extension(s) to import. Please choose a file with that extension.`;
        const fileToLargeMsg = `'File is larger than' ${maxSize} bytes`;
        fileRejections.forEach((rejection) => {
          const fileName = rejection.file.name;
          rejection.errors.forEach((error) => {
            const dropzoneMsg =
              error.code === "file-invalid-type"
                ? invalidTypeMsg
                : error.code === "file-too-large"
                ? fileToLargeMsg
                : error.message;
            onError?.(`${fileName}: ${dropzoneMsg}`);
          });
        });
      }
    }
  }, [fileRejections]);

  return (
    <>
      <div
        className={`${styles.compContainer} ${
          noHover ? "" : styles.hover
        } ${className}`}
        onClick={onClick}
      >
        <div
          className={`d-flex flex-column align-items-center py-4 ${
            disabled ? styles.noCursor : ""
          }`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <i
            className={`fa-solid fa-cloud-arrow-up text-muted ${styles.icon} ${
              disabled ? styles.disabled : ""
            }`}
          ></i>
          {isDragActive ? (
            <p className={`pt-2 mb-0 ${styles.text}`}>Upload File.</p>
          ) : (
            <p className={`pt-2 mb-0 ${styles.text}`}>
              Drag or Click to upload files.
            </p>
          )}
          <div className={"d-flex"}>
            {maxFiles > 1 ? (
              <p className={`mb-0 me-2 ${styles.text}`}>
                <small>
                  <i>Upload Limit: {maxFiles}</i>
                </small>
              </p>
            ) : null}

            <p className={`mb-0 me-2 ${styles.text}`}>
              <small>
                <i> Max File Size: {maxSize / 1000000} MB</i>
              </small>
            </p>
            {typeof accept === "string" ? (
              <p className={`p-2 mb-0 ${styles.text}`}>
                <small>
                  <i>File Types:File Types: {accept}.</i>
                </small>
              </p>
            ) : typeof accept === "object" ? (
              <p className={`mb-0 ${styles.text}`}>
                <small>
                  <i>
                    File Types:{" "}
                    {/* {accept.map((type, index) => (
                      <span key={index}>{type} </span>
                    ))} */}
                    .
                  </i>
                </small>
              </p>
            ) : (
              <p className={`mb-0 ${styles.text}`}>
                <small>
                  <i>All files accepted.</i>
                </small>
              </p>
            )}
          </div>
          {acceptedFiles?.length > 1 ? (
            <Button
              variant={"bg-none"}
              className={`mt-2 py-1 px-1 ${styles.clearBtn}`}
              onClick={(e) => {
                e.stopPropagation();
                setAcceptedFiles([]);
              }}
            >
              Clear All
            </Button>
          ) : null}

          <div className={"pt-1"}>
            {acceptedFiles.map((file) => {
              const size = (file.size / 1000000).toFixed(2);
              const id = `${(file as any).path}-${file.size}-${file.name}`;
              const truncatedName = file.name.substring(0, 25);
              return (
                <React.Fragment key={id}>
                  <Card className={"mt-2"} onClick={(e) => e.stopPropagation()}>
                    <div
                      className={
                        "d-flex align-items-center justify-content-between px-2"
                      }
                    >
                      <p className={"p-2 mb-0"}>
                        <i
                          className={`fa-solid fa-trash-can text-danger cursor ${styles.remove} me-2`}
                          onClick={() =>
                            setAcceptedFiles(
                              acceptedFiles.filter(
                                (file) =>
                                  `${(file as any).path}-${file.size}-${
                                    file.name
                                  }` !== id
                              )
                            )
                          }
                        ></i>
                        <small>
                          <i>
                            {file.name?.length !== truncatedName?.length
                              ? `${truncatedName}...`
                              : truncatedName}
                          </i>
                        </small>
                      </p>
                      <p className={"p-2 mb-0"}>
                        <small>
                          <i>{size} MB</i>
                        </small>
                      </p>
                    </div>
                  </Card>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
