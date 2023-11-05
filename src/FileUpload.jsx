import React from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUpload = ({ onFileAccepted }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop: onFileAccepted,
    multiple: false
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <div>
      <Box
        {...getRootProps()}
        sx={{ border: "1px dashed grey", p: 3, mb: 2, textAlign: "center" }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon sx={{ fontSize: 40 }} />
        <Typography>
          {isDragActive
            ? "Drop the file here ..."
            : "Drag 'n' drop an invoice file here, or click to select a file"}
        </Typography>
      </Box>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </div>
  );
};

export default FileUpload;

